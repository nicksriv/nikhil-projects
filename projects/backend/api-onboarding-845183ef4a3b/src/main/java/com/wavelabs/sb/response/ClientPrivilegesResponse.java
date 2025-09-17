package com.wavelabs.sb.response;

public class ClientPrivilegesResponse {

    private String moduleId;
    private boolean view;
    private boolean editTheme;
    private boolean editWorkFlow;

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public boolean isView() {
	return view;
    }

    public void setView(boolean view) {
	this.view = view;
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
