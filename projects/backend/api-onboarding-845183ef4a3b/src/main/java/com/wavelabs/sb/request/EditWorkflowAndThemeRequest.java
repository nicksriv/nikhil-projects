package com.wavelabs.sb.request;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class EditWorkflowAndThemeRequest {

    private boolean editTheme;
    private boolean editWorkFlow;
    @JsonIgnore
    private String clientId;

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public boolean isEditTheme() {
	return editTheme;
    }

    public void setEditTheme(boolean editTheme) {
	this.editTheme = editTheme;
    }

    public boolean isEditWorkFlow() {
	return editWorkFlow;
    }

    public void setEditWorkFlow(boolean editWorkFlow) {
	this.editWorkFlow = editWorkFlow;
    }

}
