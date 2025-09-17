package com.wavelabs.sb.controllers;

import com.wavelabs.sb.command.CreateAdminCommad;
import com.wavelabs.sb.command.GetAdminCommand;
import com.wavelabs.sb.model.AdminDetailsDataBuilder;
import com.wavelabs.sb.response.SuccessResponse;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class AdminControllerTest {

    @InjectMocks
	AdminController adminController;

    @Mock
	CreateAdminCommad createAdminCommad;
    
    @Mock
	GetAdminCommand getAdminCommand;
    

    @Test
    @DisplayName("test saveAdmin")
    public void saveAdmin() {
	when(createAdminCommad.execute(Mockito.any()))
		.thenReturn(ResponseEntity.ok(AdminDetailsDataBuilder.getTestSuccessResponse()));
	ResponseEntity<SuccessResponse> adminDetails = adminController
		.saveAdmin(AdminDetailsDataBuilder.getAdminDetailsRequest());
	assertEquals(HttpStatus.OK, adminDetails.getStatusCode());
    }

	@Test
	@DisplayName("test getAdminDetails")
	public void getAdminDetails() {
		when(getAdminCommand.execute(Mockito.any()))
				.thenReturn(ResponseEntity.ok(AdminDetailsDataBuilder.getTestSuccessResponse()));
		ResponseEntity<SuccessResponse> adminDetails = adminController
				.getAdminDetails("adminId");
		assertEquals(HttpStatus.OK, adminDetails.getStatusCode());
	}

}
