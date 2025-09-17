package com.wavelabs.sb.model;

import com.wavelabs.sb.request.SaveFeatureTemplateRequest;

public class SaveFeatureTemplateModel {

    private SaveFeatureTemplateRequest request;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public SaveFeatureTemplateRequest getRequest() {
	return request;
    }

    public void setRequest(SaveFeatureTemplateRequest request) {
	this.request = request;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
