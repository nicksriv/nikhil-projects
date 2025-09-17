package com.wavelabs.sb.model;

import com.wavelabs.sb.request.CreateModuleRequest;

public class CreateModuleAndSubmoduleModel {

    private CreateModuleRequest request;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public CreateModuleRequest getRequest() {
	return request;
    }

    public void setRequest(CreateModuleRequest request) {
	this.request = request;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
