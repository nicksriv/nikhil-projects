package com.wavelabs.sb.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.wavelabs.sb.utils.OptionalPattern;

public class UserRequest {

    @NotBlank(message = "Firstname is mandatory")
    @Pattern(message = "Provide valid firstName", regexp = "^[ A-Za-z]*$")
    private String firstName;

    @Pattern(message = "Provide valid middileName", regexp = "^[ a-zA-Z]*$")
    private String middleName;

    @Pattern(message = "Provide valid lastName", regexp = "^[ a-zA-Z]*$")
    private String lastName;

    @Pattern(message = "Provide valid DOB", regexp =   "^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\\d{4}$")
    private String dob;

    @NotBlank(message = "Contact number is mandatory")
    @Pattern(message = "Provide valid contact number", regexp = "^[1-9][0-9]{9}$")
    private String contactNumber;

    @OptionalPattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", message = "Invalid Email id")
    @Email
    private String personalEmail;

    @NotBlank(message = "Gender is mandatory")
    @OptionalPattern(message = "Provide gender Male|Female|Others", regexp = "MALE|FEMALE|OTHERS|Male|Female|Others")
    private String gender;

    @OptionalPattern(message = "Provide valid pan number", regexp = "[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}")
    private String pan;

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
    private String pinCode;

    public String getFirstName() {
	return firstName;
    }

    public void setFirstName(String firstName) {
	this.firstName = firstName;
    }

    public String getMiddleName() {
	return middleName;
    }

    public void setMiddleName(String middleName) {
	this.middleName = middleName;
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

    public String getContactNumber() {
	return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
	this.contactNumber = contactNumber;
    }

    public String getPersonalEmail() {
	return personalEmail;
    }

    public void setPersonalEmail(String personalEmail) {
	this.personalEmail = personalEmail;
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

    public String getAadharNumber() {
	return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
	this.aadharNumber = aadharNumber;
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

    public String getPinCode() {
	return pinCode;
    }

    public void setPinCode(String pinCode) {
	this.pinCode = pinCode;
    }

}
