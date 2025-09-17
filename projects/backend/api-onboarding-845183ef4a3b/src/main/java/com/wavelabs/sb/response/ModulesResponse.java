package com.wavelabs.sb.response;

import com.wavelabs.sb.enums.Status;

public class ModulesResponse {

    private String id;
    private String name;
    private Status status;

    public ModulesResponse() {

    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

}
