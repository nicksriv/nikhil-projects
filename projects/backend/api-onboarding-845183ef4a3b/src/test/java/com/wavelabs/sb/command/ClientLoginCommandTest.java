package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.AdminCredentials;
import com.wavelabs.sb.model.AdminDetailsDataBuilder;
import com.wavelabs.sb.model.ClientDataBuilder;
import com.wavelabs.sb.model.ThemeDataBuilder;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.response.LoginResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.JwtAuthenticationService;
import com.wavelabs.sb.services.ThemeService;

@RunWith(MockitoJUnitRunner.class)
public class ClientLoginCommandTest {

    @Mock
    AuthenticationService authenticationService;

    @Mock
    JwtAuthenticationService jwtAuthenticationService;

    @Mock
    ThemeService themeService;

    @InjectMocks
    ClientLoginCommand clientLoginCommand;

    @Mock
    AdminCredentials adminCredentials;

    @Test
    public void executeTest() {
	when(authenticationService.getClientDetails(Mockito.anyString()))
		.thenReturn(ClientDataBuilder.getClientOnBoardDetails());
	when(authenticationService.getClientCredentials(Mockito.any()))
		.thenReturn(ClientDataBuilder.getClientCredentials());
	when(themeService.fetchThemeResponseByClientId(Mockito.anyString()))
	.thenReturn(ThemeDataBuilder.getThemeDetails());
	lenient()
		.when(jwtAuthenticationService.generateToken(Constants.EMPTY, "test-client_id", Constants.EMPTY,
			Constants.CLIENT, "id", Constants.EMPTY, "test-firstName", "test-lastName", "test-userRole"))
		.thenReturn("token");

	LoginResponse response = clientLoginCommand.execute(ClientDataBuilder.getAuthenticateLoginModel());
	assertEquals(response.getMessage(), Constants.LOGIN_SUCCESSFULL);
    }

    @Test
    public void executeAdminLoginTest() {
	when(authenticationService.getAdminDetails(Mockito.anyString()))
		.thenReturn(AdminDetailsDataBuilder.getAdminDetails());
	when(authenticationService.getAdminCredentials(Mockito.any()))
		.thenReturn(AdminDetailsDataBuilder.getAdminCredentials());
	lenient()
		.when(jwtAuthenticationService.generateToken(Constants.EMPTY, "test-client_id", Constants.EMPTY,
			Constants.CLIENT, "id", Constants.EMPTY, "test-firstName", "test-lastName", "test-userRole"))
		.thenReturn("token");

	LoginResponse response = clientLoginCommand.execute(ClientDataBuilder.getAuthenticateLoginModel());
	assertEquals(Constants.ADMIN_LOGIN_SUCCESSFULL, response.getMessage());
    }

    @Test
    public void executeUserAdminLoginTest() {
	when(authenticationService.getAdminUserDetails(Mockito.anyString())).thenReturn(UserDataBuilder.getUser());

	when(authenticationService.getUserCredentials(Mockito.any())).thenReturn(UserDataBuilder.getUserCredential());
	when(authenticationService.getClientDetails(Mockito.any()))
		.thenReturn(ClientDataBuilder.getClientOnBoardDetails());
	when(themeService.fetchThemeResponseByClientId(Mockito.anyString()))
		.thenReturn(ThemeDataBuilder.getThemeDetails());
	lenient()
		.when(jwtAuthenticationService.generateToken(Constants.EMPTY, "test-client_id", Constants.EMPTY,
			Constants.CLIENT, "id", Constants.EMPTY, "test-firstName", "test-lastName", "test-userRole"))
		.thenReturn("token");

	LoginResponse response = clientLoginCommand.execute(ClientDataBuilder.getAuthenticateLoginModel());
	assertEquals(Constants.USER_LOGIN_SUCCESSFULL, response.getMessage());
    }

    @Test
    public void executeUserThemeNullTest() {
	when(authenticationService.getAdminUserDetails(Mockito.anyString())).thenReturn(UserDataBuilder.getUser());

	when(authenticationService.getUserCredentials(Mockito.any())).thenReturn(UserDataBuilder.getUserCredential());
	when(authenticationService.getClientDetails(Mockito.any()))
		.thenReturn(ClientDataBuilder.getClientOnBoardDetails());
	when(themeService.fetchThemeResponseByClientId(Mockito.anyString())).thenReturn(null);
	lenient()
		.when(jwtAuthenticationService.generateToken(Constants.EMPTY, "test-client_id", Constants.EMPTY,
			Constants.CLIENT, "id", Constants.EMPTY, "test-firstName", "test-lastName", "test-userRole"))
		.thenReturn("token");

	LoginResponse response = clientLoginCommand.execute(ClientDataBuilder.getAuthenticateLoginModel());
	assertEquals(Constants.USER_LOGIN_SUCCESSFULL, response.getMessage());
    }

}
