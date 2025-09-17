package com.wavelabs.sb.response;

import java.util.List;

public class FetchAllSubmodResponse {

    private String id;
    private String icon;
    private String name;
    private List<RoleInfo> roles;
    private String moduleId;
    private String status;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getIcon() {
	return icon;
    }

    public void setIcon(String icon) {
	this.icon = icon;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public List<RoleInfo> getRoles() {
	return roles;
    }

    public void setRoles(List<RoleInfo> roles) {
	this.roles = roles;
    }

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
    }

}
