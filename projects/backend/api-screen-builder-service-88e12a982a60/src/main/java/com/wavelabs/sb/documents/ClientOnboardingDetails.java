package com.wavelabs.sb.documents;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.wavelabs.sb.request.ClientRolesRequest;

@Document(collection = "client-onboarding-details")
public class ClientOnboardingDetails extends BaseDocument {
    @Id
    private String id;
    private String clientId;
    private String clientName;
    private String headOfficeName;
    private String address;
    private String area;
    private String state;
    private String city;
    private String country;
    private String pinCode;
    private String firstName;
    private String middleName;
    private String lastName;
    private String mobile;
    private String email;

    @DBRef
    private List<Module> modules;

    private List<ClientRolesRequest> clientRoles;
    @DBRef
    private ClientsCredentials clientCredentials;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getClientName() {
	return clientName;
    }

    public void setClientName(String clientName) {
	this.clientName = clientName;
    }

    public String getHeadOfficeName() {
	return headOfficeName;
    }

    public void setHeadOfficeName(String headOfficeName) {
	this.headOfficeName = headOfficeName;
    }

    public String getAddress() {
	return address;
    }

    public void setAddress(String address) {
	this.address = address;
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

    public String getPinCode() {
	return pinCode;
    }

    public void setPinCode(String pinCode) {
	this.pinCode = pinCode;
    }

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

    public String getMobile() {
	return mobile;
    }

    public void setMobile(String mobile) {
	this.mobile = mobile;
    }

    public String getEmail() {
	return email;
    }

    public void setEmail(String email) {
	this.email = email;
    }

    public List<Module> getModules() {
	return modules;
    }

    public void setModules(List<Module> modules) {
	this.modules = modules;
    }

    public List<ClientRolesRequest> getClientRoles() {
	return clientRoles;
    }

    public void setClientRoles(List<ClientRolesRequest> clientRoles) {
	this.clientRoles = clientRoles;
    }

    public ClientsCredentials getClientCredentials() {
	return clientCredentials;
    }

    public void setClientCredentials(ClientsCredentials clientCredentials) {
	this.clientCredentials = clientCredentials;
    }

    public String getArea() {
	return area;
    }

    public void setArea(String area) {
	this.area = area;
    }

}
