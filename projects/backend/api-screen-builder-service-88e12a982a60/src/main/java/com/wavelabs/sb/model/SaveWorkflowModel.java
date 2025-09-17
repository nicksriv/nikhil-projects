package com.wavelabs.sb.model;

import com.wavelabs.sb.request.SaveWorkflowRequest;

public class SaveWorkflowModel {

    private SaveWorkflowRequest request;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public SaveWorkflowRequest getRequest() {
	return request;
    }

    public void setRequest(SaveWorkflowRequest request) {
	this.request = request;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
