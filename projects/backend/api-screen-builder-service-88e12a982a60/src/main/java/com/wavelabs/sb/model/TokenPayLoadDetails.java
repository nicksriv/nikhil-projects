package com.wavelabs.sb.model;

/**
 * @Note - logic handle at the time of assigment so now in userId it will always be userRef in this code base. And id will always be filled
 * 
 * @userId - in case of client & its user it is user ref id & in case of freelancer, vendor & vendor user it will be id [primary key of document]
 * @id -  in case of freelancer,vendor, vendor-user it will be null
 * @userRef - just to get from freelancer, vendor & vendor-user token so we can set in userId
 */
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

    public String getUserId() {
	return userId;
    }

    public void setUserId(String userId) {
	this.userId = userId;
    }
    
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

}
