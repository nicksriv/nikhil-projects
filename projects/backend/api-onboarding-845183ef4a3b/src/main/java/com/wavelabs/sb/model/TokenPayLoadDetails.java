package com.wavelabs.sb.model;

public class TokenPayLoadDetails {

    private String userId;
    private String userSubId;
    private String userRef;
    private String typeOfUser;
    private String clientId;
    private String id;
    private String adminId;
    private String clientSystemId;
    private String userRole;
    private String firstName;
    private String lastName;

    
    public String getUserSubId() {
	return userSubId;
    }

    public void setUserSubId(String userSubId) {
	this.userSubId = userSubId;
    }
    
    public String getUserRef() {
	return userRef;
    }

    public void setUserRef(String userRef) {
	this.userRef = userRef;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

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

    public String getUserId() {
	return userId;
    }

    public void setUserId(String userId) {
	this.userId = userId;
    }

    public String getTypeOfUser() {
	return typeOfUser;
    }

    public void setTypeOfUser(String typeOfUser) {
	this.typeOfUser = typeOfUser;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getAdminId() {
	return adminId;
    }

    public void setAdminId(String adminId) {
	this.adminId = adminId;
    }

    public String getClientSystemId() {
	return clientSystemId;
    }

    public void setClientSystemId(String clientSystemId) {
	this.clientSystemId = clientSystemId;
    }

}
