package com.wavelabs.sb.controllers;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.command.UpdatePasswordCommand;
import com.wavelabs.sb.command.UserProfileFetchCommand;
import com.wavelabs.sb.command.UserProfileUpdateCommand;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.UserProfileDetails;
import com.wavelabs.sb.services.AuthenticationService;

@RunWith(MockitoJUnitRunner.class)
public class UserProfileControllerTest {

    @InjectMocks
    UserProfileController userProfileController;

    @Mock
    AuthenticationService authenticationService;

    @Mock
    UpdatePasswordCommand updatePasswordCommand;

    @Mock
    UserProfileFetchCommand userProfileFetchCommand;

    @Mock
    UserProfileUpdateCommand userProfileUpdateCommand;

    @Mock
    HttpServletRequest httpServletRequest;
    

    

    @Test
    @DisplayName("test updatePassword")
    public void updatePasswordTest() {
	when(authenticationService.getTokenPayLoadDetails(Mockito.any())).thenReturn(UserDataBuilder.getTokenPayLoadRequest());
    when(updatePasswordCommand.execute(Mockito.any())).thenReturn(ResponseEntity.status(HttpStatus.OK).body(UserDataBuilder.getSuccessResponse()));
    ResponseEntity<SuccessResponse> response = userProfileController.updatePassword("Authorization",  httpServletRequest,UserDataBuilder.getChangePasswordRequest());
	assertEquals(Constants.PASSWORD_CHANGED_SUCCESSFULLY, response.getBody().getMessage());
    }

    @Test
    @DisplayName("test retrieveUserProfile")
    public void retrieveUserProfileTest() {
    when(authenticationService.getTokenPayLoadDetails(Mockito.any())).thenReturn(UserDataBuilder.getTokenPayLoadRequest());
	when(userProfileFetchCommand.execute(Mockito.any())).thenReturn(UserDataBuilder.getUserProfileDetails());
	ResponseEntity<UserProfileDetails> response = userProfileController.retrieveUserProfile("Authorization",  httpServletRequest);
	assertEquals("test-first-name", response.getBody().getFirstName());
	assertEquals("test-98989", response.getBody().getPhone());
    }

    @Test
    @DisplayName("test updateUserProfile")
    public void updateUserProfileTest() {
    when(authenticationService.getTokenPayLoadDetails(Mockito.any())).thenReturn(UserDataBuilder.getTokenPayLoadRequest());
	when(userProfileUpdateCommand.execute(Mockito.any())).thenReturn(UserDataBuilder.getUserProfileUpdateSuccessResponse());
	ResponseEntity<SuccessResponse> response = userProfileController.updateUserProfile("Authorization",httpServletRequest,UserDataBuilder.getUserProfileUpdateRequest());
	assertEquals(Constants.PROFILE_UPDATE_SUCCESS, response.getBody().getMessage());
    }
}
