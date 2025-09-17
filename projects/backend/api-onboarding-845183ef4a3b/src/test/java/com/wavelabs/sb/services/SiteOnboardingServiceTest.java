package com.wavelabs.sb.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

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
import org.springframework.data.mongodb.core.query.Query;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.EntityNotFoundException;
import com.wavelabs.sb.model.DataBuilder;
import com.wavelabs.sb.model.RoleDataBuilder;
import com.wavelabs.sb.model.SiteDataBuilder;
import com.wavelabs.sb.model.SiteDetails;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.SiteOnboardingRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.response.FetchAllSitesResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;

@RunWith(MockitoJUnitRunner.class)
public class SiteOnboardingServiceTest {

    @InjectMocks
    private SiteOnboardingService siteOnboardingService;

    @Mock
    SiteOnboardingRepository siteOnboardingRepository;

    @Mock
    ClientOnboardingRepository clientOnBoardingRepository;
    
    @Mock
    RoleOnboardingRepository roleOnboardingRepository;
    
    @Mock
    UserOnboardingService userOnboardingService;
    
    @Mock
    MongoTemplate mongoTemplate;
    
    @Mock
    UserOnboardingRepository userOnboardingRepository;


    @Test
    @DisplayName("test saveSiteDetails success")
    public void saveSiteDetailsTestSuccess() {

//	when(clientOnBoardingRepository.findByClientId(Mockito.anyString()))
//		.thenReturn(Optional.ofNullable(DataBuilder.getClientOnboardingDetail()));
    	when(siteOnboardingRepository
		.findBySiteIdAndClientIdAndDeleted(Mockito.anyString(), Mockito.anyString(), Mockito.anyBoolean())).thenReturn(Optional.empty());
    	when(clientOnBoardingRepository
    			.findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean())).thenReturn(Optional.ofNullable(DataBuilder.getClientOnboardingDetail()));
	
	when(siteOnboardingRepository.save(Mockito.any())).thenReturn(SiteDataBuilder.getSiteOnboardingDetails());
	SuccessResponse successResponse = siteOnboardingService
		.saveSiteDetails(SiteDataBuilder.getCreateSiteModel());
	assertEquals("test-system-id", successResponse.getId());
    }

    @Test
    @DisplayName("test updateSiteDetails success")
    public void updateSiteDetailsTestSuccess() {

	when(siteOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.ofNullable(SiteDataBuilder.getSiteOnboardingDetails()));
	when(clientOnBoardingRepository
			.findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean())).thenReturn(Optional.ofNullable(DataBuilder.getClientOnboardingDetail()));

	when(siteOnboardingRepository.save(Mockito.any())).thenReturn(SiteDataBuilder.getSiteOnboardingDetails());
	
	SuccessResponse successResponse = siteOnboardingService
		.updateSiteDetails(SiteDataBuilder.getUpdateSiteModel());
	assertEquals("test-system-id", successResponse.getId());
	assertEquals(Constants.SITE_UPDATED, successResponse.getMessage());
    }

    @Test(expected = EntityNotFoundException.class)
    @DisplayName("test updateSiteDetails exception")
    public void updateSiteDetailsTestException() {
	siteOnboardingService.updateSiteDetails(SiteDataBuilder.getUpdateSiteModel());
    }

    @Test(expected = EntityNotFoundException.class)
    @DisplayName("test clientExistsWithClientId with client ID null")
    public void clientExistsWithClientId() {
	when(siteOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.ofNullable(SiteDataBuilder.getSiteOnboardingDetails()));
	when(clientOnBoardingRepository
			.findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
		.thenReturn(Optional.empty());
	siteOnboardingService.updateSiteDetails(SiteDataBuilder.getUpdateSiteModel());
    }

    @Test
    @DisplayName("test delteSiteDetails success")
    public void deleteSiteDetailsTestSuccess() {

	when(siteOnboardingRepository.findBySiteId(Mockito.anyString()))
		.thenReturn(Optional.ofNullable(SiteDataBuilder.getSiteOnboardingDetails()));
	when(siteOnboardingRepository.save(Mockito.any())).thenReturn(SiteDataBuilder.getSiteOnboardingDetails());
	SuccessResponse successResponse = siteOnboardingService.deleteSiteDetails(SiteDataBuilder.getDeleteSiteModel());
	assertEquals("test-site-id", successResponse.getId());
    }

    @Test(expected = EntityNotFoundException.class)
    @DisplayName("test delteSiteDetails exception")
    public void deleteSiteDetailsTestException() {
	siteOnboardingService.deleteSiteDetails(SiteDataBuilder.getDeleteSiteModel());
    }
    
    @Test
    @DisplayName("test siteManagerRoleByClientId")   
    public void testSiteManagerRoleByClientId() {
    	when(roleOnboardingRepository
		.findByClientIdAndRoleIgnoreCaseAndDeleted(Mockito.anyString(),Mockito.anyString(), Mockito.anyBoolean())).
    	thenReturn(Optional.of(RoleDataBuilder.roleOnboardingDetails()));
    	//when(roleOnboardingRepository.save(RoleMapper.getRoleWithSiteManager(Mockito.anyString())))
    	//.thenReturn(RoleDataBuilder.getRoleOnboarding());
    	assertEquals("SiteManager", siteOnboardingService.siteManagerRoleByClientId("id").getRole());
    }
    @Test
    @DisplayName("test fetchSite")   
    public void testFetchSite() {
    	when(siteOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.of(SiteDataBuilder.getSiteOnboardingDetails()));
    	assertEquals("test-system-id", siteOnboardingService.fetchSite("test-system-id").getId());
    }
    
    @Test(expected = EntityNotFoundException.class)
    @DisplayName("test fetchSiteThrowsException")   
    public void testFetchSiteThrowsException() {
    	when(siteOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());
    	siteOnboardingService.fetchSite("test-system-id");
    }
    
    @Test
    @DisplayName("test fetchAllSites")   
    public void testFetchAllSites() {
    	when(mongoTemplate.find(Mockito.any(Query.class), Mockito.any()))
		.thenReturn(SiteDataBuilder.listOfGetSiteOnboardingDetails());
    	when(userOnboardingRepository.findByUserIdInAndClientId(Mockito.anyList(), Mockito.anyString())).thenReturn(UserDataBuilder.getUsersList());
    	PaginationResponse<FetchAllSitesResponse> fetchAllSitesResponse=siteOnboardingService.fetchAllSites(SiteDataBuilder.getPaginationFetchAllSitesRequestDetails());
    	assertEquals(fetchAllSitesResponse.getData().size(), SiteDataBuilder.listOfGetSiteOnboardingDetails().size());
    }
    
    
    @Test
    @DisplayName("test fetchAllSitesToDownload")   
    public void testFetchAllSitesToDownload() {
    	when(mongoTemplate.find(Mockito.any(Query.class), Mockito.any()))
		.thenReturn(SiteDataBuilder.listOfGetSiteOnboardingDetails());
       List<SiteDetails> list=siteOnboardingService.fetchAllSitesToDownload(SiteDataBuilder.getPaginationFetchAllSitesRequest());
       assertEquals(list.size(), SiteDataBuilder.listOfGetSiteOnboardingDetails().size());
    }
    
    @Test
    @DisplayName("test fetchAllSites Pagination is false")   
    public void testFetchAllSitesPaginationFalse() {
    	when(mongoTemplate.find(Mockito.any(Query.class), Mockito.any()))
		.thenReturn(SiteDataBuilder.listOfGetSiteOnboardingDetails());
    	//when(userOnboardingRepository.findByUserIdInAndClientId(Mockito.anyList(), Mockito.anyString())).thenReturn(UserDataBuilder.getUsersList());
    	PaginationResponse<FetchAllSitesResponse> fetchAllSitesResponse=siteOnboardingService.fetchAllSites(SiteDataBuilder.getPaginationFetchAllSitesRequestWithPageinationFalse());
    	assertEquals(fetchAllSitesResponse.getData().size(), SiteDataBuilder.listOfGetSiteOnboardingDetails().size());
    }
    
    @Test(expected =BadRequestException.class)
    @DisplayName("test fetchAllSites ThrowsBadRequestException")   
    public void testFetchAllSitesThrowsBadRequestException() {
    	siteOnboardingService.fetchAllSites(SiteDataBuilder.getPaginationFetchAllSitesRequestInvalidDate());
    }
    @Test(expected =BadRequestException.class)
    @DisplayName("test saveSiteDetailsThrowsBadRequestException")   
    public void testSaveSiteDetailsThrowsBadRequestException() {
    	when(siteOnboardingRepository
    			.findBySiteIdAndClientIdAndDeleted(Mockito.anyString(), Mockito.anyString(), Mockito.anyBoolean())).thenReturn(Optional.of(SiteDataBuilder.getSiteOnboardingDetails()));
    	siteOnboardingService
    			.saveSiteDetails(SiteDataBuilder.getCreateSiteModel());
    		
    }
    @Test(expected =BadRequestException.class)
    @DisplayName("test saveSiteDetailsThrowsException")   
    public void testSaveSiteDetailsThrowsException() {
    	when(siteOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.of(SiteDataBuilder.getSiteOnboardingDetails()));
    	siteOnboardingService
		.updateSiteDetails(SiteDataBuilder.getUpdateSiteModelEmptyClientId());
    		
    }
   
}


