package com.wavelabs.sb.request;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class UpdateReportRequest {
    @NotBlank(message = "Name is mandatory")
    @Pattern(message = "Name should contain alpha numeric only", regexp = "^[a-zA-Z0-9\\s]*$")
    private String name;
    @NotBlank(message = "module Id is required")
    private String parentModuleId;
    private List<String> roleIds;
    private List<String> submoduleIds;
    private List<String> filter;
    private String status;
    private List<CustomColumns> customColumns;

    @JsonIgnore
    private String id;

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

    public List<String> getRoleIds() {
	return roleIds;
    }

    public void setRoleIds(List<String> roleIds) {
	this.roleIds = roleIds;
    }

    public List<String> getSubmoduleIds() {
	return submoduleIds;
    }

    public void setSubmoduleIds(List<String> submoduleIds) {
	this.submoduleIds = submoduleIds;
    }

    public List<String> getFilter() {
	return filter;
    }

    public void setFilter(List<String> filter) {
	this.filter = filter;
    }

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
    }

    public List<CustomColumns> getCustomColumns() {
	return customColumns;
    }

    public void setCustomColumns(List<CustomColumns> customColumns) {
	this.customColumns = customColumns;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

}
