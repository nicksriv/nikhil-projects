package com.wavelabs.sb.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.Roles;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.RoleDataBuilder;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.RolesRepository;
import com.wavelabs.sb.response.RolesResponse;
import com.wavelabs.sb.response.SuccessResponse;

@RunWith(MockitoJUnitRunner.class)
public class RoleServiceTest {

    @Mock
    RolesRepository rolesRepository;

    @InjectMocks
    RoleService roleService;

    @Mock
    RoleOnboardingRepository roleOnboardingRepository;

    @Mock
    ClientOnboardingRepository clientOnboardingRepository;

    @Test
    @DisplayName("test save role details success response")
    public void testSaveRoleDetails_Success() {
	when(rolesRepository.save(Mockito.any())).thenReturn(RoleDataBuilder.getSaveRole_successResponse());
	Roles response = roleService.saveRoleDetails("Te0001", "Merchandizers");
	assertEquals("614d79f33f1d4026be53d232", response.getId());
    }

    @Test
    @DisplayName("test fetchRolesByClientId with list of stores")
    public void testfetchRolesByClientId_Success() {
	when(rolesRepository.findByClientId(Mockito.anyString())).thenReturn(RoleDataBuilder.getRolesList());
	RolesResponse response = roleService.fetchRolesByClientId("someClientId");
	assertEquals(3, response.getRoles().size());
	assertEquals("Merchandizers", response.getRoles().get(0));
    }

    @Test
    @DisplayName("test fetchRolesByClientId with Empty list")
    public void testfetchRolesByClientId_Success_EmptyList() {
	when(rolesRepository.findByClientId(Mockito.anyString())).thenReturn(new ArrayList<Roles>());
	RolesResponse response = roleService.fetchRolesByClientId("someClientId");
	assertEquals(0, response.getRoles().size());
    }

    @Test
    @DisplayName("test CreateRoleOnboardingTest with success response")
    public void testCreateRoleOnboardingTest() {
	when(roleOnboardingRepository.save(Mockito.any())).thenReturn(RoleDataBuilder.getRoleOnboarding());
	when(clientOnboardingRepository.existsById(Mockito.anyString())).thenReturn(true);
	SuccessResponse response = roleService.createRoleOnboarding(RoleDataBuilder.getCreateRoleModel());
	assertEquals(response.getMessage(),
		RoleDataBuilder.getUpdateRoleRequest().getName() + Constants.ROLE_CREATED_SUCCESSFULLY);
    }

    @Test
    @DisplayName("testCreateRoleOnboardingTest with error response")
    public void testCreateRoleOnboardingTestWithException() {
	when(roleOnboardingRepository.findByClientIdAndDeletedAndRoleIgnoreCase(Mockito.anyString(),
		Mockito.anyBoolean(), Mockito.anyString())).thenReturn(RoleDataBuilder.getRoleOnboarding());
	when(clientOnboardingRepository.existsById(Mockito.anyString())).thenReturn(true);
	Throwable exception = assertThrows(BadRequestException.class, () -> {
	    roleService.createRoleOnboarding(RoleDataBuilder.getCreateRoleModel());
	});
	assertEquals(ErrorMessages.ROLE_ALREADY_ONBOARDED, exception.getMessage());

    }

    @Test
    @DisplayName("test testUpdateRoleOnboardingTest with success response")
    public void testUpdateRoleOnboardingTest() {
	when(roleOnboardingRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(RoleDataBuilder.getRoleOnboarding()));
	when(roleOnboardingRepository.findByClientIdAndIdNotAndDeletedAndRoleIgnoreCase(Mockito.anyString(),
		Mockito.anyString(), Mockito.anyBoolean(), Mockito.anyString())).thenReturn(null);
	SuccessResponse response = roleService.updateRoleOnboarding(RoleDataBuilder.getUpdateRoleModel());
	assertEquals(response.getMessage(),
		RoleDataBuilder.getUpdateRoleRequest().getName() + Constants.ROLE_UPDATED_SUCCESSFULLY);
    }
    
    @Test
    @DisplayName("test updateRoleOnboardingThrowsException")
    public void testUpdateRoleOnboardingThrowsException() {
    	when(roleOnboardingRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean())).thenReturn(Optional.empty());
    	Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
    		roleService.updateRoleOnboarding(RoleDataBuilder.getUpdateRoleModel());
    		});
    		assertEquals(ErrorMessages.ROLE_NOT_FOUND, exception.getMessage());
    		}
    
   
    
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test createRoleOnboardingThrowsException")
    public void testCreateRoleOnboardingThrowsException() {
    	when(clientOnboardingRepository.existsById(Mockito.anyString())).thenReturn(false);
    		 roleService.createRoleOnboarding(RoleDataBuilder.getCreateRoleModel());
    }
    
    @Test
    @DisplayName("test createRoleOnboardingThrowsException")
    public void testCreateRoleOnboardingThrowsBadRequestException() {
    	Exception exception = assertThrows(BadRequestException.class, () -> {
    		roleService.createRoleOnboarding(RoleDataBuilder.getCreateRoleModelWithSITE_MANAGER_ROLE());
    		});
    		assertEquals(ErrorMessages.SITE_MANAGER_ROLE_CANNOT_BE_ADDED, exception.getMessage());
    		}
    	
    @Test
    @DisplayName("test updateRoleOnboardingThrowsBadRequestException")
    public void testupdateRoleOnboardingThrowsBadRequestException() {
    	Exception exception = assertThrows(BadRequestException.class, () -> {
    		roleService.updateRoleOnboarding(RoleDataBuilder.getUpdateRoleModelWithSITE_MANAGER_ROLE());
    		});
    		assertEquals(ErrorMessages.SITE_MANAGER_ROLE_CANNOT_BE_ADDED, exception.getMessage());
    		}
    	
    @Test
    @DisplayName("test updateRoleOnboardingThrowsException")
    public void testupdateRoleOnboardingThrowsException() {
    	Exception exception = assertThrows(BadRequestException.class, () -> {
    		roleService.updateRoleOnboarding(RoleDataBuilder.getUpdateRoleModelWithAdminRole());
    		});
    		assertEquals(ErrorMessages.ADMIN_ROLE_CANNOT_BE_ADDED, exception.getMessage());
    		}
    
  //"Site Manager" and "Admin" roles cannot be edited
    @Test(expected = BadRequestException.class)
    @DisplayName("test testUpdateRoleOnboardingTest throw BadRequestException")
    public void testUpdateRoleOnboardingthrowBadRequestException() {
	when(roleOnboardingRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(RoleDataBuilder.getRoleOnboardingWithSITE_MANAGER_ROLE()));
	roleService.updateRoleOnboarding(RoleDataBuilder.getUpdateRoleModel());
	
}
    @Test(expected = BadRequestException.class)
    @DisplayName("test testUpdateRoleOnboardingTestthrowException")
    public void testUpdateRoleOnboardingthrowException() {
	when(roleOnboardingRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(RoleDataBuilder.getRoleOnboardingWithADMIN_ROLE()));
	roleService.updateRoleOnboarding(RoleDataBuilder.getUpdateRoleModel());
}
    
    //ROLE_ALREADY_ONBOARDED
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test testUpdateRoleOnboardingTest with success response")
    public void testUpdateRoleOnboardingthrowException1() {
    	when(roleOnboardingRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(RoleDataBuilder.getRoleOnboarding()));
	when(roleOnboardingRepository.findByClientIdAndIdNotAndDeletedAndRoleIgnoreCase(
			Mockito.anyString(), Mockito.anyString(), Mockito.anyBoolean(), Mockito.anyString()))
		.thenReturn(RoleDataBuilder.getRoleOnboardingWithSITE_MANAGER_ROLE());
	roleService.updateRoleOnboarding(RoleDataBuilder.getUpdateRoleModel());
}
}

