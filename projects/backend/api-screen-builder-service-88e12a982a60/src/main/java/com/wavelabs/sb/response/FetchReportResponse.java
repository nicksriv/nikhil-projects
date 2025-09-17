package com.wavelabs.sb.response;

import java.util.LinkedHashMap;
import java.util.List;

public class FetchReportResponse {

    private String name;
    private String parentModuleId;
    private List<RoleInfo> roles;
    private List<SubModulesInfo> submoduleIds;
    private List<String> filter;
    private String status;
    private List<CustomColumnsInfo> customColumns;
    private String id;
    private List<LinkedHashMap<String, Object>> report;
    private List<String> visibleColumns;

    public List<LinkedHashMap<String, Object>> getReport() {
	return report;
    }

    public void setReport(List<LinkedHashMap<String, Object>> report) {
	this.report = report;
    }

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

    public List<RoleInfo> getRoles() {
	return roles;
    }

    public void setRoles(List<RoleInfo> roles) {
	this.roles = roles;
    }

    public List<SubModulesInfo> getSubmoduleIds() {
	return submoduleIds;
    }

    public void setSubmoduleIds(List<SubModulesInfo> submoduleIds) {
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

    public List<CustomColumnsInfo> getCustomColumns() {
	return customColumns;
    }

    public void setCustomColumns(List<CustomColumnsInfo> customColumns) {
	this.customColumns = customColumns;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public List<String> getVisibleColumns() {
	return visibleColumns;
    }

    public void setVisibleColumns(List<String> visibleColumns) {
	this.visibleColumns = visibleColumns;
    }

}
