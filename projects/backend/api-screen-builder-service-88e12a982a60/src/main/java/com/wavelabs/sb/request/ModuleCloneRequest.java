package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;

public class ModuleCloneRequest {

    @NotBlank(message = "Parent Module Id is mandatory")
    private String parentModuleId;

    @NotBlank(message = "Module Name is mandatory")
    private String moduleName;

    private String moduleIcon;

    @NotBlank(message = "Client ID is mandatory")
    private String clientId;

    @NotBlank(message = "Submodule Id is mandatory")
    private String submoduleId;

    public String getParentModuleId() {
	return parentModuleId;
    }

    public void setParentModuleId(String parentModuleId) {
	this.parentModuleId = parentModuleId;
    }

    public String getModuleName() {
	return moduleName;
    }

    public void setModuleName(String moduleName) {
	this.moduleName = moduleName;
    }

    public String getModuleIcon() {
	return moduleIcon;
    }

    public void setModuleIcon(String moduleIcon) {
	this.moduleIcon = moduleIcon;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getSubmoduleId() {
	return submoduleId;
    }

    public void setSubmoduleId(String submoduleId) {
	this.submoduleId = submoduleId;
    }

}
