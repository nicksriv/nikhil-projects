package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class CreateReportRequest {

    @NotBlank(message = "Name is mandatory")
    @Pattern(message = "Name should contain alpha numeric only", regexp = "^[a-zA-Z0-9\\s]*$")
    private String name;
    @NotBlank(message = "module Id is required")
    private String parentModuleId;
    private String icon;
    @NotBlank(message = "cleint Id is required")
    private String clientId;

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getParentModuleId() {
	return parentModuleId;
    }

    public void setParentModuleId(String parentModuleId) {
	this.parentModuleId = parentModuleId;
    }

    public String getIcon() {
	return icon;
    }

    public void setIcon(String icon) {
	this.icon = icon;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

}
