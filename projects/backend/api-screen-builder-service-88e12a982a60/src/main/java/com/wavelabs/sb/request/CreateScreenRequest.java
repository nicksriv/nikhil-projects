package com.wavelabs.sb.request;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class CreateScreenRequest {

    private List<Map<String, Object>> form;
    private List<ScreenFieldsRequest> fields;
    private String subModuleName;
    private String moduleId;
  //  private List<String> roles;
    private String name;
    private String submoduleId;
    private String clientId;
    @JsonIgnore
    private String screenId;

    public List<Map<String, Object>> getForm() {
	return form;
    }

    public void setForm(List<Map<String, Object>> form) {
	this.form = form;
    }

    public List<ScreenFieldsRequest> getFields() {
	return fields;
    }

    public void setFields(List<ScreenFieldsRequest> fields) {
	this.fields = fields;
    }

    public String getSubModuleName() {
	return subModuleName;
    }

    public void setSubModuleName(String subModuleName) {
	this.subModuleName = subModuleName;
    }

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }/*
      * 
      * public List<String> getRoles() { return roles; }
      * 
      * public void setRoles(List<String> roles) { this.roles = roles; }
      */

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getSubmoduleId() {
	return submoduleId;
    }

    public void setSubmoduleId(String submoduleId) {
	this.submoduleId = submoduleId;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

}
