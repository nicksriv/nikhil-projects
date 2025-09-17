package com.wavelabs.sb.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.mock.web.MockMultipartFile;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.*;
import com.wavelabs.sb.enums.FileType;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.AuthenticateUserRequest;
import com.wavelabs.sb.request.ChangePasswordRequest;
import com.wavelabs.sb.request.EmployeeRequest;
import com.wavelabs.sb.request.FetchAllUsersRequest;
import com.wavelabs.sb.request.LocationRequest;
import com.wavelabs.sb.request.ReferralRequest;
import com.wavelabs.sb.request.ReportingManagerRequest;
import com.wavelabs.sb.request.SearchEmployee;
import com.wavelabs.sb.request.ThemeRequest;
import com.wavelabs.sb.request.UpdatePasswordRequest;
import com.wavelabs.sb.request.UploadProfileImageRequest;
import com.wavelabs.sb.request.UserBankRequest;
import com.wavelabs.sb.request.UserCredentialsEmailRequest;
import com.wavelabs.sb.request.UserProfileUpdateRequest;
import com.wavelabs.sb.request.UserRequest;
import com.wavelabs.sb.response.BaseResponse;
import com.wavelabs.sb.response.EmployeeInfo;
import com.wavelabs.sb.response.ErrorRecord;
import com.wavelabs.sb.response.LocationDetails;
import com.wavelabs.sb.response.LocationDetailsResponse;
import com.wavelabs.sb.response.LoginResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.RoleDetails;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.ThemeResponse;
import com.wavelabs.sb.response.UserBankDetailsResponse;
import com.wavelabs.sb.response.UserCredentialsEmailResponse;
import com.wavelabs.sb.response.UserCredentialsResponse;
import com.wavelabs.sb.response.UserDetails;
import com.wavelabs.sb.response.UserProfileDetails;
import com.wavelabs.sb.response.ViewBulkUploadResponse;

public class UserDataBuilder {

    public static UserRequest getUserRequest() {
	UserRequest userRequest = new UserRequest();
	userRequest.setAadharNumber("626255558551");
	userRequest.setAddress("KPHB");
	userRequest.setArea("KPHB");
	userRequest.setCity("Hyderabad");
	userRequest.setContactNumber("9999777743");
	userRequest.setCountry("IN");
	userRequest.setDob("12-05-1996");
	userRequest.setFirstName("Vijay");
	userRequest.setGender("Male");
	userRequest.setLastName("Pilta");
	userRequest.setState("TS");
	userRequest.setPinCode("500076");
	userRequest.setPersonalEmail("vijay@wavelabs.ai");
	userRequest.setPan("AAAAA9999A");
	userRequest.setMiddleName("Kumar");
	return userRequest;
    }

    public static UserRequest getUserRequestContactNumber() {
	UserRequest userRequest = new UserRequest();
	userRequest.setAadharNumber("626255558551");
	userRequest.setAddress("KPHB");
	userRequest.setArea("KPHB");
	userRequest.setCity("Hyderabad");
	userRequest.setContactNumber("9999777743");
	userRequest.setCountry("IN");
	userRequest.setDob("12-05-1996");
	userRequest.setFirstName("Vijay");
	userRequest.setGender("Male");
	userRequest.setLastName("Pilta");
	userRequest.setState("TS");
	userRequest.setPinCode("500076");
	userRequest.setPersonalEmail("vijay@wavelabs.ai");
	userRequest.setPan("AAAAA9999A");
	userRequest.setMiddleName("Kumar");
	return userRequest;
    }

    public static Users getUser11() {
	Users users = new Users();
	users.setAadharNumber("626255558551");
	users.setAddress("KPHB");
	users.setArea("KPHB");
	users.setCity("Hyderabad");
	users.setClientId("");
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
	users.setOfficialEmail(null);
	users.setPanNumber("AAAAA9999A");
	users.setPersonnelEmail("vijay@wavelabs.ai");
	users.setPersonnelPhoneNumber("9999777743");
	users.setPincode("500076");
	users.setReferedEmployeeRole(null);
	users.setRefferedEmployeeId(null);
	users.setRefferedEmployeeName(null);
	users.setReportingManagerId(null);
	users.setReportingManagerName("AJAY");
	users.setReportingManagerRole(null);
	users.setRoles(RoleDataBuilder.getRoleOnboardingList());
	users.setState("TS");
	users.setStatus(Status.ACTIVE);
	users.setTypeOfEmployment("Full Time");
	users.setUserId("EFB0234");
	users.setBank(getUserBankDetails());
	users.setId("614d79f33f1d4026be53d232");
	return users;
    }

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
	users.setRoles(RoleDataBuilder.getRoleOnboardingList());
	return users;

    }

    public static FetchAllUsersRequest getFetchAllUserReq() {
	FetchAllUsersRequest request = new FetchAllUsersRequest();
	request.setAgeFrom("10");
	request.setAgeTo("40");
	request.setArea("KPHB");
	request.setContactNumber("9999777743");
	request.setEmployeeName("ABC");
	request.setEmployeeId("EFB0234");
	request.setFrom("1998-02-13");
	request.setGender("Male");
	request.setMappedStore("STR001");
	request.setPageNumber(Optional.of(Integer.valueOf(1)));
	request.setReportingManager("AJAY");
	request.setRole("Reporting Manager");
	request.setSize(null);
	request.setSortBy(Optional.of(FetchUserColumnOrder.valueOf("REPORTING_MANAGER")));
	request.setTo("04-02-1997");
	request.setStatus(Status.ACTIVE);
	request.setSortOrder(Optional.of("ACS"));
	return request;
    }

    public static FetchAllUsersRequest getFetchAllUserRequest() {
	FetchAllUsersRequest request = new FetchAllUsersRequest();
	request.setAgeFrom("10");
	request.setAgeTo("40");
	request.setArea("KPHB");
	request.setContactNumber("9999777743");
	request.setEmployeeName(null);
	request.setEmployeeId("EFB0234");
	request.setFrom(null);
	request.setGender("Male");
	request.setMappedStore(null);
	request.setPageNumber(Optional.of(Integer.valueOf(1)));
	request.setReportingManager("AJAY");
	request.setRole("Reporting Manager");
	request.setSize(null);
	request.setSortBy(Optional.of(FetchUserColumnOrder.valueOf("REPORTING_MANAGER")));
	request.setTo(null);
	request.setStatus(Status.ACTIVE);
	request.setSortOrder(Optional.of("ACS"));
	return request;
    }

    public static @Valid UserRequest getUserRequestWithInvalidDate() {
	UserRequest userRequest = getUserRequest();
	userRequest.setDob("12/05/1996");
	return userRequest;
    }

    public static SuccessResponse toResponse() {
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId("STR001");
	successResponse.setMessage("user locations updated successfully");
	return successResponse;
    }

    public static SuccessResponse toSuccessResponse() {
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId("EFB0234");
	successResponse.setMessage("Password changed successfully");
	return successResponse;
    }

    public static Users getUserWithEmployeeDeatils() {
	Users users = new Users();
	users.setAadharNumber("626255558551");
	users.setAddress("KPHB");
	users.setArea("KPHB");
	users.setCity("Hyderabad");
	users.setClientId("Te0001");
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
	users.setOfficialEmail("vijay@wavelabs.ai");
	users.setPanNumber("AAAAA9999A");
	users.setPersonnelEmail("vijay@wavelabs.ai");
	users.setPersonnelPhoneNumber("9999777743");
	users.setPincode("500076");
	users.setReferedEmployeeRole("");
	users.setRefferedEmployeeId("EFO7777");
	users.setRefferedEmployeeName("Pooja");
	users.setReportingManagerId(null);
	users.setReportingManagerName("Hanika");
	users.setReportingManagerRole("");
	users.setRoles(RoleDataBuilder.getRoleOnboardingList());
	users.setState("TS");
	users.setStatus(Status.ACTIVE);
	users.setTypeOfEmployment("Full Time");
	users.setUserId(null);
	users.setId("614d79f33f1d4026be53d232");
	return users;
    }

    public static EmployeeRequest getUserEmployementDetailsWithInvalidDate() {
	EmployeeRequest employeeRequest = getUserEmployementDetails();
	employeeRequest.setJoiningDate("12/03/1998");
	return employeeRequest;
    }

    public static EmployeeRequest getUserEmployementDetails() {
	EmployeeRequest employeeRequest = new EmployeeRequest();
	employeeRequest.setEmail("Vijayp@wavelabs.ai");
	employeeRequest.setEmployeeId("EFO6666");
	employeeRequest.setJoiningDate("12-03-1998");
	employeeRequest.setReferral(getReferral());
	employeeRequest.setReportingManager(getReportingManager());
	employeeRequest.setStatus("ACTIVE");
	employeeRequest.setTypeOfEmployment(null);
	employeeRequest.setRoles(new ArrayList<>());
	return employeeRequest;
    }

    private static ReportingManagerRequest getReportingManager() {
	ReportingManagerRequest reportingManagerRequest = new ReportingManagerRequest();
	reportingManagerRequest.setId("EFO6767");
	reportingManagerRequest.setName("Ajay");
	reportingManagerRequest.setRole("Reporting Manager");
	return reportingManagerRequest;

    }

    private static ReferralRequest getReferral() {
	ReferralRequest referralRequest = new ReferralRequest();
	referralRequest.setId("EFO6767");
	referralRequest.setName("Ajay");
	referralRequest.setRole("Reporting Manager");
	return referralRequest;
    }

    public static Users getUserUpdateLocations() {
	Users users = new Users();
	users.setAadharNumber("626255558551");
	users.setAddress("KPHB");
	users.setArea("KPHB");
	users.setCity("Hyderabad");
	users.setClientId("");
	users.setCountry("IN");
	users.setCreatedAt(Instant.now());
	users.setDateofBirth(new Date());
	users.setDateOfJoining(new Date());
	users.setDeleted(false);
	users.setFirstname("Vijay");
	users.setLastname("Pitla");
	users.setLocations(Arrays.asList("STR001", "STR002"));
	users.setMiddlename("Kumar");
	users.setModifiedAt(Instant.now());
	users.setOfficialEmail(null);
	users.setPanNumber("AAAAA9999A");
	users.setPersonnelEmail("vijay@wavelabs.ai");
	users.setPersonnelPhoneNumber("9999777743");
	users.setPincode("500076");
	users.setReferedEmployeeRole(null);
	users.setRefferedEmployeeId(null);
	users.setRefferedEmployeeName(null);
	users.setReportingManagerId(null);
	users.setReportingManagerName(null);
	users.setReportingManagerRole(null);
	users.setRoles(RoleDataBuilder.getRoleOnboardingList());
	users.setState("TS");
	users.setStatus(Status.ACTIVE);
	users.setTypeOfEmployment(null);
	users.setUserId("EFB0234");
	users.setId("614d79f33f1d4026be53d232");
	return users;

    }

    public static BaseResponse updateUserBasicDetailsResponse() {
	BaseResponse baseResponse = new BaseResponse();
	baseResponse.setMessage(Constants.USER_UPDATED);
	return baseResponse;
    }

    public static PaginationResponse<Users> getPaginationListOfUsers() {
	PaginationResponse<Users> response = new PaginationResponse<>();
	List<Users> list = new ArrayList<>();
	list.add(getUser());
	response.setData(list);
	response.setMessage("Data Fetched Successfully....!");
	response.setSize(1L);
	return response;
    }

    public static LocationDetailsResponse getLocationDetailsResponse() {
	LocationDetailsResponse response = new LocationDetailsResponse();
	List<LocationDetails> list = new ArrayList<>();
	LocationDetails locationDetails = new LocationDetails();
	locationDetails.setAddress("address");
	locationDetails.setManagers(Arrays.asList(getManagerList()));
	list.add(locationDetails);
	response.setLocations(list);
	response.setTotal(1);
	return response;
    }

    public static EmployeeInfo getManagerList() {
	EmployeeInfo info = new EmployeeInfo();
	info.setEmail("test@email.in");
	info.setFirstName("firstName");
	info.setLastName("lastName");
	info.setMiddleName("middelName");
	info.setId("test-emplyee-id");
	info.setMobile("7878787878");
	return info;
    }

    public static List<Object> getListOfUser() {
	return Arrays.asList(getUser());
    }

    public static List<Users> getUsersList() {
	Users users = getUser();
	users.setUserId("id");
	users.setBank(getUserBankDetails());
	List<Users> usersList = new ArrayList<>();
	usersList.add(users);
	return usersList;

    }

    public static StoreLocations getStoreLocations() {
	StoreLocations locations = new StoreLocations();
	locations.setAddress("address");
	locations.setClientId("clientId");
	locations.setCreatedAt(Instant.now());
	locations.setManagerEmployeeId("managerEmployeeId");
	locations.setDeleted(false);
	locations.setManagerName("managerName");
	locations.setPhoneNumber("1234567890");
	locations.setStatus(Status.ACTIVE);
	locations.setStoreId("storeId");
	locations.setModifiedAt(Instant.now());
	return locations;
    }

    public static LocationRequest getInvalidLocationsa() {
	LocationRequest request = new LocationRequest();
	List<String> list = new ArrayList<>();
	list.add("STR001");
	list.add("STR002");
	List<String> deletedList = new ArrayList<>();
	deletedList.add("STR001");
	deletedList.add("STR002");
//	request.setMappedStores(list);
//	request.setDeletedStores(deletedList);
	return request;
    }

    public static SuccessResponse deleteResponse() {
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId("STR001");
	successResponse.setMessage("user is deleted successfully");
	return successResponse;
    }

    public static SuccessResponse updateLocationsSuccessResponse() {
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId("test-id");
	successResponse.setMessage(Constants.USER_LOCATIONS_UPDATED_SUCCESSFULLY);
	return successResponse;
    }

    public static SuccessResponse getTestSuccessResponse() {
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId("test-id");
	successResponse.setMessage("test-message");
	return successResponse;
    }

    public static SuccessResponse getSuccessResponse() {
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId("test-id");
	successResponse.setMessage(Constants.PASSWORD_CHANGED_SUCCESSFULLY);
	return successResponse;
    }

    public static SuccessResponse getUserProfileUpdateSuccessResponse() {
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId("test-id");
	successResponse.setMessage(Constants.PROFILE_UPDATE_SUCCESS);
	return successResponse;
    }

    public static List<StoreLocations> getStoreLocationsList() {
	List<StoreLocations> list = new ArrayList<>();
	list.add(getStoreLocations());
	return list;

    }

    public static LocationRequest getLocationsNull() {
	LocationRequest request = new LocationRequest();
	List<String> deletedList = new ArrayList<>();
	deletedList.add("STR003");
	deletedList.add("STR004");
	request.setSiteIdsToDelete(deletedList);
	return request;
    }

	public static LocationRequest getLocations() {
		LocationRequest request = new LocationRequest();
		List<String> list = new ArrayList<>();
		List<LocationMapping> locationMappings = new ArrayList<>();

		list.add("STR001");
		list.add("STR002");
		List<String> deletedList = new ArrayList<>();
		deletedList.add("STR003");
		deletedList.add("STR004");
		request.setSiteIdsToDelete(deletedList);
		request.setSitesToMap(locationMappings);
		return request;
	}

    public static LocationRequest getInvalidLocations() {
	LocationRequest request = new LocationRequest();
	List<String> list = new ArrayList<>();
	list.add("STR001");
	list.add("STR002");
	List<String> deletedList = new ArrayList<>();
	deletedList.add("STR001");
	deletedList.add("STR002");
//	request.setMappedStores(list);
//	request.setDeletedStores(deletedList);
	return request;
    }

    public static Users getUserUpdateLocationsIsNull() {
	Users users = new Users();
	users.setAadharNumber("626255558551");
	users.setAddress("KPHB");
	users.setArea("KPHB");
	users.setCity("Hyderabad");
	users.setClientId("");
	users.setCountry("IN");
	users.setCreatedAt(Instant.now());
	users.setDateofBirth(new Date());
	users.setDateOfJoining(new Date());
	users.setDeleted(false);
	users.setFirstname("Vijay");
	users.setLastname("Pitla");
	users.setLocations(null);
	users.setMiddlename("Kumar");
	users.setModifiedAt(Instant.now());
	users.setOfficialEmail(null);
	users.setPanNumber("AAAAA9999A");
	users.setPersonnelEmail("vijay@wavelabs.ai");
	users.setPersonnelPhoneNumber("9999777743");
	users.setPincode("500076");
	users.setReferedEmployeeRole(null);
	users.setRefferedEmployeeId(null);
	users.setRefferedEmployeeName(null);
	users.setReportingManagerId(null);
	users.setReportingManagerName(null);
	users.setReportingManagerRole(null);
	users.setRoles(null);
	users.setState("TS");
	users.setStatus(Status.ACTIVE);
	users.setTypeOfEmployment(null);
	users.setUserId("EFB0234");
	users.setId("614d79f33f1d4026be53d232");
	return users;

    }

    public static UserBankDetails getUserBankDetails() {
	UserBankDetails userBankDetails = new UserBankDetails();
	userBankDetails.setAccountNumber("accountNumber");
	userBankDetails.setBranch("branch");
	userBankDetails.setClientId("clientId");
	userBankDetails.setCreatedAt(Instant.now());
	userBankDetails.setId("id");
	userBankDetails.setIfscCode("ifscCode");
	userBankDetails.setModifiedAt(Instant.now());
	userBankDetails.setName("name");
	userBankDetails.setStatus(Status.ACTIVE);
	userBankDetails.setUserId("userId");
	return userBankDetails;
    }

    public static UserBankRequest getUserBankRequest() {
	UserBankRequest userBankRequest = new UserBankRequest();
	userBankRequest.setAccountNumber("accountNumber");
	userBankRequest.setBankName("bankName");
	userBankRequest.setBranchName("branchName");
	userBankRequest.setIfscCode("ifscCode");
	return userBankRequest;
    }

    public static Users getUserWithBankDetails() {
	Users users = getUser();
	users.setBank(null);
	return users;

    }

    public static UserBankDetailsResponse getUserBankDetailsResponse() {
	UserBankDetailsResponse response = new UserBankDetailsResponse();
	response.setAccountNumber("accountNumber");
	response.setBankName("bankName");
	response.setBranchName("branchName");
	response.setIfscCode("ifscCode");
	return response;
    }

    public static Users getUserWithBank() {
	Users users = getUser();
	users.setBank(getUserBankDetails());
	return users;

    }

    public static Users getUserWithBankIsNull() {
	Users users = getUser();
	users.setBank(getUserBankDetailsIsNull());
	return users;

    }

    private static UserBankDetails getUserBankDetailsIsNull() {
	return null;
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

    public static Users getUserIsNull() {
	return null;
    }

    public static ViewBulkUploadResponse getUploadUsersSuccessResponse() {
	ViewBulkUploadResponse bulkUploadResponse = new ViewBulkUploadResponse();
	bulkUploadResponse.setMessage(Constants.USERS_DATA_UPLOADED);
	bulkUploadResponse.setSuccessRecordsCount(1);
	bulkUploadResponse.setFailedRecordsCount(1);
	bulkUploadResponse.setTotalRecordsCount(2);

	List<ErrorRecord> errorRecords = new ArrayList<>();
	ErrorRecord errorRecord = new ErrorRecord();
	errorRecord.setMessage("");
	errorRecord.setRowId(3);
	errorRecords.add(errorRecord);
	bulkUploadResponse.setErrors(errorRecords);
	return bulkUploadResponse;
    }

    public static UserCredentialsResponse getCredentialsResponse() {
	UserCredentialsResponse credentialsResponse = new UserCredentialsResponse();
	credentialsResponse.setJoiningDate(Instant.now());
	credentialsResponse.setPassword("Test#123");
	credentialsResponse.setUserId("6151a665fc1b08043f03a70e");
	credentialsResponse.setUsername("Charan");
	return credentialsResponse;
    }

    public static List<UserDetails> getUserDetails() {
	UserDetails users = new UserDetails();
	List<String> list = new ArrayList<>();
	list.add("STR001");
	list.add("STR002");
	users.setAge(10);
	users.setCity("city");
	users.setContactNumber("contactNumber");
	users.setEmployeeId("employeeId");
	users.setEmployeeName("employeeName");
	users.setGender("gender");
	users.setMappedStores(list);
	users.setReportingManager("reportingManager");
	users.setStatus("status");
	users.setUserId("userId");
	List<RoleDetails> roles = new ArrayList<>();
	RoleDetails role = new RoleDetails();
	role.setId("roleId");
	role.setName("Role");
	roles.add(role);
	users.setRoles(roles);
	return Arrays.asList(users);
    }

    public static PaginationResponse<UserDetails> getUserDetailsPagination() {
	PaginationResponse<UserDetails> response = new PaginationResponse<>();
	response.setData(getUserDetails());
	response.setMessage("Records fetched successfully");
	response.setSize(1L);
	return response;

    }

    public static UserDetails getUsers() {
	UserDetails users = new UserDetails();
	List<String> list = new ArrayList<>();
	list.add("STR001");
	list.add("STR002");
	users.setAge(10);
	users.setCity("city");
	users.setContactNumber("contactNumber");
	users.setEmployeeId("employeeId");
	users.setEmployeeName("employeeName");
	users.setGender("gender");
	users.setMappedStores(list);
	users.setReportingManager("reportingManager");
	users.setStatus("status");
	users.setUserId("userId");
	return users;
    }

    public static Users getChangePasswordOfUser() {
	Users users = new Users();
	users.setAadharNumber("626255558551");
	users.setAddress("KPHB");
	users.setArea("KPHB");
	users.setCity("Hyderabad");
	users.setClientId("");
	users.setCountry("IN");
	users.setCreatedAt(Instant.now());
	users.setDateofBirth(new Date());
	users.setDateOfJoining(new Date());
	users.setDeleted(true);
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
	users.setRoles(RoleDataBuilder.getRoleOnboardingList());
	users.setState("TS");
	users.setStatus(Status.INACTIVE);
	users.setTypeOfEmployment("Full Time");
	users.setUserId("EFB0234");
	users.setId("614d79f33f1d4026be53d232");
	return users;

    }

    public static SuccessResponse sendUserCredentialsEmailResponse() {
	SuccessResponse response = new SuccessResponse();
	response.setId("test-client-id");
	response.setMessage(Constants.CREDENTIALS_SHARED_SUCCESSFULLY);
	return response;
    }

    public static UserCredentialsEmailResponse getUserCredentialsEmailResponse() {
	UserCredentialsEmailResponse credentialsEmailResponse = new UserCredentialsEmailResponse();
	credentialsEmailResponse.setUserId("test-client-id");
	credentialsEmailResponse.setSendTo("charanrajj@wavelabs.ai");
	credentialsEmailResponse.setSubject("Subject");
	credentialsEmailResponse.setTemplate("Hi");
	return credentialsEmailResponse;
    }

    public static UserCredentialsEmailRequest sendUserCredentialsEmailRequest() {
	UserCredentialsEmailRequest userCredentialsEmailRequest = new UserCredentialsEmailRequest();
	userCredentialsEmailRequest.setUserId("test-client-id");
	userCredentialsEmailRequest.setSendTo("charanrajj@wavelabs.ai");
	userCredentialsEmailRequest.setSubject("Subject");
	userCredentialsEmailRequest.setTemplate("Hi");
	return userCredentialsEmailRequest;
    }

    public static ChangePasswordRequest getChangePasswordRequest() {
	ChangePasswordRequest request = new ChangePasswordRequest();
	request.setCurrentPassword("CurrentPassword");
	request.setNewPassword("NewPassword");
	return request;
    }

    public static UserCredentials getUserCredential() {
	UserCredentials user = new UserCredentials();
	user.setUserId("614d79f33f1d4026be53d232");
	user.setPassword("test-password");
	return user;
    }

    public static AuthenticateUserRequest getAuthenticateUserRequest() {
	AuthenticateUserRequest authenticateUserRequest = new AuthenticateUserRequest();
	authenticateUserRequest.setUserId("test-userId");
	authenticateUserRequest.setPassword("dfsdfdsf");
	return authenticateUserRequest;
    }

    public static AuthenticateLoginModel getAuthenticateLoginModel() {
	AuthenticateLoginModel model = new AuthenticateLoginModel();
	model.setBrowser("browser");
	model.setIp("clientIp");
	model.setUserRequest(getAuthenticateUserRequest());
	return model;
    }

    public static LoginResponse getLoginResponse() {
	LoginResponse loginResponse = new LoginResponse();
	loginResponse.setMessage(Constants.USER_LOGIN_SUCCESSFULL);
	loginResponse.setToken("token");
	return loginResponse;
    }

    public static TokenPayLoadDetails getTokenPayLoadRequest() {
	TokenPayLoadDetails loadDetails = new TokenPayLoadDetails();
	loadDetails.setClientId("clientId");
	loadDetails.setUserId("userId");
	loadDetails.setTypeOfUser("User");
	loadDetails.setId("id");
	return loadDetails;
    }

    public static ThemeRequest getThemeRequest() {
	ThemeRequest request = new ThemeRequest();
	request.setFont("FontName");
	request.setMenuColor("MenuColor");
	request.setPrimaryColor("PrimaryColor");
	return request;
    }

    public static ThemeResponse getThemeResponse() {
	ThemeResponse response = new ThemeResponse();
	response.setFont("FontName");
	response.setMenuColor("MenuColor");
	response.setPrimaryColor("PrimaryColor");
	return response;
    }

    public static ThemeDetails getThemeDetails() {
	ThemeDetails details = new ThemeDetails();
	details.setClientId("test-clientId");
	details.setFontName("test-font-name");
	details.setPrimaryColor("test-primary-color");
	details.setSecondaryColor("test-secondary-color");
	details.setStatus(Status.ACTIVE);
	details.setId("test-theme-id");
	return details;
    }

    public static SaveThemeDetailsModel getSaveThemDetailsModel() {
	SaveThemeDetailsModel model = new SaveThemeDetailsModel();
	model.setThemeRequest(getThemeRequest());
	model.setTokenPayLoadDetails(getTokenPayLoadRequest());
	return model;
    }

    public static UserProfileDetails getUserProfileDetails() {
	UserProfileDetails details = new UserProfileDetails();
	details.setFirstName("test-first-name");
	details.setPhone("test-98989");
	return details;
    }

    public static UserProfileUpdateModel getUserProfileUpdateModel() {
	UserProfileUpdateModel details = new UserProfileUpdateModel();
	details.setTokenPayLoadDetails(getTokenPayLoadRequest());
	details.setUserProfileUpdateRequest(getUserProfileUpdateRequest());
	return details;
    }

    public static UserProfileUpdateRequest getUserProfileUpdateRequest() {
	UserProfileUpdateRequest details = new UserProfileUpdateRequest();
	details.setFirstName("test-first-name");
	details.setPhone("test-98989");
	return details;
    }

    public static UpdatePasswordRequest getUpdatePasswordRequest() {
	UpdatePasswordRequest updatePasswordRequest = new UpdatePasswordRequest();
	ChangePasswordRequest changePasswordRequest = new ChangePasswordRequest();
	changePasswordRequest.setCurrentPassword("test-current-password");
	changePasswordRequest.setNewPassword("test-new-password");
	TokenPayLoadDetails tokenPayLoadDetails = new TokenPayLoadDetails();
	tokenPayLoadDetails.setTypeOfUser("user");
	tokenPayLoadDetails.setUserId("userId");
	tokenPayLoadDetails.setClientId("clientId");
	tokenPayLoadDetails.setAdminId("adminId");
	updatePasswordRequest.setChangePasswordRequest(changePasswordRequest);
	updatePasswordRequest.setPayLoadDetails(tokenPayLoadDetails);

	return updatePasswordRequest;
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
	users.setRoles(RoleDataBuilder.getRoleOnboardingList());
	return users;
    }

    public static Users getUsersWithoutCredentials() {
	Users users = new Users();
	users.setAadharNumber("626255558551");
	users.setId("614d79f33f1d4026be53d232");
	users.setRoles(RoleDataBuilder.getRoleOnboardingList());
	return users;

    }

    public static Object getRoleOnboardingDetails() {
	RoleOnboardingDetails roleOnboardingDetails = new RoleOnboardingDetails();
	roleOnboardingDetails.setRole("Admin");
	roleOnboardingDetails.setDescription("test-Description");
	return roleOnboardingDetails;
    }

	public static Optional<ClientOnboardingDetails> getClientOnboardDetails() {
		ClientOnboardingDetails clientOnboardingDetails=new ClientOnboardingDetails();
		clientOnboardingDetails.setStatus(Status.ACTIVE);
		clientOnboardingDetails.setClientName("test-clientName");
		clientOnboardingDetails.setClientId("Te0001");
		clientOnboardingDetails.setFirstName("test-firstName");
		clientOnboardingDetails.setCity("test-city");
		return Optional.of(clientOnboardingDetails);
	}
	 public static LocationRequest getLocations1() {
	    	LocationRequest request = new LocationRequest();
	    	List<String> list = new ArrayList<>();
	    	list.add("STR001");
	    	list.add("STR002");
	    	List<String> deletedList = new ArrayList<>();
	    	deletedList.add("STR003");
	    	deletedList.add("STR004");
	    	request.setSiteIdsToDelete(null);
	    	request.setSitesToMap(null);
	    	return request;
	        }
	 public static SearchEmployee  searchEmployee() {
		 SearchEmployee se=new SearchEmployee();
		 se.setClientId("client id");
		 se.setUserId("userid");
		return se;
		 
	 }
	 public static Users getUser2() {
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
			List<String> locations= new ArrayList<>();
			locations.add("location1");
			locations.add("location2");
			users.setLocations(locations);
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
			users.setRoles(RoleDataBuilder.getRoleOnboardingList());
			return users;

		    }
	 
	 public static Users getUserDetail() {
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
			users.setLocations(Arrays.asList("STR001", "STR002"));
			users.setMiddlename("Kumar");
			users.setModifiedAt(Instant.now());
			users.setOfficialEmail("vijayp@wavelabs.ai");
			users.setPanNumber("AAAAA9999A");
			users.setPersonnelEmail("vijay@gmail.com");
			users.setPersonnelPhoneNumber("9999777743");
			users.setPincode("500076");
			users.setRefferedEmployeeId("RefferedEmployeeId");
			users.setRefferedEmployeeName("Vikram");
			users.setReportingManagerId("ReportingManagerId");
			users.setReportingManagerName("AJAY");
			users.setState("TS");
			users.setStatus(Status.ACTIVE);
			users.setTypeOfEmployment("Full Time");
			users.setUserId("EMP0012");
			users.setId("614d79f33f1d4026be53d232");
			users.setUserCredentials(getUserCredentials());
			users.setRoles(RoleDataBuilder.getRoleOnboardingList());
			return users;

		    }
	 public static Users getUser3() {
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
			users.setUserCredentials(null);
			return users;

		    }
	 
	 public static UserCredentials getUserCredentialsWithPassword() {
	    	UserCredentials userCredentials = new UserCredentials();
	    	userCredentials.setCreatedAt(Instant.now());
	    	userCredentials.setId("id");
	    	userCredentials.setModifiedAt(Instant.now());
	    	userCredentials.setName("name");
	    	userCredentials.setPassword("String");
	    	userCredentials.setUserId("userId");
	    	return userCredentials;
	        } 
	 public static AdminDetails getAdminDetails() {
			AdminDetails adminDetails=new AdminDetails();
			adminDetails.setFullName("admin");
			adminDetails.setAdminId("adminid");
			adminDetails.setId("id");
			adminDetails.setStatus(Status.ACTIVE);
			adminDetails.setDateofBirth(new Date());
			adminDetails.setMobile("9999999999");
			AdminCredentials adminCredentials=new AdminCredentials();
			adminCredentials.setId("id");
			adminCredentials.setAdminId("adminid");
			adminDetails.setAdminCredentials(adminCredentials);	
			return adminDetails;
			
			
		}
		public static AdminDetails getAdminDetail() {
			AdminDetails adminDetails=new AdminDetails();
			adminDetails.setFullName("admin");
			adminDetails.setAdminId("adminid");
			adminDetails.setId("id001");
			adminDetails.setStatus(Status.ACTIVE);
			adminDetails.setDateofBirth(new Date());
			adminDetails.setMobile("9999999999");
			AdminCredentials adminCredentials=new AdminCredentials();
			adminCredentials.setId("id");
			adminCredentials.setAdminId("adminid");
			adminDetails.setAdminCredentials(adminCredentials);	
			return adminDetails;
			
			
		}
		public static AdminDetails getAdminDetailsWithProfileImage() {
			AdminDetails adminDetails=new AdminDetails();
			adminDetails.setFullName("admin");
			adminDetails.setAdminId("adminid");
			adminDetails.setId("id");
			adminDetails.setStatus(Status.ACTIVE);
			adminDetails.setDateofBirth(new Date());
			Files file=new Files();
			file.setId("id");
			file.setName("file image");
			file.setFileType(FileType.PROFILE);
			file.setFileUUID("UUID");
			adminDetails.setProfileImage(file);
			adminDetails.setMobile("9999999999");
			AdminCredentials adminCredentials=new AdminCredentials();
			adminCredentials.setId("id");
			adminCredentials.setAdminId("adminid");
			adminDetails.setAdminCredentials(adminCredentials);	
			return adminDetails;
			
			
		}

		public static AdminDetails getAdminDetailsStatusIsInActive() {
		 	 AdminDetails adminDetails=new AdminDetails();
		 	 adminDetails.setAdminId("Admin-id");
		 	 adminDetails.setId("id");
		 	 adminDetails.setStatus(Status.INACTIVE);
		 	return adminDetails;
		  }

		public static AdminDetails getAdminDetailsCredentialsIsNull() {
		 	 AdminDetails adminDetails=new AdminDetails();
		 	 adminDetails.setAdminId("Admin-id");
		 	 adminDetails.setId("id");
		 	 adminDetails.setStatus(Status.ACTIVE);
		 	 adminDetails.setAdminCredentials(null);
		 	return adminDetails;
		  }
		public static TokenPayLoadDetails getTokenPayLoadRequestTypeOfUserIsAdmin() {
			TokenPayLoadDetails loadDetails = new TokenPayLoadDetails();
			loadDetails.setClientId("clientId");
			loadDetails.setAdminId("adminId");
			loadDetails.setTypeOfUser("admin");
			loadDetails.setId("id");
			return loadDetails;
		   }

		public static TokenPayLoadDetails getTokenPayLoadRequestTypeOfUserIsUser() {
			TokenPayLoadDetails loadDetails = new TokenPayLoadDetails();
			loadDetails.setClientId("clientId");
			loadDetails.setUserId("userId");
			loadDetails.setTypeOfUser("User");
			loadDetails.setId("id");
			return loadDetails;
		   }
		public static TokenPayLoadDetails getTokenPayLoadRequestTypeOfUserIsClient() {
			TokenPayLoadDetails loadDetails = new TokenPayLoadDetails();
			loadDetails.setClientId("clientId");
			loadDetails.setUserId("userId");
			loadDetails.setTypeOfUser("Client");
			loadDetails.setId("id");
			return loadDetails;
		   }

		public static Users getUserStatusIsInActive() {
			Users users = new Users();
			users.setClientId("clientId");
			users.setStatus(Status.INACTIVE);
			users.setId("614d79f33f1d4026be53d232");
			users.setUserCredentials(null);
			return users;
		}
		public static UserProfileDetails  userProfileDetails() {
			UserProfileDetails userProfileDetails=new UserProfileDetails();
			userProfileDetails.setState("state");
			userProfileDetails.setFirstName("Bharath");
			return userProfileDetails;
			
		}
		public static UploadProfileImageRequest uploadProfileImageRequestTypeOfUserIsClient() {
			UploadProfileImageRequest uploadProfileImageRequest=new UploadProfileImageRequest();
			uploadProfileImageRequest.setDetails(getTokenPayLoadRequestTypeOfUserIsClient());
			MockMultipartFile multiPartFile = new MockMultipartFile("data", "filename.jpg", "text/plain",
				      "some csv".getBytes());
			uploadProfileImageRequest.setFile(multiPartFile);
			return uploadProfileImageRequest;
			
		}

		public static UploadProfileImageRequest uploadProfileImageRequestTypeOfUserIsAdmin() {
			UploadProfileImageRequest uploadProfileImageRequest=new UploadProfileImageRequest();
			uploadProfileImageRequest.setDetails(getTokenPayLoadRequestTypeOfUserIsAdmin());
			MockMultipartFile multiPartFile = new MockMultipartFile("data", "filename.jpg", "text/plain",
				      "some csv".getBytes());
			uploadProfileImageRequest.setFile(multiPartFile);
			return uploadProfileImageRequest;
			
		}
		public static UploadProfileImageRequest uploadProfileImageRequestTypeOfUserIsUser() {
			UploadProfileImageRequest uploadProfileImageRequest=new UploadProfileImageRequest();
			uploadProfileImageRequest.setDetails(getTokenPayLoadRequestTypeOfUserIsUser());
			MockMultipartFile multiPartFile = new MockMultipartFile("data", "filename.jpg", "text/plain",
				      "some csv".getBytes());
			uploadProfileImageRequest.setFile(multiPartFile);
			return uploadProfileImageRequest;
			
		}
		public static TokenPayLoadDetails getTokenPayLoadRequestInvalidUser() {
	    	TokenPayLoadDetails loadDetails = new TokenPayLoadDetails();
	    	loadDetails.setClientId("clientId");
	    	loadDetails.setUserId("userId");
	    	loadDetails.setTypeOfUser("Invalid");
	    	loadDetails.setId("id");
	    	return loadDetails;
	        }

		public static UploadProfileImageRequest uploadProfileImageRequestTypeOfUserIsInvalid() {
			UploadProfileImageRequest uploadProfileImageRequest=new UploadProfileImageRequest();
			uploadProfileImageRequest.setDetails(getTokenPayLoadRequestInvalidUser());
			MockMultipartFile multiPartFile = new MockMultipartFile("data", "filename.jpg", "text/plain",
				      "some csv".getBytes());
			uploadProfileImageRequest.setFile(multiPartFile);
			return uploadProfileImageRequest;
			
		}
		 public static Users getUserWithProfileImage() {
		    	Users users = new Users();
		    	users.setAadharNumber("626255558551");
		    	users.setAddress("KPHB");
		    	users.setArea("KPHB");
		    	users.setCity("Hyderabad");
		    	users.setClientId("");
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
		    	users.setOfficialEmail(null);
		    	users.setPanNumber("AAAAA9999A");
		    	users.setPersonnelEmail("vijay@wavelabs.ai");
		    	users.setPersonnelPhoneNumber("9999777743");
		    	users.setPincode("500076");
		    	users.setReferedEmployeeRole(null);
		    	users.setRefferedEmployeeId(null);
		    	users.setRefferedEmployeeName(null);
		    	users.setReportingManagerId(null);
		    	users.setReportingManagerName("AJAY");
		    	users.setReportingManagerRole(null);
		    	users.setRoles(RoleDataBuilder.getRoleOnboardingList());
		    	users.setState("TS");
		    	Files file=new Files();
		    	file.setId("id");
		    	file.setName("file image");
		    	file.setFileType(FileType.PROFILE);
		    	file.setFileUUID("UUID");
		    	users.setProfileImage(file);
		    	users.setStatus(Status.ACTIVE);
		    	users.setTypeOfEmployment("Full Time");
		    	users.setUserId("EFB0234");
		    	users.setBank(getUserBankDetails());
		    	users.setId("614d79f33f1d4026be53d232");
		    	return users;
		        }
	
		}

