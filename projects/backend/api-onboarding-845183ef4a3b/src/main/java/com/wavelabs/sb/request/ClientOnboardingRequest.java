package com.wavelabs.sb.request;

import javax.validation.Valid;
import javax.validation.constraints.*;

import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.utils.OptionalPattern;

public class ClientOnboardingRequest {

    @NotBlank(message = "Clientname is mandatory")
    @Pattern(message = "ClientName should contain alpha numeric only ", regexp = "^[a-zA-Z0-9\\s]*$")
    @Size(min = 2, message = "Client name must be more than 2 characters")
    private String clientName;

    @NotBlank(message = "HeadOfficeName is mandatory")
    @Pattern(message = "HeadOfficeName should contain alphabets only", regexp = "^[a-zA-Z\\s]*$")
    private String headOfficeName;

    private String address = "";

    @Pattern(message = "area should contain alphabets only", regexp = "^[a-zA-Z\\s]*$")
    private String area = "";

    private String state = "";

    private String city = "";

    @NotBlank(message = "Country is mandatory")
    private String country = "India";

    @OptionalPattern(message = "pinCode must be of length 6 / cannot be started with Zero", regexp = "^[1-9]{1}[0-9]{5}$")
    private String pinCode;

    @Valid
    private AdminDetails admin;
    private Status status;

    private String logoId;
    private String backgroundImageId;
    private double opacity;

    public String getClientName() {
	return clientName;
    }

    public void setClientName(String clientName) {
	this.clientName = clientName;
    }

    public String getHeadOfficeName() {
	return headOfficeName;
    }

    public void setHeadOfficeName(String headOfficeName) {
	this.headOfficeName = headOfficeName;
    }

    public String getAddress() {
	return address;
    }

    public void setAddress(String address) {
	this.address = address;
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

    public String getCity() {
	return city;
    }

    public void setCity(String city) {
	this.city = city;
    }

    public String getCountry() {
	return country;
    }

    public void setCountry(String country) {
	this.country = country;
    }

    public String getPinCode() {
	return pinCode;
    }

    public void setPinCode(String pinCode) {
	this.pinCode = pinCode;
    }

    public AdminDetails getAdmin() {
	return admin;
    }

    public void setAdmin(AdminDetails admin) {
	this.admin = admin;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

    public String getLogoId() {
	return logoId;
    }

    public void setLogoId(String logoId) {
	this.logoId = logoId;
    }

    public String getBackgroundImageId() {
	return backgroundImageId;
    }

    public void setBackgroundImageId(String backgroundImageId) {
	this.backgroundImageId = backgroundImageId;
    }

    public double getOpacity() {
	return opacity;
    }

    public void setOpacity(double opacity) {
	this.opacity = opacity;
    }

}
