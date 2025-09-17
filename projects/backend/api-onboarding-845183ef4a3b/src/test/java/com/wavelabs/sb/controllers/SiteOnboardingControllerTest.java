package com.wavelabs.sb.controllers;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.command.DeleteSiteCommand;
import com.wavelabs.sb.command.FetchAllSitesCommand;
import com.wavelabs.sb.command.SiteOnboardingCommand;
import com.wavelabs.sb.command.SiteOnboardingUpdateCommand;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.SiteOnboardingDetails;
import com.wavelabs.sb.model.SiteDataBuilder;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;

@RunWith(MockitoJUnitRunner.class)
public class SiteOnboardingControllerTest {

    @InjectMocks
    SiteOnboardingController siteOnboardingController;

    @Mock
    SiteOnboardingCommand siteOnboardingCommand;

    @Mock
    SiteOnboardingUpdateCommand siteOnboardingUpdateCommand;
    
    @Mock
    DeleteSiteCommand deleteSiteCommand;
    
    @Mock
    FetchAllSitesCommand fetchAllSitesCommand;
    
    @Mock
    AuthenticationService authenticationService;
    
    @Mock
    HttpServletRequest httpServletRequest;

    @Test
    @DisplayName("test saveSite")
    public void saveSite() {

	when(siteOnboardingCommand.execute(Mockito.any()))
		.thenReturn(SiteDataBuilder.getSuccessResponse());
	ResponseEntity<SuccessResponse> response = siteOnboardingController.saveSite("Authorization",
		SiteDataBuilder.getSiteOnboardingRequest(), httpServletRequest);
	assertEquals("test-id", response.getBody().getId());
	assertEquals("test-success-message", response.getBody().getMessage());
    }

    @Test
    @DisplayName("test updateSite")
    public void updateSite() {

	when(siteOnboardingUpdateCommand.execute(Mockito.any()))
		.thenReturn(SiteDataBuilder.getSuccessResponse());
	ResponseEntity<SuccessResponse> response = siteOnboardingController.updateSite("Authorization", "id",
		SiteDataBuilder.getSiteOnboardingUpdateRequest(), httpServletRequest);
	assertEquals("test-id", response.getBody().getId());
	assertEquals("test-success-message", response.getBody().getMessage());
    }

    @Test
    @DisplayName("test delete site")
    public void deleteSite() {

	when(deleteSiteCommand.execute(Mockito.any()))
		.thenReturn(SiteDataBuilder.getSuccessResponse());
	ResponseEntity<SuccessResponse> response = siteOnboardingController.deleteSite("Authorization", "siteId", httpServletRequest);
	assertEquals("test-id", response.getBody().getId());
	assertEquals("test-success-message", response.getBody().getMessage());
    }
    

//    @Test
    @DisplayName("Test fetchAllSites")
    public void fetchAllSitesTest() {
	PaginationResponse<SiteOnboardingDetails> details = new PaginationResponse<SiteOnboardingDetails>();
	details.setData(Arrays.asList(SiteDataBuilder.getSiteOnboardingDetails()));
	details.setMessage(Constants.DATA_FETCHED_SUCCESSFULLY);
	details.setSize(1L);

//	when(fetchAllSitesCommand.execute(Mockito.any())).thenReturn(details);
//	when(clientOnboardingService.fetchAllClientResponse(Mockito.any()))
//		.thenReturn(ClientDetailsDataBuilder.getPaginationAllClientsResponse());
//	ResponseEntity<PaginationResponse<FetchAllClientResponse>> response = siteOnboardingController.fetchAllSites("Authorization", )
//	assertEquals("Data Fetched Successfully", data.getMessage());
//	assertEquals(Status.ACTIVE, data.getData().get(0).getStatus());
    }


}
