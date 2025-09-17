package com.wavelabs.sb.model;

import java.util.List;

import com.wavelabs.sb.enums.SiteType;
import com.wavelabs.sb.enums.Status;

public class SiteDetails {

    private String siteId;
    private String siteName;
    private SiteType siteType;
    private String contactNumber;
    private String email;
    private String address;
    private String country;
    private String city;
    private String area;
    private String state;
    private String pin;
    private Double latitude;
    private Double longitude;
    private String clientId;
    private List<String> managers;
    private Status status;

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

    public SiteType getSiteType() {
	return siteType;
    }

    public void setSiteType(SiteType siteType) {
	this.siteType = siteType;
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

    public String getAddress() {
	return address;
    }

    public void setAddress(String address) {
	this.address = address;
    }

    public String getCountry() {
	return country;
    }

    public void setCountry(String country) {
	this.country = country;
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

    public String getState() {
	return state;
    }

    public void setState(String state) {
	this.state = state;
    }

    public String getPin() {
	return pin;
    }

    public void setPin(String pin) {
	this.pin = pin;
    }

    public Double getLatitude() {
	return latitude;
    }

    public void setLatitude(Double latitude) {
	this.latitude = latitude;
    }

    public Double getLongitude() {
	return longitude;
    }

    public void setLongitude(Double longitude) {
	this.longitude = longitude;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public List<String> getManagers() {
	return managers;
    }

    public void setManagers(List<String> managers) {
	this.managers = managers;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

}
