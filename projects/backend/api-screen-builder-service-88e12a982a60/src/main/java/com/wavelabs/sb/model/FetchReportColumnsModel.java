package com.wavelabs.sb.model;

public class FetchReportColumnsModel {

    private String reportId;
    private TokenPayLoadDetails details;

    public String getReportId() {
	return reportId;
    }

    public void setReportId(String reportId) {
	this.reportId = reportId;
    }

    public TokenPayLoadDetails getDetails() {
	return details;
    }

    public void setDetails(TokenPayLoadDetails details) {
	this.details = details;
    }

    public FetchReportColumnsModel(String reportId) {
	this.reportId = reportId;
    }

    public FetchReportColumnsModel() {

    }
}
