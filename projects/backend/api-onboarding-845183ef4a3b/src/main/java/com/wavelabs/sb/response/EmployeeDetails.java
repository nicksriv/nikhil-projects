package com.wavelabs.sb.response;

import java.util.List;

import com.wavelabs.sb.enums.Status;

public class EmployeeDetails {

    private List<RoleDetails> roles;
    private String typeOfEmployment;
    private String employeeId;
    private String joiningDate;
    private String email;
    private Status status;
    private ReportingManager reportingManager;
    private Referral referral;

    /*
     * public String getRole() { return role; }
     * 
     * public void setRole(String role) { this.role = role; }
     */

    public String getTypeOfEmployment() {
	return typeOfEmployment;
    }

    public void setTypeOfEmployment(String typeOfEmployment) {
	this.typeOfEmployment = typeOfEmployment;
    }

    public String getEmployeeId() {
	return employeeId;
    }

    public void setEmployeeId(String employeeId) {
	this.employeeId = employeeId;
    }

    public String getJoiningDate() {
	return joiningDate;
    }

    public void setJoiningDate(String joiningDate) {
	this.joiningDate = joiningDate;
    }

    public String getEmail() {
	return email;
    }

    public void setEmail(String email) {
	this.email = email;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

    public ReportingManager getReportingManager() {
	return reportingManager;
    }

    public void setReportingManager(ReportingManager reportingManager) {
	this.reportingManager = reportingManager;
    }

    public Referral getReferral() {
	return referral;
    }

    public void setReferral(Referral referral) {
	this.referral = referral;
    }

    public List<RoleDetails> getRoles() {
	return roles;
    }

    public void setRoles(List<RoleDetails> roles) {
	this.roles = roles;
    }

}