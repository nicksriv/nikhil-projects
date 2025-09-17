package com.wavelabs.sb.response;

import java.util.List;

public class RoleResponse {

    private String id;
    private String name;
    private String status;
    private String description;

    private List<RoleModuleResponse> modules;

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

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
    }

    public String getDescription() {
	return description;
    }

    public void setDescription(String description) {
	this.description = description;
    }

    public List<RoleModuleResponse> getModules() {
	return modules;
    }

    public void setModules(List<RoleModuleResponse> modules) {
	this.modules = modules;
    }

}
