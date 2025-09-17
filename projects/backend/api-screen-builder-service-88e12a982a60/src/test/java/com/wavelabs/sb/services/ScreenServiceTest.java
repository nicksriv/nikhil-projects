package com.wavelabs.sb.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.repository.ClientOnboardingRepository;
import com.wavelabs.sb.repository.ScreenFieldsRepository;
import com.wavelabs.sb.repository.ScreenFlowsRepository;
import com.wavelabs.sb.repository.ScreenRepository;
import com.wavelabs.sb.request.CreateScreenRequest;
import com.wavelabs.sb.response.SaveScreenResponse;
import com.wavelabs.sb.response.SuccessResponse;

@RunWith(MockitoJUnitRunner.class)
public class ScreenServiceTest {

    @Mock
    ScreenBuilderService screenBuilderService;

    @Mock
    ScreenRepository screenRepository;
    
    @Mock
    ScreenFieldsRepository screenFieldsRepository;

    @InjectMocks
    ScreenService screenService;

    @Mock
    ClientOnboardingRepository clientOnboardingRepository;
    
    @Mock
    ScreenFlowsRepository screenFlowsRepository;

    @Test
    @DisplayName("test createScreen with success response")
    public void createScreenTest() {
	when(screenBuilderService.getClientDetails(Mockito.anyString())).thenReturn(ScreenBuilderData.getClientOnBoardingDetails());
	when(screenBuilderService.getSubModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getSubmodules().get());
	when(screenRepository.save(Mockito.any())).thenReturn(ScreenBuilderData.getScreen());
	SaveScreenResponse response = screenService.saveScreen(ScreenBuilderData.getCreateScreenModel());
	assertEquals(Constants.SCREEN_CREATED, response.getMessage());
    }
    
    @Test
    @DisplayName("test createScreen with Exception")
    public void createScreenTestException() {
	when(screenBuilderService.getClientDetails(Mockito.anyString())).thenReturn(ScreenBuilderData.getClientOnBoardingDetails());
	when(screenBuilderService.getSubModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getSubmodules().get());
	when(screenRepository.save(Mockito.any())).thenReturn(ScreenBuilderData.getScreen());
	CreateScreenRequest request=ScreenBuilderData.getCreateScreenRequest();
	request.setClientId("invalidId");
	SaveScreenResponse response = screenService.saveScreen(ScreenBuilderData.getCreateScreenModel());
	assertEquals(Constants.SCREEN_CREATED, response.getMessage());
    }
    
    @Test
    @DisplayName("test updateScreen with success response")
    public void updateScreenTest() {
	when(screenBuilderService.getClientDetails(Mockito.anyString())).thenReturn(ScreenBuilderData.getClientOnBoardingDetails());
	when(screenBuilderService.getSubModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getSubmodules().get());
	when(screenBuilderService.getScreen(Mockito.anyString())).thenReturn(ScreenBuilderData.getScreen());
	SuccessResponse response = screenService.updateScreen(ScreenBuilderData.getUpdateScreenModel());
	assertEquals(Constants.SCREEN_UPDATED, response.getMessage());
    }
}
