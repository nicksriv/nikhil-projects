package com.wavelabs.sb.request;

import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.wavelabs.sb.utils.OptionalPattern;

public class EmployeeRequest {

    @NotBlank(message = "Employee id is mandatory")
    private String employeeId;

    private String typeOfEmployment;

    private String joiningDate;

    @OptionalPattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", message = "Invalid Email id")
    @Email
    private String email;

    private String status;

    private ReportingManagerRequest reportingManager;

    private ReferralRequest referral;

    @NotNull(message = "Roles are mandatory")
    private List<String> roles;

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

    public String getEmail() {
	return email;
    }

    public void setEmail(String email) {
	this.email = email;
    }

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
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

    public List<String> getRoles() {
	return roles;
    }

    public void setRoles(List<String> roles) {
	this.roles = roles;
    }

}
