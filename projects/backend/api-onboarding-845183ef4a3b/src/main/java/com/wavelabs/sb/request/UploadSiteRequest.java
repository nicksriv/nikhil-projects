package com.wavelabs.sb.request;

import java.util.List;

import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.response.ErrorRecord;

public class UploadSiteRequest {
    private String siteId;
    private String name;
    private String type;
    private String phone;
    private String email;
    private String address;
    private String country;
    private String city;
    private String area;
    private String state;
    private String pin;
    private Status status;
    private Double latitude;
    private Double longitude;
    private List<String> managers;
    private ErrorRecord errorRecord;
    private int rowId;

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

    public String getType() {
	return type;
    }

    public void setType(String type) {
	this.type = type;
    }

    public String getPhone() {
	return phone;
    }

    public void setPhone(String phone) {
	this.phone = phone;
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

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
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

    public List<String> getManagers() {
	return managers;
    }

    public void setManagers(List<String> managers) {
	this.managers = managers;
    }

    public ErrorRecord getErrorRecord() {
	return errorRecord;
    }

    public void setErrorRecord(ErrorRecord errorRecord) {
	this.errorRecord = errorRecord;
    }

    public int getRowId() {
	return rowId;
    }

    public void setRowId(int rowId) {
	this.rowId = rowId;
    }

}
