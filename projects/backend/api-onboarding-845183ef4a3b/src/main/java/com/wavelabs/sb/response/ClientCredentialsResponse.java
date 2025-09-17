package com.wavelabs.sb.response;

import java.time.Instant;

public class ClientCredentialsResponse {

    private String clientId;
    private Instant joiningDate;
    private String clientName;
    private String password;

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getClientName() {
	return clientName;
    }

    public void setClientName(String clientName) {
	this.clientName = clientName;
    }

    public String getPassword() {
	return password;
    }

    public void setPassword(String password) {
	this.password = password;
    }

    public Instant getJoiningDate() {
	return joiningDate;
    }

    public void setJoiningDate(Instant joiningDate) {
	this.joiningDate = joiningDate;
    }

}
