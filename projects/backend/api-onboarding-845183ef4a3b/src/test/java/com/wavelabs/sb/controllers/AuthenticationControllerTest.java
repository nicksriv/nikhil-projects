package com.wavelabs.sb.controllers;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import javax.servlet.http.HttpServletRequest;

import com.wavelabs.sb.services.AuthenticationService;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.command.ClientLoginCommand;
import com.wavelabs.sb.command.LogOutCommand;
import com.wavelabs.sb.command.UserLoginCommand;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.model.ClientDataBuilder;
import com.wavelabs.sb.model.DataBuilder;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.response.LoginResponse;
import com.wavelabs.sb.response.SuccessResponse;

@RunWith(MockitoJUnitRunner.class)
public class AuthenticationControllerTest {

    @InjectMocks
    AuthenticationController authenticationController;

    @Mock
    LogOutCommand logOutCommand;

    @Mock
    ClientLoginCommand clientLoginCommand;
    
    @Mock
    UserLoginCommand userLoginCommand;
    
    @Mock
    HttpServletRequest httpServletRequest;

    @Mock
    AuthenticationService authenticationService;

    @Test
    @DisplayName("test authenticateClient")
    public void authenticateClientTest() {
	when(clientLoginCommand.execute(Mockito.any())).thenReturn((ClientDataBuilder.getLoginResponse()));
	ResponseEntity<LoginResponse> response = authenticationController.authenticateClient(ClientDataBuilder.getAuthenticateClientRequest(),httpServletRequest);
	assertEquals(Constants.LOGIN_SUCCESSFULL, response.getBody().getMessage());
    }

    @Test
    @DisplayName("test authenticateUser")
    public void authenticateUserTest() {
	when(userLoginCommand.execute(Mockito.any())).thenReturn(UserDataBuilder.getLoginResponse());
	ResponseEntity<LoginResponse> response = authenticationController.authenticateUser(UserDataBuilder.getAuthenticateUserRequest(),httpServletRequest);
	assertEquals(Constants.USER_LOGIN_SUCCESSFULL, response.getBody().getMessage());
    }

    @Test
    @DisplayName("test logOut")
    public void logOutTest() {
	when(logOutCommand.execute(Mockito.anyString()))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(DataBuilder.getSuccessResponse()));
	ResponseEntity<SuccessResponse> response = authenticationController.logOut("Authorization",null);
	assertEquals(Constants.LOGOUT_SUCCESSFULL, response.getBody().getMessage());
    }
}
