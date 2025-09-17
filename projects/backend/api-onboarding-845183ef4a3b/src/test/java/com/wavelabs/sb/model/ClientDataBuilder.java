package com.wavelabs.sb.model;

import java.time.Instant;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ClientsCredentials;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.AuthenticateClientRequest;
import com.wavelabs.sb.response.LoginResponse;

public class ClientDataBuilder {

    public static ClientOnboardingDetails getClientOnBoardDetails() {
		ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
		clientOnboardingDetails.setId("test-id");
		clientOnboardingDetails.setClientId("CL0001");
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
		clientOnboardingDetails.setProfileImage(FileDataBuilder.getFiles().get());
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

	public static AuthenticateClientRequest getAuthenticateClientRequest() {
		AuthenticateClientRequest authenticateClientRequest=new AuthenticateClientRequest();
		authenticateClientRequest.setClientId("d43okk");
		authenticateClientRequest.setPassword("dfsdfdsf");
		return authenticateClientRequest;
	}

	public static AuthenticateLoginModel getAuthenticateLoginModel() {
	    AuthenticateLoginModel model= new AuthenticateLoginModel();
	    model.setBrowser("browser");
	    model.setIp("clientIp");
	    model.setClientRequest(getAuthenticateClientRequest());
	    return model;
	}

	public static LoginResponse getLoginResponse() {
		LoginResponse loginResponse=new LoginResponse();
		loginResponse.setMessage(Constants.LOGIN_SUCCESSFULL);
		loginResponse.setToken("token");
		return loginResponse;
	}
}
