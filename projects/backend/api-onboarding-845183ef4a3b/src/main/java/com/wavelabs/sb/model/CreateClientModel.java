package com.wavelabs.sb.model;

import com.wavelabs.sb.request.ClientOnboardingRequest;

public class CreateClientModel {

    private ClientOnboardingRequest clientOnboardingRequest;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public ClientOnboardingRequest getClientOnboardingRequest() {
	return clientOnboardingRequest;
    }

    public void setClientOnboardingRequest(ClientOnboardingRequest clientOnboardingRequest) {
	this.clientOnboardingRequest = clientOnboardingRequest;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
