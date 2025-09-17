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
import com.wavelabs.sb.response.RoleResponse;
import com.wavelabs.sb.services.RoleOnboardingService;

@RunWith(MockitoJUnitRunner.class)
public class FetchRoleCommandTest {

    @Mock
    RoleOnboardingService roleOnboardingService;

    @InjectMocks
    FetchRoleCommand fetchRoleCommand;

    @Test
    public void execute() {
	when(roleOnboardingService.fetchRoleById(Mockito.any())).thenReturn(RoleOnboardingDataBuilder.getRoleOnboardingDetailsWithOutResponse());
	ResponseEntity<RoleResponse> response = fetchRoleCommand.execute("id");
    assertEquals("ACTIVE",response.getBody().getStatus());
    }

}
