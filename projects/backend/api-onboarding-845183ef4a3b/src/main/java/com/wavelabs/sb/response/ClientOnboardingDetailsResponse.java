package com.wavelabs.sb.response;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.wavelabs.sb.documents.BaseDocument;
import com.wavelabs.sb.request.AdminDetails;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClientOnboardingDetailsResponse extends BaseDocument {

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
    private boolean deleted;
    private boolean editTheme;
    private boolean editWorkFlow;
    private String clientLogoName;
    private AdminDetails admin;
    private String backgroundImageName;
    private String backgroundImageId;
    private double opacity;
    private String logoId;

    public boolean isEditTheme() {
	return editTheme;
    }

    public void setEditTheme(boolean editTheme) {
	this.editTheme = editTheme;
    }

    public boolean isEditWorkFlow() {
	return editWorkFlow;
    }

    public void setEditWorkFlow(boolean editWorkFlow) {
	this.editWorkFlow = editWorkFlow;
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

    public AdminDetails getAdmin() {
	return admin;
    }

    public void setAdmin(AdminDetails admin) {
	this.admin = admin;
    }

    public String getArea() {
	return area;
    }

    public void setArea(String area) {
	this.area = area;
    }

    public boolean isDeleted() {
	return deleted;
    }

    public void setDeleted(boolean deleted) {
	this.deleted = deleted;
    }

    public String getClientLogoName() {
	return clientLogoName;
    }

    public void setClientLogoName(String clientLogoName) {
	this.clientLogoName = clientLogoName;
    }

    public String getBackgroundImageName() {
	return backgroundImageName;
    }

    public void setBackgroundImageName(String backgroundImageName) {
	this.backgroundImageName = backgroundImageName;
    }

    public String getBackgroundImageId() {
	return backgroundImageId;
    }

    public void setBackgroundImageId(String backgroundImageId) {
	this.backgroundImageId = backgroundImageId;
    }

    public double getOpacity() {
	return opacity;
    }

    public void setOpacity(double opacity) {
	this.opacity = opacity;
    }

    public String getLogoId() {
        return logoId;
    }

    public void setLogoId(String logoId) {
        this.logoId = logoId;
    }
    

}
