package com.wavelabs.sb.services;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blueconic.browscap.Capabilities;
import com.blueconic.browscap.UserAgentParser;
import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.AdminCredentials;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.documents.AuthenticationAuditingDetails;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ClientsCredentials;
import com.wavelabs.sb.documents.ConfigurationMaster;
import com.wavelabs.sb.documents.QualityAssurance;
import com.wavelabs.sb.documents.QualityAssuranceCredentials;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.enums.UserType;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ForbiddenException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.AuthenticationMapper;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.AdminDetailsRepository;
import com.wavelabs.sb.repositories.AuthenticationRepository;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.ConfigurationMasterRepository;
import com.wavelabs.sb.repositories.QualityAssuranceCredentialsRepository;
import com.wavelabs.sb.repositories.QualityAssuranceRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.response.LoginResponse;

@Service
public class AuthenticationService {

    @Autowired
    QualityAssuranceCredentialsRepository qualityAssuranceCredentialsRepository;

    @Autowired
    QualityAssuranceRepository qualityAssuranceRepository;

    @Autowired
    ClientOnboardingRepository clientOnboardingRepository;

    @Autowired
    UserOnboardingRepository userOnboardingRepository;

    @Autowired
    JwtAuthenticationService jwtAuthenticationService;

    @Autowired
    AuthenticationRepository authenticationRepository;

    @Autowired
    AdminDetailsRepository adminDetailsRepository;

    @Autowired
    AesEncryption aesEncryption;

    private Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    @Autowired
    private UserAgentParser userAgentParser;

    @Autowired
    ConfigurationMasterRepository configurationMasterRepository;

    public void saveAuthenticationAuditingDetails(String token, String username, String typeOfUser, String ipAddress,
            String userAgent, String loginId) {
        logger.info("Saving Authentication aduit details for userName : {}", username);
        AuthenticationAuditingDetails response = AuthenticationMapper.toEntity(token, username, typeOfUser, ipAddress,
                userAgent, loginId);
        AuthenticationAuditingDetails authenticationAuditingDetails = authenticationRepository.save(response);
        if (StringUtils.isBlank(authenticationAuditingDetails.getId())) {
            logger.info("Error while saving Authentication aduit details for userName : {}", username);
            throw new BadRequestException("Unable to create Authentication audit details");
        }
        logger.info("Authentication aduit details saved for userName : {}", username);
    }

    public void userAlreadyLoggedInCheck(String userName) {
        logger.info("Checking if Client/User already loggedIn with Username : {}", userName);
        List<AuthenticationAuditingDetails> authenticationAuditingDetailsList = authenticationRepository
                .findByUserNameAndStatus(userName, Status.ACTIVE);
        authenticationAuditingDetailsList.stream().forEach(auth -> {
            logger.info("Client/User already loggedIn with id : {}", auth.getId());
            deActivateIfresordPresent(auth);
        });
    }

    public String logOut(String token) {
        logger.info("In Logout method");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        logger.info("Getting record with token");
        Optional<AuthenticationAuditingDetails> authenticationAuditingDetailsOpt = authenticationRepository
                .findByToken(token);
        if (!authenticationAuditingDetailsOpt.isPresent()) {
            logger.info(Constants.INVALID_TOKEN);
            throw new ResourceNotFoundException(Constants.INVALID_TOKEN);
        }
        deActivateIfresordPresent(authenticationAuditingDetailsOpt.get());
        logger.info(Constants.LOGOUT_SUCCESSFULL);
        return Constants.LOGOUT_SUCCESSFULL;
    }

    public void deActivateIfresordPresent(AuthenticationAuditingDetails auth) {
        logger.info("Record present");
        auth.setStatus(Status.INACTIVE);
        auth.setLogoutAt(Instant.now());
        authenticationRepository.save(auth);
    }

    public void passwordValidation(String passwordEntered, String actualPassword) {
        logger.info("Checking entered password is valid or not");
        if (!aesEncryption.encrypt(passwordEntered).equals(actualPassword)) {
            logger.info("Invalid password ");
            throw new BadRequestException(Constants.INVALID_PASSWORD);
        }
        logger.info("Entered password is valid");
    }

    public TokenPayLoadDetails getTokenPayLoadDetails(HttpServletRequest httpRequest) {
        logger.info("Getting token payload details from HttpServlet request ");
        TokenPayLoadDetails tokenPayLoadDetails = new TokenPayLoadDetails();
        if (httpRequest.getAttribute("tokenPayLoadDetails") != null) {
            tokenPayLoadDetails = (TokenPayLoadDetails) httpRequest.getAttribute("tokenPayLoadDetails");
        }
        return tokenPayLoadDetails;

    }

    public ClientOnboardingDetails getClientDetails(String clientId) {
        logger.info("Checking client details with clientId : {}", clientId);
        Optional<ClientOnboardingDetails> clientOpt = clientOnboardingRepository
                .findByClientIdAndStatusAndDeleted(clientId, Status.ACTIVE, false);
        if (clientOpt.isPresent()) {

            logger.info("Client details present with clientId : {}", clientId);
            return clientOpt.get();
            // logger.info(Constants.ACTIVE_CLIENT_NOT_FOUND);
            // throw new ResourceNotFoundException(Constants.ACTIVE_CLIENT_NOT_FOUND);
        } else {
            return null;
        }
    }

    public ClientsCredentials getClientCredentials(ClientOnboardingDetails client) {
        if (client.getClientCredentials() == null) {
            logger.info(ErrorMessages.CLIENT_CREDENTIALS_NOT_FOUND);
            throw new ResourceNotFoundException(ErrorMessages.CLIENT_CREDENTIALS_NOT_FOUND);
        }
        return client.getClientCredentials();
    }

    public Users getUserDetails(String userId) {
        logger.info("Checking user details with userId : {}", userId);
        Optional<Users> userOpt = userOnboardingRepository.findByUserIdAndStatusAndDeleted(userId, Status.ACTIVE,
                false);
        if (!userOpt.isPresent()) {
            logger.info(Constants.ACTIVE_USER_NOT_FOUND);
            throw new ResourceNotFoundException(Constants.ACTIVE_USER_NOT_FOUND);
        }
        logger.info("user details present with userId : {}", userId);
        return userOpt.get();
    }

    public Users getAdminUserDetails(String userId) {
        logger.info("Checking admin user details with userId : {}", userId);
        Optional<Users> userOpt = userOnboardingRepository.findByUserIdAndStatusAndDeleted(userId, Status.ACTIVE,
                false);
        if (!userOpt.isPresent()) {
            logger.info(Constants.ACTIVE_USER_NOT_FOUND);
            return null;
        }
        List<RoleOnboardingDetails> adminRole = userOpt.get().getRoles().stream()
                .filter(x -> x.getRole().equalsIgnoreCase(Constants.ADMIN)).collect(Collectors.toList());
        if (adminRole.isEmpty()) {
            logger.info(Constants.ADMIN_USER_NOT_FOUND);
            throw new ResourceNotFoundException(Constants.ADMIN_USER_NOT_FOUND);
        }
        logger.info("user details present with userId : {}", userId);
        return userOpt.get();
    }

    public AdminDetails getAdminDetails(String adminId) {
        logger.info("Checking admin details with userId : {}", adminId);
        Optional<AdminDetails> adminOptional = adminDetailsRepository.findByAdminIdAndStatusAndDeleted(adminId,
                Status.ACTIVE, false);
        if (!adminOptional.isPresent()) {
            return null;
        }
        logger.info("admin details present with userId : {}", adminId);
        return adminOptional.get();
    }

    public UserCredentials getUserCredentials(Users user) {
        logger.info("Checking user credential details with userId : {}", user.getUserId());

        if (user.getUserCredentials() == null) {
            logger.info(ErrorMessages.USER_CREDENTIALS_NOT_FOUND);
            throw new ResourceNotFoundException(ErrorMessages.USER_CREDENTIALS_NOT_FOUND);
        }
        return user.getUserCredentials();
    }

    public AdminCredentials getAdminCredentials(AdminDetails admin) {
        logger.info("Checking user credential details with userId : {}", admin.getAdminId());

        if (admin.getAdminCredentials() == null) {
            logger.info(ErrorMessages.ADMIN_CREDENTIALS_NOT_FOUND);
            throw new ResourceNotFoundException(ErrorMessages.ADMIN_CREDENTIALS_NOT_FOUND);
        }
        return admin.getAdminCredentials();
    }

    public String getBrowser(HttpServletRequest request) {
        String browser = request.getHeader("User-Agent");
        try {
            Capabilities parse = userAgentParser.parse(browser);
            return parse.getBrowser();
        } catch (Exception exception) {
            logger.info("Ubable to read Browser : {}", exception.getMessage());
        }
        return null;
    }

    public String getClientIp(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }

        if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }

        if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
            if (Constants.LOCALHOST_IPV4.equals(ipAddress) || Constants.LOCALHOST_IPV6.equals(ipAddress)) {
                try {
                    InetAddress inetAddress = InetAddress.getLocalHost();
                    ipAddress = inetAddress.getHostAddress();
                } catch (UnknownHostException exception) {
                    logger.info("Ubable to read Browser : {}", exception.getMessage());
                }
            }
        }

        if (!StringUtils.isEmpty(ipAddress) && ipAddress.length() > 15 && ipAddress.indexOf(",") > 0) {
            ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
        }

        return ipAddress;
    }

    public LoginResponse getConfigurationContants(LoginResponse loginResponse) {
        List<ConfigurationMaster> data = configurationMasterRepository.findAll();
        Optional<ConfigurationMaster> configurationMaster1 = data.stream()
                .filter(con -> Constants.GOOGLE_MAP_AUTHKEY.equals(con.getName())).findFirst();
        if (configurationMaster1.isPresent()) {
            loginResponse.setGoogleMapAuthKey(configurationMaster1.get().getValue());
        }
        Optional<ConfigurationMaster> configurationMaster2 = data.stream()
                .filter(con -> Constants.FIREBASE_AUTH_KEY.equals(con.getName())).findFirst();
        if (configurationMaster2.isPresent()) {
            loginResponse.setFirebaseAuthKey(configurationMaster2.get().getValue());
        }

        return loginResponse;
    }

    public boolean checkTokenExists(String token) {
        return authenticationRepository.existsByTokenAndStatus(token, Status.ACTIVE);
    }

    public TokenPayLoadDetails getAdminTokenPayLoadDetails(HttpServletRequest httpRequest) {
        TokenPayLoadDetails tokenPayLoadDetails = getTokenPayLoadDetails(httpRequest);

        // is admin token
        if (!tokenPayLoadDetails.getTypeOfUser().toLowerCase().equals(UserType.ADMIN.toString().toLowerCase())) {
            throw new ForbiddenException("Not Expected User");
        }

        return tokenPayLoadDetails;
    }

    public TokenPayLoadDetails getAdminOrClientTokenPayLoadDetails(HttpServletRequest httpRequest) {
        TokenPayLoadDetails tokenPayLoadDetails = getTokenPayLoadDetails(httpRequest);

        // is admin token
        if (!(tokenPayLoadDetails.getTypeOfUser().toLowerCase().equals(UserType.ADMIN.toString().toLowerCase())
                || tokenPayLoadDetails.getTypeOfUser().toLowerCase().equals(UserType.CLIENT.toString().toLowerCase()))) {
            throw new ForbiddenException("Not Expected User");
        }

        return tokenPayLoadDetails;
    }
    
    
    public TokenPayLoadDetails getClientOrAdminOrQualityAssuranceToken(HttpServletRequest httpRequest) {
        TokenPayLoadDetails tokenPayLoadDetails = getTokenPayLoadDetails(httpRequest);
        
// is admin token
        if (!(tokenPayLoadDetails.getTypeOfUser().toLowerCase().equals(UserType.ADMIN.toString().toLowerCase())
                || tokenPayLoadDetails.getTypeOfUser().toLowerCase().equals(UserType.CLIENT.toString().toLowerCase())
                || tokenPayLoadDetails.getTypeOfUser().toLowerCase().equals(UserType.QUALITY_ASSURANCE.toString().toLowerCase()))) {
            throw new ForbiddenException("Not Expected User");
        }
        
        return tokenPayLoadDetails;
    }
    
    public boolean isClient(HttpServletRequest httpRequest) {
        TokenPayLoadDetails tokenPayLoadDetails = getTokenPayLoadDetails(httpRequest);

        if (tokenPayLoadDetails.getTypeOfUser().toLowerCase().equals(UserType.CLIENT.toString().toLowerCase())) {
            return true;
        }
        return false;
    }

    public QualityAssurance getQualityAssuranceDetails(String qualityAssuranceRefNo) {
        logger.info("Checking client details with qualityAssuranceId : {}", qualityAssuranceRefNo);
        Optional<QualityAssurance> qualityAssuranceO = qualityAssuranceRepository.findByQualityAssuranceRefNo(qualityAssuranceRefNo);
        if (!qualityAssuranceO.isPresent()) {
            logger.info(Constants.ACTIVE_QUALITY_ASSURANCE_NOT_FOUND);
            throw new ResourceNotFoundException(Constants.ACTIVE_QUALITY_ASSURANCE_NOT_FOUND);
        }
        logger.info("QualityAssurance details present with Id : {}", qualityAssuranceRefNo);
        return qualityAssuranceO.get();
    }

    public QualityAssuranceCredentials getQualityAssuranceCredentials(QualityAssurance qualityAssurance) {
        Optional<QualityAssuranceCredentials> qacO = qualityAssuranceCredentialsRepository.findByQualityAssuranceId(qualityAssurance.getId());
        QualityAssuranceCredentials qac = qacO.get();
        if (qac.getQualityAssuranceId() == null) {
            logger.info(ErrorMessages.QUALITY_ASSURANCE_NOT_FOUND);
            throw new ResourceNotFoundException(ErrorMessages.QUALITY_ASSURANCE_NOT_FOUND);
        }
        return qac;
    }

    public TokenPayLoadDetails getAdminToken(HttpServletRequest request) {
        logger.info("Getting token payload details from HttpServlet request ");
        TokenPayLoadDetails tokenPayLoadDetails = getTokenPayLoadDetails(request);
        if (!tokenPayLoadDetails.getTypeOfUser().equals(UserType.ADMIN.toString())) {
            throw new BadRequestException("You dont have valid access");
        }

        return tokenPayLoadDetails;
    }

    public boolean isAdmin(TokenPayLoadDetails details) {

        if (details.getTypeOfUser() != null && details.getTypeOfUser().equalsIgnoreCase(Constants.ADMIN)) {
            return true;
        }

        return false;
    }

    public TokenPayLoadDetails getQualityAssuranceToken(HttpServletRequest httpRequest) {

        // is qa token
        TokenPayLoadDetails tokenPayLoadDetails = getTokenPayLoadDetails(httpRequest);
        if (!tokenPayLoadDetails.getTypeOfUser().toLowerCase().equals(UserType.QUALITY_ASSURANCE.toString().toLowerCase())) {
            throw new ForbiddenException("Not Expected User");
        }

        return tokenPayLoadDetails;
    }
}
