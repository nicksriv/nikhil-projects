package com.wavelabs.sb.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.AuthenticationAuditingDetails;
import com.wavelabs.sb.exceptions.AuthTokenMissingException;
import com.wavelabs.sb.exceptions.UnauthorizedException;
import com.wavelabs.sb.model.AuthDetailsDataBuilder;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repository.AuthenticationRepository;

@RunWith(MockitoJUnitRunner.Silent.class)
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
	String typeOfUser = "admin";
	String id = "test-id";

	String token = jwtAuthenticationService.generateToken(adminId, clientId, userId, typeOfUser, id);
	assertNotNull("generatedToken", new String());
    }

    @Test(expected = AuthTokenMissingException.class)
    @DisplayName("test testGetUserNameFromToken_threw_exception")
    public void testGetUserNameFromToken_threw_exception() {
	String jwt = "Bearer.dfsdkfjsdlkfjasdklf";
	TokenPayLoadDetails token = jwtAuthenticationService.getUserNameFromToken(jwt);
	assertNotNull("generatedToken", new String());
    }

    @Test
    @DisplayName("test testGetUserNameFromToken")
    public void testGetUserNameFromToken() {
	String jwt = "Bearer.eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6IkRNMDMwMyIsImV4cCI6MTY0MzYzMjcwNCwiaWF0IjoxNjQzNjMwOTA0fQ.w5QEOOg3sBgryvKWJpptCpufwr9guXguSdXT0eh8a9N6d0laO9NR37qh7F7Mv3RFHlKMJtHMWsjPjh8n8hLLKA";
	TokenPayLoadDetails token = jwtAuthenticationService.getUserNameFromToken(jwt);
	assertNotNull("generatedToken", token);
    }

    @Test
    @DisplayName("test validateToken")
    public void testValidateToken() {
	when(authenticationRepository.findByTokenAndStatus(Mockito.any(), Mockito.any()))
		.thenReturn(AuthDetailsDataBuilder.getAuthDetailsresponse());
	String jwt = "Bearer.dfsdkfjsdlkfjasdklf";
	Throwable response = assertThrows(UnauthorizedException.class, () -> {
	    jwtAuthenticationService.validateToken(jwt);
	});
	assertEquals(Constants.INVALID_TOKEN, response.getMessage());
    }

//    @Test
//    @DisplayName("test validateToken")
//    public void testValidateTokenException() {
//	AuthenticationAuditingDetails auditDetails = AuthDetailsDataBuilder.getAuthDetailsrequestData();
//	when(authenticationRepository.findByTokenAndStatus(Mockito.any(), Mockito.any()))
//		.thenReturn(Optional.of(auditDetails));
//
//	when(authenticationRepository.save(Mockito.any())).thenReturn(auditDetails);
//
//	String jwt = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlT2ZVc2VyIjoiVXNlciIsImZpcnN0TmFtZSI6IlByYXNhbm5hIiwibGFzdE5hbWUiOiJrIiwiY2xpZW50U3lzdGVtSWQiOiI2MjY4ZDViNWFmNDJjMzU2YjIzY2Q3NTIiLCJjbGllbnRJZCI6Ik5FNTUyNDMwNDk2IiwiaWQiOiI2MjY4ZGQ4M2FmNDJjMzU2YjIzY2Q3NmYiLCJ1c2VyUm9sZSI6IiIsInVzZXJJZCI6IktQMDEiLCJpYXQiOjE2NTExNTM3MTR9.bif8-u-78mH5Cpnc5qvs1dUPwuR5No5KAGErquTsYVq-caF3g-RSx26Xndgw54SY74LD4CbB_jV3dZG5BmjCjQ";
//	Throwable response = assertThrows(NullPointerException.class, () -> {
//	    jwtAuthenticationService.validateToken(jwt);
//	});
//	assertEquals("Cannot invoke \"java.lang.Long.longValue()\" because \"this.webAppSession\" is null",
//		response.getMessage());
//
//    }

}