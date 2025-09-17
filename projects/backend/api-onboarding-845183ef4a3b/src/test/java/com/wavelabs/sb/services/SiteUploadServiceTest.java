package com.wavelabs.sb.services;

import static org.junit.Assert.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.ClientDataBuilder;
import com.wavelabs.sb.model.RoleDataBuilder;
import com.wavelabs.sb.model.SiteDataBuilder;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.RolesRepository;
import com.wavelabs.sb.repositories.SiteOnboardingRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.request.UploadSiteRequest;
import com.wavelabs.sb.response.ErrorRecord;

@RunWith(MockitoJUnitRunner.class)
public class SiteUploadServiceTest {

    @InjectMocks
    SiteUploadService siteUploadService;

    @Mock
    SiteOnboardingRepository siteOnboardingRepository;

    @Mock
    UserOnboardingService userOnboardingService;
   @Mock
    SiteOnboardingService siteOnboardingService;
    
    @Test
    @DisplayName("test saveSite with success response")
    public void saveSite() {
	  when(siteOnboardingRepository.findBySiteIdAndClientIdAndDeleted(Mockito.
	  anyString(), Mockito.anyString(),
	 Mockito.anyBoolean())).thenReturn(Optional.empty());
	  when(userOnboardingService.fetchUserByUserIdsAndClientId(Mockito.anyList(),
				Mockito.anyString())).thenReturn(UserDataBuilder.getUsersList());
	 when(siteOnboardingService.clientExistsWithClientId(Mockito.anyString())).thenReturn(ClientDataBuilder.getClientOnBoardDetails());
	  ErrorRecord response = siteUploadService.saveSite(SiteDataBuilder.getSiteUploadRequest(), "clientId", UserDataBuilder.getTokenPayLoadRequest());
	System.out.println(response);
	assertEquals(null, response);
    }

    @Test
    @DisplayName("test saveSite withBadRequestException ")
    public void saveSiteBadRequestException  () {
    	
    	 when(siteOnboardingRepository.findBySiteIdAndClientIdAndDeleted(Mockito.
    	  anyString(), Mockito.anyString(),
    	  Mockito.anyBoolean())).thenReturn(Optional.of(SiteDataBuilder.getSiteOnboardingDetails()));
    	 siteUploadService.saveSite(SiteDataBuilder.getSiteUploadRequest(), "clientId", UserDataBuilder.getTokenPayLoadRequest());
 
	}
    	 
    
}
