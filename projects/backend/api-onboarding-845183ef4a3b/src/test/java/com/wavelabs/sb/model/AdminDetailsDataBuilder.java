package com.wavelabs.sb.model;

import com.wavelabs.sb.documents.AdminCredentials;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.enums.Gender;
import com.wavelabs.sb.request.CreateAdminRequest;
import com.wavelabs.sb.response.SuccessResponse;

public class AdminDetailsDataBuilder {

	public static  CreateAdminRequest getAdminDetailsRequest() {
		CreateAdminRequest adminDetails=new CreateAdminRequest();
		adminDetails.setArea("test-area");
		adminDetails.setAddress("test-hyd");
		adminDetails.setAadharNumber("9999 8888 7777");
		adminDetails.setFullName("test-fullname");
		adminDetails.setGender("Male");
		adminDetails.setPanNumber("test-panNumber");
		adminDetails.setMobile("1234567890");
		adminDetails.setId("test-id");
		adminDetails.setDob("15-06-1979");
		return adminDetails;
	}


	public static SuccessResponse getTestSuccessResponse() {
		SuccessResponse successResponse = new SuccessResponse();
		successResponse.setId("test-id");
		successResponse.setMessage("test-message");
		return successResponse;
	}

	public static AdminDetails getAdminDetails() {
		AdminDetails adminDetails=new AdminDetails();
		AdminCredentials adminCredentials=new AdminCredentials();
		adminCredentials.setAdminId("test-adminId");
		adminCredentials.setPassword("test-password");
		adminDetails.setId("test-id");
		adminDetails.setAdminId("test-adminId");
		adminDetails.setAddress("test-hyd");
		adminDetails.setCity("test-city");
		adminDetails.setArea("test-area");
		adminDetails.setGender(Gender.MALE);
		adminDetails.setState("test-state");
		adminDetails.setFullName("test-fullName");
		adminDetails.setMobile("1234567890");
		adminDetails.setAdminCredentials(adminCredentials);
		return  adminDetails;
	}

	public static AdminDetails getAdminDetailsWithNullCredentials() {
		AdminDetails adminDetails=new AdminDetails();
		AdminCredentials adminCredentials=new AdminCredentials();
		adminCredentials.setAdminId("test-adminId");
		adminCredentials.setPassword("test-password");
		adminDetails.setId("test-id");
		adminDetails.setAdminId("test-adminId");
		adminDetails.setAddress("test-hyd");
		adminDetails.setCity("test-city");
		adminDetails.setArea("test-area");
		adminDetails.setGender(Gender.MALE);
		adminDetails.setState("test-state");
		adminDetails.setFullName("test-fullName");
		adminDetails.setMobile("1234567890");
		adminDetails.setAdminCredentials(adminCredentials);
		return  adminDetails;
	}
	public static AdminDetails getAdminDetailsRequestMobile() {
		AdminDetails adminDetails=new AdminDetails();
		AdminCredentials adminCredentials=new AdminCredentials();
		adminCredentials.setAdminId("test-adminId");
		adminCredentials.setPassword("test-password");
		adminDetails.setId("test2-id");
		adminDetails.setAdminId("test-adminId");
		adminDetails.setAddress("test-hyd");
		adminDetails.setCity("test-city");
		adminDetails.setArea("test-area");
		adminDetails.setGender(Gender.MALE);
		adminDetails.setState("test-state");
		adminDetails.setFullName("test-fullName");
		adminDetails.setMobile("1234567890");
		adminDetails.setAdminCredentials(adminCredentials);
		return  adminDetails;
	}

	public static AdminCredentials getAdminCredentials() {
		AdminCredentials adminCredentials=new AdminCredentials();
		adminCredentials.setAdminId("test-adminId");
		adminCredentials.setPassword("test-password");
		return adminCredentials;
	}
}
