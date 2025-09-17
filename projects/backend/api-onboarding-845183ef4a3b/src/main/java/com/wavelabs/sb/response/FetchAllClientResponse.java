package com.wavelabs.sb.response;

import java.time.ZonedDateTime;

import com.wavelabs.sb.enums.Status;

public class FetchAllClientResponse {
    private String clientId, headOfficeName, clientName, state, city, area;
    private Status status;
    private int resourceCount;
    private int storeCount;
    private String id;
    private boolean isCredentialsAvailable;
    private String logoId;

    public boolean isCredentialsAvailable() {
	return isCredentialsAvailable;
    }

    public void setCredentialsAvailable(boolean isCredentialsAvailable) {
	this.isCredentialsAvailable = isCredentialsAvailable;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public int getStoreCount() {
	return storeCount;
    }

    public void setStoreCount(int storeCount) {
	this.storeCount = storeCount;
    }

    private ZonedDateTime createdAt;

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getHeadOfficeName() {
	return headOfficeName;
    }

    public void setHeadOfficeName(String headOfficeName) {
	this.headOfficeName = headOfficeName;
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

    public String getCity() {
	return city;
    }

    public void setCity(String city) {
	this.city = city;
    }

    public String getArea() {
	return area;
    }

    public void setArea(String area) {
	this.area = area;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

    public int getResourceCount() {
	return resourceCount;
    }

    public void setResourceCount(int resourceCount) {
	this.resourceCount = resourceCount;
    }

    public ZonedDateTime getCreatedAt() {
	return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
	this.createdAt = createdAt;
    }

    public String getLogoId() {
	return logoId;
    }

    public void setLogoId(String logoId) {
	this.logoId = logoId;
    }

}
