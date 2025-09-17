/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.client;

import com.brandpulse.fv.common.childDocument.BaseDocument;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author ts
 */
@Getter
@Setter
@NoArgsConstructor
@Document("client-onboarding-details")
public class Client extends BaseDocument {

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
    private String firstName;
    private String middleName;
    private String lastName;
    private String mobile;
    private String email;
    private boolean hasEditTheme;
    private boolean hasEditWorkflow;

    private double backgroundImageOpacity;

    public boolean isHasEditTheme() {
        return hasEditTheme;
    }

    public void setHasEditTheme(boolean hasEditTheme) {
        this.hasEditTheme = hasEditTheme;
    }

    public boolean isHasEditWorkflow() {
        return hasEditWorkflow;
    }

    public void setHasEditWorkflow(boolean hasEditWorkflow) {
        this.hasEditWorkflow = hasEditWorkflow;
    }

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

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public double getBackgroundImageOpacity() {
        return backgroundImageOpacity;
    }

    public void setBackgroundImageOpacity(double backgroundImageOpacity) {
        this.backgroundImageOpacity = backgroundImageOpacity;
    }

}
