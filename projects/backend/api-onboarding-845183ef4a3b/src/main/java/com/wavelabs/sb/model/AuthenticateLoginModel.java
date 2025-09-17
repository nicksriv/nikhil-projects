package com.wavelabs.sb.model;

import com.wavelabs.sb.request.AuthenticateClientRequest;
import com.wavelabs.sb.request.AuthenticateUserRequest;

public class AuthenticateLoginModel {

    private String browser;
    private String ip;
    private AuthenticateClientRequest clientRequest;
    private AuthenticateUserRequest userRequest;

    public String getBrowser() {
	return browser;
    }

    public void setBrowser(String browser) {
	this.browser = browser;
    }

    public String getIp() {
	return ip;
    }

    public void setIp(String ip) {
	this.ip = ip;
    }

    public AuthenticateClientRequest getClientRequest() {
	return clientRequest;
    }

    public void setClientRequest(AuthenticateClientRequest clientRequest) {
	this.clientRequest = clientRequest;
    }

    public AuthenticateUserRequest getUserRequest() {
	return userRequest;
    }

    public void setUserRequest(AuthenticateUserRequest userRequest) {
	this.userRequest = userRequest;
    }

}
