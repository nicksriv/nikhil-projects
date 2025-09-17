package com.wavelabs.sb.model;

import com.wavelabs.sb.request.EditWorkflowAndThemeRequest;

public class UpdatePrivilegesModel {

    private EditWorkflowAndThemeRequest EditWorkflowAndThemeRequest;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public EditWorkflowAndThemeRequest getEditWorkflowAndThemeRequest() {
	return EditWorkflowAndThemeRequest;
    }

    public void setEditWorkflowAndThemeRequest(EditWorkflowAndThemeRequest editWorkflowAndThemeRequest) {
	EditWorkflowAndThemeRequest = editWorkflowAndThemeRequest;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
