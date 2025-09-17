package com.wavelabs.sb.response;

import java.util.List;

import com.wavelabs.sb.enums.Gender;

public class UserProfileDetails {

    private String firstName;
    private String lastName;
    private String dob;
    private String phone;
    private String email;
    private Gender gender;
    private String pan;
    private String aadhar;
    private String profileUrl;
    private String profileId;
    private String fullName;
    private String pincode;
    private String address;
    private String area;
    private String state;
    private String city;
    private String country;
    private String status;

    private UserBankDetailsResponse userBankDetails;
    private List<LocationDetails> userSiteLocaions;

    private EmployeeDetails employeeDetails;

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

    public Gender getGender() {
	return gender;
    }

    public void setGender(Gender gender) {
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

    public String getCountry() {
	return country;
    }

    public void setCountry(String country) {
	this.country = country;
    }

    public String getProfileUrl() {
	return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
	this.profileUrl = profileUrl;
    }

    public UserBankDetailsResponse getUserBankDetails() {
	return userBankDetails;
    }

    public void setUserBankDetails(UserBankDetailsResponse userBankDetails) {
	this.userBankDetails = userBankDetails;
    }

    public List<LocationDetails> getUserSiteLocaions() {
	return userSiteLocaions;
    }

    public void setUserSiteLocaions(List<LocationDetails> userSiteLocaions) {
	this.userSiteLocaions = userSiteLocaions;
    }

    public EmployeeDetails getEmployeeDetails() {
	return employeeDetails;
    }

    public void setEmployeeDetails(EmployeeDetails employeeDetails) {
	this.employeeDetails = employeeDetails;
    }

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
    }

    public String getProfileId() {
	return profileId;
    }

    public void setProfileId(String profileId) {
	this.profileId = profileId;
    }

}