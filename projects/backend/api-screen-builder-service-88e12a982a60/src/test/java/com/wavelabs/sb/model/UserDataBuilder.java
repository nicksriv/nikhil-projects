package com.wavelabs.sb.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.AdminCredentials;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.documents.RoleModules;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.UserBankDetails;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Gender;
import com.wavelabs.sb.enums.Status;
//import com.wavelabs.sb.request.ChangePasswordRequest;
//import com.wavelabs.sb.request.EmployeeRequest;
//import com.wavelabs.sb.request.FetchAllUsersRequest;
//import com.wavelabs.sb.request.LocationRequest;
//import com.wavelabs.sb.request.ReferralRequest;
//import com.wavelabs.sb.request.ReportingManagerRequest;
//import com.wavelabs.sb.request.UserBankRequest;
//import com.wavelabs.sb.request.UserCredentialsEmailRequest;
//import com.wavelabs.sb.request.UserRequest;
import com.wavelabs.sb.response.BaseResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;

public class UserDataBuilder {


    public static Users getUser() {
	Users users = new Users();
	users.setAadharNumber("626255558551");
	users.setAddress("KPHB");
	users.setArea("KPHB");
	users.setCity("Hyderabad");
	users.setClientId("clientId");
	users.setCountry("IN");
	users.setCreatedAt(Instant.now());
	users.setDateofBirth(new Date());
	users.setDateOfJoining(new Date());
	users.setDeleted(false);
	users.setFirstname("Vijay");
	users.setLastname("Pitla");
	users.setLocations(new ArrayList<>());
	users.setMiddlename("Kumar");
	users.setModifiedAt(Instant.now());
	users.setOfficialEmail("vijayp@wavelabs.ai");
	users.setPanNumber("AAAAA9999A");
	users.setPersonnelEmail("vijay@gmail.com");
	users.setPersonnelPhoneNumber("9999777743");
	users.setPincode("500076");
	users.setReferedEmployeeRole(null);
	users.setRefferedEmployeeId(null);
	users.setRefferedEmployeeName(null);
	users.setReportingManagerId(null);
	users.setReportingManagerName("AJAY");
	users.setReportingManagerRole(null);
	users.setState("TS");
	users.setStatus(Status.ACTIVE);
	users.setTypeOfEmployment("Full Time");
	users.setUserId("EMP0012");
	users.setId("614d79f33f1d4026be53d232");
	users.setUserCredentials(getUserCredentials());
	users.setRoles(getRoleOnboardingList());
	return users;

    }
    public static List<RoleOnboardingDetails> getRoleOnboardingList() {
    	List<RoleOnboardingDetails> listOfRole=new ArrayList<>();
    	RoleOnboardingDetails details = new RoleOnboardingDetails();
		details.setClientId("clientId");
		List<RoleModules> modules = new ArrayList<>();
		RoleModules module = new RoleModules();
		module.setId("moduleId");
		module.setName("ModuleName");
		module.setStatus(Status.ACTIVE);
		modules.add(module);
		details.setModule(modules);
		details.setRole("Role");
		details.setDeleted(false);
		details.setId("613a080fb75b44660a46a79b");
		details.setStatus(Status.ACTIVE);
		listOfRole.add(details);
		return listOfRole;
    }









    public static UserCredentials getUserCredentials() {
	UserCredentials userCredentials = new UserCredentials();
	userCredentials.setCreatedAt(Instant.now());
	userCredentials.setId("id");
	userCredentials.setModifiedAt(Instant.now());
	userCredentials.setName("name");
	userCredentials.setPassword("password");
	userCredentials.setUserId("userId");
	return userCredentials;
    }











	public static Users getUsersIdNull() {
		Users users = new Users();
		users.setAadharNumber("626255558551");
		users.setAddress("KPHB");
		users.setArea("KPHB");
		users.setCity("Hyderabad");
		users.setClientId("clientId");
		users.setCountry("IN");
		users.setCreatedAt(Instant.now());
		users.setDateofBirth(new Date());
		users.setDateOfJoining(new Date());
		users.setDeleted(false);
		users.setFirstname("Vijay");
		users.setLastname("Pitla");
		users.setLocations(new ArrayList<>());
		users.setMiddlename("Kumar");
		users.setModifiedAt(Instant.now());
		users.setOfficialEmail("vijayp@wavelabs.ai");
		users.setPanNumber("AAAAA9999A");
		users.setPersonnelEmail("vijay@gmail.com");
		users.setPersonnelPhoneNumber("9999777743");
		users.setPincode("500076");
		users.setReferedEmployeeRole(null);
		users.setRefferedEmployeeId(null);
		users.setRefferedEmployeeName(null);
		users.setReportingManagerId(null);
		users.setReportingManagerName("AJAY");
		users.setReportingManagerRole(null);
		users.setState("TS");
		users.setStatus(Status.ACTIVE);
		users.setTypeOfEmployment("Full Time");
		users.setUserId("");
		users.setId("614d79f33f1d4026be53d232");
		users.setUserCredentials(getUserCredentials());
		users.setRoles(ChartsData.getRoleOnboardingList());
		return users;
	}

	public static Users getUsersWithoutCredentials() {
		Users users = new Users();
		users.setAadharNumber("626255558551");
		users.setId("614d79f33f1d4026be53d232");
		
		users.setRoles(getRoleOnboardingList());
		users.setUserCredentials(null);
		return users;

	}

	public static Object getRoleOnboardingDetails() {
		RoleOnboardingDetails roleOnboardingDetails=new RoleOnboardingDetails();
		roleOnboardingDetails.setRole("Admin");
		roleOnboardingDetails.setDescription("test-Description");
		return roleOnboardingDetails;
	}
	
}
