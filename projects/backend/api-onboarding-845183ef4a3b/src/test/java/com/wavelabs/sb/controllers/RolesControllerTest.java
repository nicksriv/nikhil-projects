package com.wavelabs.sb.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.model.RoleDataBuilder;
import com.wavelabs.sb.response.RolesResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.RoleService;

@RunWith(MockitoJUnitRunner.class)
public class RolesControllerTest {

	@InjectMocks
	private RoleController roleController;

	@Mock
	private RoleService roleService;

	@Test(expected = BadRequestException.class)
	@DisplayName("test Save Role details success response")
	public void testSaveRoleDetails_Exception() {
		when(roleService.fetchRolesByClientId(Mockito.anyString())).thenReturn(RoleDataBuilder.getRolesResponse());
//		when(roleService.saveRoleDetails(Mockito.any(), Mockito.any()))
//				.thenReturn(RoleDataBuilder.getSaveRole_successResponse());
		ResponseEntity<SuccessResponse> storeResponse = roleController.saveRoleDetails("Authorization", "Te0001", "Merchandizers");
		assertEquals(Constants.DATA_CREATED_SUCCESSFULLY, storeResponse.getBody().getMessage());
	}
	
	@Test
	@DisplayName("test Save Role details success response")
	public void testSaveRoleDetails_Success() {
		when(roleService.fetchRolesByClientId(Mockito.anyString())).thenReturn(RoleDataBuilder.getRolesResponse());
		when(roleService.saveRoleDetails(Mockito.any(), Mockito.any()))
				.thenReturn(RoleDataBuilder.getSaveRole_successResponse());
		ResponseEntity<SuccessResponse> storeResponse = roleController.saveRoleDetails("Authorization", "Te0001", "Reporting Managers");
		assertEquals(Constants.DATA_CREATED_SUCCESSFULLY, storeResponse.getBody().getMessage());
	}

	@Test
	@DisplayName("test Save Role details success response")
	public void testGetRoles_Success() {
		when(roleService.fetchRolesByClientId("Te0001")).thenReturn(RoleDataBuilder.getRolesResponse());
		ResponseEntity<RolesResponse> storeResponse = roleController.getRoles("Authorization", "Te0001");
		assertEquals(2, storeResponse.getBody().getRoles().size());
	}

}
