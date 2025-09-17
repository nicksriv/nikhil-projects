package com.wavelabs.sb.request;

import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class FetchFormsRequest {

    private int page;
    private int size;
    private List<FiltersRequest> filters;
    private Optional<String> sortBy;
    private Optional<String> sortOrder;
    private String from;
    private String to;
    private String status;
    @JsonIgnore
    private String moduleId;
    @JsonIgnore
    private String subModuleId;
    private String mappedBy;
    private String employeeId;
    private String name;
    private String roleId;
    
    private String jobId;

    public int getPage() {
	return page;
    }

    public void setPage(int page) {
	this.page = page;
    }

    public int getSize() {
	return size;
    }

    public void setSize(int size) {
	this.size = size;
    }

    public List<FiltersRequest> getFilters() {
	return filters;
    }

    public void setFilters(List<FiltersRequest> filters) {
	this.filters = filters;
    }

    public Optional<String> getSortBy() {
	return sortBy;
    }

    public void setSortBy(Optional<String> sortBy) {
	this.sortBy = sortBy;
    }

    public Optional<String> getSortOrder() {
	return sortOrder;
    }

    public void setSortOrder(Optional<String> sortOrder) {
	this.sortOrder = sortOrder;
    }

    public String getModuleId() {
	return moduleId;
    }

    public void setModuleId(String moduleId) {
	this.moduleId = moduleId;
    }

    public String getSubModuleId() {
	return subModuleId;
    }

    public void setSubModuleId(String subModuleId) {
	this.subModuleId = subModuleId;
    }

    public String getFrom() {
	return from;
    }

    public void setFrom(String from) {
	this.from = from;
    }

    public String getTo() {
	return to;
    }

    public void setTo(String to) {
	this.to = to;
    }

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
    }

    public String getMappedBy() {
	return mappedBy;
    }

    public void setMappedBy(String mappedBy) {
	this.mappedBy = mappedBy;
    }

    public String getEmployeeId() {
	return employeeId;
    }

    public void setEmployeeId(String employeeId) {
	this.employeeId = employeeId;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getRoleId() {
	return roleId;
    }

    public void setRoleId(String roleId) {
	this.roleId = roleId;
    }

    public String getJobId() {
	return jobId;
    }

    public void setJobId(String jobId) {
	this.jobId = jobId;
    }

}
