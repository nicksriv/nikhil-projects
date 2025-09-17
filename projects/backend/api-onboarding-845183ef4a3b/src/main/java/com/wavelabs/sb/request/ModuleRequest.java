package com.wavelabs.sb.request;

import javax.validation.constraints.NotNull;

public class ModuleRequest {

    @NotNull(message = "module name is required")
    private String name;

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

}
