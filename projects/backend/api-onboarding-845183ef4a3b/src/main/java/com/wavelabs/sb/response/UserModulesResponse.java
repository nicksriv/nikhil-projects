package com.wavelabs.sb.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserModulesResponse {

    private String name;
    private String id;
    private String icon;
    private String status;

    private List<UserModulesResponse> subModules;

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

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

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
    }

    public List<UserModulesResponse> getSubModules() {
	return subModules;
    }

    public void setSubModules(List<UserModulesResponse> subModules) {
	this.subModules = subModules;
    }

}
