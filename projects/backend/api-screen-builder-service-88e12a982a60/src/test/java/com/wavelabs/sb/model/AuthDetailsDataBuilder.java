package com.wavelabs.sb.model;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.mock.web.MockHttpServletRequest;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.AdminCredentials;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.documents.AuthenticationAuditingDetails;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.enums.Gender;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.ClientRolesRequest;
import com.wavelabs.sb.response.RoleInfo;
import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.documents.RoleModules;
import com.wavelabs.sb.documents.RoleOnboardingDetails;

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
	public static AuthenticationAuditingDetails getAuthDetailsrequestData() {
		Instant instant=Instant.now();
		
		AuthenticationAuditingDetails authDetails = new AuthenticationAuditingDetails();
		authDetails.setId("id");
		authDetails.setIpAddress("IpAddress");
		authDetails.setLastAccessed(Instant.now().minus(32L,ChronoUnit.MINUTES));
		authDetails.setLoginAt(Instant.now());
		authDetails.setStatus(Status.ACTIVE);
		authDetails.setToken("token");
		authDetails.setTypeOfUser(Constants.CLIENT);
		authDetails.setUserAgent("Chrome");
		authDetails.setUserName("clientId");
		authDetails.setLogoutAt(instant); 
		//now.isAfter(auditingDetailsOpt.get().getLastAccessed().plus(30L, ChronoUnit.MINUTES))
//		instant.isAfter(authDetails.getLastAccessed().plus(29L, ChronoUnit.MINUTES));
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
//    public static AuthenticateClientRequest getClientAuthRequest() {
//	AuthenticateClientRequest authenticateClientRequest = new AuthenticateClientRequest();
//	authenticateClientRequest.setClientId("test-client-id");
//	authenticateClientRequest.setPassword("Password");
//	return authenticateClientRequest;
//    }
//
//    public static AuthenticateUserRequest getUserAuthRequest() {
//	AuthenticateUserRequest request = new AuthenticateUserRequest();
//	request.setPassword("Password");
//	request.setUserId("EMP0012");
//	return request;
//    }

	public static HttpServletRequest getHttpServletRequest() {
		HttpServletRequest request = new MockHttpServletRequest();
		TokenPayLoadDetails token=new TokenPayLoadDetails();
		//token.setFirstName("ram");
//		request.setAttribute("clientId", "clientId");
//		request.setAttribute("userId", "userId");
		request.setAttribute("token", token);
		return request;
	}
	public static HttpServletRequest getHttpServletRequestData() {
		HttpServletRequest request = new MockHttpServletRequest();
		request.setAttribute("typeOfUser", "typeOfUser");
		request.setAttribute("tokenPayLoadDetails", "tokenPayLoadDetails");
		request.setAttribute("userId", "userId");
		
		return request;
	}

	public static HttpServletRequest getHttpServletnullRequest() {
		return new MockHttpServletRequest();
	}

	public static List<AuthenticationAuditingDetails> getAuthDetailsrequestList() {
		List<AuthenticationAuditingDetails> list = new ArrayList<>();
		list.add(getAuthDetailsrequest());
		return list;
	}

	public static Optional<AdminDetails> getAdminDetails() {
		AdminDetails adminDetails = new AdminDetails();
		adminDetails.setAdminId("test-adminId");
		adminDetails.setAddress("hyd");
		return Optional.of(adminDetails);
	}

	public static AdminDetails getAdminCredentialsWithNull() {
		AdminDetails adminDetails = new AdminDetails();
		adminDetails.setAdminId("test-id");
		adminDetails.setGender(Gender.MALE);
		return adminDetails;
	}

	public static AdminCredentials getAdminDetailsWithCredentials() {
		AdminDetails adminDetails = new AdminDetails();
		adminDetails.setAdminId("test-id");
		adminDetails.setGender(Gender.MALE);
		AdminCredentials adminCredentials = new AdminCredentials();
		adminCredentials.setAdminId("test-id");
		adminCredentials.setPassword("test-admin-password");
		adminDetails.setAdminCredentials(adminCredentials);
		return adminDetails.getAdminCredentials();
	}

	public static TokenPayLoadDetails getTokenPayLoadDetails() {
		TokenPayLoadDetails tokenPayLoadDetails = new TokenPayLoadDetails();
		tokenPayLoadDetails.setAdminId("test-adminId");
		tokenPayLoadDetails.setId("test-id");
		tokenPayLoadDetails.setClientId("test-clientId");
		tokenPayLoadDetails.setUserId("test-userId");
		tokenPayLoadDetails.setTypeOfUser("test-typeOfUser");
		return tokenPayLoadDetails;
	}

	public static AdminDetails getAdminDetailsData() {
		AdminDetails details = new AdminDetails();
		details.setAadharNumber("8299882990101");

		details.setAddress("9-02");
		AdminCredentials credentials = new AdminCredentials();
		credentials.setAdminId("adminId");
		credentials.setCreatedAt(Instant.now());
		credentials.setId("Id");
		credentials.setModifiedAt(Instant.now());
		credentials.setPassword("9ii8");
		details.setAdminCredentials(credentials);
		details.setAdminId("AdminId");
		details.setArea("Knr");
		details.setCountry("India");
		details.setCreatedAt(Instant.now());

		details.setDateofBirth(Date.from(Instant.now()));
		details.setDeleted(false);
		details.setEmail("ram@gmail.com");
		details.setFullName("RamPenti");
		details.setGender(Gender.MALE);
		details.setId("Id");
		details.setMobile("9817992000");
		details.setModifiedAt(Instant.now());
		details.setPanNumber("YYTWT7717T");
		details.setPincode("990100");
		details.setState("TS");
		details.setStatus(Status.ACTIVE);
		return details;
	}

	public static ClientOnboardingDetails getClientOnboardingDetails() {
		ClientOnboardingDetails details = new ClientOnboardingDetails();
		details.setArea("Knr");
		details.setCountry("India");
		details.setCreatedAt(Instant.now());

		details.setDeleted(false);
		details.setEmail("ram@gmail.com");
		details.setId("test-client-id");
		details.setMobile("9817992000");
		details.setModifiedAt(Instant.now());

		details.setState("TS");
		details.setStatus(Status.ACTIVE);
		details.setClientId("ClientId");
		ClientRolesRequest request=new ClientRolesRequest();
		request.setEditTheme(false);
		request.setEditWorkFlow(false);
		request.setModuleId("ModuleId");
		request.setView(false);
		List<ClientRolesRequest> listOfRequest= new ArrayList<>();
		listOfRequest.add(request);
		details.setClientRoles(listOfRequest);
		details.setClientName("Ramakrishna");
		details.setFirstName("Ram");
		details.setHeadOfficeName("HYD");
		details.setLastName("Penti");
		
		details.setModules(giveModules());
		return details;
	}
	public static List<Module> giveModules() {
		List<Module> modules=new ArrayList<>();
		Module module=new Module();
		module.setClientId("clientId");
		module.setName("Vishwak");
		module.setId("ModuleId");
		List<RoleOnboardingDetails> listRoles=new ArrayList<>();
		listRoles.add(getRoleOnboardingDetails());
		module.setRoles(listRoles);
		List<RoleInfo> roleInfo=new ArrayList<>();
		RoleInfo info=new RoleInfo();
		info.setId("RoleId");
		info.setRole("TL role");
		roleInfo.add(info);
		return modules;
	}
	public static RoleOnboardingDetails getRoleOnboardingDetails() {
		RoleOnboardingDetails roleOnboardingDetails=new RoleOnboardingDetails();
		roleOnboardingDetails.setRole("Admin");
		roleOnboardingDetails.setDescription("test-Description");
		roleOnboardingDetails.setDeleted(false);
		roleOnboardingDetails.setId("RoleId");
		roleOnboardingDetails.setStatus(Status.ACTIVE);
		roleOnboardingDetails.setId("Role1"); 
		List<RoleModules> modules=new ArrayList<>();
		RoleModules module=new RoleModules();
		module.setId("RoleModuleId");
		module.setName("RoleModule1");
		module.setStatus(Status.ACTIVE);
		modules.add(module);
		roleOnboardingDetails.setModule(modules);
		roleOnboardingDetails.setClientId("ClientId");
		return roleOnboardingDetails;
	}
}
