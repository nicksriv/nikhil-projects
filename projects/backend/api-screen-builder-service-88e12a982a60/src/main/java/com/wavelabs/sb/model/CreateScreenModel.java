package com.wavelabs.sb.model;

import com.wavelabs.sb.request.CreateScreenRequest;

public class CreateScreenModel {

    private CreateScreenRequest request;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public CreateScreenRequest getRequest() {
	return request;
    }

    public void setRequest(CreateScreenRequest request) {
	this.request = request;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
