package com.wavelabs.sb.request;

import java.util.Optional;

import com.wavelabs.sb.model.ColumnOrder;

public class FetchAllRequest {

    private Optional<Integer> pageNumber;
    private Optional<Integer> size;
    private Optional<ColumnOrder> sortBy;
    private Optional<String> sortOrder;
    private String headOfficeName, clientId, clientName, state, area;
    private String status;
    private String from;
    private String to;
    private boolean paginationRequired = true;

    public Optional<Integer> getPageNumber() {
	return pageNumber;
    }

    public void setPageNumber(Optional<Integer> pageNumber) {
	this.pageNumber = pageNumber;
    }

    public Optional<Integer> getSize() {
	return size;
    }

    public void setSize(Optional<Integer> size) {
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

    public String getHeadOfficeName() {
	return headOfficeName;
    }

    public void setHeadOfficeName(String headOfficeName) {
	this.headOfficeName = headOfficeName;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getClientName() {
	return clientName;
    }

    public void setClientName(String clientName) {
	this.clientName = clientName;
    }

    public String getState() {
	return state;
    }

    public void setState(String state) {
	this.state = state;
    }

    public String getArea() {
	return area;
    }

    public void setArea(String area) {
	this.area = area;
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

    public boolean isPaginationRequired() {
	return paginationRequired;
    }

    public void setPaginationRequired(boolean paginationRequired) {
	this.paginationRequired = paginationRequired;
    }

}
