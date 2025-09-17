package com.wavelabs.sb.model;

import com.wavelabs.sb.request.CreateReportRequest;

public class CreateReportModel {

    private CreateReportRequest request;
    private TokenPayLoadDetails details;

    public CreateReportRequest getRequest() {
	return request;
    }

    public void setRequest(CreateReportRequest request) {
	this.request = request;
    }

    public TokenPayLoadDetails getDetails() {
	return details;
    }

    public void setDetails(TokenPayLoadDetails details) {
	this.details = details;
    }

}
