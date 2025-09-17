package com.wavelabs.sb.response;

import java.util.List;
import java.util.Map;

public class FetchFormResponse {

    private String subModuleName;
    private String subModuleId;
    private String clientId;
    private String moduleId;
    private List<String> roles;
    private String name;
    private List<Map<String, Object>> form;

    public String getSubModuleName() {
	return subModuleName;
    }

    public void setSubModuleName(String subModuleName) {
	this.subModuleName = subModuleName;
    }

    public String getSubModuleId() {
	return subModuleId;
    }

    public void setSubModuleId(String subModuleId) {
	this.subModuleId = subModuleId;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public List<String> getRoles() {
	return roles;
    }

    public void setRoles(List<String> roles) {
	this.roles = roles;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public List<Map<String, Object>> getForm() {
        return form;
    }

    public void setForm(List<Map<String, Object>> form) {
        this.form = form;
    }

}
