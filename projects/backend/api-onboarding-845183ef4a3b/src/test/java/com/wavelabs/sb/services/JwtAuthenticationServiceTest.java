package com.wavelabs.sb.services;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.exceptions.AuthTokenMissingException;
import com.wavelabs.sb.model.AuthDetailsDataBuilder;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.AuthenticationRepository;

@RunWith(MockitoJUnitRunner.class)
public class JwtAuthenticationServiceTest {

    @InjectMocks
    private JwtAuthenticationService jwtAuthenticationService;

    @Mock
    private AuthenticationRepository authenticationRepository;

    @Test
    @DisplayName("test generateToken")
    public void testGenerateToken() {
	String adminId = "test-adminId";
	String clientId = "test-clientId";
	String userId = "test=userId";
	String typeOfUser = "test-typeOfUser";
	String id = "test-id";
	String clientSystemId = "clientSystemId";
	String firstName = "test-firstName";
	String lastName = "test-lastName";
	String userRole = "test-userRole";
	String token = jwtAuthenticationService.generateToken(adminId, clientId, userId, typeOfUser, id, clientSystemId,
		firstName, lastName, userRole);
	assertNotNull("generatedToken", new String());
    }

    @Test(expected = AuthTokenMissingException.class)
    @DisplayName("test testGetUserNameFromToken_threw_exception")
    public void testGetUserNameFromToken_threw_exception() {
	String jwt = "Bearer.dfsdkfjsdlkfjasdklf";
	TokenPayLoadDetails token = jwtAuthenticationService.getUserNameFromToken(jwt);
	assertNotNull("generatedToken", new String());
    }

    @Test(expected = AuthTokenMissingException.class)
    @DisplayName("test validateToken")
    public void testValidateToken() {
	when(authenticationRepository.findByTokenAndStatus(Mockito.any(), Mockito.any()))
		.thenReturn(AuthDetailsDataBuilder.getAuthDetailsresponse());
	String jwt = "Bearer.dfsdkfjsdlkfjasdklf";
	Boolean isExpired = jwtAuthenticationService.validateToken(jwt);
	assertTrue("true", isExpired);
    }

}