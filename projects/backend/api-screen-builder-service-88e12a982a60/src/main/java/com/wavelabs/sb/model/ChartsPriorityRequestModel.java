package com.wavelabs.sb.model;

import java.util.List;

import com.wavelabs.sb.request.ChartsPriorityRequest;

public class ChartsPriorityRequestModel {

    private TokenPayLoadDetails details;
    private List<ChartsPriorityRequest> request;
    private String reportId;

    public TokenPayLoadDetails getDetails() {
	return details;
    }

    public void setDetails(TokenPayLoadDetails details) {
	this.details = details;
    }

    public List<ChartsPriorityRequest> getRequest() {
	return request;
    }

    public void setRequest(List<ChartsPriorityRequest> request) {
	this.request = request;
    }

    public String getReportId() {
	return reportId;
    }

    public void setReportId(String reportId) {
	this.reportId = reportId;
    }

}
