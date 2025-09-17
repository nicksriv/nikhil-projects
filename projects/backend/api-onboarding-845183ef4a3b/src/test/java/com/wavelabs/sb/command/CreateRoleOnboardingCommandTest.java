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
import com.wavelabs.sb.model.SiteDataBuilder;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.RoleService;

@RunWith(MockitoJUnitRunner.class)
public class CreateRoleOnboardingCommandTest {

    @Mock
    RoleService roleService;

    @InjectMocks
    CreateRoleOnboardingCommand createRoleOnboardingCommand;

    @Test
    public void execute() {
	when(roleService.createRoleOnboarding(Mockito.any())).thenReturn(SiteDataBuilder.getSuccessResponse());
	SuccessResponse response = createRoleOnboardingCommand.execute(RoleDataBuilder.getCreateRoleModel());
	assertEquals(response.getMessage(),"test-success-message");
    }

}
