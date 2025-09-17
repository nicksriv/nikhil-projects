package com.wavelabs.sb.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.Bank;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ClientsCredentials;
import com.wavelabs.sb.documents.Modules;
import com.wavelabs.sb.documents.ThemeDetails;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.model.CreateClientModel;
import com.wavelabs.sb.model.ThemeDataBuilder;
import com.wavelabs.sb.request.AdminDetails;
import com.wavelabs.sb.request.ClientModuleRequest;
import com.wavelabs.sb.request.ClientOnboardingRequest;
import com.wavelabs.sb.request.ClientOnboardingUpdateRequest;
import com.wavelabs.sb.request.ModuleRequest;
import com.wavelabs.sb.request.ThemeRequest;
import com.wavelabs.sb.response.ClientCredentialsEmailResponse;
import com.wavelabs.sb.response.ClientCredentialsResponse;
import com.wavelabs.sb.response.ClientPrivilegesResponse;
import com.wavelabs.sb.response.FetchAllClientResponse;
import com.wavelabs.sb.response.ModuleIdResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;

public class ClientDetailsDataBuilder {

    public static ClientOnboardingUpdateRequest getClientOnboardingUpdateRequest() {

	ClientOnboardingUpdateRequest clientUpdateDetails = new ClientOnboardingUpdateRequest();
	clientUpdateDetails.setClientName("BIGBAZAR");
	ClientOnboardingRequest clientOnboardingRequest = new ClientOnboardingRequest();
	clientOnboardingRequest.setClientName("BIGBAZAR");
	clientOnboardingRequest.setAddress("Madhapur");
	clientOnboardingRequest.setCity("HYD");
	clientOnboardingRequest.setPinCode("04400");
	clientOnboardingRequest.setLogoId("logoId");
	AdminDetails admin = new AdminDetails();
	admin.setFirstName("sardar");
	admin.setMiddleName("");
	admin.setLastName("shaik");
	admin.setMobile("9084748889");
	admin.setEmail("BigBazar@gmail.com");
	clientUpdateDetails.setAdmin(admin);
	clientUpdateDetails.setLogoId("logoId");
	return clientUpdateDetails;
    }

    public static List<ClientModuleRequest> getClientModuleRequest() {
	List<ClientModuleRequest> clientModuleRequestList = new ArrayList<>();
	ClientModuleRequest clientModuleRequest = new ClientModuleRequest();
	clientModuleRequest.setId("2222121321");
	clientModuleRequestList.add(clientModuleRequest);
	return clientModuleRequestList;
    }

    public static ClientOnboardingRequest getClientOnboardingRequest() {

	ClientOnboardingRequest clientOnboardingRequest = new ClientOnboardingRequest();
	clientOnboardingRequest.setClientName("BIGBAZAR");
	clientOnboardingRequest.setAddress("Madhapur");
	clientOnboardingRequest.setCity("HYD");
	clientOnboardingRequest.setPinCode("04400");
	clientOnboardingRequest.setLogoId("111");
	clientOnboardingRequest.setBackgroundImageId("123");
	AdminDetails admin = new AdminDetails();
	admin.setFirstName("sardar");
	admin.setMiddleName("");
	admin.setLastName("shaik");
	admin.setMobile("9084748889");
	admin.setEmail("BigBazar@gmail.com");
	clientOnboardingRequest.setAdmin(admin);
	return clientOnboardingRequest;
    }

    public static CreateClientModel getCreateClientModel() {
	CreateClientModel model = new CreateClientModel();
	model.setClientOnboardingRequest(getClientOnboardingRequest());
	model.setTokenPayLoadDetails(ThemeDataBuilder.getTokenPayLoadAdminRequest());
	return model;
    }
  

    public static Modules getDummyModule() {
	Modules module = new Modules();
	module.setId("test-id");
	module.setName("Some Module Name");
	module.setStatus(Status.ACTIVE);
	return module;
    }

    public static ModuleRequest getDummyModuleRequest() {
	ModuleRequest moduleRequest = new ModuleRequest();
	moduleRequest.setName("Test-Module-Name");
	return moduleRequest;
    }

    public static ClientsCredentials getClientsCredentials() {
	ClientsCredentials clientsCredentials = new ClientsCredentials();
	clientsCredentials.setClientId("test-client-id");
	clientsCredentials.setClientName("test-clientName");
	clientsCredentials.setPassword("test-password");
	return clientsCredentials;
    }

    public static List<String> getBanksRequest() {
	List<String> banks = new ArrayList<String>();
	banks.add("State bank of India");
	banks.add("Indian Bank");
	return banks;
    }

    public static Bank getDummyBank() {
	Bank bank = new Bank();
	bank.setId("test-id");
	bank.setName("State bank of India");
	bank.setStatus(Status.ACTIVE);
	return bank;
    }

    public static ModuleIdResponse getModuleIdResponse() {
	ModuleIdResponse moduleResponse = new ModuleIdResponse();
	moduleResponse.setId("some-id");
	return moduleResponse;
    }

    public static ClientPrivilegesResponse getClientPrivilegesResponse() {
	ClientPrivilegesResponse clientPrivilegesResponse = new ClientPrivilegesResponse();
	clientPrivilegesResponse.setModuleId("test-module-id");
	clientPrivilegesResponse.setEditTheme(true);
	clientPrivilegesResponse.setView(true);
	clientPrivilegesResponse.setEditWorkFlow(true);
	return clientPrivilegesResponse;
    }

    public static ClientCredentialsResponse getClientCredentialsResponse() {
	ClientCredentialsResponse response = new ClientCredentialsResponse();
	response.setClientId("client-id");
	response.setClientName("client-name");
	return response;
    }

    public static PaginationResponse<ClientOnboardingDetails> getPaginationListOfClients() {
	PaginationResponse<ClientOnboardingDetails> response = new PaginationResponse<>();
	List<ClientOnboardingDetails> list = new ArrayList<>();
	list.add(getClientOnboardingDetails());
	response.setData(list);
	response.setMessage("Data Fetched Successfully....!");
	response.setSize(1L);
	return response;
    }

    public static SuccessResponse getClientCredentialsEmailResponse() {
	SuccessResponse response = new SuccessResponse();
	response.setId("test-client-id");
	response.setMessage(Constants.CREDENTIALS_SHARED_SUCCESSFULLY);
	return response;
    }

    public static ClientOnboardingDetails getClientOnboardingDetails() {
	ClientOnboardingDetails details = new ClientOnboardingDetails();
	details.setClientId("test-client-id");
	details.setStatus(Status.ACTIVE);
	details.setCreatedAt(Instant.now());
	details.setClientCredentials(getClientsCredentials());
	return details;
    }

    public static PaginationResponse<FetchAllClientResponse> getPaginationAllClientsResponse() {
	PaginationResponse<FetchAllClientResponse> response = new PaginationResponse<>();
	List<FetchAllClientResponse> list = new ArrayList<>();
	list.add(getFetchAllClientsResponse());
	response.setData(list);
	response.setMessage(Constants.DATA_FETCHED_SUCCESSFULLY);
	response.setSize(1L);
	return response;
    }

    public static FetchAllClientResponse getFetchAllClientsResponse() {
	FetchAllClientResponse response = new FetchAllClientResponse();
	response.setClientId("test-client-id");
	response.setStatus(Status.ACTIVE);
	return response;
    }
    
    public static ClientCredentialsEmailResponse getClientCredentialsEmail() {
	ClientCredentialsEmailResponse credentialsEmailResponse= new ClientCredentialsEmailResponse();
	credentialsEmailResponse.setClientId("test-client-id");
	credentialsEmailResponse.setSendTo("charanrajj@wavelabs.ai");
	credentialsEmailResponse.setSubject("Subject");
	credentialsEmailResponse.setTemplate("Hi");
	return  credentialsEmailResponse;
    };

	public static ThemeDetails getThemeDetails() {
		ThemeDetails details = new ThemeDetails();
		ThemeRequest themeRequest=new ThemeRequest();
		details.setClientId("test-clientId");
		details.setPrimaryColor(themeRequest.getPrimaryColor());
		details.setSecondaryColor(themeRequest.getMenuColor());
		details.setFontName(themeRequest.getFont());
		details.setDeleted(false);
		details.setStatus(Status.ACTIVE);
		details.setCreatedAt(Instant.now());
		details.setModifiedAt(Instant.now());
		details.setCreatedBy("test-clientId");
		details.setModifiedBy("test-clientId");
		return details;
	}

}