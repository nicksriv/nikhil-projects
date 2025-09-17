package com.wavelabs.sb.model;

import com.wavelabs.sb.request.AddSubmoduleRequest;

public class CreateSubModuleModel {

    private AddSubmoduleRequest request;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public AddSubmoduleRequest getRequest() {
	return request;
    }

    public void setRequest(AddSubmoduleRequest request) {
	this.request = request;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
