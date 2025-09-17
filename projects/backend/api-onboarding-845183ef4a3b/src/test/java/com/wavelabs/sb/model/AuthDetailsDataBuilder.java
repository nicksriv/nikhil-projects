package com.wavelabs.sb.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.wavelabs.sb.documents.AdminCredentials;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.enums.Gender;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.mock.web.MockHttpServletRequest;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.AuthenticationAuditingDetails;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.AuthenticateClientRequest;
import com.wavelabs.sb.request.AuthenticateUserRequest;

public class AuthDetailsDataBuilder {

    public static AuthenticationAuditingDetails getAuthDetailsrequest() {
	AuthenticationAuditingDetails authDetails = new AuthenticationAuditingDetails();
	authDetails.setId("id");
	authDetails.setIpAddress("IpAddress");
	authDetails.setLastAccessed(Instant.now());
	authDetails.setLoginAt(Instant.now());
	authDetails.setStatus(Status.ACTIVE);
	authDetails.setToken("token");
	authDetails.setTypeOfUser(Constants.CLIENT);
	authDetails.setUserAgent("Chrome");
	authDetails.setUserName("clientId");
	return authDetails;
    }

	public static AuthenticationAuditingDetails getAuthDetails() {
		AuthenticationAuditingDetails authDetails = getAuthDetailsrequest();
		authDetails.setStatus(Status.INACTIVE);
		authDetails.setLogoutAt(Instant.now());
		return authDetails;
	}

	public static Optional<AuthenticationAuditingDetails> getAuthDetailsresponse() {
	AuthenticationAuditingDetails authDetails = new AuthenticationAuditingDetails();
	authDetails.setId("id");
	authDetails.setIpAddress("IpAddress");
	authDetails.setLastAccessed(Instant.now());
	authDetails.setLoginAt(Instant.now());
	authDetails.setLogoutAt(Instant.now());
	authDetails.setStatus(Status.ACTIVE);
	authDetails.setToken("token");
	authDetails.setTypeOfUser(Constants.CLIENT);
	authDetails.setUserAgent("Chrome");
	authDetails.setUserName("clientId");
	return Optional.of(authDetails);
    }

	public static AuthenticationAuditingDetails getAuthenticationAuditingDetails() {
		AuthenticationAuditingDetails authDetails = new AuthenticationAuditingDetails();
		authDetails.setId("id");
		authDetails.setIpAddress("IpAddress");
		authDetails.setLastAccessed(Instant.now());
		authDetails.setLoginAt(Instant.now());
		authDetails.setLogoutAt(Instant.now());
		authDetails.setStatus(Status.ACTIVE);
		authDetails.setToken("token");
		authDetails.setTypeOfUser(Constants.CLIENT);
		authDetails.setUserAgent("Chrome");
		authDetails.setUserName("clientId");
		return authDetails;
	}

	public static AuthenticationAuditingDetails getAuthenticationAuditingDetailsIdNull() {
		AuthenticationAuditingDetails authDetails = new AuthenticationAuditingDetails();
		authDetails.setId("");
		authDetails.setIpAddress("IpAddress");
		authDetails.setLastAccessed(Instant.now());
		authDetails.setLoginAt(Instant.now());
		authDetails.setLogoutAt(Instant.now());
		authDetails.setStatus(Status.ACTIVE);
		authDetails.setToken("token");
		authDetails.setTypeOfUser(Constants.CLIENT);
		authDetails.setUserAgent("Chrome");
		authDetails.setUserName("clientId");
		return authDetails;
	}
    public static AuthenticateClientRequest getClientAuthRequest() {
	AuthenticateClientRequest authenticateClientRequest = new AuthenticateClientRequest();
	authenticateClientRequest.setClientId("test-client-id");
	authenticateClientRequest.setPassword("Password");
	return authenticateClientRequest;
    }

    public static AuthenticateUserRequest getUserAuthRequest() {
	AuthenticateUserRequest request = new AuthenticateUserRequest();
	request.setPassword("Password");
	request.setUserId("EMP0012");
	return request;
    }

    public static HttpServletRequest getHttpServletRequest() {
	HttpServletRequest request = new MockHttpServletRequest();
	request.setAttribute("clientId", "clientId");
	request.setAttribute("userId", "userId");
	request.setAttribute("typeOfUser", "typeOfUser");
	return request;
    }

    public static HttpServletRequest getHttpServletnullRequest() {
  	return new MockHttpServletRequest();
      }

	public static List<AuthenticationAuditingDetails> getAuthDetailsrequestList() {
		List<AuthenticationAuditingDetails> list =new ArrayList<>();
		list.add(getAuthDetailsrequest());
		return  list;
	}

	public static Optional<AdminDetails> getAdminDetails() {
		AdminDetails adminDetails=new AdminDetails();
		adminDetails.setAdminId("test-adminId");
		adminDetails.setAddress("hyd");
		return Optional.of(adminDetails);
	}

	public static AdminDetails getAdminCredentialsWithNull() {
		AdminDetails adminDetails=new AdminDetails();
		adminDetails.setAdminId("test-id");
		adminDetails.setGender(Gender.MALE);
		return adminDetails;
	}

	public static AdminCredentials getAdminDetailsWithCredentials() {
		AdminDetails adminDetails=new AdminDetails();
		adminDetails.setAdminId("test-id");
		adminDetails.setGender(Gender.MALE);
		AdminCredentials adminCredentials=new AdminCredentials();
		adminCredentials.setAdminId("test-id");
		adminCredentials.setPassword("test-admin-password");
		adminDetails.setAdminCredentials(adminCredentials);
		return adminDetails.getAdminCredentials();
	}

    public static TokenPayLoadDetails getTokenPayLoadDetails() {
		TokenPayLoadDetails tokenPayLoadDetails=new TokenPayLoadDetails();
		tokenPayLoadDetails.setAdminId("test-adminId");
		tokenPayLoadDetails.setId("test-id");
		tokenPayLoadDetails.setClientId("test-clientId");
		tokenPayLoadDetails.setUserId("test-userId");
		tokenPayLoadDetails.setTypeOfUser("test-typeOfUser");
		return tokenPayLoadDetails;
    }
}
