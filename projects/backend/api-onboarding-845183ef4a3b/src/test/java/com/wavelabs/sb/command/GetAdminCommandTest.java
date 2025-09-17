package com.wavelabs.sb.command;

import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AdminService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class GetAdminCommandTest {



    @Mock
    AdminService adminService;

    @InjectMocks
    GetAdminCommand getAdminCommand;


    @Test
    public void executeTest() {
	//when(adminService.saveAdmin(Mockito.any())).thenReturn(null);
	ResponseEntity<SuccessResponse> response = getAdminCommand.execute("test-id");
    assertEquals(HttpStatus.OK,response.getStatusCode());
    }

}
