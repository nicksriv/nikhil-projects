package com.wavelabs.sb.controllers;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.text.ParseException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

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

import com.wavelabs.sb.command.CreateClientCommand;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.ClientDetailsDataBuilder;
import com.wavelabs.sb.model.DataBuilder;
import com.wavelabs.sb.model.RoleDataBuilder;
import com.wavelabs.sb.request.ChangePasswordRequest;
import com.wavelabs.sb.request.ClientModuleRequest;
import com.wavelabs.sb.request.EditPasswordRequest;
import com.wavelabs.sb.response.ClientCredentialsEmailResponse;
import com.wavelabs.sb.response.ClientCredentialsResponse;
import com.wavelabs.sb.response.ClientOnboardingDetailsResponse;
import com.wavelabs.sb.response.FetchAllClientResponse;
import com.wavelabs.sb.response.ModuleIdResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.ClientOnboardingService;
import com.wavelabs.sb.services.EmailService;

@RunWith(MockitoJUnitRunner.class)
public class ClientOnboardingControllerTest {

    @InjectMocks
    ClientOnboardingController clientOnboardingController;

    @Mock
    ClientOnboardingService clientOnboardingService;

    @Mock
    EmailService emailService;

    @Mock
    Resource resource;

    @Mock
    CreateClientCommand createClientCommand;
    
    @Mock
    HttpServletRequest httpServletRequest;
    
    @Mock
    AuthenticationService authenticationService;

    @Test
    @DisplayName("Test createClientOnboarding")
    public void createClientOnboarding() throws IllegalArgumentException {

	when(createClientCommand.execute(Mockito.any()))
		.thenReturn(RoleDataBuilder.getSuccessResponse());
	ResponseEntity<SuccessResponse> response = clientOnboardingController
		.createClientOnboarding("Authorization", ClientDetailsDataBuilder.getClientOnboardingRequest(), httpServletRequest);
	assertEquals("id", response.getBody().getId());
	assertEquals("message", response.getBody().getMessage());
    }

    @Test
    @DisplayName("Test updateModulesOnClient")
    public void updateModulesOnClient() throws ResourceNotFoundException {
	when(clientOnboardingService.updateClientModules(Mockito.anyString(), Mockito.any(), Mockito.any()))
		.thenReturn(DataBuilder.getClientOnboardingDetail());
	List<ClientModuleRequest> list = ClientDetailsDataBuilder.getClientModuleRequest();
	ResponseEntity<?> responseEntity = clientOnboardingController.updateModulesOnClient("Authorization", "test-id",
		list, httpServletRequest);
	SuccessResponse response = (SuccessResponse) responseEntity.getBody();
	assertEquals("test-id", response.getId());
	assertEquals(Constants.DATA_CREATED_SUCCESSFULLY, response.getMessage());
    }

    @Test
    @DisplayName("Test updateClientOnboardingDetails")
    public void updateClientOnboardingDetails() throws ResourceNotFoundException {

	when(clientOnboardingService.clientDetailsUpdate(Mockito.anyString(), Mockito.any(), Mockito.any()))
		.thenReturn(DataBuilder.getClientOnboardingDetail());
	ResponseEntity<SuccessResponse> successResponse = clientOnboardingController
		.updateClientOnboardingDetails("Authorization", "test-id",
			ClientDetailsDataBuilder.getClientOnboardingUpdateRequest(), httpServletRequest);

	assertEquals("test-client-id", successResponse.getBody().getId());
    }

    @Test
    @DisplayName("Test getClientById")
    public void getClientById() {

	ClientOnboardingDetailsResponse detailsResponse = new ClientOnboardingDetailsResponse();
	detailsResponse.setId("some-id");
	when(clientOnboardingService.fetchClientById(Mockito.anyString())).thenReturn(detailsResponse);
	ResponseEntity<ClientOnboardingDetailsResponse> response = clientOnboardingController.getClientById("Authorization", "test-id");
	assertEquals("some-id", response.getBody().getId());
    }

    @Test
    @DisplayName("Test getModulesByClientId")
    public void getModulesByClientId() {

	ModuleIdResponse moduleResponse = new ModuleIdResponse();
	moduleResponse.setId("some-id");
	when(clientOnboardingService.fetchModulesByClientId(Mockito.anyString()))
		.thenReturn(Arrays.asList(ClientDetailsDataBuilder.getModuleIdResponse()));
	ResponseEntity<List<ModuleIdResponse>> response = clientOnboardingController.getModulesByClientId("Authorization", "test-id");
	assertEquals("some-id", response.getBody().get(0).getId());
    }

    @Test
    @DisplayName("Test deleteClient")
    public void deleteClient() {

	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId("any-success-id");
	successResponse.setMessage("any-message");
	when(clientOnboardingService.deleteClientByClientId(Mockito.anyString(), Mockito.any())).thenReturn(successResponse);
	ResponseEntity<SuccessResponse> response = clientOnboardingController.deleteClient("Authorization", "test-id", httpServletRequest);
	assertEquals("any-success-id", response.getBody().getId());
	assertEquals("any-message", response.getBody().getMessage());
    }

    @Test
    @DisplayName("Test addClientLogo")
    public void addClientLogo() throws IOException {

	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId("any-id");
	successResponse.setMessage("any-message");
	when(clientOnboardingService.saveImage(Mockito.any())).thenReturn(successResponse);
	MockMultipartFile multiPartFile = new MockMultipartFile("data", "filename.csv", "text/plain",
		"some csv".getBytes());
	ResponseEntity<SuccessResponse> response = clientOnboardingController.saveLogo("Authorization", multiPartFile);
	assertEquals("any-id", response.getBody().getId());
	assertEquals("any-message", response.getBody().getMessage());
    }

    @Test
    @DisplayName("Test getClientLogo")
    public void getClientLogo() throws IOException {

	when(clientOnboardingService.getClientLogo(Mockito.anyString())).thenReturn(resource);
	ResponseEntity<Resource> response = clientOnboardingController.getClientLogo("Authorization", "test-id");
	assertNotNull(response.getBody());
    }

    @Test
    @DisplayName("Test getCredentials")
    public void getCredentials() {

	when(clientOnboardingService.fetchCredentialsByClientId(Mockito.anyString()))
		.thenReturn(ClientDetailsDataBuilder.getClientCredentialsResponse());
	ResponseEntity<ClientCredentialsResponse> response = clientOnboardingController.getCredentials("Authorization",
		"test-id");
	assertEquals("client-id", response.getBody().getClientId());
    }

    @Test
    @DisplayName("Test changePasswordOfClient")
    public void changePasswordOfClient() {

	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId("any-id");
	successResponse.setMessage("any-message");

	when(clientOnboardingService.changePasswordOfClient(Mockito.anyString(), Mockito.any(), Mockito.any()))
		.thenReturn(successResponse);

	EditPasswordRequest request = new EditPasswordRequest();
	request.setNewPassword("some-new-password");
	ResponseEntity<SuccessResponse> response = clientOnboardingController.changeClientPassword("Authorization",
		"test-id", request, httpServletRequest);
	assertEquals("any-id", response.getBody().getId());
    }

    @Test
    @DisplayName("Test sendClientCredentials")
    public void sendClientCredentials() {

	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId("any-id");
	successResponse.setMessage("any-message");

	when(emailService.shareClientCredentialsEmail(Mockito.anyString())).thenReturn(successResponse);

	ChangePasswordRequest request = new ChangePasswordRequest();
	request.setNewPassword("some-new-password");
	ResponseEntity<?> response = clientOnboardingController.sendClientCredentials("Authorization", "test-id");
	SuccessResponse actualResponse = (SuccessResponse) response.getBody();
	assertEquals("any-id", actualResponse.getId());
    }

    @Test
    @DisplayName("Test fetchAll")
    public void fetchAll() throws ResourceNotFoundException {

	PaginationResponse<ClientOnboardingDetails> details = new PaginationResponse<ClientOnboardingDetails>();
	details.setData(Arrays.asList(DataBuilder.getClientOnboardingDetail()));
	details.setMessage(Constants.DATA_FETCHED_SUCCESSFULLY);
	details.setSize(1L);

	when(clientOnboardingService.fetchAll(Mockito.any())).thenReturn(details);
	when(clientOnboardingService.fetchAllClientResponse(Mockito.any()))
		.thenReturn(ClientDetailsDataBuilder.getPaginationAllClientsResponse());
	ResponseEntity<PaginationResponse<FetchAllClientResponse>> response = clientOnboardingController
		.fetchAll("Authorization", DataBuilder.getPaginationFetchAllRequest());
	PaginationResponse<FetchAllClientResponse> data = response.getBody();

	assertEquals("Data Fetched Successfully", data.getMessage());
	assertEquals(Status.ACTIVE, data.getData().get(0).getStatus());
    }

    @Test
    @DisplayName("test Client Details to  excel")
    public void clientDetailsExcelTest() throws ParseException {
	when(clientOnboardingService.fetchAll(Mockito.any()))
		.thenReturn(ClientDetailsDataBuilder.getPaginationListOfClients());
	ResponseEntity<Resource> clientDetails = clientOnboardingController
		.downloadClientsDetails("Auhtorization", DataBuilder.getEmptyFetchAllRequest());
	assertEquals(HttpStatus.OK, clientDetails.getStatusCode());
    }

    @Test
    @DisplayName("test getClientCredentialsEmail")
    public void getClientCredentialsEmail() {
	when(emailService.getClientCredentialsEmailTemplate(Mockito.anyString()))
		.thenReturn(ClientDetailsDataBuilder.getClientCredentialsEmail());
	ResponseEntity<ClientCredentialsEmailResponse> clientDetails = clientOnboardingController
		.getClientCredentialsEmail("Authorization", "client-id");
	assertEquals(HttpStatus.OK, clientDetails.getStatusCode());
	assertEquals("charanrajj@wavelabs.ai", clientDetails.getBody().getSendTo());
    }

    @Test
    @DisplayName("test sendClientCredentialsEmail")
    public void sendClientCredentialsEmail() {
	when(emailService.sendClientCredentialsEmail(Mockito.any()))
		.thenReturn(ClientDetailsDataBuilder.getClientCredentialsEmailResponse());
	ResponseEntity<SuccessResponse> clientDetails = clientOnboardingController
		.sendClientCredentialsEmail("Authorization", DataBuilder.sendClientCredentialsEmailRequest(),"client-id");
	assertEquals(HttpStatus.OK, clientDetails.getStatusCode());
	assertEquals(Constants.CREDENTIALS_SHARED_SUCCESSFULLY, clientDetails.getBody().getMessage());
    }

}
