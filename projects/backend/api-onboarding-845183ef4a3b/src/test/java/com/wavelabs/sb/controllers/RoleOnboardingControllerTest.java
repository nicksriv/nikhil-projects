package com.wavelabs.sb.controllers;

import static org.mockito.Mockito.when;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.command.CreateRoleOnboardingCommand;
import com.wavelabs.sb.command.DeleteRoleCommand;
import com.wavelabs.sb.command.FetchAllRolesCommand;
import com.wavelabs.sb.command.FetchRoleCommand;
import com.wavelabs.sb.command.UpdateRoleOnboardingCommand;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.model.RoleOnboardingDataBuilder;
import com.wavelabs.sb.response.FetchAllRolesResponse;
import com.wavelabs.sb.response.RoleResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;

@RunWith(MockitoJUnitRunner.class)
public class RoleOnboardingControllerTest {

    @InjectMocks
	RoleOnboardingController roleOnboardingController;

	@Mock
	CreateRoleOnboardingCommand createRoleOnboardingCommand;

	@Mock
	UpdateRoleOnboardingCommand updateRoleOnboardingCommand;

	@Mock
	FetchAllRolesCommand fetchAllRolesCommand;

	@Mock
	FetchRoleCommand fetchRoleCommand;

	@Mock
	DeleteRoleCommand deleteRoleCommand;

	@Mock
	AuthenticationService authenticationService;

	@Mock
	HttpServletRequest httpServletRequest;

    @Test
    @DisplayName("Test createRole")
    public void createRole()  {
	when(authenticationService.getTokenPayLoadDetails(Mockito.any())).thenReturn((RoleOnboardingDataBuilder.createRoleModel().getTokenPayLoadDetails()));
	when(createRoleOnboardingCommand.execute(Mockito.any())).thenReturn((RoleOnboardingDataBuilder.getTestSuccessResponseCreated()));
	ResponseEntity<SuccessResponse> response = roleOnboardingController.createRole("authorization",RoleOnboardingDataBuilder.createRoleModel().getRoleOnboardingRequest(), httpServletRequest);
    Assertions.assertEquals(Constants.ROLE_CREATED_SUCCESSFULLY, response.getBody().getMessage());
	}

	@Test
	@DisplayName("Test updateRole")
	public void updateRole()  {
		when(authenticationService.getTokenPayLoadDetails(Mockito.any())).thenReturn((RoleOnboardingDataBuilder.updateRoleModel().getTokenPayLoadDetails()));
		when(updateRoleOnboardingCommand.execute(Mockito.any())).thenReturn((RoleOnboardingDataBuilder.getSuccessResponseUpdated()));
		ResponseEntity<SuccessResponse> response = roleOnboardingController.updateRole("authorization","id",RoleOnboardingDataBuilder.updateRoleModel().getUpdateRoleRequest(),httpServletRequest);
		Assertions.assertEquals(Constants.ROLE_UPDATED_SUCCESSFULLY, response.getBody().getMessage());
	}

	@Test
	@DisplayName("Test fetchAllRoles")
	public void fetchAllRoles()  {
		when(fetchAllRolesCommand.execute(Mockito.any())).thenReturn((RoleOnboardingDataBuilder.getFetchAllRoles()));
		ResponseEntity<FetchAllRolesResponse> response = roleOnboardingController.fetchAllRoles("authorization",RoleOnboardingDataBuilder.getFetchAllRequest(),"clientId");
	}

	@Test
	@DisplayName("Test fetchRoleById")
	public void fetchRoleById()  {
		when(fetchRoleCommand.execute(Mockito.any())).thenReturn((RoleOnboardingDataBuilder.getRoleResponse()));
		ResponseEntity<RoleResponse> response = roleOnboardingController.fetchRoleById("authorization","Id");
		Assertions.assertEquals("test-status", response.getBody().getStatus());
	}

	@Test
	@DisplayName("Test deleteRoles")
	public void deleteRoles()  {
		when(authenticationService.getTokenPayLoadDetails(Mockito.any())).thenReturn((RoleOnboardingDataBuilder.deleteRoleModel().getTokenPayLoadDetails()));
		when(deleteRoleCommand.execute(Mockito.any())).thenReturn((RoleOnboardingDataBuilder.getSuccessResponseDeleted()));
		ResponseEntity<SuccessResponse> response = roleOnboardingController.deleteRoles("authorization","Id",httpServletRequest);
		Assertions.assertEquals(Constants.ROLE_DELETED_SUCCESSFULLY, response.getBody().getMessage());
	}

}
