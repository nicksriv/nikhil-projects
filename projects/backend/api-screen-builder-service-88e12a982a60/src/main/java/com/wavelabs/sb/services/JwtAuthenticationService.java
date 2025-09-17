package com.wavelabs.sb.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.AuthenticationAuditingDetails;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.AuthTokenMissingException;
import com.wavelabs.sb.exceptions.UnauthorizedException;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repository.AuthenticationRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtAuthenticationService {

    // @Value("${app.onboarding.secret.key}") and expiry time need to add in
    // propertyfile
    private String secretKey = "secretKey";

    @Autowired
    AuthenticationRepository authenticationRepository;

    @Value("${web.app.session.minutes}")
    public Long webAppSession;

    @Value("${mobile.app.session.days}")
    public Long mobileAppSession;

    private Logger logger = LoggerFactory.getLogger(JwtAuthenticationService.class);

    public String generateToken(String adminId, String clientId, String userId, String typeOfUser, String id) {

	logger.info("Inside Generate token method..");
	String token = Jwts.builder().setSubject(clientId)
		.setClaims(getClaims(adminId, clientId, userId, typeOfUser, id))
		.setIssuedAt(new Date(System.currentTimeMillis()))
		.signWith(SignatureAlgorithm.HS512, secretKey.getBytes()).compact();
	logger.info("Token generated...");
	return token;

    }

    private Map<String, Object> getClaims(String adminId, String clientId, String userId, String typeOfUser,
	    String id) {
	logger.info("Mapping jwtRequest to token creation content...");
	Map<String, Object> claims = new HashMap<>();
	claims.put("clientId", clientId);
	claims.put("userId", userId);
	claims.put("typeOfUser", typeOfUser);
	claims.put("id", id);
	if (typeOfUser.equalsIgnoreCase(Constants.ADMIN)) {
	    claims.put("adminId", adminId);
	}
	return claims;
    }

    public TokenPayLoadDetails getUserNameFromToken(String jwt) {
	logger.info("Fetching payload from token..");
	String[] split_string = jwt.split("\\.");
	String base64EncodedBody = split_string[1];
	org.apache.commons.codec.binary.Base64 base64Url = new Base64();
	String body = new String(base64Url.decode(base64EncodedBody));
	ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	TokenPayLoadDetails tokenPayLoadDetails = null;
	try {
	    tokenPayLoadDetails = mapper.readValue(body, TokenPayLoadDetails.class);
            
            
            if (tokenPayLoadDetails.getTypeOfUser() != null && (tokenPayLoadDetails.getTypeOfUser().equalsIgnoreCase(Constants.FREELANCER)
                    || tokenPayLoadDetails.getTypeOfUser().equalsIgnoreCase(Constants.VENDOR)
                    || tokenPayLoadDetails.getTypeOfUser().equalsIgnoreCase(Constants.VENDOR_USER))) {
                tokenPayLoadDetails.setId(tokenPayLoadDetails.getUserId());
                tokenPayLoadDetails.setUserId(tokenPayLoadDetails.getUserRef());
            }
	} catch (JsonProcessingException e) {
	    logger.info("Error while fetching payload from token..");
	    throw new AuthTokenMissingException(Constants.INVALID_TOKEN);
	}
	logger.info("Fetching payload from token successfull");
	return tokenPayLoadDetails;
    }

    public boolean validateToken(String jwt) {
	if (jwt != null && jwt.startsWith("Bearer ")) {
	    jwt = jwt.substring(7);
	}
	return (isTokenExpired(jwt));
    }

    private boolean isTokenExpired(String jwt) {
	logger.info("Checking token Expiry ");
	Instant now = Instant.now();
	logger.info("Fetching Authentication Auditing Details by token and status");
	Optional<AuthenticationAuditingDetails> auditingDetailsOpt = authenticationRepository.findByTokenAndStatus(jwt,
		Status.ACTIVE.name());
	if (auditingDetailsOpt.isPresent()) {
	    logger.info("Authentication Auditing Details record present");
	    AuthenticationAuditingDetails auditingDetailsObj = auditingDetailsOpt.get();
	    logger.info("Checking current and lastAccessed time ");
	    boolean isExpired = false;
	    TokenPayLoadDetails tokenPayLoadDetails = getUserNameFromToken(jwt);
	    if ((Constants.USER.equalsIgnoreCase(auditingDetailsObj.getTypeOfUser())
                    || Constants.FREELANCER.equalsIgnoreCase(auditingDetailsObj.getTypeOfUser())
                    || Constants.VENDOR.equalsIgnoreCase(auditingDetailsObj.getTypeOfUser())
                    || Constants.VENDOR_USER.equalsIgnoreCase(auditingDetailsObj.getTypeOfUser()))
		    && !Constants.ADMIN.equalsIgnoreCase(tokenPayLoadDetails.getUserRole())) {
		isExpired = now
			.isAfter(auditingDetailsOpt.get().getLastAccessed().plus(mobileAppSession, ChronoUnit.DAYS));
	    } else if (!Constants.USER.equalsIgnoreCase(auditingDetailsObj.getTypeOfUser())) {
		isExpired = now
			.isAfter(auditingDetailsOpt.get().getLastAccessed().plus(webAppSession, ChronoUnit.MINUTES));
	    }
	    if (isExpired) {
		logger.info("Token Expired...");
		auditingDetailsObj.setStatus(Status.INACTIVE);
		authenticationRepository.save(auditingDetailsObj);
		throw new UnauthorizedException(Constants.UNAUTHORIZED);
	    }
	    logger.info("valid token changing last accessed time to current time");
	    auditingDetailsObj.setLastAccessed(Instant.now());
	    authenticationRepository.save(auditingDetailsObj);
	    return true;
	}
	logger.info("Token Expired...");
	return false;
    }

}
