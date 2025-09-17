package com.wavelabs.sb.model;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.*;
import com.wavelabs.sb.enums.Gender;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.FetchAllRoles;
import com.wavelabs.sb.request.FetchAllRolesRequest;
import com.wavelabs.sb.request.RoleOnboardingRequest;
import com.wavelabs.sb.request.UpdateRoleRequest;
import com.wavelabs.sb.response.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

public class RoleOnboardingDataBuilder {

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
		successResponse.setMessage(Constants.FILE_UPLOADED_SUCCESSFULLY);
		return successResponse;
	}

	public static SuccessResponse getTestSuccessResponseCreated() {
		SuccessResponse successResponse = new SuccessResponse();
		successResponse.setId("test-id");
		successResponse.setMessage(Constants.ROLE_CREATED_SUCCESSFULLY);
		return successResponse;
	}

	public static SuccessResponse getSuccessResponseUpdated() {
		SuccessResponse successResponse = new SuccessResponse();
		successResponse.setId("test-id");
		successResponse.setMessage(Constants.ROLE_UPDATED_SUCCESSFULLY);
		return successResponse;
	}

	public static SuccessResponse getSuccessResponseDeleted() {
		SuccessResponse successResponse = new SuccessResponse();
		successResponse.setId("test-id");
		successResponse.setMessage(Constants.ROLE_DELETED_SUCCESSFULLY);
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
}
