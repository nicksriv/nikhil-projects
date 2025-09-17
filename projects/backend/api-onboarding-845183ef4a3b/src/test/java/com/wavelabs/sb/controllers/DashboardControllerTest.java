package com.wavelabs.sb.controllers;

import static org.mockito.Mockito.when;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.command.FetchAdminDashboardCommand;
import com.wavelabs.sb.command.FetchUserDashboardCommand;
import com.wavelabs.sb.command.FetchUserStatisticsCommand;
import com.wavelabs.sb.model.DashboardDataBuilder;
import com.wavelabs.sb.response.AdminDashboardResponse;
import com.wavelabs.sb.response.UserDashboardResponse;
import com.wavelabs.sb.response.UserStatisticsResponse;
import com.wavelabs.sb.services.AuthenticationService;

@RunWith(MockitoJUnitRunner.class)
public class DashboardControllerTest {

    @InjectMocks
	DashboardController dashboardController;

	@Mock
	FetchUserDashboardCommand fetchUserDashboardCommand;

	@Mock
	FetchAdminDashboardCommand fetchAdminDashboardCommand;


	@Mock
	AuthenticationService authenticationService;

	@Mock
	FetchUserStatisticsCommand fetchUserStatisticsCommand;

	@Mock
	HttpServletRequest httpServletRequest;

    @Test
    @DisplayName("Test getUserDashboard")
    public void getUserDashboard()  {
	when(authenticationService.getTokenPayLoadDetails(Mockito.any())).thenReturn((DashboardDataBuilder.getTokenPayLoadDetails()));
	when(fetchUserDashboardCommand.execute(Mockito.any())).thenReturn((DashboardDataBuilder.getUserDashboardResponse()));
	ResponseEntity<UserDashboardResponse> response = dashboardController.getUserDashboard("authorization", httpServletRequest);
    Assertions.assertEquals("test-browser", response.getBody().getLogin().getBrowser());
	}

	@Test
	@DisplayName("Test getAdminDashboard")
	public void getAdminDashboard()  {
		when(authenticationService.getTokenPayLoadDetails(Mockito.any())).thenReturn((DashboardDataBuilder.getTokenPayLoadDetails()));
		when(fetchAdminDashboardCommand.execute(Mockito.any())).thenReturn((DashboardDataBuilder.getAdminDashboardResponse()));
		ResponseEntity<AdminDashboardResponse> response = dashboardController.getAdminDashboard("authorization", httpServletRequest);
		Assertions.assertEquals("test-browser", response.getBody().getLogin().getBrowser());
	}


	@Test
	@DisplayName("Test getUserDashboardUserstatistics")
	public void getUserDashboarduserstatistics()  {
		when(authenticationService.getTokenPayLoadDetails(Mockito.any())).thenReturn((DashboardDataBuilder.getTokenPayLoadDetails()));
		when(fetchUserStatisticsCommand.execute(Mockito.any())).thenReturn((DashboardDataBuilder.getUserStatisticsResponse()));
		ResponseEntity<UserStatisticsResponse> response = dashboardController.getUserDashboard("authorization", httpServletRequest,"test-clientId");
		Assertions.assertEquals("test-clientId", response.getBody().getClientId());
	}


}
