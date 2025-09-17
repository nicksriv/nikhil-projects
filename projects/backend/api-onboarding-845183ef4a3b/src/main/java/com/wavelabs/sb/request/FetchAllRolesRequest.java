package com.wavelabs.sb.request;

import java.util.Optional;

import com.wavelabs.sb.enums.FetchAllColumnOrder;

public class FetchAllRolesRequest {

    private Optional<Integer> page;
    private Optional<Integer> size;
    private Optional<FetchAllColumnOrder> sortColumn;
    private Optional<String> sortBy;
    private String roleName, modules, from, to, status;
    private boolean isPagination;

    public boolean isPagination() {
	return isPagination;
    }

    public void setPagination(boolean isPagination) {
	this.isPagination = isPagination;
    }

    public Optional<Integer> getPage() {
	return page;
    }

    public void setPage(Optional<Integer> page) {
	this.page = page;
    }

    public Optional<Integer> getSize() {
	return size;
    }

    public void setSize(Optional<Integer> size) {
	this.size = size;
    }

    public Optional<FetchAllColumnOrder> getSortColumn() {
	return sortColumn;
    }

    public void setSortColumn(Optional<FetchAllColumnOrder> sortColumn) {
	this.sortColumn = sortColumn;
    }

    public Optional<String> getSortBy() {
	return sortBy;
    }

    public void setSortBy(Optional<String> sortBy) {
	this.sortBy = sortBy;
    }

    public String getRoleName() {
	return roleName;
    }

    public void setRoleName(String roleName) {
	this.roleName = roleName;
    }

    public String getModules() {
	return modules;
    }

    public void setModules(String modules) {
	this.modules = modules;
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

}
