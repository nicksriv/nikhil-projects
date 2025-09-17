package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.model.RoleDataBuilder;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.RoleService;

@RunWith(MockitoJUnitRunner.class)
public class UpdateRoleOnboardingCommandTest {

    @Mock
    RoleService roleService;

    @InjectMocks
    UpdateRoleOnboardingCommand updateRoleOnboardingCommand;

    @Test
    public void execute() {

	when(roleService.updateRoleOnboarding(Mockito.any())).thenReturn(RoleDataBuilder.getSuccessResponse());
	SuccessResponse response = updateRoleOnboardingCommand
		.execute(RoleDataBuilder.getUpdateRoleModel());
	assertEquals(response.getMessage(),"message");
    }

}
