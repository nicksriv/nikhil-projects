package com.wavelabs.sb.model;

import com.wavelabs.sb.request.ReportsRequest;

public class ReportsRequestModel {

    private ReportsRequest request;
    private TokenPayLoadDetails details;

    public ReportsRequest getRequest() {
	return request;
    }

    public void setRequest(ReportsRequest request) {
	this.request = request;
    }

    public TokenPayLoadDetails getDetails() {
	return details;
    }

    public void setDetails(TokenPayLoadDetails details) {
	this.details = details;
    }

}
