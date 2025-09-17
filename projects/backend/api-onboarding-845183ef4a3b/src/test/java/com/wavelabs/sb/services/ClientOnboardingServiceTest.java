package com.wavelabs.sb.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.mock.web.MockMultipartFile;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.Files;
import com.wavelabs.sb.documents.Modules;
import com.wavelabs.sb.documents.ProfileImage;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.EntityNotFoundException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.ClientDataBuilder;
import com.wavelabs.sb.model.ClientDetailsDataBuilder;
import com.wavelabs.sb.model.DataBuilder;
import com.wavelabs.sb.model.ThemeDataBuilder;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.repositories.ClientCredentialsRepository;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.FilesRepository;
import com.wavelabs.sb.repositories.ModulesRepository;
import com.wavelabs.sb.repositories.ProfileImageRepository;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.SiteOnboardingRepository;
import com.wavelabs.sb.repositories.ThemeDetailsRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.request.ClientModuleRequest;
import com.wavelabs.sb.request.EditPasswordRequest;
import com.wavelabs.sb.request.FetchAllRequest;
import com.wavelabs.sb.response.ClientCredentialsEmailResponse;
import com.wavelabs.sb.response.ClientCredentialsResponse;
import com.wavelabs.sb.response.ClientOnboardingDetailsResponse;
import com.wavelabs.sb.response.FetchAllClientResponse;
import com.wavelabs.sb.response.ModuleIdResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;

@RunWith(MockitoJUnitRunner.class)
public class ClientOnboardingServiceTest {

    @InjectMocks
    private ClientOnboardingService clientOnboardingService;

    @Mock
    private ClientOnboardingRepository clientOnboardingRepository;

    @Mock
    private ThemeService themeService;

    @Mock
    private ModulesRepository moduleRepository;

    @Mock
    private ClientCredentialsRepository clientCredentialsRepository;

    @Mock
    private ProfileImageRepository profileImageRepository;

    @Mock
    private UserOnboardingRepository userOnBoardingRepository;

    @Mock
    private MongoTemplate mongoTemplate;

    @Mock
    private EmailService emailService;

    @Mock
    ThemeDetailsRepository themeDetailsRepository;

    @Mock
    AesEncryption aesEncryption;

    @Mock
    SiteOnboardingRepository siteOnboardingRepository;

    @Mock
    RoleOnboardingRepository roleOnboardingRepository;

    @Mock
    FilesRepository filesRepository;

    @Test
    @DisplayName("test fetchClientById should throw Exception when no clients are found")
    public void testFetchClientById_Exception() {
	assertThrows(EntityNotFoundException.class, () -> {
	    clientOnboardingService.fetchClientById("");
	});
    }

    @Test
    @DisplayName("test fetchModulesByClientId success response")
    public void testFetchModulesByClientId_Success() {
	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setStatus(Status.ACTIVE);
	Modules module = new Modules();
	module.setId("test-id");
	module.setName("Some Module Name");

	List<Modules> moduleList = new ArrayList<Modules>();
	moduleList.add(module);
	clientOnboardingDetails.setModules(moduleList);

	Optional<ClientOnboardingDetails> clientOnboard = Optional.ofNullable(clientOnboardingDetails);
	when(clientOnboardingRepository.findById(Mockito.any())).thenReturn(clientOnboard);
	List<ModuleIdResponse> moduleIdsResponse = clientOnboardingService.fetchModulesByClientId("someClientId");
	assertEquals(1, moduleIdsResponse.size());
	assertEquals("test-id", moduleIdsResponse.get(0).getId());
    }

    @Test
    @DisplayName("test fetchModulesByClientId Should throws Exception when no Modules Found")
    public void testFetchModulesByClientId_Exception() {
	assertThrows(EntityNotFoundException.class, () -> {
	    clientOnboardingService.fetchModulesByClientId("");
	});
    }

    @Test
    @DisplayName("test deleteClientByClientId Success Response")
    public void testDeleteClientByClientId_Success() {
	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setStatus(Status.ACTIVE);
	Optional<ClientOnboardingDetails> clientOnboard = Optional.ofNullable(clientOnboardingDetails);
	when(clientOnboardingRepository.findByClientId(Mockito.any())).thenReturn(clientOnboard);
	when(clientOnboardingRepository.findByClientId(Mockito.any())).thenReturn(clientOnboard);
	SuccessResponse response = clientOnboardingService.deleteClientByClientId("test-id",
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals("test-id", response.getId());
	assertEquals(Constants.CLIENT_DELETED_SUCCESSFULLY, response.getMessage());
    }

    @Test
    @DisplayName("test deleteClientByClientId throws Exception")
    public void testDeleteClientByClientId_Exception() {
	EntityNotFoundException response = assertThrows(EntityNotFoundException.class, () -> {
	    clientOnboardingService.deleteClientByClientId("", ThemeDataBuilder.getTokenPayLoadAdminRequest());
	});
	assertEquals(Constants.CLIENT_NOT_FOUND + ": ", response.getMessage());
    }

    @Test
    @DisplayName("test ClientDetailsUpdate throws Exception")
    public void TestClientDetailsUpdate_Exception() {
	assertThrows(EntityNotFoundException.class, () -> {
	    clientOnboardingService.clientDetailsUpdate("", null, ThemeDataBuilder.getTokenPayLoadAdminRequest());
	});
    }

    @Test
    public void testSaveClientDetails() {
	ClientOnboardingDetails client = ClientDetailsDataBuilder.getClientOnboardingDetails();
	when(filesRepository.findById(Mockito.any())).thenReturn(Optional.of(new Files()));
	when(clientOnboardingRepository.findByClientNameIgnoreCaseAndDeleted(Mockito.any(), Mockito.anyBoolean()))
		.thenReturn(Optional.empty());
	when(clientOnboardingRepository.max()).thenReturn("id");
	when(clientOnboardingRepository.findById(Mockito.any()))
		.thenReturn(Optional.of(ClientDataBuilder.getClientOnBoardDetails()));
	when(clientOnboardingRepository.save(Mockito.any())).thenReturn(ClientDataBuilder.getClientOnBoardDetails());
	ClientOnboardingDetails saveClientonboardingDetails = clientOnboardingService
		.saveClientDetails(ClientDetailsDataBuilder.getCreateClientModel());
	assertEquals(saveClientonboardingDetails.getClientName(),
		ClientDetailsDataBuilder.getClientOnboardingRequest().getClientName());

    }

    @Test
    public void testSaveClientDetailsException() {
	ClientOnboardingDetails client = ClientDetailsDataBuilder.getClientOnboardingDetails();

	when(clientOnboardingRepository.findByClientNameIgnoreCaseAndDeleted(Mockito.any(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(client));
	ResourceNotFoundException response = assertThrows(ResourceNotFoundException.class, () -> {
	    clientOnboardingService.saveClientDetails(ClientDetailsDataBuilder.getCreateClientModel());
	});
	assertEquals(response.getMessage(), response.getMessage());
    }

    @Test
    public void testClientDetailsUpdate() throws ResourceNotFoundException {
	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setClientName("BIGBAZAR");
	clientOnboardingDetails.setStatus(Status.ACTIVE);
	clientOnboardingDetails.setId("6143a4e7ea1ce71eeda5426f");
	Files logo = new Files();
	logo.setId("logoId");
	clientOnboardingDetails.setLogo(logo);
	Optional<ClientOnboardingDetails> clientOnboard = Optional.ofNullable(clientOnboardingDetails);
	when(clientOnboardingRepository.findById(Mockito.any())).thenReturn(clientOnboard);
	ClientOnboardingDetails saveClientonboardingDetails = clientOnboardingService.clientDetailsUpdate(
		"6143a4e7ea1ce71eeda5426f", ClientDetailsDataBuilder.getClientOnboardingUpdateRequest(),
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals(saveClientonboardingDetails.getClientName(),
		ClientDetailsDataBuilder.getClientOnboardingUpdateRequest().getClientName());

    }

    @Test
    @DisplayName("test saveClientLogo")
    public void testSaveClientLogo() throws Exception {

	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setStatus(Status.ACTIVE);
	ProfileImage logo = new ProfileImage();
	when(profileImageRepository.save(Mockito.any())).thenReturn(logo);

	MockMultipartFile file = new MockMultipartFile("file", "NameOfTheFile.jpg", "multipart/form-data",
		"some-file".getBytes());
	SuccessResponse response = clientOnboardingService.saveImage(file);
	assertEquals(Constants.IMAGE_UPLOADED_SUCCESSFULLY, response.getMessage());

    }

    @Test
    @DisplayName("test saveClientLogo Invalid Client ID should throw exception")
    public void testSaveClientLogo_Exception() throws Exception {

	assertThrows(NullPointerException.class, () -> {
	    MockMultipartFile file = new MockMultipartFile("file", "NameOfTheFile.jpg", "multipart/form-data",
		    "some-file".getBytes());
	    clientOnboardingService.saveImage(file);
	});
    }

    @Test
    @DisplayName("test getClientLogo Invalid Client ID should throw exception")
    public void testGetClientLogoException() throws Exception {
	assertThrows(EntityNotFoundException.class, () -> {
	    clientOnboardingService.getClientLogo("anyClientId");
	});
    }

    @Test
    @DisplayName("test getClientLogo with success response")
    public void testGetClientLogo() {
	Files file=new Files();
	file.setId("id");
	file.setFileUUID("uuid");
	file.setFilePath("filePath");
	ClientOnboardingDetails client=ClientDataBuilder.getClientOnBoardDetails();
	client.setLogo(file);
	when(clientOnboardingRepository.findById(Mockito.any()))
	.thenReturn(Optional.of(client));
	assertThrows(ResourceNotFoundException.class, () -> {
	    clientOnboardingService.getClientLogo("anyClientId");
	});
    }

    @Test
    @DisplayName("test getFilterQuery")
    public void testGetFilterQuery() {
	FetchAllRequest fetchAllRequest = DataBuilder.getEmptyFetchAllRequest();
	fetchAllRequest.setClientName("TestClient");
	fetchAllRequest.setClientId("test-id");
	fetchAllRequest.setState("Telangana");
	fetchAllRequest.setStatus(Status.ACTIVE.name());
	fetchAllRequest.setHeadOfficeName("Trends");
	fetchAllRequest.setArea("test");
	fetchAllRequest.setFrom("20-02-2020");
	fetchAllRequest.setTo("25-02-2020");
	List<Criteria> filterQuery = clientOnboardingService.getFilterQuery(fetchAllRequest);
	assertEquals(10, filterQuery.size());
    }

    @Test
    @DisplayName("test updateClientModules")
    public void testUpdateClientModules() {
	ClientModuleRequest request = new ClientModuleRequest();
	request.setId("test-id");
	List<ClientModuleRequest> moduleIdRequest = new ArrayList<ClientModuleRequest>();
	moduleIdRequest.add(request);
	Optional<ClientOnboardingDetails> clientsCredentials = Optional
		.ofNullable(DataBuilder.getClientOnboardingDetail());
	when(clientOnboardingRepository.findById(Mockito.any())).thenReturn(clientsCredentials);
	List<Modules> modules = new ArrayList<Modules>();
	modules.add(ClientDetailsDataBuilder.getDummyModule());
	when(moduleRepository.findAll()).thenReturn(modules);
	when(clientOnboardingRepository.save(Mockito.any())).thenReturn(DataBuilder.getClientOnboardingDetail());
	ClientOnboardingDetails responseDetails = clientOnboardingService.updateClientModules("test-id",
		ThemeDataBuilder.getTokenPayLoadAdminRequest(), moduleIdRequest);
	assertEquals("test-id", responseDetails.getModules().get(0).getId());
    }

    @Test
    @DisplayName("test updateClientModules Should throw exception")
    public void testUpdateClientModules_Exception() {
	assertThrows(EntityNotFoundException.class, () -> {
	    clientOnboardingService.updateClientModules("test-id", ThemeDataBuilder.getTokenPayLoadAdminRequest(),
		    null);
	});
    }

    @Test
    public void testFetchAll() {
	when(mongoTemplate.find(Mockito.any(Query.class), Mockito.any()))
		.thenReturn(DataBuilder.getClientOnboardingDetails());
	PaginationResponse<ClientOnboardingDetails> fetchAll = clientOnboardingService
		.fetchAll(DataBuilder.getPaginationFetchAllRequest());
	assertEquals(fetchAll.getData().size(), DataBuilder.getClientOnboardingDetails().size());
	assertEquals(fetchAll.getData().get(0).getFirstName(),
		((ClientOnboardingDetails) DataBuilder.getClientOnboardingDetails().get(0)).getFirstName());

    }

    @Test
    @DisplayName("test fetchClientById response success case")
    public void testFetchClientById_Success() {
	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setStatus(Status.ACTIVE);

	Optional<ClientOnboardingDetails> clientOnboard = Optional.ofNullable(clientOnboardingDetails);

	when(clientOnboardingRepository.findById(Mockito.any())).thenReturn(clientOnboard);
	ClientOnboardingDetailsResponse clientById = clientOnboardingService.fetchClientById("someClientId");
	assertEquals(Status.ACTIVE, clientById.getStatus());
    }

    @Test
    public void testSortByOrderWithFetchAll() {
	when(mongoTemplate.find(Mockito.any(Query.class), Mockito.any()))
		.thenReturn(DataBuilder.getClientOnboardingDetails());
	PaginationResponse<ClientOnboardingDetails> fetchAll = clientOnboardingService
		.fetchAll(DataBuilder.getPaginationWithSortDetails());
	assertEquals(fetchAll.getData().size(), DataBuilder.getClientOnboardingDetails().size());
	assertEquals(fetchAll.getData().get(0).getFirstName(),
		((ClientOnboardingDetails) DataBuilder.getClientOnboardingDetails().get(0)).getFirstName());
    }

    @Test
    @DisplayName("test fetchCredentialsByClientId response success case")
    public void testFetchCredentialsByClientId_Success() {

	when(clientOnboardingRepository.findByClientId(Mockito.any()))
		.thenReturn(Optional.ofNullable(ClientDetailsDataBuilder.getClientOnboardingDetails()));
//	when(clientCredentialsRepository.findByClientId(Mockito.any())).thenReturn(Optional
//		.ofNullable(ClientDetailsDataBuilder.getClientsCredentials()));
	ClientCredentialsResponse credentialsResponse = clientOnboardingService
		.fetchCredentialsByClientId("someClientId");
	assertEquals("test-client-id", credentialsResponse.getClientId());
	assertEquals("test-clientName", credentialsResponse.getClientName());
    }

    @Test(expected = EntityNotFoundException.class)
    @DisplayName("test fetchCredentialsByClientId response failure case")
    public void testFetchCredentialsByClientId_Failure() {
	ClientCredentialsResponse credentialsResponse = clientOnboardingService
		.fetchCredentialsByClientId("someClientId");
	assertEquals("test-client-id", credentialsResponse.getClientId());
	assertEquals("test-clientName", credentialsResponse.getClientName());
    }

    @Test
    @DisplayName("test fetchCredentialsByClientId Should throw exception")
    public void testFetchCredentialsByClientId_Fail() {
	assertThrows(EntityNotFoundException.class, () -> {
	    clientOnboardingService.fetchCredentialsByClientId("someClientId");
	});
    }

    @Test
    @DisplayName("test changePasswordOfClient Should throw exception")
    public void changePasswordOfClient_One() {

	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setStatus(Status.ACTIVE);
	clientOnboardingDetails.setId("test-client-id");
	clientOnboardingDetails.setEmail("test@gmail.com");
	clientOnboardingDetails.setClientCredentials(ClientDetailsDataBuilder.getClientsCredentials());
	Optional<ClientOnboardingDetails> clientOnboard = Optional.ofNullable(clientOnboardingDetails);
	when(clientOnboardingRepository.findByClientId(Mockito.any())).thenReturn(clientOnboard);

	when(clientCredentialsRepository.save(Mockito.any()))
		.thenReturn(ClientDetailsDataBuilder.getClientsCredentials());

	EditPasswordRequest request = new EditPasswordRequest();
	request.setNewPassword("testNewPassword");
	SuccessResponse response = clientOnboardingService.changePasswordOfClient("test-client-id", request,
		ThemeDataBuilder.getTokenPayLoadAdminRequest());

	assertEquals("test-client-id", response.getId());
    }

    @Test(expected = BadRequestException.class)
    @DisplayName("test changePassword with invalid clientId : 400-BadRequestException")
    public void changePasswordOfClient_Two() {
	EditPasswordRequest request = new EditPasswordRequest();
	request.setNewPassword("testNewPassword");
	clientOnboardingService.changePasswordOfClient("test-client-id", request,
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
    }

    @Test(expected = EntityNotFoundException.class)
    @DisplayName("test changePassword with invalid clientId : 400-BadRequestException")
    public void changePasswordOfClient_Three() {

	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setStatus(Status.ACTIVE);
	Optional<ClientOnboardingDetails> clientOnboard = Optional.ofNullable(clientOnboardingDetails);
	when(clientOnboardingRepository.findByClientId(Mockito.any())).thenReturn(clientOnboard);
	EditPasswordRequest request = new EditPasswordRequest();
	request.setNewPassword("testNewPassword");
	clientOnboardingService.changePasswordOfClient("test-client-id", request,
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
    }

    @Test(expected = EntityNotFoundException.class)
    @DisplayName("whe trying to change password with USED previously : 400-BadRequestException")
    public void changePasswordOfClient_Four() {

	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setStatus(Status.ACTIVE);
	Optional<ClientOnboardingDetails> clientOnboard = Optional.ofNullable(clientOnboardingDetails);
	when(clientOnboardingRepository.findByClientId(Mockito.any())).thenReturn(clientOnboard);

	EditPasswordRequest request = new EditPasswordRequest();
	request.setNewPassword("test-password");
	clientOnboardingService.changePasswordOfClient("test-client-id", request,
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
    }

    @Test
    @DisplayName("test fetchAllClientResponse")
    public void testFetchAllClientResponse() {
	when(userOnBoardingRepository.findByStatusAndClientIdAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(UserDataBuilder.getUsersList());
	PaginationResponse<FetchAllClientResponse> response = clientOnboardingService
		.fetchAllClientResponse(ClientDetailsDataBuilder.getPaginationListOfClients());
	List<FetchAllClientResponse> data = response.getData();
	assertEquals(Status.ACTIVE, data.get(0).getStatus());
	assertEquals("test-client-id", data.get(0).getClientId());
    }

    @Test
    @DisplayName("test getClientCredentialsEmail")
    public void getClientCredentialsEmail() {
	when(emailService.getClientCredentialsEmailTemplate(Mockito.anyString()))
		.thenReturn(ClientDetailsDataBuilder.getClientCredentialsEmail());
	ClientCredentialsEmailResponse clientDetails = emailService.getClientCredentialsEmailTemplate("client-id");
	assertEquals("charanrajj@wavelabs.ai", clientDetails.getSendTo());
    }

    @Test
    @DisplayName("test sendClientCredentialsEmail")
    public void sendClientCredentialsEmail() {
	when(emailService.sendClientCredentialsEmail(Mockito.any()))
		.thenReturn(ClientDetailsDataBuilder.getClientCredentialsEmailResponse());
	SuccessResponse clientDetails = emailService
		.sendClientCredentialsEmail(DataBuilder.sendClientCredentialsEmailRequest());
	assertEquals(Constants.CREDENTIALS_SHARED_SUCCESSFULLY, clientDetails.getMessage());

    }

    @Test
    @DisplayName("test sendClientCredentialsEmail")
    public void editWorkflowAndTheme() {
	when(clientOnboardingRepository.findByClientId(Mockito.anyString()))
		.thenReturn(Optional.ofNullable(ClientDetailsDataBuilder.getClientOnboardingDetails()));
	clientOnboardingService.editWorkflowAndTheme(DataBuilder.editWorkflowAndThemeRequest());

    }

}
