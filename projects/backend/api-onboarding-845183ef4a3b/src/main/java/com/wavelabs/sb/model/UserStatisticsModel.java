package com.wavelabs.sb.model;

public class UserStatisticsModel {

    private TokenPayLoadDetails details;
    private String clientId;

    public TokenPayLoadDetails getDetails() {
	return details;
    }

    public void setDetails(TokenPayLoadDetails details) {
	this.details = details;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

}
