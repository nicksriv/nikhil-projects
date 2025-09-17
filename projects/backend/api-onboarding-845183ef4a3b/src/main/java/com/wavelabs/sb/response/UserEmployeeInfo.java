package com.wavelabs.sb.response;

import java.util.List;

public class UserEmployeeInfo {

    private String id;
    private String name;
    private String employeeId;
    private List<RoleDetails> roles;

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getEmployeeId() {
	return employeeId;
    }

    public void setEmployeeId(String employeeId) {
	this.employeeId = employeeId;
    }

    public List<RoleDetails> getRoles() {
	return roles;
    }

    public void setRoles(List<RoleDetails> roles) {
	this.roles = roles;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

}
