package com.wavelabs.sb.documents;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.wavelabs.sb.enums.Gender;

@Document(collection = "users")
public class Users extends ModifierDocument {

    @Id
    private String id;
    private String clientId;
    // Don't use this Id for any API's As of now
    private String userId;
    private String firstname;
    private String middlename;
    private String lastname;
    private Date dateofBirth;
    private String personnelEmail;
    private String personnelPhoneNumber;
    private Gender gender;
    private String panNumber;
    private String aadharNumber;
    private String address;
    private String area;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private List<String> locations;

    private List<LocationMapping> locationMapping;

    @DBRef
    private UserBankDetails bank;
    private String typeOfEmployment;
    private Date dateOfJoining;
    private String officialEmail;
    private boolean deleted;
    private String refferedEmployeeId;
    private String refferedEmployeeName;
    private String referedEmployeeRole;
    private String reportingManagerId;
    private String reportingManagerName;
    private String reportingManagerRole;
    @DBRef
    private UserCredentials userCredentials;

    @DBRef
    private List<RoleOnboardingDetails> roles;

    @DBRef
    private Files profileImage;

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

    public String getUserId() {
	return userId;
    }

    public void setUserId(String userId) {
	this.userId = userId;
    }

    public String getFirstname() {
	return firstname;
    }

    public void setFirstname(String firstname) {
	this.firstname = firstname;
    }

    public String getMiddlename() {
	return middlename;
    }

    public void setMiddlename(String middlename) {
	this.middlename = middlename;
    }

    public String getLastname() {
	return lastname;
    }

    public void setLastname(String lastname) {
	this.lastname = lastname;
    }

    public Date getDateofBirth() {
	return dateofBirth;
    }

    public void setDateofBirth(Date dateofBirth) {
	this.dateofBirth = dateofBirth;
    }

    public String getPersonnelEmail() {
	return personnelEmail;
    }

    public void setPersonnelEmail(String personnelEmail) {
	this.personnelEmail = personnelEmail;
    }

    public String getPersonnelPhoneNumber() {
	return personnelPhoneNumber;
    }

    public void setPersonnelPhoneNumber(String personnelPhoneNumber) {
	this.personnelPhoneNumber = personnelPhoneNumber;
    }

    public Gender getGender() {
	return gender;
    }

    public void setGender(Gender gender) {
	this.gender = gender;
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

    public String getCity() {
	return city;
    }

    public void setCity(String city) {
	this.city = city;
    }

    public String getState() {
	return state;
    }

    public void setState(String state) {
	this.state = state;
    }

    public String getCountry() {
	return country;
    }

    public void setCountry(String country) {
	this.country = country;
    }

    public String getPincode() {
	return pincode;
    }

    public void setPincode(String pincode) {
	this.pincode = pincode;
    }

    public List<String> getLocations() {
	return locations;
    }

    public void setLocations(List<String> locations) {
	this.locations = locations;
    }

    public List<LocationMapping> getLocationMapping() {
        return locationMapping;
    }
    
    public void setLocationMapping(List<LocationMapping> locationMapping) {
        this.locationMapping = locationMapping;
    }

    public UserBankDetails getBank() {
	return bank;
    }

    public void setBank(UserBankDetails bank) {
	this.bank = bank;
    }

    public String getTypeOfEmployment() {
	return typeOfEmployment;
    }

    public void setTypeOfEmployment(String typeOfEmployment) {
	this.typeOfEmployment = typeOfEmployment;
    }

    public Date getDateOfJoining() {
	return dateOfJoining;
    }

    public void setDateOfJoining(Date dateOfJoining) {
	this.dateOfJoining = dateOfJoining;
    }

    public String getOfficialEmail() {
	return officialEmail;
    }

    public void setOfficialEmail(String officialEmail) {
	this.officialEmail = officialEmail;
    }

    public boolean isDeleted() {
	return deleted;
    }

    public void setDeleted(boolean deleted) {
	this.deleted = deleted;
    }

    public String getRefferedEmployeeId() {
	return refferedEmployeeId;
    }

    public void setRefferedEmployeeId(String refferedEmployeeId) {
	this.refferedEmployeeId = refferedEmployeeId;
    }

    public String getRefferedEmployeeName() {
	return refferedEmployeeName;
    }

    public void setRefferedEmployeeName(String refferedEmployeeName) {
	this.refferedEmployeeName = refferedEmployeeName;
    }

    public String getReferedEmployeeRole() {
	return referedEmployeeRole;
    }

    public void setReferedEmployeeRole(String referedEmployeeRole) {
	this.referedEmployeeRole = referedEmployeeRole;
    }

    public String getReportingManagerId() {
	return reportingManagerId;
    }

    public void setReportingManagerId(String reportingManagerId) {
	this.reportingManagerId = reportingManagerId;
    }

    public String getReportingManagerName() {
	return reportingManagerName;
    }

    public void setReportingManagerName(String reportingManagerName) {
	this.reportingManagerName = reportingManagerName;
    }

    public String getReportingManagerRole() {
	return reportingManagerRole;
    }

    public void setReportingManagerRole(String reportingManagerRole) {
	this.reportingManagerRole = reportingManagerRole;
    }

    public UserCredentials getUserCredentials() {
	return userCredentials;
    }

    public void setUserCredentials(UserCredentials userCredentials) {
	this.userCredentials = userCredentials;
    }

    @Override
    public String toString() {
	return "Users [id=" + id + ", clientId=" + clientId + ", userId=" + userId + ", firstname=" + firstname
		+ ", middlename=" + middlename + ", lastname=" + lastname + ", dateofBirth=" + dateofBirth
		+ ", personnelEmail=" + personnelEmail + ", personnelPhoneNumber=" + personnelPhoneNumber + ", gender="
		+ gender + ", panNumber=" + panNumber + ", aadharNumber=" + aadharNumber + ", address=" + address
		+ ", area=" + area + ", city=" + city + ", state=" + state + ", country=" + country + ", pincode="
		+ pincode + ", locations=" + locations + ", bank=" + bank + ", typeOfEmployment=" + typeOfEmployment
		+ ", dateOfJoining=" + dateOfJoining + ", officialEmail=" + officialEmail + ", deleted=" + deleted
		+ ", refferedEmployeeId=" + refferedEmployeeId + ", refferedEmployeeName=" + refferedEmployeeName
		+ ", referedEmployeeRole=" + referedEmployeeRole + ", reportingManagerId=" + reportingManagerId
		+ ", reportingManagerName=" + reportingManagerName + ", reportingManagerRole=" + reportingManagerRole
		+ ", userCredentials=" + userCredentials + ", roles=" + roles + "]";
    }

    public List<RoleOnboardingDetails> getRoles() {
	return roles;
    }

    public void setRoles(List<RoleOnboardingDetails> roles) {
	this.roles = roles;
    }

    public Files getProfileImage() {
	return profileImage;
    }

    public void setProfileImage(Files profileImage) {
	this.profileImage = profileImage;
    }

}
