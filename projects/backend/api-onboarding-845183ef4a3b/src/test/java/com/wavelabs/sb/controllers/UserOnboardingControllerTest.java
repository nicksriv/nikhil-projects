package com.wavelabs.sb.controllers;

import com.wavelabs.sb.command.UploadUsersCommand;
import com.wavelabs.sb.command.UserLocationsFetchCommand;
import com.wavelabs.sb.command.UserLocationsUpdateCommand;
import com.wavelabs.sb.command.UsersCommand;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.model.ThemeDataBuilder;
import com.wavelabs.sb.model.UserBankDetailsDataBuilder;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.request.EmployeeRequest;
import com.wavelabs.sb.response.*;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.EmailService;
import com.wavelabs.sb.services.UserOnboardingService;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.ParseException;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UserOnboardingControllerTest {

    @InjectMocks
    UserOnboardingController userOnboardingController;

    @Mock
    UserOnboardingService userOnboardingService;


    @Mock
    UploadUsersCommand uploadUsersCommand;

    @Mock
    UserLocationsUpdateCommand userLocationsUpdateCommand;

    @Mock
    UserLocationsFetchCommand userLocationsFetchCommand;

    @Mock
    UsersCommand usersCommand;

    @Mock
    EmailService emailService;

    @Mock
    HttpServletRequest httpServletRequest;
    
    @Mock
    AuthenticationService authenticationService;

    @Test
    @DisplayName("Test userBasicDetailsOnboarding with success response")
    public void userBasicDetailsOnboardingTest() throws ParseException {
        when(userOnboardingService.saveUserBasicDetails(Mockito.any(), Mockito.anyString(), Mockito.any()))
                .thenReturn(UserDataBuilder.getUser());
        ResponseEntity<SuccessResponse> response = userOnboardingController
                .userBasicDetailsOnboarding("Authorization", UserDataBuilder.getUserRequest(), "Te0001", httpServletRequest);
        assertEquals("614d79f33f1d4026be53d232", response.getBody().getId());

    }

    @Test
    @DisplayName("Test updateUserEmployeeDetails with success response")
    public void updateUserEmployeeDetailsTest() throws ParseException {
        when(userOnboardingService.updateEmployeeDetails(Mockito.any(), Mockito.anyString(), Mockito.any()))
                .thenReturn(UserDataBuilder.getUser());
        ResponseEntity<SuccessResponse> response = userOnboardingController.updateUserEmployeeDetails("Authorization",
                new EmployeeRequest(), "EF0555", httpServletRequest);
        assertEquals(Constants.USER_EMPLOYEE_DETAILS_SAVED, response.getBody().getMessage());
    }

    @Test
    @DisplayName("Test userBankDetails with success response")
    public void userBankDetailsTest() {
        when(userOnboardingService.saveUserBankDetails(Mockito.any(), Mockito.anyString(), Mockito.any()))
		.thenReturn(UserBankDetailsDataBuilder.saveUserBankResponse());
	BaseResponse response = userOnboardingService.saveUserBankDetails(
		UserBankDetailsDataBuilder.getUserBankRequest(), "6151a665fc1b08043f03a70e",
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
        assertEquals(Constants.USER_BANK_DETAILS_SAVED, response.getMessage());
    }

    @Test
    @DisplayName("Test updateUserBasicDetails with success response")
    public void updateUserBasicDetailsTest() throws ParseException {
        when(userOnboardingService.updateUserBasicDetails(Mockito.any(), Mockito.anyString(), Mockito.any()))
		.thenReturn(UserDataBuilder.updateUserBasicDetailsResponse());
	ResponseEntity<BaseResponse> response = userOnboardingController.updateUserBasicDetailsOnboarding(
		"Authorization", UserDataBuilder.getUserRequest(), "6151a665fc1b08043f03a70e", httpServletRequest);
        assertEquals(Constants.USER_UPDATED, response.getBody().getMessage());
    }

    @Test
    @DisplayName("Test fetchAllUsers with success response")
    public void fetchAllUsersTest1() {
        when(userOnboardingService.fetchAll(Mockito.any(), Mockito.anyString(), Mockito.anyBoolean()))
                .thenReturn(UserDataBuilder.getPaginationListOfUsers());
        ResponseEntity<PaginationResponse<UserDetails>> response = userOnboardingController.fetchAllUsers("Authorization", "Te0001",
                UserDataBuilder.getFetchAllUserRequest());
        assertEquals("Records fetched successfully", response.getBody().getMessage());

    }

    @Test
    @DisplayName("Test viewUserLocations with success response")
    public void viewUserLocationsTest() {
//	when(authenticationService.getTokenPayLoadDetails(Mockito.any()))
//	.thenReturn(UserDataBuilder.getTokenPayLoadRequest());
//	when(userOnboardingService.viewLocationDetailsByUserId(Mockito.any()))
//		.thenReturn(UserDataBuilder.getLocationDetailsResponse());
        when(userLocationsFetchCommand.execute(Mockito.any()))
                .thenReturn(UserDataBuilder.getLocationDetailsResponse());

        ResponseEntity<LocationDetailsResponse> responseEntity = userOnboardingController
                .viewLocationsByUserId("userId", "Authorization");
        assertEquals(1, responseEntity.getBody().getTotal());
    }

    @Test
    @DisplayName("Test fetchUserBankDetails with success response")
    public void fetchUserBankDetailsTest() {
        when(userOnboardingService.fetchUserBankDetails(Mockito.anyString()))
                .thenReturn(UserBankDetailsDataBuilder.getUserBankDetailsResponse());
        ResponseEntity<UserBankDetailsResponse> response = userOnboardingController.fetchUserBankDetails(null,
                "Te0001");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    @DisplayName("Test getUserDetails with success response")
    public void getUserDetailsTest() {
        when(usersCommand.execute(Mockito.anyString())).thenReturn(UserDataBuilder.getUser());
        ResponseEntity<UserPersonalInfo> response = userOnboardingController.getUserDetails("Authorization",
                "6151a665fc1b08043f03a70e");
        assertEquals("vijay@gmail.com", response.getBody().getPersonalEmail());
    }

    @Test
    @DisplayName("Test updateLocationDetails with success response")
    public void updateLocationDetails() throws IOException {
//	when(authenticationService.getTokenPayLoadDetails(Mockito.any()))
//	.thenReturn(UserDataBuilder.getTokenPayLoadRequest());
        when(userLocationsUpdateCommand.execute(Mockito.any()))
                .thenReturn(UserDataBuilder.updateLocationsSuccessResponse());

        ResponseEntity<SuccessResponse> response = userOnboardingController.updateUserLocations("userId",
                UserDataBuilder.getLocations(), "Authorization", httpServletRequest);
        assertEquals("test-id", response.getBody().getId());
        assertEquals(Constants.USER_LOCATIONS_UPDATED_SUCCESSFULLY, response.getBody().getMessage());
    }

    @Test
    @DisplayName("Test deleteUser success response")
    public void deleteUserTest() {
        when(userOnboardingService.deleteUserByUserId(Mockito.anyString(), Mockito.any()))
                .thenReturn(UserDataBuilder.deleteResponse());
	ResponseEntity<SuccessResponse> deleteUser = userOnboardingController.deleteUser("Authorization", "EF0555",
		httpServletRequest);
        assertEquals("user is deleted successfully", deleteUser.getBody().getMessage());
    }

    @Test
    @DisplayName("Test userBankDetails with success response")
    public void userBankDetailsTestWithValidRequest() {
        when(userOnboardingService.saveUserBankDetails(Mockito.any(), Mockito.anyString(), Mockito.any()))
                .thenReturn(UserBankDetailsDataBuilder.saveUserBankResponse());
	ResponseEntity<BaseResponse> response = userOnboardingController.userBankDetails("Authorization",
		UserBankDetailsDataBuilder.getUserBankRequest(), "6151a665fc1b08043f03a70e", httpServletRequest);
        assertEquals(Constants.USER_BANK_DETAILS_SAVED, response.getBody().getMessage());
    }

    @DisplayName("Test updateLocationDetails with success response")
    public void updateLocationDetailsWithInvalidRequest() throws IOException {
//	lenient().when(userOnboardingService.updateUserLocations(Mockito.any(), Mockito.anyString()))
//		.thenReturn(UserDataBuilder.toResponse());
	ResponseEntity<BaseResponse> response = userOnboardingController.userBankDetails("Authorization",
		UserBankDetailsDataBuilder.getUserBankRequest(), "6151a665fc1b08043f03a70e", httpServletRequest);
        assertEquals(ErrorMessages.MAPPED_AND_DELETED_LIST_SHOULD_NOT_CONTAIN_SIMILAR_LOCATIONS,
                response.getBody().getMessage());

    }

    @Test
    @DisplayName("Test userBankDetails with success response")
    public void uploadUsersWithValidRequest() {

        when(uploadUsersCommand.execute(Mockito.any()))
                .thenReturn(UserDataBuilder.getUploadUsersSuccessResponse());
        MockMultipartFile file = new MockMultipartFile("file", "NameOfTheFile", "multipart/form-data",
                "some-file".getBytes());
        ResponseEntity<ViewBulkUploadResponse> response = userOnboardingController.uploadUsers("Authorization",
                "6151a665fc1b08043f03a70e", file, httpServletRequest);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }


    @Test
    @DisplayName("Test getCredentials with success response")
    public void getCredentialsTest() {
        when(userOnboardingService.fetchCredentialsByUserId(Mockito.anyString()))
                .thenReturn(UserDataBuilder.getCredentialsResponse());
        ResponseEntity<UserCredentialsResponse> response = userOnboardingController.getCredentials("Authorization",
                "6151a665fc1b08043f03a70e");
        assertEquals("6151a665fc1b08043f03a70e", response.getBody().getUserId());

    }

    @Test
    @DisplayName("test userDetails excel with success response")
    public void userDetailsExcelTest() throws ParseException {
        when(userOnboardingService.fetchAll(Mockito.any(), Mockito.anyString(), Mockito.anyBoolean()))
                .thenReturn(UserDataBuilder.getPaginationListOfUsers());
        ResponseEntity<Resource> userDetails = userOnboardingController.downloadUsersDetails("Authorization", "clientId",
                UserDataBuilder.getFetchAllUserRequest());
        assertEquals(HttpStatus.OK, userDetails.getStatusCode());
    }

    @Test
    @DisplayName("Test userPasswordChange with success response")
    public void userPasswordChangeTest() {
//	when(userOnboardingService.changePasswordOfUser("userId", "newPassword",
//		ThemeDataBuilder.getTokenPayLoadAdminRequest())).thenReturn(UserDataBuilder.toSuccessResponse());
//	when(authenticationService.getTokenPayLoadDetails(Mockito.any()))
//		.thenReturn(ThemeDataBuilder.getTokenPayLoadAdminRequest());
        ResponseEntity<SuccessResponse> userPasswordChange = userOnboardingController
                .userPasswordChange("authorization", "userId", "newPassword", httpServletRequest);
        assertEquals(HttpStatus.OK, userPasswordChange.getStatusCode());
    }

    @Test
    @DisplayName("test userDetails excel with success response")
    public void usersBulkUploadTemplateTest() throws ParseException {
        ResponseEntity<Resource> userDetails = userOnboardingController.usersBulkUploadTemplate("Authorization", "clientId");
        assertEquals(HttpStatus.OK, userDetails.getStatusCode());
    }

    @Test
    @DisplayName("test getUserCredentialsEmail")
    public void getUserCredentialsEmail() {
        when(emailService.getUserCredentialsEmailTemplate(Mockito.anyString()))
                .thenReturn(UserDataBuilder.getUserCredentialsEmailResponse());
        ResponseEntity<UserCredentialsEmailResponse> responseEntity = userOnboardingController
                .getUserCredentialsEmail("Authorization", "client-id");
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    @DisplayName("test sendUserCredentialsEmail")
    public void sendUserCredentialsEmail() {
        when(emailService.sendUserCredentialsEmail(Mockito.any()))
                .thenReturn(UserDataBuilder.sendUserCredentialsEmailResponse());


        ResponseEntity<SuccessResponse> clientDetails = userOnboardingController
                .sendUserCredentialsEmail("Authorization", UserDataBuilder.sendUserCredentialsEmailRequest(), "user_id");
        assertEquals(HttpStatus.OK, clientDetails.getStatusCode());
        assertEquals(Constants.CREDENTIALS_SHARED_SUCCESSFULLY, clientDetails.getBody().getMessage());

    }


}
