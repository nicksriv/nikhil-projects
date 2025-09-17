package com.wavelabs.sb.services;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.AdminCredentials;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.documents.AuthenticationAuditingDetails;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ClientsCredentials;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.AuthenticationMapper;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repository.AdminDetailsRepository;
import com.wavelabs.sb.repository.AuthenticationRepository;
import com.wavelabs.sb.repository.ClientOnboardingRepository;
import com.wavelabs.sb.repository.UserOnboardingRepository;

@Service
public class AuthenticationService {

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

    public void saveAuthenticationAuditingDetails(String token, String username, String typeOfUser, String ipAddress,
	    String userAgent) {
	logger.info("Saving Authentication aduit details for userName : {}", username);
	AuthenticationAuditingDetails response = AuthenticationMapper.toEntity(token, username, typeOfUser, ipAddress,
		userAgent);
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
		tokenPayLoadDetails= (TokenPayLoadDetails) httpRequest.getAttribute("tokenPayLoadDetails");
	}
	return tokenPayLoadDetails;

    }

    public ClientOnboardingDetails getClientDetails(String clientId) {
	logger.info("Checking client details with clientId : {}", clientId);
	Optional<ClientOnboardingDetails> clientOpt = clientOnboardingRepository
		.findByClientIdAndStatusAndDeleted(clientId, Status.ACTIVE, false);
	if (!clientOpt.isPresent()) {
	    logger.info(Constants.ACTIVE_CLIENT_NOT_FOUND);
	    throw new ResourceNotFoundException(Constants.ACTIVE_CLIENT_NOT_FOUND);
	}
	logger.info("Client details present with clientId : {}", clientId);
	return clientOpt.get();
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
}
