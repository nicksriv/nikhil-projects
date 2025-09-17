package com.wavelabs.sb.model;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.*;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.enums.Gender;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.ClientCredentialsEmailRequest;
import com.wavelabs.sb.request.UserCredentialsEmailRequest;
import com.wavelabs.sb.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class EmailDataBuilder {

	public static Optional<Users> getUsers() {
			Users user=new Users();
			user.setFirstname("test-firstName");
			user.setUserId("test-userId");
			user.setClientId("test-clientId");
			user.setId("id");
			List<RoleOnboardingDetails> roleOnboardingDetailsList=new ArrayList<>();
			RoleOnboardingDetails roleOnboardingDetails=new RoleOnboardingDetails();
			roleOnboardingDetails.setDeleted(false);
			roleOnboardingDetails.setRole("test-role");
			roleOnboardingDetails.setId("test-id");
			user.setRoles(roleOnboardingDetailsList);
			List<String> locationsList=new ArrayList<>();
			locationsList.add("hyd");
			locationsList.add("mumbai");
			user.setLocations(locationsList);
			user.setReportingManagerId("test-reportingManagerId");
			UserCredentials userCredentials=new UserCredentials();
			userCredentials.setUserId("test-userId");
			userCredentials.setName("test-name");
			userCredentials.setId("test-id");
			userCredentials.setPassword("testPassword");
			userCredentials.setStatus(Status.ACTIVE);
			userCredentials.setCreatedAt(Instant.now());
			user.setUserCredentials(userCredentials);
			user.setCreatedAt(Instant.now());
			return Optional.of(user);
	}

	public static UserCredentialsEmailRequest getUserCredentialEmailRequest() {
		UserCredentialsEmailRequest userCredentialsEmailRequest=new UserCredentialsEmailRequest();
		userCredentialsEmailRequest.setUserId("test-userId");
		userCredentialsEmailRequest.setSubject("test-subject");
		userCredentialsEmailRequest.setTemplate("test-template");
		userCredentialsEmailRequest.setSendTo("bb@gmail.com");
		String[] bcc= new String[2];
		bcc[0]="subba@gmail.com";
		bcc[1]="subba1@gmail.com";
		userCredentialsEmailRequest.setBcc(bcc);
		String[] cc= new String[2];
		cc[0]="subba@gmail.com";
		cc[1]="subba1@gmail.com";
		userCredentialsEmailRequest.setCc(cc);
		return userCredentialsEmailRequest;
	}

	public static ClientCredentialsEmailRequest getClientCredentialsEmailRequest() {
		ClientCredentialsEmailRequest clientCredentialsEmailRequest=new ClientCredentialsEmailRequest();
		clientCredentialsEmailRequest.setClientId("test-clientId");
		String[] cc= new String[2];
		cc[0]="subba@gmail.com";
		cc[1]="subba1@gmail.com";
		clientCredentialsEmailRequest.setCc(cc);
		String[] bcc= new String[2];
		bcc[0]="subba@gmail.com";
		bcc[1]="subba1@gmail.com";
		clientCredentialsEmailRequest.setBcc(bcc);
		clientCredentialsEmailRequest.setSubject("test-subject");
		clientCredentialsEmailRequest.setTemplate("test-template");
		clientCredentialsEmailRequest.setSendTo("cc@gmail.com");
		return clientCredentialsEmailRequest;
	}

	public static Optional<Users> getUserCredentialsNull() {
			Users user=new Users();
			user.setFirstname("test-firstName");
			user.setUserId("test-userId");
			user.setClientId("test-clientId");
			List<RoleOnboardingDetails> roleOnboardingDetailsList=new ArrayList<>();
			RoleOnboardingDetails roleOnboardingDetails=new RoleOnboardingDetails();
			roleOnboardingDetails.setDeleted(false);
			roleOnboardingDetails.setRole("test-role");
			roleOnboardingDetails.setId("test-id");
			user.setRoles(roleOnboardingDetailsList);
			List<String> locationsList=new ArrayList<>();
			locationsList.add("hyd");
			locationsList.add("mumbai");
			user.setLocations(locationsList);
			user.setReportingManagerId("test-reportingManagerId");
			user.setUserCredentials(null);
			user.setCreatedAt(Instant.now());
			return Optional.of(user);
		}

	public static Optional<Users> getUserIsDeleted() {
		Users user=new Users();
		user.setFirstname("test-firstName");
		user.setUserId("test-userId");
		user.setClientId("test-clientId");
		List<RoleOnboardingDetails> roleOnboardingDetailsList=new ArrayList<>();
		RoleOnboardingDetails roleOnboardingDetails=new RoleOnboardingDetails();
		roleOnboardingDetails.setDeleted(false);
		roleOnboardingDetails.setRole("test-role");
		roleOnboardingDetails.setId("test-id");
		user.setRoles(roleOnboardingDetailsList);
		List<String> locationsList=new ArrayList<>();
		locationsList.add("hyd");
		locationsList.add("mumbai");
		user.setLocations(locationsList);
		user.setReportingManagerId("test-reportingManagerId");
		user.setUserCredentials(null);
		user.setCreatedAt(Instant.now());
		user.setDeleted(true);
		return Optional.of(user);
	}

	public static ClientOnboardingDetails getClientOnBoardDetailsForException() {
		ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
		clientOnboardingDetails.setId("test-id");
		clientOnboardingDetails.setClientId("d3098u");
		clientOnboardingDetails.setAddress("KPHB");
		clientOnboardingDetails.setArea("KPHB");
		clientOnboardingDetails.setCity("Hyderabad");
		clientOnboardingDetails.setCountry("IN");
		clientOnboardingDetails.setFirstName("Vijay");
		clientOnboardingDetails.setLastName("Pilta");
		clientOnboardingDetails.setState("TS");
		clientOnboardingDetails.setPinCode("500076");
		clientOnboardingDetails.setMiddleName("Kumar");
		clientOnboardingDetails.setStatus(Status.ACTIVE);
		clientOnboardingDetails.setDeleted(true);
		clientOnboardingDetails.setClientCredentials(getClientCredentials());
		return clientOnboardingDetails;
	}

	public static ClientsCredentials getClientCredentials() {
		ClientsCredentials clientsCredentials=new ClientsCredentials();
		clientsCredentials.setClientId("45der8");
		clientsCredentials.setPassword("jjdjdj");
		clientsCredentials.setClientName("bigbazar");
		clientsCredentials.setCreatedAt(Instant.now());
		clientsCredentials.setId("888");
		return clientsCredentials;
	}

	public static ClientOnboardingDetails getClientOnBoardDetails() {
		ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
		clientOnboardingDetails.setId("test-id");
		clientOnboardingDetails.setClientId("d3098u");
		clientOnboardingDetails.setAddress("KPHB");
		clientOnboardingDetails.setArea("KPHB");
		clientOnboardingDetails.setCity("Hyderabad");
		clientOnboardingDetails.setCountry("IN");
		clientOnboardingDetails.setFirstName("Vijay");
		clientOnboardingDetails.setLastName("Pilta");
		clientOnboardingDetails.setState("TS");
		clientOnboardingDetails.setPinCode("500076");
		clientOnboardingDetails.setMiddleName("Kumar");
		clientOnboardingDetails.setStatus(Status.ACTIVE);
		clientOnboardingDetails.setClientCredentials(getClientCredentials());
		return clientOnboardingDetails;
	}


	public static Optional<UserCredentials> getUserCredentials() {
		UserCredentials userCredentials=new UserCredentials();
		userCredentials.setCreatedAt(Instant.now());
		userCredentials.setUserId("test-userId");
		userCredentials.setStatus(Status.ACTIVE);
		userCredentials.setPassword("test-password");
		userCredentials.setId("test-id");
		userCredentials.setName("test-name");
		userCredentials.setCreatedBy("test-createdBy");
		userCredentials.setModifiedUserType("test-modifiedUserType");
		return Optional.of(userCredentials);
	}
}
