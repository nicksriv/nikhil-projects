package com.wavelabs.sb.request;

import java.util.Optional;

import com.wavelabs.sb.model.SitesColumnOrder;

public class FetchAllSitesRequest {

    private String siteId, name, state, city, clientId;
    private String type;
    private String status;
    private String from;
    private String to;
    private Optional<Integer> pageNumber;
    private Optional<Integer> size;
    private Optional<SitesColumnOrder> sortBy;
    private Optional<String> sortOrder;
    private boolean paginationRequired = true;

    public String getSiteId() {
	return siteId;
    }

    public void setSiteId(String siteId) {
	this.siteId = siteId;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getState() {
	return state;
    }

    public void setState(String state) {
	this.state = state;
    }

    public String getCity() {
	return city;
    }

    public void setCity(String city) {
	this.city = city;
    }

    public String getType() {
	return type;
    }

    public void setType(String type) {
	this.type = type;
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

    public Optional<SitesColumnOrder> getSortBy() {
	return sortBy;
    }

    public void setSortBy(Optional<SitesColumnOrder> sortBy) {
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

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

}
