package com.wavelabs.sb.services;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import com.wavelabs.sb.model.DataBuilder;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.ThemeDetails;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.EntityNotFoundException;
import com.wavelabs.sb.mappers.UserOnboardingMapper;
import com.wavelabs.sb.model.ThemeDataBuilder;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.ThemeDetailsRepository;
import com.wavelabs.sb.request.ThemeRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.ThemeResponse;

@RunWith(MockitoJUnitRunner.class)
public class ThemeServiceTest {

    @Mock
    ClientOnboardingRepository clientOnBoardingRepository;


    @InjectMocks
    ThemeService themeService;
    

    @Mock
    ThemeDetailsRepository themeDetailsRepository;


    @Test
    @DisplayName("test createTheme_Success update existing theme")
    public void testCreateThemeMethodUpdateExistingTheme() {
    when(clientOnBoardingRepository.findById(Mockito.any())).thenReturn(Optional.of(DataBuilder.getClientOnboardingDetail()));
	when(themeDetailsRepository.save(Mockito.any())).thenReturn(ThemeDataBuilder.getThemeDetails());
	SuccessResponse response = themeService.createTheme(ThemeDataBuilder.getTokenPayLoadRequest(),
		UserDataBuilder.getThemeRequest());
	assertEquals("test-theme-id", response.getId());
	assertEquals(Constants.THEME_SAVED_SUCCESS, response.getMessage());
    }

    @Test
    @DisplayName("test createTheme_Success save new theme")
    public void testCreateThemeMethodSaveNewTheme() {
	when(clientOnBoardingRepository.findById(Mockito.any())).thenReturn(Optional.of(DataBuilder.getClientOnboardingDetail()));
	//when(themeDetailsRepository
	//		.findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean())).thenReturn(Optional.of(ThemeDataBuilder.getThemeDetails());
	when(themeDetailsRepository.save(Mockito.any())).thenReturn(ThemeDataBuilder.getThemeDetails());
	SuccessResponse response = themeService.createTheme(ThemeDataBuilder.getTokenPayLoadRequest(),
		UserDataBuilder.getThemeRequest());
	assertEquals("test-theme-id", response.getId());
	assertEquals(Constants.THEME_SAVED_SUCCESS, response.getMessage());
    }

    @Test(expected = BadRequestException.class)
    @DisplayName("test createTheme throws Resource Not Found")
    public void testCreateThemeMethodShouldThrowException() {
    when(clientOnBoardingRepository.findById(Mockito.any())).thenReturn(Optional.of(DataBuilder.getClientOnboardingDetail()));
    themeService.createTheme(ThemeDataBuilder.getTokenPayLoadAdminRequest(), ThemeDataBuilder.getThemeRequest());
    }

    @Test
    @DisplayName("test fetchThemeDetailsSuccess")
    public void testFetchThemeDetailsSuccess() {
    when(themeDetailsRepository.findByClientIdAndStatusAndDeleted(Mockito.any(), Mockito.any(),
    Mockito.anyBoolean())).thenReturn(Optional.of(UserDataBuilder.getThemeDetails()));
	ThemeResponse themeResponse = themeService.fetchThemeDetails(ThemeDataBuilder.getFetchThemeDetailModel());
	assertEquals("test-font-name", themeResponse.getFont());
	assertEquals("test-primary-color", themeResponse.getPrimaryColor());
	assertEquals("test-secondary-color", themeResponse.getMenuColor());
    }

    
    @Test
    @DisplayName("test fetchThemeDetailsSuccess when ThemeDetailsIsEmpty")
    public void testFetchThemeDetailsSuccessThemeDetailsIsEmpty() {
    when(themeDetailsRepository.findByClientIdAndStatusAndDeleted(Mockito.any(), Mockito.any(),
    Mockito.anyBoolean())).thenReturn(Optional.empty());
	ThemeResponse themeResponse = themeService.fetchThemeDetails(ThemeDataBuilder.getFetchThemeDetailModel());
	assertEquals(Constants.DEFAULT_FONT, themeResponse.getFont());

    }
    
    
    @Test
    @DisplayName("test createTheme if theme has been created already for given client")
    public void testCreateThemeMethodUpdateExistingThemeWithClientId() {
    when(clientOnBoardingRepository.findById(Mockito.any())).thenReturn(Optional.of(ThemeDataBuilder.getClientOnboardingDetail()));
    when(themeDetailsRepository
			.findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean())).thenReturn(Optional.of(UserDataBuilder.getThemeDetails()));
    when(themeDetailsRepository.save(Mockito.any())).thenReturn(ThemeDataBuilder.getThemeDetails());
	SuccessResponse response = themeService.createTheme(ThemeDataBuilder.getTokenPayLoadAdminRequest(),
			ThemeDataBuilder.getThemeRequestWithClientId());
	assertEquals("test-theme-id", response.getId());
	assertEquals(Constants.THEME_SAVED_SUCCESS, response.getMessage());
    }
    
    @Test
    @DisplayName("test fetchThemeDetailsSuccessTypeOfUserIsUser")
    public void testFetchThemeDetailsSuccessTypeOfUserIsUser() {
    when(clientOnBoardingRepository.findById(Mockito.any())).thenReturn(Optional.of(DataBuilder.getClientOnboardingDetail()));
    when(themeDetailsRepository.findByClientIdAndStatusAndDeleted(Mockito.any(), Mockito.any(),
    Mockito.anyBoolean())).thenReturn(Optional.of(UserDataBuilder.getThemeDetails()));
	ThemeResponse themeResponse = themeService.fetchThemeDetails(ThemeDataBuilder.getFetchThemeDetailModelTypeOfUserIsUser());
	assertEquals("test-font-name", themeResponse.getFont());
	assertEquals("test-primary-color", themeResponse.getPrimaryColor());
	assertEquals("test-secondary-color", themeResponse.getMenuColor());
    }
    
    
    @Test
    @DisplayName("test fetchThemeResponseByClientId")
    public void testFetchThemeResponseByClientId() {
    	when(themeDetailsRepository.findByClientIdAndStatusAndDeleted(Mockito.anyString(),
		Mockito.any(), Mockito.anyBoolean())).thenReturn(Optional.of(ThemeDataBuilder.getThemeDetails()));
    	ThemeDetails themeDetails=themeService.fetchThemeResponseByClientId("test-clientId");
    	assertEquals("test-theme-id", themeDetails.getId());
    }
    @Test
    @DisplayName("test fetchThemeResponseByClientIdThemeDetailsIsEmpty(")
    public void testFetchThemeResponseByClientIdThemeDetailsIsEmpty() {
    	when(themeDetailsRepository.findByClientIdAndStatusAndDeleted(Mockito.anyString(),
		Mockito.any(), Mockito.anyBoolean())).thenReturn(Optional.empty());
    	ThemeDetails themeDetails=themeService.fetchThemeResponseByClientId("clientId");
    	assertEquals(null, themeDetails);
    }
   
    
    @Test
    @DisplayName("test checkClientId throw exception")
    public void testCheckClientId() {
    	  when(clientOnBoardingRepository.findById(Mockito.any())).thenReturn(Optional.empty());
	assertThrows(EntityNotFoundException.class, () -> {
		themeService.checkClientId("test id");
	});
    }
    
    
    
   
}

   

