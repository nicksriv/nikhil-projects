package com.wavelabs.sb.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.documents.StoreLocations;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.model.StoreDataBuilder;
import com.wavelabs.sb.model.ThemeDataBuilder;
import com.wavelabs.sb.repositories.StoreRepository;
import com.wavelabs.sb.response.StoreDetails;

@RunWith(MockitoJUnitRunner.class)
public class StoreServiceTest {

	@Mock
	StoreRepository storeRepository;

	@InjectMocks
	StoreService storeService;

	@Test
	@DisplayName("test save store details success response")
	public void testSaveStoreDetails_Success() {
		when(storeRepository.save(Mockito.any())).thenReturn(StoreDataBuilder.getSaveStore_successResponse());
		StoreLocations response = storeService.saveStoreDetails(StoreDataBuilder.getStoreRequest(), "Te0001",
			ThemeDataBuilder.getTokenPayLoadAdminRequest());
		assertEquals("614cb9c65c6a48475e7c3c8a", response.getId());
	}
	
	
	@Test
	@DisplayName("test fetchStroesByClientId with list of stores")
	public void testFetchStroesByClientId_Success() {
		when(storeRepository.findByClientId(Mockito.anyString())).thenReturn(StoreDataBuilder.getStoreLocationsList());
		List<StoreDetails> response = storeService.fetchStoresByClientId("someClientId");
		assertEquals(2, response.size());
		assertEquals("STR002", response.get(0).getStoreId());
	}

	@Test
	@DisplayName("test fetchStroesByClientId with Empty list")
	public void testFetchStroesByClientId_Success_EmptyList() {
		when(storeRepository.findByClientId(Mockito.anyString())).thenReturn(new ArrayList<StoreLocations>());
		List<StoreDetails> response = storeService.fetchStoresByClientId("someClientId");
		assertEquals(0, response.size());
	}
	
	@Test
	@DisplayName("test isStoreIdMappedTest with success response")
	public void isStoreIdMappedTest() {
		when(storeRepository.findByClientId("Te0001")).thenReturn(StoreDataBuilder.getStoreLocationsList());
		List<StoreLocations> response = storeService.isStoreIdMapped("STR003", "Te0001");
		assertEquals(response.size(), 2);
	}
	
	
	@Test(expected = BadRequestException.class)
	@DisplayName("test isStoreIdMappedTest throws Exception")
	public void isStoreIdMappedTest_exception() {
		when(storeRepository.findByClientId("Te0001")).thenReturn(StoreDataBuilder.getStoreLocationsList());
		storeService.isStoreIdMapped("STR002", "Te0001");
	}
	
	
	

}
