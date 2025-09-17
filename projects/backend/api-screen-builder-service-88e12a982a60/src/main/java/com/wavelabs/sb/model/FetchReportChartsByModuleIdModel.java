package com.wavelabs.sb.model;

public class FetchReportChartsByModuleIdModel {

    private String moduleId;
    private String sortOrder;
    private TokenPayLoadDetails details;

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public TokenPayLoadDetails getDetails() {
	return details;
    }

    public void setDetails(TokenPayLoadDetails details) {
	this.details = details;
    }

    public String getSortOrder() {
	return sortOrder;
    }

    public void setSortOrder(String sortOrder) {
	this.sortOrder = sortOrder;
    }

}
