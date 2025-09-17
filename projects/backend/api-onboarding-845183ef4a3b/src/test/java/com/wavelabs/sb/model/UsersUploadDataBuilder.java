package com.wavelabs.sb.model;

import java.util.ArrayList;
import java.util.List;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.request.ReferralRequest;
import com.wavelabs.sb.request.ReportingManagerRequest;
import com.wavelabs.sb.request.UploadUserRequest;
import com.wavelabs.sb.response.ErrorRecord;

public class UsersUploadDataBuilder {

    public static UploadUserRequest getUserRequest() {
	UploadUserRequest request = new UploadUserRequest();
	request.setAadharNumber("112233445566");
	request.setAddress("#201, 1st street");
	request.setArea("Hi-tech city");
	request.setCity("Hyderabad");
	request.setContactNumber("1234567890");
	request.setCountry("India");
	request.setDob("12-12-2001");
	request.setEmployeeEmail("test@gmail.com");
	request.setEmployeeId("EMP2133");
	request.setFirstName("Charan");
	request.setGender("Male");
	request.setJoiningDate("12-12-2019");
	request.setLastName("Raj");
	request.setMiddleName(null);	
	request.setPan("BGFPT2345G");
	request.setPersonalEmail("charan@gmail.com");
	request.setPinCode("123456");
	request.setState("Telangana");
	request.setTypeOfEmployment("Full time");
	request.setLocation("STR1111");
	ReferralRequest referral = new ReferralRequest();
	referral.setId("EMP1345");
	referral.setName("Raj");
	referral.setRole("Assistant Manager");
	request.setReferral(referral );
	ReportingManagerRequest reportManager = new ReportingManagerRequest();
	reportManager.setId("EMP4345");
	reportManager.setName("Tej");
	reportManager.setRole("Manager");
	request.setReportingManager(reportManager);
	List<String> roles =new ArrayList<>();
	roles.add("Role");
	request.setRoles(roles );
	return request;
    }
    
    public static ErrorRecord getErrorRecord() {
	ErrorRecord errorRecord= new ErrorRecord();
	errorRecord.setRowId(2);
	errorRecord.setMessage(Constants.USER_ONBOARDED);
	return errorRecord;
    }
    
    public static UploadUserRequest getUserRequestWithRoleIsSiteManager() {
    	UploadUserRequest request = new UploadUserRequest();
    	request.setEmployeeId("EMP2133");
    	List<String> roles =new ArrayList<>();
    	roles.add("site manager");
    	request.setRoles(roles );
    	return request;
        }

}
