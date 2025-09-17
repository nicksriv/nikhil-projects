package com.wavelabs.sb.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.StoreLocations;
import com.wavelabs.sb.model.StoreDataBuilder;
import com.wavelabs.sb.response.StoreDetails;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.StoreService;

@RunWith(MockitoJUnitRunner.class)
public class StoreControllerTest {

	@InjectMocks
	private StoreController storeController;

	@Mock
	private StoreService storeService;

	@Mock
	HttpServletRequest httpServletRequest;
	
	@Mock
	AuthenticationService authenticationService;
	
	@Test
	@DisplayName("test Save Store details success response")
	public void testSaveStore_Success() {
	    when(storeService.isStoreIdMapped(Mockito.anyString(), Mockito.anyString()))
		    .thenReturn(new ArrayList<StoreLocations>());
	    when(storeService.saveStoreDetails(Mockito.any(), Mockito.anyString(), Mockito.any()))
		    .thenReturn(StoreDataBuilder.getSaveStore_successResponse());
	    ResponseEntity<SuccessResponse> storeResponse = storeController.saveStore("Authorization", "Te0001",
		    StoreDataBuilder.getStoreRequest(), httpServletRequest);
	    assertEquals(Constants.DATA_CREATED_SUCCESSFULLY, storeResponse.getBody().getMessage());
	}
	
	@Test
	@DisplayName("test Save Store details success response")
	public void testGetStore_Success() throws IOException {
		when(storeService.fetchStoresByClientId(Mockito.anyString())).thenReturn(StoreDataBuilder.getStoreDetailsList());
		ResponseEntity<List<StoreDetails>> storeResponse = storeController.getStores("","Te0001");
		assertEquals(1, storeResponse.getBody().size());
	}
	

}
