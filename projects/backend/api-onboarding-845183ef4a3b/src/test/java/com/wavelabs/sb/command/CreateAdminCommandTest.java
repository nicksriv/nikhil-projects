package com.wavelabs.sb.command;

import com.wavelabs.sb.model.AdminDetailsDataBuilder;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AdminService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class CreateAdminCommandTest {



    @Mock
    AdminService adminService;

    @InjectMocks
    CreateAdminCommad createAdminCommand;


    @Test
    public void executeTest() {
	when(adminService.saveAdmin(Mockito.any())).thenReturn(AdminDetailsDataBuilder.getTestSuccessResponse());
	ResponseEntity<SuccessResponse> response = createAdminCommand.execute(AdminDetailsDataBuilder.getAdminDetailsRequest());
	assertEquals("test-message",response.getBody().getMessage());
    }

}
