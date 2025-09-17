package com.wavelabs.sb.model;

public class DeleteFeatureTemplateModel {

    private String templateId;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public String getTemplateId() {
	return templateId;
    }

    public void setTemplateId(String templateId) {
	this.templateId = templateId;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
