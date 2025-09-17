package com.wavelabs.sb.model;

import com.wavelabs.sb.request.ReportColumnRequest;

public class ReportColumnRequestModel {
    private String reportId;
    private ReportColumnRequest request;

    private TokenPayLoadDetails details;

    public String getReportId() {
	return reportId;
    }

    public void setReportId(String reportId) {
	this.reportId = reportId;
    }

    public ReportColumnRequest getRequest() {
	return request;
    }

    public void setRequest(ReportColumnRequest request) {
	this.request = request;
    }

    public TokenPayLoadDetails getDetails() {
	return details;
    }

    public void setDetails(TokenPayLoadDetails details) {
	this.details = details;
    }

}
