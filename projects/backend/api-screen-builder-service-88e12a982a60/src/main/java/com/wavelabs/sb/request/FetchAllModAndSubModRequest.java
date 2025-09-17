package com.wavelabs.sb.request;

import java.util.Optional;

import com.wavelabs.sb.enums.ColumnOrder;

public class FetchAllModAndSubModRequest {

    private int page;
    private int size;
    private String moduleName;
    private String status;
    private Optional<ColumnOrder> sortBy;
    private Optional<String> sortOrder;
    private boolean paginationRequired = false;
    private String from;
    private String to;

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

    public Optional<ColumnOrder> getSortBy() {
	return sortBy;
    }

    public void setSortBy(Optional<ColumnOrder> sortBy) {
	this.sortBy = sortBy;
    }

    public Optional<String> getSortOrder() {
	return sortOrder;
    }

    public void setSortOrder(Optional<String> sortOrder) {
	this.sortOrder = sortOrder;
    }

    public boolean isPaginationRequired() {
	return paginationRequired;
    }

    public void setPaginationRequired(boolean paginationRequired) {
	this.paginationRequired = paginationRequired;
    }

    public String getModuleName() {
	return moduleName;
    }

    public void setModuleName(String moduleName) {
	this.moduleName = moduleName;
    }

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
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

}
