package com.wavelabs.sb.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.wavelabs.sb.utils.OptionalPattern;

public class UserProfileUpdateRequest {

    @OptionalPattern(message = "Provide valid firstName", regexp = "^[ A-Za-z]*$")
    private String firstName;

    @OptionalPattern(message = "Provide valid lastName", regexp = "^[ a-zA-Z]*$")
    private String lastName;

    private String dob;

    @NotBlank(message = "Contact number is mandatory")
    @Pattern(message = "Provide valid phone number", regexp = "^[1-9][0-9]{9}$")
    private String phone;

    @OptionalPattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", message = "Invalid Email id")
    @Email
    private String email;

    @OptionalPattern(message = "Provide gender MALE|FEMALE|OTHERS", regexp = "MALE|FEMALE|OTHERS")
    private String gender;

    @OptionalPattern(message = "Provide valid pan number", regexp = "[A-Z]{5}[0-9]{4}[A-Z]{1}")
    private String pan;

    @OptionalPattern(message = "Provide valid Aadhar number", regexp = "^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$")
    private String aadhar;

    private String profileUrl;

    @OptionalPattern(message = "Provide valid firstName", regexp = "^[ A-Za-z]*$")
    private String fullName;

    private String pincode;
    private boolean deleted;
    private String adminId;
    private String profileId;
    
    @Pattern(message = "Provide valid address", regexp = "^[ A-Za-z0-9_#-/,]*$")
    private String address;

    @Pattern(message = "Provide valid state", regexp = "^[ A-Za-z0-9_#-/,]*$")
    private String state;

    @Pattern(message = "Provide valid city", regexp = "^[ A-Za-z0-9_#-/,]*$")
    private String city;

    @Pattern(message = "Provide valid area", regexp = "^[ A-Za-z0-9_#-/,]*$")
    private String area;

    @OptionalPattern(message = "Provide valid Pin code", regexp = "^[1-9][0-9]{5}$")
    private String pinCode;

    private String branchName;

    public String getFirstName() {
	return firstName;
    }

    public void setFirstName(String firstName) {
	this.firstName = firstName;
    }

    public String getLastName() {
	return lastName;
    }

    public void setLastName(String lastName) {
	this.lastName = lastName;
    }

    public String getDob() {
	return dob;
    }

    public void setDob(String dob) {
	this.dob = dob;
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

    public String getGender() {
	return gender;
    }

    public void setGender(String gender) {
	this.gender = gender;
    }

    public String getPan() {
	return pan;
    }

    public void setPan(String pan) {
	this.pan = pan;
    }

    public String getAadhar() {
	return aadhar;
    }

    public void setAadhar(String aadhar) {
	this.aadhar = aadhar;
    }

    public String getProfileUrl() {
	return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
	this.profileUrl = profileUrl;
    }

    public String getFullName() {
	return fullName;
    }

    public void setFullName(String fullName) {
	this.fullName = fullName;
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

    public boolean isDeleted() {
	return deleted;
    }

    public void setDeleted(boolean deleted) {
	this.deleted = deleted;
    }

    public String getAdminId() {
	return adminId;
    }

    public void setAdminId(String adminId) {
	this.adminId = adminId;
    }

    public String getProfileId() {
	return profileId;
    }

    public void setProfileId(String profileId) {
	this.profileId = profileId;
    }

    public String getBranchName() {
	return branchName;
    }

    public void setBranchName(String branchName) {
	this.branchName = branchName;
    }

}