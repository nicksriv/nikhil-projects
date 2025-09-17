package com.wavelabs.sb.documents;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.wavelabs.sb.enums.Gender;

@Document(collection = "admin-details")
public class AdminDetails extends BaseDocument {

    @Id
    private String id;
    private String fullName;
    private Gender gender;
    private String mobile;
    private String email;
    private String panNumber;
    private String aadharNumber;
    private String pincode;
    private String address;
    private String area;
    private String state;
    private String city;
    private String country;
    private boolean deleted;
    private Date dateofBirth;
    private String adminId;

    @DBRef
    private AdminCredentials adminCredentials;

    @DBRef
    private Files profileImage;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getFullName() {
	return fullName;
    }

    public void setFullName(String fullName) {
	this.fullName = fullName;
    }

    public Gender getGender() {
	return gender;
    }

    public void setGender(Gender gender) {
	this.gender = gender;
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

    public String getPanNumber() {
	return panNumber;
    }

    public void setPanNumber(String panNumber) {
	this.panNumber = panNumber;
    }

    public String getAadharNumber() {
	return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
	this.aadharNumber = aadharNumber;
    }

    public String getPincode() {
	return pincode;
    }

    public void setPincode(String pincode) {
	this.pincode = pincode;
    }

    public String getAddress() {
	return address;
    }

    public void setAddress(String address) {
	this.address = address;
    }

    public String getArea() {
	return area;
    }

    public void setArea(String area) {
	this.area = area;
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

    public boolean isDeleted() {
	return deleted;
    }

    public void setDeleted(boolean deleted) {
	this.deleted = deleted;
    }

    public Date getDateofBirth() {
	return dateofBirth;
    }

    public void setDateofBirth(Date dateofBirth) {
	this.dateofBirth = dateofBirth;
    }

    public String getAdminId() {
	return adminId;
    }

    public void setAdminId(String adminId) {
	this.adminId = adminId;
    }

    public AdminCredentials getAdminCredentials() {
	return adminCredentials;
    }

    public void setAdminCredentials(AdminCredentials adminCredentials) {
	this.adminCredentials = adminCredentials;
    }

    public Files getProfileImage() {
	return profileImage;
    }

    public void setProfileImage(Files profileImage) {
	this.profileImage = profileImage;
    }

}
