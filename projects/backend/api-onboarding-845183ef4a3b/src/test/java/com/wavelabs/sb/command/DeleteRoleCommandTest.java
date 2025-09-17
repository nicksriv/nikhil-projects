package com.wavelabs.sb.command;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.model.RoleOnboardingDataBuilder;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.RoleOnboardingService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class DeleteRoleCommandTest {

    @Mock
    RoleOnboardingService roleOnboardingService;

    @InjectMocks
    DeleteRoleCommand deleteRoleCommand;

    @Test
    public void execute() {
	when(roleOnboardingService.deleteRole(Mockito.any())).thenReturn(RoleOnboardingDataBuilder.getSuccessResponseDeleted());
	SuccessResponse response = deleteRoleCommand.execute(RoleOnboardingDataBuilder.deleteRoleModel());
    assertEquals(Constants.ROLE_DELETED_SUCCESSFULLY,response.getMessage());
    }

}
