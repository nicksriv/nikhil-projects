package com.wavelabs.sb.request;

public class ClientRolesRequest {

    private boolean editTheme;
    private boolean editWorkFlow;

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
