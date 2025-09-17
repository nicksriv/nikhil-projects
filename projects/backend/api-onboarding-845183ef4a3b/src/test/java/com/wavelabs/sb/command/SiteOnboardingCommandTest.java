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
public class SiteOnboardingCommandTest {
	
	@InjectMocks
	SiteOnboardingCommand siteOnboardingCommand;
	
	@Mock
	SiteOnboardingService siteOnboardingService;
	
	@Test
	@DisplayName("test saveSiteCommandMethod")
	public void executeTest() {
		when(siteOnboardingService.saveSiteDetails(Mockito.any())).thenReturn(SiteDataBuilder.getSuccessResponse());
		SuccessResponse entity = siteOnboardingCommand.execute(SiteDataBuilder.getCreateSiteModel());
		assertEquals("test-id", entity.getId());
	}
	
}
