package com.wavelabs.sb.model;

import com.wavelabs.sb.request.ModuleCloneRequest;

public class CloneModulesModel {

    private ModuleCloneRequest request;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public ModuleCloneRequest getRequest() {
	return request;
    }

    public void setRequest(ModuleCloneRequest request) {
	this.request = request;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
