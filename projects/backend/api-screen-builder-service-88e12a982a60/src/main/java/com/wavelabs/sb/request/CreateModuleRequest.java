package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;

public class CreateModuleRequest {

    @NotBlank(message = "clientId is required")
    private String clientId;
    private String icon;
    
    @NotBlank(message = "Module Name is mandatory")
    private String name;

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
    public void setName(String name) {
    	this.name = name.trim();
    }
    public String getName() {
	return name;
    }

   
    }

