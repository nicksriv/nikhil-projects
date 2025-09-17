package com.brandpulse.fv.security;


import com.brandpulse.fv.common.enums.Status;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "authentication-auditing-details")
public class AuthenticationAuditingDetails {

    private String id;
    private String userName;
    private String typeOfUser;
    private Instant loginAt;
    private Instant logoutAt;
    private Status status;
    private String token;
    private Instant lastAccessed;
    private String ipAddress;
    private String userAgent;
    private String loginId;

    public Instant getLastAccessed() {
	return lastAccessed;
    }

    public void setLastAccessed(Instant lastAccessed) {
	this.lastAccessed = lastAccessed;
    }

    public String getIpAddress() {
	return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
	this.ipAddress = ipAddress;
    }

    public String getUserAgent() {
	return userAgent;
    }

    public void setUserAgent(String userAgent) {
	this.userAgent = userAgent;
    }

    public String getToken() {
	return token;
    }

    public void setToken(String token) {
	this.token = token;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getUserName() {
	return userName;
    }

    public void setUserName(String userName) {
	this.userName = userName;
    }

    public String getTypeOfUser() {
	return typeOfUser;
    }

    public void setTypeOfUser(String typeOfUser) {
	this.typeOfUser = typeOfUser;
    }

    public Instant getLoginAt() {
	return loginAt;
    }

    public void setLoginAt(Instant loginAt) {
	this.loginAt = loginAt;
    }

    public Instant getLogoutAt() {
	return logoutAt;
    }

    public void setLogoutAt(Instant logoutAt) {
	this.logoutAt = logoutAt;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

    public String getLoginId() {
	return loginId;
    }

    public void setLoginId(String loginId) {
	this.loginId = loginId;
    }

}
