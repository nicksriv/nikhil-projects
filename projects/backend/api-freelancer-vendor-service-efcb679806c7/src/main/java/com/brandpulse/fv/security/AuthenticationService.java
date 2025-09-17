package com.brandpulse.fv.security;

import com.brandpulse.fv.common.enums.Status;
import com.brandpulse.fv.common.enums.UserType;
import com.brandpulse.fv.exception.ApiException;
import com.brandpulse.fv.exception.AuthException;
import com.brandpulse.fv.exception.ErrorCodeConstant;
import com.brandpulse.fv.exception.ServiceException;
import com.brandpulse.fv.util.CommonUtil;
import com.brandpulse.fv.util.JsonUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
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

    // userName - clientid, freelancerref, vendorid, vendorUserId
    public String generateJwt(String userId, String userSubId, UserType userType, String userName, String firstName, String lastName, String ipAddress, String userAgent) {

        final Date createdDate = new Date();
        final Date expirationDate = new Date(createdDate.getTime() + expiration * 1000);

        String logId = logLoginDetails(userId, userType.toString(), userName, ipAddress, userAgent);
        Token token = new Token();
        token.setSub(userId);

        token.setLogId(logId);
        token.setUserId(userId);
        token.setUserSubId(userSubId);
        token.setUserType(userType.toString());
        token.setUserRef(userName);
        token.setFirstName(firstName);
        token.setLastName(lastName);

        String jwt = Jwts.builder()
                .setSubject(token.getSub())
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .claim("logId", logId)
                .claim("userId", token.getUserId())
                .claim("userSubId", token.getUserSubId())
                .claim("typeOfUser", token.getUserType())
                .claim("userRef", token.getUserRef())
                .claim("firstName", token.getFirstName())
                .claim("lastName", token.getLastName())
                .signWith(SignatureAlgorithm.HS512, secret.getBytes())
                .compact();

        saveTokenInAuditDetails(logId, jwt);

        return jwt;

    }

    public Token verifyJwt(String token) {
        Token user = getUserDetailFromToken(token);
        Claims claims = Jwts.parser()
                .setSigningKey(secret.getBytes())
                .parseClaimsJws(token)
                .getBody();

        String userRef = "";
        if (claims.get("userRef") != null) {
            userRef = claims.get("userRef").toString();
        }

        Token tokenBody = new Token();
        tokenBody.setSub(claims.getSubject());
        tokenBody.setLogId(claims.get("logId").toString());
        tokenBody.setUserId(claims.get("userId").toString());
        tokenBody.setUserSubId(claims.get("userSubId").toString());
        tokenBody.setUserType(claims.get("typeOfUser").toString());
        tokenBody.setUserRef(userRef);
        tokenBody.setFirstName(claims.get("firstName").toString());
        tokenBody.setLastName(claims.get("lastName").toString());

        // validate user from db
        validateLoginDetails(user.getLogId());

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
        // 1. get the authentication header. Tokens are supposed to be passed in the authentication header
        header = request.getHeader(getHeader());
        // 2. validate the header and check the prefix
        if (header == null || !header.startsWith(getPrefix())) {
            throw new ApiException("invalid header");
        }

        // 3. Get the token
        String token = header.replace(getPrefix(), "");

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
        response.setToken("");

        authenticationRepository.save(response);

        return response.getId();
    }

    public void saveTokenInAuditDetails(String id, String jwt) {
        AuthenticationAuditingDetails response = authenticationRepository.findById(id).orElseThrow(() -> new AuthException());
        response.setToken(jwt);

        authenticationRepository.save(response);
    }

    public void validateLoginDetails(String id) {
        AuthenticationAuditingDetails response = authenticationRepository.findById(id).orElseThrow(() -> new AuthException());

        if (response.getStatus() != Status.ACTIVE) {
            throw new AuthException();
        }

        response.setLastAccessed(Instant.now());
        authenticationRepository.save(response);

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
        
        Token token = (Token) SecurityContextHolder.getContext().getAuthentication().getDetails();

        return token;
    }

    public Token getFreelancerToken() {
        Token token = (Token) SecurityContextHolder.getContext().getAuthentication().getDetails();

        if (!token.getUserType().equals(UserType.FREELANCER.toString())) {
            throw new ServiceException(ErrorCodeConstant.FV403);
        }

        return token;
    }

    public String getFreelancerId() {
        return getFreelancerToken().getUserId();
    }

    public Token getVendorToken() {
        Token token = (Token) SecurityContextHolder.getContext().getAuthentication().getDetails();

        if (!token.getUserType().equals(UserType.VENDOR.toString())) {
            throw new ServiceException(ErrorCodeConstant.FV403);
        }

        return token;
    }

    public String getVendorId() {
        return getVendorToken().getUserId();
    }

    public Token getFreelancerOrVendorToken() {
        Token token = (Token) SecurityContextHolder.getContext().getAuthentication().getDetails();

        if (!token.getUserType().equals(UserType.FREELANCER.toString()) && !token.getUserType().equals(UserType.VENDOR.toString())) {
            throw new ServiceException(ErrorCodeConstant.FV403);
        }

        return token;
    }

    public Token getFreelancerOrVendorOrVendorUserToken() {
        Token token = (Token) SecurityContextHolder.getContext().getAuthentication().getDetails();

        boolean fvvu = !token.getUserType().equals(UserType.FREELANCER.toString()) && !token.getUserType().equals(UserType.VENDOR.toString()) && !(token.getUserType().equals(UserType.VENDOR_USER.toString()));

        if (fvvu) {
            throw new ServiceException(ErrorCodeConstant.FV403);
        }

        return token;
    }

    public Token getVendorOrVendorUserToken(String userId) {
        Token token = (Token) SecurityContextHolder.getContext().getAuthentication().getDetails();

        if (!(token.getUserType().equals(UserType.VENDOR_USER.toString()) && token.getUserSubId().equals(userId)) && !token.getUserType().equals(UserType.VENDOR.toString())) {
            throw new ServiceException(ErrorCodeConstant.FV403);
        }

        return token;
    }

    public Token getVendorUserToken() {
        Token token = (Token) SecurityContextHolder.getContext().getAuthentication().getDetails();

        if (!token.getUserType().equals(UserType.VENDOR_USER.toString())) {
            throw new ServiceException(ErrorCodeConstant.FV403);
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
}
