package com.wavelabs.sb.model;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.*;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.enums.FileType;
import com.wavelabs.sb.enums.Gender;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.*;
import com.wavelabs.sb.response.*;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;

import java.io.File;
import java.time.Instant;
import java.util.*;

public class FileDataBuilder {

	public static  CreateRoleModel createRoleModel() {
		CreateRoleModel createRoleModel=new CreateRoleModel();
		RoleOnboardingRequest roleOnboardingRequest=new RoleOnboardingRequest();
		roleOnboardingRequest.setDescription("test-description");
		roleOnboardingRequest.setClientId("test-clientId");
		roleOnboardingRequest.setName("test-name");
		roleOnboardingRequest.setStatus("test-active");
		createRoleModel.setRoleOnboardingRequest(roleOnboardingRequest);
		TokenPayLoadDetails tokenPayLoadDetails=new TokenPayLoadDetails();
		tokenPayLoadDetails.setTypeOfUser("test-admin");
		tokenPayLoadDetails.setId("test-id");
		tokenPayLoadDetails.setClientId("test-clientId");
		tokenPayLoadDetails.setAdminId("test-adminId");
		tokenPayLoadDetails.setFirstName("test-firstName");
		tokenPayLoadDetails.setUserRole("test-userRole");
		createRoleModel.setTokenPayLoadDetails(tokenPayLoadDetails);
		return createRoleModel;
	}

	public static  UpdateRoleModel updateRoleModel() {
		UpdateRoleModel updateRoleModel=new UpdateRoleModel();
		UpdateRoleRequest updateRoleRequest=new UpdateRoleRequest();
		updateRoleRequest.setId("test-id");
		updateRoleRequest.setName("test-name");
		updateRoleRequest.setStatus(Status.ACTIVE);
		updateRoleRequest.setDescription("test-description");
		updateRoleModel.setUpdateRoleRequest(updateRoleRequest);
		TokenPayLoadDetails tokenPayLoadDetails=new TokenPayLoadDetails();
		tokenPayLoadDetails.setTypeOfUser("test-admin");
		tokenPayLoadDetails.setId("test-id");
		tokenPayLoadDetails.setClientId("test-clientId");
		tokenPayLoadDetails.setAdminId("test-adminId");
		tokenPayLoadDetails.setFirstName("test-firstName");
		tokenPayLoadDetails.setUserRole("test-userRole");
		updateRoleModel.setTokenPayLoadDetails(tokenPayLoadDetails);
		return updateRoleModel;
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
		successResponse.setMessage(Constants.ROLE_DELETED_SUCCESSFULLY);
		return successResponse;
	}

	public static SuccessResponse getSuccessResponseFileUpload() {
		SuccessResponse successResponse = new SuccessResponse();
		successResponse.setId("test-id");
		successResponse.setMessage(Constants.FILE_UPLOADED_SUCCESSFULLY);
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
		Files profileImage=new Files();
		profileImage.setId("test-id");
		profileImage.setName("name");
		adminDetails.setProfileImage(profileImage);
		return  adminDetails;
	}


	public static ResponseEntity<FetchAllRolesResponse> getFetchAllRoles() {

		FetchAllRolesResponse fetchAllRolesResponse=new FetchAllRolesResponse();
		List<RoleResponsewithUser> roleResponsewithUserList=new ArrayList<>();
		RoleResponsewithUser roleResponsewithUser=new RoleResponsewithUser();
		roleResponsewithUser.setUsers("test-user");
		roleResponsewithUser.setId("test-id");
		roleResponsewithUser.setName("test-name");
		roleResponsewithUser.setDescription("test-description");
		roleResponsewithUserList.add(roleResponsewithUser);
		List<RoleModuleResponse> roleModuleResponseList=new ArrayList();
		RoleModuleResponse roleModuleResponse=new RoleModuleResponse();
		roleModuleResponse.setId("test-id");
		roleModuleResponse.setName("test-name");
		roleModuleResponseList.add(roleModuleResponse);
		roleResponsewithUser.setModules(roleModuleResponseList);
		fetchAllRolesResponse.setRoles(roleResponsewithUserList);
		return ResponseEntity.status(HttpStatus.OK).body(fetchAllRolesResponse);
	}
	public static FetchAllRolesRequest getFetchAllRequest() {
		FetchAllRolesRequest fetchAllRolesRequest=new FetchAllRolesRequest();
		fetchAllRolesRequest.setModules("test-modules");
		fetchAllRolesRequest.setFrom("test-from");
		fetchAllRolesRequest.setRoleName("test-roleName");
		fetchAllRolesRequest.setStatus("test-status");
		fetchAllRolesRequest.setPagination(true);
		fetchAllRolesRequest.setFrom("15-06-1979");
		fetchAllRolesRequest.setTo("15-06-1979");
		return fetchAllRolesRequest;
	}

	public static ResponseEntity<RoleResponse> getRoleResponse() {
		RoleResponse roleResponse=new RoleResponse();
		roleResponse.setDescription("test-description");
		roleResponse.setId("test-id");
		roleResponse.setStatus("test-status");
		roleResponse.setName("test-name");
		List<RoleModuleResponse> roleModuleResponseList=new ArrayList();
		RoleModuleResponse roleModuleResponse=new RoleModuleResponse();
		roleModuleResponse.setId("test-id");
		roleModuleResponse.setName("test-name");
		roleModuleResponseList.add(roleModuleResponse);
		roleResponse.setModules(roleModuleResponseList);
		return ResponseEntity.status(HttpStatus.OK).body(roleResponse);
	}

	public static  DeleteRoleModel deleteRoleModel() {
		DeleteRoleModel deleteRoleModel=new DeleteRoleModel();
		deleteRoleModel.setId("test-id");
		TokenPayLoadDetails tokenPayLoadDetails=new TokenPayLoadDetails();
		tokenPayLoadDetails.setTypeOfUser("test-admin");
		tokenPayLoadDetails.setId("test-id");
		tokenPayLoadDetails.setClientId("test-clientId");
		tokenPayLoadDetails.setAdminId("test-adminId");
		tokenPayLoadDetails.setFirstName("test-firstName");
		tokenPayLoadDetails.setUserRole("test-userRole");
		deleteRoleModel.setTokenPayLoadDetails(tokenPayLoadDetails);
		return deleteRoleModel;
	}

    public static PaginationResponse<RoleOnboardingDetails> getRoleOnboardingDetails() {

		PaginationResponse<RoleOnboardingDetails> response=new PaginationResponse<>();
		List<RoleOnboardingDetails> roleOnboardingDetailsList=new ArrayList<>();
		RoleOnboardingDetails roleOnboardingDetails=new RoleOnboardingDetails();
		roleOnboardingDetails.setId("test-id");
		roleOnboardingDetails.setRole("1");
		roleOnboardingDetails.setDescription("test-description");
		roleOnboardingDetails.setClientId("test-clientId");
		roleOnboardingDetails.setDeleted(true);
		List<RoleModules> roleModules=new ArrayList<>();
		RoleModules roleModules1=new RoleModules();
		roleModules1.setId("test-id");
		roleModules1.setStatus(Status.ACTIVE);
		roleModules1.setName("test-name");
		roleOnboardingDetails.setModule(roleModules);
		roleOnboardingDetailsList.add(roleOnboardingDetails);
		response.setData(roleOnboardingDetailsList);
		response.setMessage("test-message");
		response.setSize(10l);
		return response;
    }

	public static List<String> getRoles() {
		List<String> roleIds=new ArrayList<>();
		roleIds.add("test-id");
		roleIds.add("id2");
		roleIds.add("id3");
		return roleIds;
	}

	public static Map<String, Integer> getUserCountMap() {
		HashMap<String,Integer> userCountMap=new HashMap<>();
		userCountMap.put("test-id",1);
		userCountMap.put("two",2);
		userCountMap.put("three",3);
		return userCountMap;
	}

	public static FetchAllRoles getFetchAllRole() {
		FetchAllRoles fetchAllRoles=new FetchAllRoles();
		FetchAllRolesRequest fetchAllRolesRequest=new FetchAllRolesRequest();
		fetchAllRolesRequest.setPagination(true);
		fetchAllRolesRequest.setRoleName("test-roleName");
		fetchAllRolesRequest.setStatus("test-status");
		fetchAllRolesRequest.setModules("test-modules");
		fetchAllRolesRequest.setSize(Optional.of(10));
		fetchAllRoles.setRequest(fetchAllRolesRequest);
		fetchAllRoles.setClientId("test-clientId");
		return fetchAllRoles;

	}

	public static RoleOnboardingDetails getRoleOnboardingDetailsWithOutResponse() {
		RoleOnboardingDetails roleOnboardingDetails=new RoleOnboardingDetails();
		roleOnboardingDetails.setId("test-id");
		roleOnboardingDetails.setRole("test-role");
		roleOnboardingDetails.setStatus(Status.ACTIVE);
		roleOnboardingDetails.setDeleted(false);
		List<RoleModules> roleModules=new ArrayList<>();
		RoleModules roleModules1=new RoleModules();
		roleModules1.setId("test-id");
		roleModules1.setStatus(Status.ACTIVE);
		roleModules1.setName("test-name");
		roleOnboardingDetails.setModule(roleModules);
		return roleOnboardingDetails;
	}

	public static List<RoleOnboardingDetails> getRoleOnboardingDetailsWithOutResponseList() {
		List<RoleOnboardingDetails> list=new ArrayList<>();
		RoleOnboardingDetails roleOnboardingDetails=new RoleOnboardingDetails();
		roleOnboardingDetails.setId("test-id");
		roleOnboardingDetails.setRole("test-role");
		roleOnboardingDetails.setStatus(Status.ACTIVE);
		List<RoleModules> roleModules=new ArrayList<>();
		RoleModules roleModules1=new RoleModules();
		roleModules1.setId("test-id");
		roleModules1.setStatus(Status.ACTIVE);
		roleModules1.setName("test-name");
		roleOnboardingDetails.setModule(roleModules);
		list.add(roleOnboardingDetails);
		return list;
	}

	public static ClientOnboardingDetails getClientOnboardDetails() {
		ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
		clientOnboardingDetails.setStatus(Status.ACTIVE);
		Modules module = new Modules();
		module.setId("test-id");
		module.setName("Some Module Name");

		List<Modules> moduleList = new ArrayList<Modules>();
		moduleList.add(module);
		clientOnboardingDetails.setModules(moduleList);
		Files profileImage=new Files();
		profileImage.setName("name");
		profileImage.setId("test-id");
		clientOnboardingDetails.setProfileImage(profileImage);
		return clientOnboardingDetails;
	}

	public static List<Users> getUsers() {
		List<Users> userList=new ArrayList<>();
		Users user=new Users();
		user.setUserId("test-userId");
		user.setClientId("test-clientId");
		user.setFirstname("test-firstName");
		userList.add(user);
		return userList;
	}

	public static TokenPayLoadDetails getTokenPayLoadDetailsUser() {
		TokenPayLoadDetails tokenPayLoadDetails=new TokenPayLoadDetails();
		tokenPayLoadDetails.setUserRole("test-userRole");
		tokenPayLoadDetails.setFirstName("test-firstName");
		tokenPayLoadDetails.setId("test-id");
		tokenPayLoadDetails.setAdminId("test-adminId");
		tokenPayLoadDetails.setClientId("test-clientId");
		tokenPayLoadDetails.setTypeOfUser(Constants.USER);
		tokenPayLoadDetails.setLastName("test-lastName");
		return tokenPayLoadDetails;
	}
	public static TokenPayLoadDetails getTokenPayLoadDetailsClient() {
		TokenPayLoadDetails tokenPayLoadDetails=new TokenPayLoadDetails();
		tokenPayLoadDetails.setUserRole("test-userRole");
		tokenPayLoadDetails.setFirstName("test-firstName");
		tokenPayLoadDetails.setId("test-id");
		tokenPayLoadDetails.setAdminId("test-adminId");
		tokenPayLoadDetails.setClientId("test-clientId");
		tokenPayLoadDetails.setTypeOfUser(Constants.CLIENT);
		tokenPayLoadDetails.setLastName("test-lastName");
		return tokenPayLoadDetails;
	}
	public static TokenPayLoadDetails getTokenPayLoadDetailsAdmin() {
		TokenPayLoadDetails tokenPayLoadDetails=new TokenPayLoadDetails();
		tokenPayLoadDetails.setUserRole("test-userRole");
		tokenPayLoadDetails.setFirstName("test-firstName");
		tokenPayLoadDetails.setId("test-id");
		tokenPayLoadDetails.setAdminId("test-adminId");
		tokenPayLoadDetails.setClientId("test-clientId");
		tokenPayLoadDetails.setTypeOfUser(Constants.ADMIN);
		tokenPayLoadDetails.setLastName("test-lastName");
		return tokenPayLoadDetails;
	}

	public static TokenPayLoadDetails getTokenPayLoadDetails() {
		TokenPayLoadDetails tokenPayLoadDetails=new TokenPayLoadDetails();
		tokenPayLoadDetails.setUserRole("test-userRole");
		tokenPayLoadDetails.setFirstName("test-firstName");
		tokenPayLoadDetails.setId("test-id");
		tokenPayLoadDetails.setAdminId("test-adminId");
		tokenPayLoadDetails.setClientId("test-clientId");
		tokenPayLoadDetails.setTypeOfUser(Constants.USER);
		tokenPayLoadDetails.setLastName("test-lastName");
		return tokenPayLoadDetails;
	}

	public static ResponseEntity<Resource> getResource() {
		HttpHeaders header = null;
		Resource resource = null;
		return ResponseEntity.ok().headers(header).contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
	}

	public static UploadFilesRequest getUploadFileRequestUser() {
		MockMultipartFile multiPartFile = new MockMultipartFile("data", "filename.csv", "text/plain",
				"some csv".getBytes());
		UploadFilesRequest uploadFilesRequest=new UploadFilesRequest();
		uploadFilesRequest.setDetails(getTokenPayLoadDetailsUser());
		uploadFilesRequest.setFiletype(FileType.PROFILE);
		uploadFilesRequest.setFile(multiPartFile);
		return uploadFilesRequest;
	}
	public static UploadFilesRequest getUploadFileRequest() {
		MockMultipartFile multiPartFile = new MockMultipartFile("data", "filename.jpg", "text/plain",
				"some csv".getBytes());
		UploadFilesRequest uploadFilesRequest=new UploadFilesRequest();
		uploadFilesRequest.setDetails(getTokenPayLoadDetailsUser());
		uploadFilesRequest.setFiletype(FileType.PROFILE);
		uploadFilesRequest.setFile(multiPartFile);
		return uploadFilesRequest;
	}


	public static UploadFilesRequest getUploadFileRequestClient() {
		MockMultipartFile multiPartFile = new MockMultipartFile("data", "filename.csv", "text/plain",
				"some csv".getBytes());
		UploadFilesRequest uploadFilesRequest=new UploadFilesRequest();
		uploadFilesRequest.setDetails(getTokenPayLoadDetailsClient());
		uploadFilesRequest.setFiletype(FileType.PROFILE);
		uploadFilesRequest.setFile(multiPartFile);
		return uploadFilesRequest;
	}
	public static UploadFilesRequest getUploadFileRequestAdmin() {
		MockMultipartFile multiPartFile = new MockMultipartFile("data", "filename.csv", "text/plain",
				"some csv".getBytes());
		UploadFilesRequest uploadFilesRequest=new UploadFilesRequest();
		uploadFilesRequest.setDetails(getTokenPayLoadDetailsAdmin());
		uploadFilesRequest.setFiletype(FileType.PROFILE);
		uploadFilesRequest.setFile(multiPartFile);
		return uploadFilesRequest;
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
		users.setRoles(getRoleOnboardingList());
		Files profileImage=new Files();
		profileImage.setId("testid");
		profileImage.setName("name");
		users.setProfileImage(profileImage);

		return users;

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

	public static List<RoleOnboardingDetails> getRoleOnboardingList() {
		List<RoleOnboardingDetails> rolesList = new ArrayList<>();
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
		rolesList.add(details);
		return rolesList;
	}

	public static Optional<Files> getFiles() {
		Files files=new Files();
		files.setName("test-name");
		files.setId("test-id");
		files.setFilePath("test-filepath");
		files.setFileType(FileType.PROFILE);
		return Optional.of(files);
	}
	public static Optional<Files> getFilesNull() {

		return Optional.of(null);
	}
}
