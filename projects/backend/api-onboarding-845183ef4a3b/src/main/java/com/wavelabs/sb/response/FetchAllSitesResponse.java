package com.wavelabs.sb.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.wavelabs.sb.enums.SiteType;
import com.wavelabs.sb.enums.Status;

@JsonInclude(Include.NON_NULL)
public class FetchAllSitesResponse {

    private String id;
    private String siteId;
    private String siteName;
    private String contactNumber;
    private String email;
    private String state;
    private String city;
    private SiteType type;
    private Status status;
    private List<EmployeeInfo> managers;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public List<EmployeeInfo> getManagers() {
	return managers;
    }

    public void setManagers(List<EmployeeInfo> managers) {
	this.managers = managers;
    }

    public String getSiteId() {
	return siteId;
    }

    public void setSiteId(String siteId) {
	this.siteId = siteId;
    }

    public String getSiteName() {
	return siteName;
    }

    public void setSiteName(String siteName) {
	this.siteName = siteName;
    }

    public String getContactNumber() {
	return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
	this.contactNumber = contactNumber;
    }

    public String getEmail() {
	return email;
    }

    public void setEmail(String email) {
	this.email = email;
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

    public SiteType getType() {
	return type;
    }

    public void setType(SiteType type) {
	this.type = type;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

}
