package com.wavelabs.sb.controllers;

import com.wavelabs.sb.command.CreateThemeDetailsCommand;
import com.wavelabs.sb.command.FetchThemeDetailsCommand;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.ThemeResponse;
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

import javax.servlet.http.HttpServletRequest;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ThemeControllerTest {

    @InjectMocks
    ThemeController themeController;


    @Mock
    AuthenticationService authenticationService;

    @Mock
    CreateThemeDetailsCommand createThemeDetailsCommand;

    @Mock
    FetchThemeDetailsCommand fetchThemeDetailsCommand;


    @Mock
    HttpServletRequest httpServletRequest;

    @Test
    @DisplayName("test saveTheme")
    public void saveTheme() {

        when(authenticationService.getTokenPayLoadDetails(Mockito.any()))
                .thenReturn(UserDataBuilder.getTokenPayLoadRequest());
        when(createThemeDetailsCommand.execute(Mockito.any()))
                .thenReturn(UserDataBuilder.getTestSuccessResponse());
        ResponseEntity<SuccessResponse> response = themeController
                .saveTheme("Authorization", httpServletRequest, UserDataBuilder.getThemeRequest());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("test-message", response.getBody().getMessage());

    }

    @Test
    @DisplayName("test fetchThemeDetails")
    public void fetchThemeDetails() {
        when(authenticationService.getTokenPayLoadDetails(Mockito.any()))
                .thenReturn(UserDataBuilder.getTokenPayLoadRequest());
        when(fetchThemeDetailsCommand.execute(Mockito.any()))
                .thenReturn(UserDataBuilder.getThemeResponse());
        String clientId="DM0303";
        ResponseEntity<ThemeResponse> response = themeController
                .fetchThemeDetails("Authorization",clientId, httpServletRequest);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("PrimaryColor", response.getBody().getPrimaryColor());

    }

}
