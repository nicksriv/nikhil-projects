package com.wavelabs.sb.model;

import com.wavelabs.sb.request.FormRequest;

public class DeleteFormDataModel {

    private FormRequest request;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public FormRequest getRequest() {
	return request;
    }

    public void setRequest(FormRequest request) {
	this.request = request;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
