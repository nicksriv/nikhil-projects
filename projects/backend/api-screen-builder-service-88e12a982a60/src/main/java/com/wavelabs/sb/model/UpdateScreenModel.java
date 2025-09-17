package com.wavelabs.sb.model;

import com.wavelabs.sb.request.UpdateScreenRequest;

public class UpdateScreenModel {

    private UpdateScreenRequest request;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public UpdateScreenRequest getRequest() {
	return request;
    }

    public void setRequest(UpdateScreenRequest request) {
	this.request = request;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
