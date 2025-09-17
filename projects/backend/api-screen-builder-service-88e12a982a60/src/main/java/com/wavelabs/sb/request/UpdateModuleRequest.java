package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class UpdateModuleRequest {

    @JsonIgnore
    private String moduleId;

    @NotBlank(message = "Module Name is mandatory")
    private String name;

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name.trim();
    }
}
