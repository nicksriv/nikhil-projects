package com.brandpulse.job.security;

import com.brandpulse.job.common.enums.Status;
import com.brandpulse.job.common.enums.UserType;
import com.brandpulse.job.common.service.LoggerService;
import com.brandpulse.job.exception.ApiException;
import com.brandpulse.job.exception.AuthException;
import com.brandpulse.job.exception.ErrorCodeConstant;
import com.brandpulse.job.exception.ServiceException;
import com.brandpulse.job.util.CommonUtil;
import com.brandpulse.job.util.JsonUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.http.HttpServletRequest;
import java.time.OffsetDateTime;
import java.util.Date;
import java.util.Optional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Value("${security.jwt.authUrl}")
    private String authUrl;

    @Value("${security.jwt.header}")
    private String header;

    @Value("${security.jwt.prefix}")
    private String prefix;

    @Value("${security.jwt.secret}")
    private String secret;

    @Value("${security.jwt.expiration}")
    private Long expiration;

    @Autowired
    AuthenticationRepository authenticationRepository;

    @Autowired
    LoggerService loggerService;

    // userName - clientid, freelancerref, vendorid, vendorUserId
    public String generateJwt(String userId, UserType userType, String userName, String firstName, String lastName, String ipAddress, String userAgent) {

        
        final Date createdDate = new Date();
        final Date expirationDate = new Date(createdDate.getTime() + expiration * 1000);
        String logId = logLoginDetails(userId, userType.toString(), userName, ipAddress, userAgent);

        Token token = new Token();
        token.setSub(userId);

        token.setLogId(logId);
        token.setUserId(userId);
        token.setUserType(userType.toString());
        token.setUserRef(userName);
        token.setFirstName(firstName);
        token.setLastName(lastName);

        return Jwts.builder()
                .setSubject(token.getSub())
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .claim("logId", logId)
                .claim("userId", token.getUserId())
                .claim("userType", token.getUserType())
                .claim("userRef", token.getUserRef())
                .claim("firstName", token.getFirstName())
                .claim("lastName", token.getLastName())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();

    }

    public Token verifyJwt(String token) {
        Token user = getUserDetailFromToken(token);
        Claims claims = Jwts.parser()
                .setSigningKey(secret.getBytes())
                .parseClaimsJws(token)
                .getBody();

        Token tokenBody = new Token();
        tokenBody.setSub(claims.getSubject());
        tokenBody.setLogId(getStringValue(claims.get("logId")));
        tokenBody.setUserId(getStringValue(claims.get("userId")));
        tokenBody.setUserType(getStringValue(claims.get("userType")));
        tokenBody.setUserRef(getStringValue(claims.get("userRef")));
        tokenBody.setFirstName(getStringValue(claims.get("firstName")));
        tokenBody.setLastName(getStringValue(claims.get("lastName")));

        if (claims.get("adminId") != null) {
            tokenBody.setUserId(getStringValue(claims.get("id")));
            tokenBody.setUserType(UserType.ADMIN.toString());
            tokenBody.setUserRef(getStringValue(claims.get("adminId")));
        } else if (claims.get("clientId") != null) {
            tokenBody.setUserId(getStringValue(claims.get("id")));
            tokenBody.setUserType(UserType.CLIENT.toString());
            tokenBody.setUserRef(getStringValue(claims.get("clientId")));
        }  

        if (tokenBody.getSub() == null) {
            tokenBody.setSub(tokenBody.getUserId());
        }

        if (claims.get("typeOfUser") != null && UserType.QUALITY_ASSURANCE.toString().equals(claims.get("typeOfUser"))) {
            tokenBody.setUserId(getStringValue(claims.get("id")));
            tokenBody.setUserType(UserType.QUALITY_ASSURANCE.toString());
            tokenBody.setUserRef(null);
        }
        // validate user from db
        validateLoginDetails(user.getLogId(), token);

        return tokenBody;
    }

    public Token verifyJwt(HttpServletRequest request) {
        // 1. get the authentication header. Tokens are supposed to be passed in the authentication header
        header = request.getHeader(getHeader());
        // 2. validate the header and check the prefix
        if (header == null || !header.startsWith(getPrefix())) {
            throw new ApiException("invalid header");
        }

        // 3. Get the token
        String token = header.replace(getPrefix(), "");

        return verifyJwt(token);
    }

    public String getToken(HttpServletRequest request) {
        String token;
        // 1. get the authentication header. Tokens are supposed to be passed in the authentication header
        header = request.getHeader(getHeader());
        // 2. validate the header and check the prefix
        if (header == null || !header.startsWith(getPrefix())) {
            throw new ApiException("invalid header");
        }

        // 3. Get the token
        token = header.replace(getPrefix(), "");

        return token;
    }

    public String logLoginDetails(String userId, String userType, String userName, String ipAddress, String userAgent) {
        AuthenticationAuditingDetails response = new AuthenticationAuditingDetails();
        response.setUserName(userName);
        response.setLoginId(userId);
        response.setTypeOfUser(userType);
        response.setIpAddress(ipAddress);
        response.setUserAgent(userAgent);
        response.setLoginAt(Instant.now());
        response.setStatus(Status.ACTIVE);
        response.setLastAccessed(Instant.now());
        authenticationRepository.save(response);

        return response.getId();
    }

    public void validateLoginDetails(String id, String token) {
        loggerService.info("validateLoginDetails starts");
        AuthenticationAuditingDetails response = null;
        if (id != null) {
            loggerService.info("validateLoginDetails in id " + id);
            response = authenticationRepository.findById(id).orElseThrow(() -> new AuthException());
        } else {
            loggerService.info("validateLoginDetails in token " + token);
            try {
                Optional<AuthenticationAuditingDetails> responseO = authenticationRepository.findByToken(token);
                loggerService.info("is present in in db" + responseO.isPresent());
                if (responseO.isPresent()) {
                    response = responseO.get();
                }
            } catch (Exception e) {
                loggerService.info("validateLoginDetails in error " + e.getLocalizedMessage());
                loggerService.info("validateLoginDetails in error2 " + e.getMessage());
            }
        }

        if (response != null) {
            loggerService.info("validateLoginDetails check active");
            if (response.getStatus() != Status.ACTIVE) {
                throw new AuthException();
            }
            loggerService.info("validateLoginDetails activated");

            response.setLastAccessed(Instant.now());
            authenticationRepository.save(response);
        }

    }

    public void logOutUser(String id) {
        AuthenticationAuditingDetails response = authenticationRepository.findById(id).orElseThrow(() -> new AuthException());

        if (response.getStatus() != Status.ACTIVE) {
            throw new AuthException();
        }

        response.setStatus(Status.INACTIVE);
        response.setLastAccessed(Instant.now());
        response.setLogoutAt(Instant.now());
        authenticationRepository.save(response);
    }

    public Token getUserDetailFromToken(String jwt) {
        String[] splitString = jwt.split("\\.");
        String base64EncodedBody = splitString[1];
        String body = CommonUtil.fromBase64(base64EncodedBody);
        Token token = null;
        try {
            token = (Token) JsonUtil.toObject(body, Token.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return token;
    }

    public Token getToken() {
        Token token;
        token = (Token) SecurityContextHolder.getContext().getAuthentication().getDetails();

        return token;
    }

    public Token getAdminToken() {
        Token token = getToken();

        if (!token.getUserType().equals(UserType.ADMIN.toString())) {
            throw new ServiceException(ErrorCodeConstant.J403);
        }

        return token;
    }

    public String getAdminId() {
        return getAdminToken().getUserId();
    }

    public Token getClientToken() {
        Token token = getToken();

        if (!token.getUserType().equals(UserType.CLIENT.toString())) {
            throw new ServiceException(ErrorCodeConstant.J403);
        }

        return token;
    }

    public String getClientId() {
        return getClientToken().getUserId();
    }

    public boolean isClient() {
        Token token = getToken();
        return token.getUserType().equals(UserType.CLIENT.toString());
    }

    public Token getClientOrAdminToken() {
        Token token = getToken();

        if (!(token.getUserType().equals(UserType.CLIENT.toString()) || token.getUserType().equals(UserType.ADMIN.toString()))) {
            throw new ServiceException(ErrorCodeConstant.J403);
        }

        return token;
    }

    public String getAuthUrl() {
        return authUrl;
    }

    public String getHeader() {
        return header;
    }

    public String getPrefix() {
        return prefix;
    }

    public String getSecret() {
        return secret;
    }

    public Long getExpiration() {
        return expiration;
    }

    public String getStringValue(Object d) {
        if (d == null) {
            return "";
        }

        return d.toString();
    }

    public Token getQualityAssuranceToken() {
        Token token = getToken();

        if (!token.getUserType().equals(UserType.QUALITY_ASSURANCE.toString())) {
            throw new ServiceException(ErrorCodeConstant.J403);
        }

        return token;
    }

    public Token getClientOrAdminOrQualityAssuranceToken() {
        Token token = getToken();

        if (!(token.getUserType().equals(UserType.CLIENT.toString()) || token.getUserType().equals(UserType.ADMIN.toString()) || token.getUserTypeEnum().equals(UserType.QUALITY_ASSURANCE))) {
            throw new ServiceException(ErrorCodeConstant.J403);
        }

        return token;
    }

}
