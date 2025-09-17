package com.wavelabs.sb.command;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.model.SiteDataBuilder;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.SiteOnboardingService;

@RunWith(MockitoJUnitRunner.class)
public class DeleteSiteCommandTest {
	
	@InjectMocks
	DeleteSiteCommand deleteSiteCommand;
	
	@Mock
	SiteOnboardingService siteOnboardingService;
	
	@Test
	@DisplayName("test deleteSiteCommandMethod")
	public void executeTest() {
		when(siteOnboardingService.deleteSiteDetails(Mockito.any())).thenReturn(SiteDataBuilder.getSuccessResponse());
		SuccessResponse entity = deleteSiteCommand.execute(SiteDataBuilder.getDeleteSiteModel());
		assertEquals("test-id", entity.getId());
	}
	
}
