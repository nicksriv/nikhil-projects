package com.wavelabs.sb.request;

import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.response.ErrorRecord;
import com.wavelabs.sb.utils.OptionalPattern;

public class UploadUserRequest {

    @NotBlank(message = "Firstname is mandatory")
    @Pattern(message = "Provide valid firstName", regexp = "^[ A-Za-z]*$")
    private String firstName;

    @OptionalPattern(message = "Provide valid middileName", regexp = "^[ a-zA-Z]*$")
    private String middleName;

    @NotBlank(message = "Lastname is mandatory")
    @Pattern(message = "Provide valid lastName", regexp = "^[ a-zA-Z]*$")
    private String lastName;

    private String dob;

    @NotBlank(message = "Contact number is mandatory")
    @OptionalPattern(message = "Provide valid contact number", regexp = "^[1-9][0-9]{9}$")
    private String contactNumber;

    @Pattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", message = "Invalid Email id")
    @Email
    private String personalEmail;

    @NotBlank(message = "Gender is mandatory")
    @OptionalPattern(message = "Provide gender Male/Female/Others", regexp = "Male|Female|Others|male|female|others")
    private String gender;

    @OptionalPattern(message = "Provide valid pan number", regexp = "[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}")
    private String pan;

    @OptionalPattern(message = "Provide valid Aadhar number", regexp = "^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$")
    private String aadharNumber;

    @Pattern(message = "Provide valid address", regexp = "^[ A-Za-z0-9_#-/,]*$")
    private String address;

    @Pattern(message = "Provide valid country", regexp = "^[ a-zA-Z_#-/,]*$")
    private String country;

    @Pattern(message = "Provide valid state", regexp = "^[ a-zA-Z_#-/,]*$")
    private String state;

    @Pattern(message = "Provide valid city", regexp = "^[ a-zA-Z_#-/,]*$")
    private String city;

    @Pattern(message = "Provide valid area", regexp = "^[ a-zA-Z_#-/,]*$")
    private String area;

    @OptionalPattern(message = "Provide valid Pin code", regexp = "^[1-9][0-9]{5}$")
    private String pinCode;

    private ErrorRecord errorRecord;

    @NotBlank(message = "Employee id is mandatory")
    private String employeeId;

    @NotBlank(message = "Type of employment is mandatory")
    private String typeOfEmployment;

    @NotBlank(message = "Joining Date is mandatory")
    private String joiningDate;

    @Pattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", message = "Invalid Email id")
    @Email
    private String employeeEmail;

    private Status status;

    private ReportingManagerRequest reportingManager;

    private ReferralRequest referral;

    @NotBlank(message = "Store location id is mandatory")
    private String location;
    private String storeAddress;
    private String stroreManagerEmpId;
    private String stroreHeadEmpName;

    @OptionalPattern(message = "Provide valid contact number", regexp = "^[1-9][0-9]{9}$")
    private String storeMobileNumber;

    @Pattern(message = "Provide valid bank name", regexp = "^[ A-Za-z_#/,]*$")
    private String bankName;

    @OptionalPattern(message = "Provide valid Ifsc code", regexp = "[A-Za-z]{4}[0-9]*$")
    private String ifscCode;

    @OptionalPattern(message = "Provide valid Account number", regexp = "^[0-9]*$")
    private String accountNumber;

    @OptionalPattern(message = "Provide valid branch name", regexp = "^[ A-Za-z_#/,]*$")
    private String branchName;

    private List<String> roles;

    private int rowId;

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

    public ErrorRecord getErrorRecord() {
	return errorRecord;
    }

    public void setErrorRecord(ErrorRecord errorRecord) {
	this.errorRecord = errorRecord;
    }

    public String getEmployeeId() {
	return employeeId;
    }

    public void setEmployeeId(String employeeId) {
	this.employeeId = employeeId;
    }

    public String getTypeOfEmployment() {
	return typeOfEmployment;
    }

    public void setTypeOfEmployment(String typeOfEmployment) {
	this.typeOfEmployment = typeOfEmployment;
    }

    public String getJoiningDate() {
	return joiningDate;
    }

    public void setJoiningDate(String joiningDate) {
	this.joiningDate = joiningDate;
    }

    public String getEmployeeEmail() {
	return employeeEmail;
    }

    public void setEmployeeEmail(String employeeEmail) {
	this.employeeEmail = employeeEmail;
    }

    public ReportingManagerRequest getReportingManager() {
	return reportingManager;
    }

    public void setReportingManager(ReportingManagerRequest reportingManager) {
	this.reportingManager = reportingManager;
    }

    public ReferralRequest getReferral() {
	return referral;
    }

    public void setReferral(ReferralRequest referral) {
	this.referral = referral;
    }

    public String getLocation() {
	return location;
    }

    public void setLocation(String location) {
	this.location = location;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

    public String getStoreAddress() {
	return storeAddress;
    }

    public void setStoreAddress(String storeAddress) {
	this.storeAddress = storeAddress;
    }

    public String getStroreManagerEmpId() {
	return stroreManagerEmpId;
    }

    public void setStroreManagerEmpId(String stroreManagerEmpId) {
	this.stroreManagerEmpId = stroreManagerEmpId;
    }

    public String getStroreHeadEmpName() {
	return stroreHeadEmpName;
    }

    public void setStroreHeadEmpName(String stroreHeadEmpName) {
	this.stroreHeadEmpName = stroreHeadEmpName;
    }

    public String getStoreMobileNumber() {
	return storeMobileNumber;
    }

    public void setStoreMobileNumber(String storeMobileNumber) {
	this.storeMobileNumber = storeMobileNumber;
    }

    public String getBankName() {
	return bankName;
    }

    public void setBankName(String bankName) {
	this.bankName = bankName;
    }

    public String getIfscCode() {
	return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
	this.ifscCode = ifscCode;
    }

    public String getAccountNumber() {
	return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
	this.accountNumber = accountNumber;
    }

    public String getBranchName() {
	return branchName;
    }

    public void setBranchName(String branchName) {
	this.branchName = branchName;
    }

    public int getRowId() {
	return rowId;
    }

    public void setRowId(int rowId) {
	this.rowId = rowId;
    }

    public List<String> getRoles() {
	return roles;
    }

    public void setRoles(List<String> roles) {
	this.roles = roles;
    }

}
