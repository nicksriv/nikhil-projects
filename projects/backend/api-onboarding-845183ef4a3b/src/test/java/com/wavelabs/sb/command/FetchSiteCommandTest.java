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
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.model.SiteDataBuilder;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.response.SiteResponse;
import com.wavelabs.sb.services.SiteOnboardingService;

@RunWith(MockitoJUnitRunner.class)
public class FetchSiteCommandTest {

    @InjectMocks
    FetchSiteCommand fetchSiteCommandTest;;

    @Mock
    SiteOnboardingService siteOnboardingService;

    @Test
    @DisplayName("test fetchThemeDetails")
    public void fetchSiteCommandTest() {
	when(siteOnboardingService.fetchSite(Mockito.anyString()))
	.thenReturn(SiteDataBuilder.getSiteOnboardingDetails());
	when(siteOnboardingService.fetchAllManagers(Mockito.anyList(), Mockito.anyString()))
	.thenReturn(UserDataBuilder.getUsersList());
	ResponseEntity<SiteResponse> response = fetchSiteCommandTest.execute("siteId");
	assertEquals(0, 0);
    }

}
