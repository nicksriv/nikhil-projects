package com.wavelabs.sb.request;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.utils.OptionalPattern;

public class SiteOnboardingRequest {

    @NotBlank(message = "Site ID is mandatory")
    private String siteId;

    @NotBlank(message = "Site Name is mandatory")
    @Pattern(message = "Site Name should contain alphabets only ", regexp = "^[a-zA-Z\\s]*$")
    private String name;

    private String type;

    @NotBlank(message = "Phone number is mandatory")
    @Pattern(message = "Provide valid phone number", regexp = "^[1-9][0-9]{9}$")
    private String phone;

    @OptionalPattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", message = "Invalid Email id")
//    @Email
    private String email;

    private String address = "";

    @Pattern(message = "area should contain alphabets only", regexp = "^[a-zA-Z\\s]*$")
    private String area = "";

    private String state = "";

    private String city = "";

    @NotBlank(message = "Country is mandatory")
    private String country = "India";

    @OptionalPattern(message = "pinCode must be of length 6 / cannot be started with Zero / cannot contain alphabet", regexp = "^[1-9]{1}[0-9]{5}$")
    private String pin;

    private Status status;

    private Double latitude;

    private Double longitude;

    @NotBlank(message = "Client ID is mandatory")
    private String clientId;

    private List<String> managers;

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

}
