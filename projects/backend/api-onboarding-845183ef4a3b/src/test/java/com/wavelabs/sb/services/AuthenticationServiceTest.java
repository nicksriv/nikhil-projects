package com.wavelabs.sb.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.AuthDetailsDataBuilder;
import com.wavelabs.sb.model.ClientDataBuilder;
import com.wavelabs.sb.model.ClientDetailsDataBuilder;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.repositories.AdminDetailsRepository;
import com.wavelabs.sb.repositories.AuthenticationRepository;
import com.wavelabs.sb.repositories.ClientCredentialsRepository;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.UserCredentialsRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;

@RunWith(MockitoJUnitRunner.Silent.class)
public class AuthenticationServiceTest {

    @InjectMocks
    private AuthenticationService authenticationService;

    @Mock
    private ClientOnboardingRepository clientOnboardingRepository;

    @Mock
    private UserOnboardingRepository userOnboardingRepository;

    @Mock
    ClientCredentialsRepository clientCredentialsRepository;

    @Mock
    UserCredentialsRepository userCredentialsRepository;

    @Mock
    JwtAuthenticationService jwtAuthenticationService;

    @Mock
    AuthenticationRepository authenticationRepository;

    @Mock
    AesEncryption aesEncryption;

    @Mock
    AdminDetailsRepository adminDetailsRepository;

   /* @Test
    @DisplayName("test getTokenPayLoadDetails with Success response")
    public void testGetTokenPayLoadDetails_Success_response() {
	TokenPayLoadDetails response = authenticationService
		.getTokenPayLoadDetails(AuthDetailsDataBuilder.getHttpServletRequest());
	assertEquals("typeOfUser", response.getTypeOfUser());
    }*/

    @Test
    @DisplayName("test getTokenPayLoadDetails with null response")
    public void testGetTokenPayLoadDetails_null_response() {
	TokenPayLoadDetails response = authenticationService
		.getTokenPayLoadDetails(AuthDetailsDataBuilder.getHttpServletnullRequest());
	assertNull(response.getUserId());
    }

    @Test
    @DisplayName("test getUserDetails with Success response")
    public void testGetUserDetails_Success_response() {
	when(userOnboardingRepository.findByUserIdAndStatusAndDeleted("EMP0012", Status.ACTIVE, false))
		.thenReturn(Optional.of(UserDataBuilder.getUser()));
	Users response = authenticationService.getUserDetails("EMP0012");
	assertEquals("EMP0012", response.getUserId());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test getUserDetails throw_exception")
    public void testGetUserDetails_throw_exception() {
	when(userOnboardingRepository.findByUserIdAndStatusAndDeleted("123", Status.ACTIVE, false))
		.thenReturn(Optional.of(UserDataBuilder.getUser()));
	authenticationService.getUserDetails("EMP0012");
    }

    @Test
    @DisplayName("test getClientDetails with Success response")
    public void testGetClientDetails_Success_response() {
	when(clientOnboardingRepository.findByClientIdAndStatusAndDeleted("test-client-id", Status.ACTIVE, false))
		.thenReturn(Optional.of(ClientDetailsDataBuilder.getClientOnboardingDetails()));
	ClientOnboardingDetails response = authenticationService.getClientDetails("test-client-id");
	assertEquals("test-client-id", response.getClientId());
    }

//    function now not return error
//    @Test(expected = ResourceNotFoundException.class)
//    @DisplayName("test getClientDetails throw_exception")
//    public void testGetClientDetails_throw_exception() {
//	when(clientOnboardingRepository.findByClientIdAndStatusAndDeleted("test-client-id", Status.ACTIVE, false))
//		.thenReturn(Optional.empty());
//	authenticationService.getClientDetails("test-client-id");
//    }

    @Test
    @DisplayName("test userAlreadyLoggedInCheck")
    public void testUserAlreadyLoggedInCheck() {
	when(authenticationRepository.findByUserNameAndStatus("test-userName", Status.ACTIVE))
		.thenReturn(AuthDetailsDataBuilder.getAuthDetailsrequestList());
	when(authenticationRepository.save(AuthDetailsDataBuilder.getAuthDetails()))
		.thenReturn(AuthDetailsDataBuilder.getAuthDetails());
	authenticationService.userAlreadyLoggedInCheck("test-userName");
    }

    @Test
    @DisplayName("test saveAuthenticationAuditingDetails")
    public void testSaveAuthenticationAuditingDetails() {
        when(authenticationRepository.save(Mockito.any())).thenReturn(AuthDetailsDataBuilder.getAuthenticationAuditingDetails());
        String token="test-token";
        String username="test-username";
        String typeOfUser="test-typeOfUser";
        String ipAddress="test-ipAddress";
        String userAgent="test-userAgent";
        authenticationService.saveAuthenticationAuditingDetails(token,username,typeOfUser,ipAddress,userAgent,"id");
    }

    @Test(expected = BadRequestException.class)
    @DisplayName("test saveAuthenticationAuditingDetails throw_exception")
    public void testSaveAuthenticationAuditingDetails_throw_exception() {
        when(authenticationRepository.save(Mockito.any())).thenReturn(AuthDetailsDataBuilder.getAuthenticationAuditingDetailsIdNull());
        String token="test-token";
        String username="test-username";
        String typeOfUser="test-typeOfUser";
        String ipAddress="test-ipAddress";
        String userAgent="test-userAgent";
        authenticationService.saveAuthenticationAuditingDetails(token,username,typeOfUser,ipAddress,userAgent,"id");
    }

    @Test
    @DisplayName("test logOut")
    public void testLogOut() {
        when(authenticationRepository.findByToken(Mockito.any())).thenReturn(Optional.of(AuthDetailsDataBuilder.getAuthenticationAuditingDetails()));
        String response=authenticationService.logOut("test-token");
        assertEquals(Constants.LOGOUT_SUCCESSFULL, response);
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test logOut throw_exception")
    public void testLogOut_throw_exception() {
        authenticationService.logOut("test-token");
    }

    @Test(expected = NullPointerException.class)
    @DisplayName("test passwordValidation")
    public void testPasswordValidation() {
        authenticationService.passwordValidation("test-password","test-password");
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test getClientCredentials")
    public void testGetClientCredentials() {
        authenticationService.getClientCredentials(ClientDataBuilder.getClientOnBoardDetails());
    }

    @Test
    @DisplayName("test getUserCredentials")
    public void testGetUserCredentials() {
        authenticationService.getUserCredentials(UserDataBuilder.getUsersIdNull());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test getUserCredentials_threw_Exception")
    public void getUserCredentials_threw_Exception() {
        authenticationService.getUserCredentials(UserDataBuilder.getUsersWithoutCredentials());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test getAdminCredentials_threw_exception")
    public void getAdminCredentials_threw_exception() {
        authenticationService.getAdminCredentials(AuthDetailsDataBuilder.getAdminCredentialsWithNull());
    }

    @Test
    @DisplayName("test getAdminDetails")
    public void testGetAdminDetails() {
        when(adminDetailsRepository.findByAdminIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(),Mockito.anyBoolean())).thenReturn(AuthDetailsDataBuilder.getAdminDetails());
        authenticationService.getAdminDetails("test-adminId");
    }
}