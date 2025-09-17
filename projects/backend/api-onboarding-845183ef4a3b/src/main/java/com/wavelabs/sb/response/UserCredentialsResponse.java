package com.wavelabs.sb.response;

import java.time.Instant;

public class UserCredentialsResponse {

    private String userId;
    private String empId;
    private Instant joiningDate;
    private String username;
    private String password;

    public String getUserId() {
	return userId;
    }

    public void setUserId(String userId) {
	this.userId = userId;
    }

    public Instant getJoiningDate() {
	return joiningDate;
    }

    public void setJoiningDate(Instant joiningDate) {
	this.joiningDate = joiningDate;
    }

    public String getUsername() {
	return username;
    }

    public void setUsername(String username) {
	this.username = username;
    }

    public String getPassword() {
	return password;
    }

    public void setPassword(String password) {
	this.password = password;
    }

    public String getEmpId() {
	return empId;
    }

    public void setEmpId(String empId) {
	this.empId = empId;
    }

}
