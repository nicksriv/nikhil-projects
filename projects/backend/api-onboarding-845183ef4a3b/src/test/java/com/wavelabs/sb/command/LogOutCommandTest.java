package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.JwtAuthenticationService;

@RunWith(MockitoJUnitRunner.class)
public class LogOutCommandTest {

    @Mock
    AuthenticationService authenticationService;

    @Mock
    JwtAuthenticationService jwtAuthenticationService;

    @InjectMocks
    LogOutCommand logOutCommand;

    @Test
    public void executeTest() {
	when(authenticationService.logOut(Mockito.anyString())).thenReturn(Constants.LOGOUT_SUCCESSFULL);
	ResponseEntity<SuccessResponse> response = logOutCommand.execute("token");
	assertEquals(response.getBody().getMessage(),Constants.LOGOUT_SUCCESSFULL);
    }

}
