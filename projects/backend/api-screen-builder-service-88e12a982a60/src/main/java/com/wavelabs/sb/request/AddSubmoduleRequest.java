package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class AddSubmoduleRequest {

    @JsonIgnore
    private String moduleId;
    
    @NotBlank(message = "Submodule Name is mandatory")
    private String name;
    @NotBlank(message = "clientId is required")
    private String clientId;
    private String icon;

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name.trim();
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getIcon() {
	return icon;
    }

    public void setIcon(String icon) {
	this.icon = icon;
    }

}
