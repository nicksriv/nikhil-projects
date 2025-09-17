package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.model.RoleOnboardingDataBuilder;
import com.wavelabs.sb.response.FetchAllRolesResponse;
import com.wavelabs.sb.services.RoleOnboardingService;

@RunWith(MockitoJUnitRunner.class)
public class FetchAllRolesCommandTest {

    @Mock
    RoleOnboardingService roleOnboardingService;

    @InjectMocks
    FetchAllRolesCommand fetchAllRolesCommand;

    @Test
    public void execute() {
	when(roleOnboardingService.fetchAllRoles(Mockito.any(),Mockito.any())).thenReturn(RoleOnboardingDataBuilder.getRoleOnboardingDetails());
	when(roleOnboardingService.fetchRoleIds(Mockito.any())).thenReturn(RoleOnboardingDataBuilder.getRoles());
	when(roleOnboardingService.getUserCount(Mockito.any())).thenReturn(RoleOnboardingDataBuilder.getUserCountMap());
	ResponseEntity<FetchAllRolesResponse> response = fetchAllRolesCommand.execute(RoleOnboardingDataBuilder.getFetchAllRole());
    assertEquals(RoleOnboardingDataBuilder.getRoleOnboardingDetails().getSize(),response.getBody().getTotal());
    }

}
