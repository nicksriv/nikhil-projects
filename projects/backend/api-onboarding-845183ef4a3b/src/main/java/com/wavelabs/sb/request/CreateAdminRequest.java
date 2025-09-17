package com.wavelabs.sb.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.utils.OptionalPattern;

public class CreateAdminRequest {

    private String id;

    @NotBlank(message = "Full name is mandatory")
    @Pattern(message = "Provide valid full name", regexp = "^[ A-Za-z0-9_#-/,]*$")
    private String fullName;

    @NotBlank(message = "Mobile number is mandatory")
    @Pattern(message = "Provide valid mobile number", regexp = "^[1-9][0-9]{9}$")
    private String mobile;

    @OptionalPattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", message = "Invalid Email id")
    @Email
    private String email;

    @OptionalPattern(message = "Provide gender Male/Female/Others", regexp = "Male|Female|Others")
    private String gender;

    @OptionalPattern(message = "Provide valid pan number", regexp = "[A-Z]{5}[0-9]{4}[A-Z]{1}")
    private String panNumber;
    @OptionalPattern(message = "Provide valid Aadhar number", regexp = "^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$")
    private String aadharNumber;
    @Pattern(message = "Provide valid address", regexp = "^[ A-Za-z0-9_#-/,]*$")
    private String address;

    @Pattern(message = "Provide valid country", regexp = "^[ A-Za-z0-9_#-/,]*$")
    private String country;

    @Pattern(message = "Provide valid state", regexp = "^[ A-Za-z0-9_#-/,]*$")
    private String state;

    @Pattern(message = "Provide valid city", regexp = "^[ A-Za-z0-9_#-/,]*$")
    private String city;

    @Pattern(message = "Provide valid area", regexp = "^[ A-Za-z0-9_#-/,]*$")
    private String area;

    @OptionalPattern(message = "Provide valid Pin code", regexp = "^[1-9][0-9]{5}$")
    private String pincode;
    private boolean deleted;
    private Status status;
    private String dob;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getFullName() {
	return fullName;
    }

    public void setFullName(String fullName) {
	this.fullName = fullName;
    }

    public String getGender() {
	return gender;
    }

    public void setGender(String gender) {
	this.gender = gender;
    }

    public String getMobile() {
	return mobile;
    }

    public void setMobile(String mobile) {
	this.mobile = mobile;
    }

    public String getEmail() {
	return email;
    }

    public void setEmail(String email) {
	this.email = email;
    }

    public String getPanNumber() {
	return panNumber;
    }

    public void setPanNumber(String panNumber) {
	this.panNumber = panNumber;
    }

    public String getAadharNumber() {
	return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
	this.aadharNumber = aadharNumber;
    }

    public String getPincode() {
	return pincode;
    }

    public void setPincode(String pincode) {
	this.pincode = pincode;
    }

    public String getAddress() {
	return address;
    }

    public void setAddress(String address) {
	this.address = address;
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

    public boolean isDeleted() {
	return deleted;
    }

    public void setDeleted(boolean deleted) {
	this.deleted = deleted;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

    public String getDob() {
	return dob;
    }

    public void setDob(String dob) {
	this.dob = dob;
    }

}
