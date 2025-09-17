package com.wavelabs.sb.controllers;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.model.MasterDataBuilder;
import com.wavelabs.sb.request.StatesRequest;
import com.wavelabs.sb.response.BanksResponse;
import com.wavelabs.sb.response.BaseResponse;
import com.wavelabs.sb.response.CityResponse;
import com.wavelabs.sb.response.ModulesResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.StateResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.BankService;
import com.wavelabs.sb.services.ModuleService;
import com.wavelabs.sb.services.StatesMasterService;

@RunWith(MockitoJUnitRunner.class)
public class MasterControllerTest {

    @InjectMocks
    MasterDataController masterDataController;

    @Autowired
    ObjectMapper objectMapper;

    @Mock
    BankService bankService;

    @Mock
    ModuleService moduleService;

    @Mock
    StatesMasterService statesMasterService;

    @Mock
    AuthenticationService authenticationService;
    
    @Mock
    HttpServletRequest httpServletRequest;

    @Test
    @DisplayName("Test fetchAll() banks api response")
    public void getAllBanks() throws Exception {

	BanksResponse banksResponse = new BanksResponse();
	banksResponse.setMessage(Constants.BANKS_DATA_FETCHED);
	List<String> banks = new ArrayList<String>();
	banksResponse.setBanks(banks);

	when(bankService.fetchAllBanks()).thenReturn(banksResponse);
	ResponseEntity<BaseResponse> fetchResult = masterDataController.fetchAllBanks("Authorization");
	assertEquals(HttpStatus.OK, fetchResult.getStatusCode());
	assertNotNull(fetchResult);
    }

    @Test
    @DisplayName("Test saveStatesMaster() banks api response")
    public void saveStatesMaster() {
	List<StatesRequest> requests = new ArrayList<>();
	requests.add(MasterDataBuilder.getStatesRequest());
	when(statesMasterService.saveStates(Mockito.anyList(), Mockito.any())).thenReturn(MasterDataBuilder.getBaseResponse());

	ResponseEntity<BaseResponse> response = masterDataController.saveStatesMaster("Authorization", requests,
		httpServletRequest);
	assertEquals(Constants.STATES_DATA_CREATED, response.getBody().getMessage());
    }

    @Test
    @DisplayName("Test fetchAllCitiesByState() banks api response")
    public void fetchAllCitiesByState() {
	when(statesMasterService.fetchAllCitiesByState(Mockito.anyString()))
		.thenReturn(MasterDataBuilder.getPaginationCityResponse());
	ResponseEntity<PaginationResponse<CityResponse>> response = masterDataController
		.fetchAllCitiesByState("Authorization", "Telangana");
	assertEquals(Constants.CITIES_DATA_FETCHED, response.getBody().getMessage());
    }

    @Test
    @DisplayName("Test fetchAllStates() banks api response")
    public void fetchAllStates() {
	when(statesMasterService.fetchAllStates()).thenReturn(MasterDataBuilder.getPaginationStateResponse());
	ResponseEntity<PaginationResponse<StateResponse>> response = masterDataController.fetchAllStates("Authorization");
	assertEquals(Constants.STATES_DATA_FETCHED, response.getBody().getMessage());
    }

    @Test
    @DisplayName("Test saveBanks with success response")
    public void saveBanks() throws IOException {
	when(bankService.saveBanks(Mockito.any(), Mockito.any())).thenReturn(MasterDataBuilder.getBankBaseResponse());
	ResponseEntity<BaseResponse> response = masterDataController.saveBanks("Authorization",
		MasterDataBuilder.getBanksReuest(), httpServletRequest);
	assertEquals(Constants.BANKS_CREATED, response.getBody().getMessage());
    }

    @Test
    @DisplayName("Test getAllModules with success response")
    public void getAllModules()  {
	when(moduleService.fetchAllModules()).thenReturn(MasterDataBuilder.getModulesResponse());
	ResponseEntity<List<ModulesResponse>> response = masterDataController.fetchAllModules("Authorization");
	assertEquals("Attendance Module", response.getBody().get(0).getName());
    }

    @Test
    @DisplayName("Test saveModule with success response")
    public void saveModule() {
	when(moduleService.saveModuleDetails(Mockito.any(), Mockito.any())).thenReturn(MasterDataBuilder.getModule());
	ResponseEntity<SuccessResponse> response = masterDataController.saveModule("Authorization",
		MasterDataBuilder.getModuleRequest(), httpServletRequest);
	assertEquals(Constants.DATA_CREATED_SUCCESSFULLY, response.getBody().getMessage());
    }

}