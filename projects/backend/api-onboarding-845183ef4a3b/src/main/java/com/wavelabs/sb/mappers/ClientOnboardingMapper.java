package com.wavelabs.sb.mappers;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ClientsCredentials;
import com.wavelabs.sb.documents.Modules;
import com.wavelabs.sb.documents.StoreLocations;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.AdminDetails;
import com.wavelabs.sb.request.ClientOnboardingRequest;
import com.wavelabs.sb.request.ClientOnboardingUpdateRequest;
import com.wavelabs.sb.request.ClientRolesRequest;
import com.wavelabs.sb.response.ClientDetails;
import com.wavelabs.sb.response.ClientOnboardingDetailsResponse;
import com.wavelabs.sb.response.FetchAllClientResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.StoreDetails;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

public class ClientOnboardingMapper {

    @Autowired
    AesEncryption aesEncryption;

    public static ClientOnboardingDetails saveClientEntity(ClientOnboardingRequest clientOnboardingRequest,
	    Optional<ClientOnboardingDetails> maxClientId, TokenPayLoadDetails tokenPayLoadDetails) {

	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setCreatedAt(Instant.now());
	clientOnboardingDetails.setStatus(clientOnboardingRequest.getStatus());
	clientOnboardingDetails.setFirstName(clientOnboardingRequest.getAdmin().getFirstName());
	clientOnboardingDetails.setMiddleName(clientOnboardingRequest.getAdmin().getMiddleName());
	clientOnboardingDetails.setLastName(clientOnboardingRequest.getAdmin().getLastName());
	clientOnboardingDetails.setMobile(clientOnboardingRequest.getAdmin().getMobile());
	clientOnboardingDetails.setEmail(clientOnboardingRequest.getAdmin().getEmail());
	clientOnboardingDetails.setModifiedAt(Instant.now());
	clientOnboardingDetails.setBackgroundImageOpacity(clientOnboardingRequest.getOpacity());
	clientOnboardingDetails.setDeleted(false);
	final String createdOrModifiedBy = OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails);
	clientOnboardingDetails.setCreatedBy(createdOrModifiedBy);
	clientOnboardingDetails.setModifiedBy(createdOrModifiedBy);
	clientOnboardingDetails.setCreatedUserType(tokenPayLoadDetails.getTypeOfUser());
	clientOnboardingDetails.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
	if (maxClientId == null) {
	    String clientId = clientOnboardingRequest.getClientName().substring(0, 2).toUpperCase() + "0001";
	    clientOnboardingDetails.setClientId(clientId);
	} else {
	    String numberOnly = maxClientId.get().getClientId().replaceAll("[^0-9]", "");
	    String finalNumber = getNumber(numberOnly);
	    String data = clientOnboardingRequest.getClientName().substring(0, 2).toUpperCase() + finalNumber;
	    clientOnboardingDetails.setClientId(data);
	}
	BeanUtils.copyProperties(clientOnboardingRequest, clientOnboardingDetails);
	return clientOnboardingDetails;
    }

    public static String getNumber(String orderId) {
	return String.format("%0" + orderId.length() + "d", Integer.parseInt(orderId) + 1);
    }

    public static ClientOnboardingDetails updateAndSaveClientEntity(List<Modules> modulesList,
	    ClientOnboardingDetails clientOnboardingDetailsOptional, TokenPayLoadDetails tokenPayLoadDetails) {

	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	BeanUtils.copyProperties(clientOnboardingDetailsOptional, clientOnboardingDetails);
	clientOnboardingDetails.setModules(modulesList);
	clientOnboardingDetails.setId(clientOnboardingDetailsOptional.getId());
	clientOnboardingDetails.setModifiedAt(Instant.now());
	clientOnboardingDetails.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
	clientOnboardingDetails.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
	return clientOnboardingDetails;

    }

    public static SuccessResponse toResponse(ClientOnboardingDetails clientOnboardingDetails) {
	SuccessResponse successResponse = new SuccessResponse();
	if ((clientOnboardingDetails.getModules() == null)) {
	    successResponse.setId(clientOnboardingDetails.getId());
	}
	String responseMessage = (clientOnboardingDetails.getModules() != null
		&& clientOnboardingDetails.getModules().size() > 1)
			? Constants.MODULES_UPDATED + clientOnboardingDetails.getClientName()
			: Constants.DATA_CREATED_SUCCESSFULLY;
	successResponse.setMessage(responseMessage);
	return successResponse;
    }

    public static SuccessResponse getClientCredentilasResponse(String clientId) {
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setMessage(Constants.CLIENT_CREDENTIALS_GENERATED_SUCCESSFULLY + clientId);
	return successResponse;
    }

    public static SuccessResponse getClientDetailsUpdated(ClientOnboardingDetails clientOnboardingDetailsOptioan) {
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId(clientOnboardingDetailsOptioan.getClientId());
	successResponse.setMessage(Constants.CLIENT_DETAILS_UPDATED_SUCCESSFULLY);
	return successResponse;
    }

    public static ClientOnboardingDetails updateClientDetailsToEntity(
	    ClientOnboardingUpdateRequest clientOnboardingUpdateRequest,
	    ClientOnboardingDetails clientOnboardingDetailsOptional, TokenPayLoadDetails tokenPayLoadDetails) {

	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	BeanUtils.copyProperties(clientOnboardingUpdateRequest, clientOnboardingDetails);
	clientOnboardingDetails.setCreatedAt(clientOnboardingDetailsOptional.getCreatedAt());
	clientOnboardingDetails.setClientId(clientOnboardingDetailsOptional.getClientId());
	clientOnboardingDetails.setId(clientOnboardingDetailsOptional.getId());
	clientOnboardingDetails.setHeadOfficeName(clientOnboardingUpdateRequest.getHeadOfficeName());
	clientOnboardingDetails.setAddress(clientOnboardingUpdateRequest.getAddress());
	clientOnboardingDetails.setState(clientOnboardingUpdateRequest.getState());
	clientOnboardingDetails.setCity(clientOnboardingUpdateRequest.getCity());
	clientOnboardingDetails.setArea(clientOnboardingUpdateRequest.getArea());
	clientOnboardingDetails.setCountry(clientOnboardingUpdateRequest.getCountry());
	clientOnboardingDetails.setPinCode(clientOnboardingUpdateRequest.getPinCode());
	clientOnboardingDetails.setModifiedAt(Instant.now());
	clientOnboardingDetails.setStatus(clientOnboardingUpdateRequest.getStatus());
	clientOnboardingDetails.setFirstName(clientOnboardingUpdateRequest.getAdmin().getFirstName());
	clientOnboardingDetails.setMiddleName(clientOnboardingUpdateRequest.getAdmin().getMiddleName());
	clientOnboardingDetails.setLastName(clientOnboardingUpdateRequest.getAdmin().getLastName());
	clientOnboardingDetails.setMobile(clientOnboardingUpdateRequest.getAdmin().getMobile());
	clientOnboardingDetails.setEmail(clientOnboardingUpdateRequest.getAdmin().getEmail());
	clientOnboardingDetails.setModules(clientOnboardingDetailsOptional.getModules());
	clientOnboardingDetails.setLogo(clientOnboardingDetailsOptional.getLogo());
	clientOnboardingDetails.setClientCredentials(clientOnboardingDetailsOptional.getClientCredentials());
	clientOnboardingDetails.setBackgroundImageOpacity(clientOnboardingUpdateRequest.getOpacity());
	clientOnboardingDetails.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
	clientOnboardingDetails.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
	return clientOnboardingDetails;

    }

    public static ClientOnboardingDetails saveClientEntity(ClientOnboardingRequest clientOnboardingRequest,
	    List<Modules> moduleList, List<ClientRolesRequest> clientRolesList, ClientsCredentials clientsCredentials) {

	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setModules(moduleList);
	clientOnboardingDetails.setCreatedAt(Instant.now());
	clientOnboardingDetails.setModifiedAt(Instant.now());
	clientOnboardingDetails.setStatus(clientOnboardingRequest.getStatus());
	clientOnboardingDetails.setClientCredentials(clientsCredentials);
	BeanUtils.copyProperties(clientOnboardingRequest, clientOnboardingDetails);
	return clientOnboardingDetails;
    }

    public static String alphaNumericString(int len) {
	String alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	Random rnd = new Random();

	StringBuilder sb = new StringBuilder(len);
	for (int i = 0; i < len; i++) {
	    sb.append(alphabet.charAt(rnd.nextInt(alphabet.length())));
	}
	return sb.toString();
    }

    public static FetchAllClientResponse toFetchResponse(ClientOnboardingDetails client, int resourceCount,
	    int storeCount, boolean credentialsAvailable) {
	FetchAllClientResponse clientResponse = new FetchAllClientResponse();
	clientResponse.setId(client.getId());
	clientResponse.setCity(client.getCity());
	clientResponse.setClientId(client.getClientId());
	clientResponse.setClientName(client.getClientName());
	clientResponse.setCreatedAt(client.getCreatedAt().atZone(ZoneId.systemDefault()));
	clientResponse.setResourceCount(resourceCount);
	clientResponse.setState(client.getState());
	clientResponse.setStatus(
		client.getClientCredentials() == null && !client.getStatus().equals(Status.INACTIVE) ? Status.DRAFT
			: client.getStatus());
	clientResponse.setHeadOfficeName(client.getHeadOfficeName());
	clientResponse.setStoreCount(storeCount);
	clientResponse.setArea(client.getArea());
	clientResponse.setCredentialsAvailable(credentialsAvailable);
	clientResponse.setLogoId(client.getLogo() != null ? client.getLogo().getId() : null);
	return clientResponse;
    }

    /**
     * 
     * @param clientOnboardingDetailsOptional
     * @return
     */
    public static ClientsCredentials getClientCredentials(ClientOnboardingDetails clientOnboardingDetailsOptional,
	    String password) {
	ClientsCredentials clientsCredentials = new ClientsCredentials();
	clientsCredentials.setClientId(clientOnboardingDetailsOptional.getClientId());
	clientsCredentials.setClientName(clientOnboardingDetailsOptional.getClientName());
	clientsCredentials.setPassword(password);
	clientsCredentials.setCreatedAt(Instant.now());
	clientsCredentials.setModifiedAt(Instant.now());
	return clientsCredentials;

    }

    public static String generatePassword(int length) {
	final Random random = new SecureRandom();
	final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	StringBuilder returnValue = new StringBuilder(length);
	for (int i = 0; i < length; i++) {
	    returnValue.append(ALPHABET.charAt(random.nextInt(ALPHABET.length())));
	}
	return new String(returnValue);
    }

    public static FetchAllClientResponse toFetchResponse(ClientOnboardingDetails client, int resourceCount,
	    int storeCount) {
	FetchAllClientResponse clientResponse = new FetchAllClientResponse();
	clientResponse.setId(client.getId());
	clientResponse.setCity(client.getCity());
	clientResponse.setClientId(client.getClientId());
	clientResponse.setClientName(client.getClientName());
	clientResponse.setCreatedAt(client.getCreatedAt().atZone(ZoneId.systemDefault()));
	clientResponse.setResourceCount(resourceCount);
	clientResponse.setState(client.getState());
	clientResponse.setStatus(
		client.getClientCredentials() == null && !client.getStatus().equals(Status.INACTIVE) ? Status.DRAFT
			: client.getStatus());
	clientResponse.setHeadOfficeName(client.getHeadOfficeName());
	clientResponse.setStoreCount(storeCount);
	clientResponse.setArea(client.getArea());
	clientResponse.setCredentialsAvailable(client.getModules() != null);
	return clientResponse;
    }

    public static ClientOnboardingDetailsResponse clientOnboardingResponseMapper(
	    ClientOnboardingDetails clientDetails) {

	ClientOnboardingDetailsResponse response = new ClientOnboardingDetailsResponse();
	AdminDetails adminData = new AdminDetails();
	adminData.setFirstName(clientDetails.getFirstName());
	adminData.setMiddleName(clientDetails.getMiddleName());
	adminData.setLastName(clientDetails.getLastName());
	adminData.setMobile(clientDetails.getMobile());
	adminData.setEmail(clientDetails.getEmail());
	response.setAdmin(adminData);
	response.setClientLogoName(clientDetails.getLogo() != null ? clientDetails.getLogo().getName() : null);
	response.setLogoId(clientDetails.getLogo() != null ? clientDetails.getLogo().getId() : null);
	response.setBackgroundImageName(
		clientDetails.getBackgroundImage() != null ? clientDetails.getBackgroundImage().getName() : null);
	response.setBackgroundImageId(
		clientDetails.getBackgroundImage() != null ? clientDetails.getBackgroundImage().getId() : null);
	BeanUtils.copyProperties(clientDetails, response);
	response.setEditWorkFlow(clientDetails.isHasEditWorkflow());
	response.setEditTheme(clientDetails.isHasEditTheme());
	response.setOpacity(clientDetails.getBackgroundImageOpacity());
	return response;
    }

    private ClientOnboardingMapper() {
    }

    public static List<StoreDetails> getStoresResponse(List<StoreLocations> listOfStroes) {
	List<StoreDetails> storeList = new ArrayList<>();
	listOfStroes.stream().forEach(store -> {
	    StoreDetails storeDetails = new StoreDetails();
	    storeDetails.setAddress(store.getAddress());
	    storeDetails.setStoreId(store.getStoreId());
	    storeDetails.setStoreManagerId(store.getManagerEmployeeId());
	    storeDetails.setStoreManagerMobile(store.getPhoneNumber());
	    storeDetails.setStoreManagerName(store.getManagerName());
	    storeList.add(storeDetails);
	});
	return storeList;

    }

    public static PaginationResponse<ClientDetails> clientDetailsResponse(
	    PaginationResponse<ClientOnboardingDetails> clients) {
	List<ClientDetails> collect = clients.getData().stream().map(ClientOnboardingMapper::mapClientDetailsResponse)
		.collect(Collectors.toList());
	PaginationResponse<ClientDetails> fetchAll = new PaginationResponse<>();
	fetchAll.setMessage("Records fetched successfully");
	fetchAll.setData(collect);
	fetchAll.setSize(clients.getSize());
	return fetchAll;
    }

    public static ClientDetails mapClientDetailsResponse(ClientOnboardingDetails details) {
	ClientDetails clientDetails = new ClientDetails();
	clientDetails.setAdminName(StringUtils.stripToEmpty(details.getFirstName() + " " + StringUtils
		.stripToEmpty(details.getMiddleName() + " " + StringUtils.stripToEmpty(details.getLastName()))));
	clientDetails.setAddress(details.getAddress());
	clientDetails.setArea(details.getArea());
	clientDetails.setCity(details.getCity());
	clientDetails.setClientId(details.getClientId());
	clientDetails.setClientName(details.getClientName());
	clientDetails.setCountry(details.getCountry());
	clientDetails.setEmail(details.getEmail());
	clientDetails.setHeadOfficeName(details.getHeadOfficeName());
	clientDetails.setMobile(details.getMobile());
	clientDetails.setPinCode(details.getPinCode());
	clientDetails.setState(details.getState());
	clientDetails.setStatus(details.getStatus());
	return clientDetails;
    }
}
