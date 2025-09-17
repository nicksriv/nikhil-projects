package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

import com.wavelabs.sb.model.ClientDataBuilder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.response.LoginResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.JwtAuthenticationService;
import com.wavelabs.sb.services.ThemeService;

@RunWith(MockitoJUnitRunner.class)
public class UserLoginCommandTest {

    @Mock
    AuthenticationService authenticationService;

    @Mock
    JwtAuthenticationService jwtAuthenticationService;

    @Mock
    ThemeService themeService;

    @InjectMocks
    UserLoginCommand userLoginCommand;

    @Test
    public void executeTest() {
	when(authenticationService.getUserDetails(Mockito.anyString())).thenReturn(UserDataBuilder.getUser());
	when(authenticationService.getUserCredentials(Mockito.any())).thenReturn(UserDataBuilder.getUserCredential());
	when(authenticationService.getClientDetails(Mockito.any())).thenReturn(ClientDataBuilder.getClientOnBoardDetails());
	/*when(themeService.fetchThemeResponseByClientId(Mockito.anyString()))
		.thenReturn(UserDataBuilder.getThemeDetails());*/
	lenient().when(jwtAuthenticationService.generateToken(Constants.EMPTY, "test-userId", Constants.EMPTY,
		Constants.CLIENT, "id", Constants.EMPTY,"test-firstName","test-lastName","Admin")).thenReturn("token");
	LoginResponse response = userLoginCommand.execute(UserDataBuilder.getAuthenticateLoginModel());
	assertEquals(response.getMessage(), Constants.USER_LOGIN_SUCCESSFULL);
    }

}
