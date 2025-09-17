package com.wavelabs.sb.request;

public class ActionButtonRequest {

    private String action;

    private String componentId;

    private String buttonName;

    private String comment;

    private String moduleId;

    private String subModuleId;

    private String workflowId;

    public String getAction() {
	return action;
    }

    public void setAction(String action) {
	this.action = action;
    }

    public String getComponentId() {
	return componentId;
    }

    public void setComponentId(String componentId) {
	this.componentId = componentId;
    }

    public String getButtonName() {
	return buttonName;
    }

    public void setButtonName(String buttonName) {
	this.buttonName = buttonName;
    }

    public String getComment() {
	return comment;
    }

    public void setComment(String comment) {
	this.comment = comment;
    }

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public String getSubModuleId() {
	return subModuleId;
    }

    public void setSubModuleId(String subModuleId) {
	this.subModuleId = subModuleId;
    }

    public String getWorkflowId() {
	return workflowId;
    }

    public void setWorkflowId(String workflowId) {
	this.workflowId = workflowId;
    }

}
