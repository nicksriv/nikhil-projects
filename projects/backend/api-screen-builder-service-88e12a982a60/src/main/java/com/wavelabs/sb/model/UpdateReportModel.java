package com.wavelabs.sb.model;

import com.wavelabs.sb.request.UpdateReportRequest;

public class UpdateReportModel {

    private UpdateReportRequest request;
    private TokenPayLoadDetails details;

    public UpdateReportRequest getRequest() {
	return request;
    }

    public void setRequest(UpdateReportRequest request) {
	this.request = request;
    }

    public TokenPayLoadDetails getDetails() {
	return details;
    }

    public void setDetails(TokenPayLoadDetails details) {
	this.details = details;
    }

}
