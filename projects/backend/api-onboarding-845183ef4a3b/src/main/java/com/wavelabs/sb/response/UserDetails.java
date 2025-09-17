package com.wavelabs.sb.response;

import java.util.List;

public class UserDetails {

    private String employeeName;

    private String employeeId;

    private String reportingManager;

    private String gender;

    private String city;

    private String status;

    private String contactNumber;

    private String userId;

    private int age;

    private List<String> mappedStores;

    private List<RoleDetails> roles;

    public String getEmployeeName() {
	return employeeName;
    }

    public void setEmployeeName(String employeeName) {
	this.employeeName = employeeName;
    }

    public String getEmployeeId() {
	return employeeId;
    }

    public void setEmployeeId(String employeeId) {
	this.employeeId = employeeId;
    }

    public String getReportingManager() {
	return reportingManager;
    }

    public void setReportingManager(String reportingManager) {
	this.reportingManager = reportingManager;
    }

    public String getGender() {
	return gender;
    }

    public void setGender(String gender) {
	this.gender = gender;
    }

    public String getCity() {
	return city;
    }

    public void setCity(String city) {
	this.city = city;
    }

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
    }

    public String getContactNumber() {
	return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
	this.contactNumber = contactNumber;
    }

    public String getUserId() {
	return userId;
    }

    public void setUserId(String userId) {
	this.userId = userId;
    }

    public int getAge() {
	return age;
    }

    public void setAge(int age) {
	this.age = age;
    }

    public List<String> getMappedStores() {
	return mappedStores;
    }

    public void setMappedStores(List<String> mappedStores) {
	this.mappedStores = mappedStores;
    }

    public List<RoleDetails> getRoles() {
	return roles;
    }

    public void setRoles(List<RoleDetails> roles) {
	this.roles = roles;
    }

}
