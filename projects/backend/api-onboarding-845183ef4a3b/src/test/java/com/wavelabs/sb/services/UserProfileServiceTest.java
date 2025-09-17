package com.wavelabs.sb.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.Files;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.DataBuilder;
import com.wavelabs.sb.model.SiteDataBuilder;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.repositories.AdminCredentialsRepository;
import com.wavelabs.sb.repositories.AdminDetailsRepository;
import com.wavelabs.sb.repositories.ClientCredentialsRepository;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.ProfileImageRepository;
import com.wavelabs.sb.repositories.UserBankDetailsRepository;
import com.wavelabs.sb.repositories.UserCredentialsRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.UserProfileDetails;

@RunWith(MockitoJUnitRunner.class)
public class UserProfileServiceTest {

    @Mock
    UserOnboardingRepository userOnboardingRepository;

    @Mock
    UserCredentialsRepository userCredentialsRepository;

    @InjectMocks
    UserProfileService userProfileService;

    @Mock
    ClientOnboardingRepository clientOnBoardingRepository;
    
    @Mock
    AdminDetailsRepository adminDetailsRepository;
    
    @Mock
    AdminCredentialsRepository adminCredentialsRepository;

    @Mock
    AesEncryption aesEncryption;
    
    @Mock
    ClientCredentialsRepository clientCredentialsRepository;
    
    @Mock
    SiteOnboardingService siteOnboardingService;
    
    @Mock
    UserBankDetailsRepository userBankDetailsRepository;
    
    @Mock
    FileService fileService;
    
    @Mock
    ProfileImageRepository profileImageRepository;
    
 
    @Test
    @DisplayName("test updatePassword with success response")
    public void updateUserPassword() {
	when(userOnboardingRepository.findByUserIdAndClientIdAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(Optional.of(UserDataBuilder.getUser()));
	SuccessResponse response = userProfileService.updatePassword(UserDataBuilder.getTokenPayLoadRequest(),
		UserDataBuilder.getChangePasswordRequest());
	assertEquals(Constants.PASSWORD_CHANGED_SUCCESSFULLY, response.getMessage());
    }

    @Test
    @DisplayName("test updatePassword with success response")
    public void updateClientPassword() {
	when(clientOnBoardingRepository.findByClientIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(DataBuilder.getClientOnboardingDetail()));
	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequest();
	request.setTypeOfUser("Client");
	request.setUserId(null);
	SuccessResponse response = userProfileService.updatePassword(request,
		UserDataBuilder.getChangePasswordRequest());
	assertEquals(Constants.PASSWORD_CHANGED_SUCCESSFULLY, response.getMessage());
    }
  
    
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test UpdateClientPassword Throws Exception")
    public void testUpdateClientPasswordThrowsException() {
    	when(clientOnBoardingRepository
		.findByClientIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean())).thenReturn(Optional.empty());
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsClient();
    	userProfileService.updatePassword(request,
    			UserDataBuilder.getChangePasswordRequest());
    	
    }
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test UpdateClientPassword Throws BadRequestException")
    public void testUpdateClientPasswordThrowsBadRequestException() {
    	when(clientOnBoardingRepository.findByClientIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(DataBuilder.getClientOnboardingDetailStatusIsInActive()));
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsClient();
    	userProfileService.updatePassword(request,
    			UserDataBuilder.getChangePasswordRequest());
    	
    }
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test UpdateClientPassword ThrowsException")
    public void testUpdateClientPasswordThrowException() {
    	when(clientOnBoardingRepository.findByClientIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(DataBuilder.getClientOnboardingDetailCredentialsIsNull()));
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsClient();
    	userProfileService.updatePassword(request,
    			UserDataBuilder.getChangePasswordRequest());
    	
    }
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test UpdateUserPassword ThrowsException")
    public void testUpdateUserPasswordThrowException() {
    	when(userOnboardingRepository.findByUserIdAndClientIdAndDeleted(Mockito.anyString(),
    			Mockito.any(), Mockito.anyBoolean()))
		.thenReturn(Optional.empty());
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsUser();
    	userProfileService.updatePassword(request,
    			UserDataBuilder.getChangePasswordRequest());
    	
    }
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test UpdateClientPassword Throws BadRequestException")
    public void testUpdateUserPasswordThrowsBadRequestException() {
    	when(userOnboardingRepository.findByUserIdAndClientIdAndDeleted(Mockito.anyString(),
    			Mockito.any(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(UserDataBuilder.getUserStatusIsInActive()));
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsUser();
    	userProfileService.updatePassword(request,
    			UserDataBuilder.getChangePasswordRequest());
    	
    }
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test UpdateUserPassword ThrowsException")
    public void testUpdateUserPasswordThrowsException() {
    	when(userOnboardingRepository.findByUserIdAndClientIdAndDeleted(Mockito.anyString(),
    			Mockito.any(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(UserDataBuilder.getUser3()));
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsUser();
    	userProfileService.updatePassword(request,
    			UserDataBuilder.getChangePasswordRequest());
    	
    }
    
    @Test
    @DisplayName("test updateAdminPassword with success response")
    public void testUpdateAdminPassword() {
	when(adminDetailsRepository.findByAdminIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(UserDataBuilder.getAdminDetails()));
	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsAdmin();
	SuccessResponse response = userProfileService.updatePassword(request,
		UserDataBuilder.getChangePasswordRequest());
	assertEquals(Constants.PASSWORD_CHANGED_SUCCESSFULLY, response.getMessage());
    }
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test UpdateAdminPassword ThrowsException")
    public void testUpdateAdminPasswordThrowException() {
    	when(adminDetailsRepository.findByAdminIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.empty());
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsAdmin();
    	userProfileService.updatePassword(request,
    			UserDataBuilder.getChangePasswordRequest());
    	
    }
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test UpdateAdminPassword ThrowsException")
    public void testUpdateAdminPasswordThrowsException() {
    	when(adminDetailsRepository.findByAdminIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(UserDataBuilder.getAdminDetailsStatusIsInActive()));
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsAdmin();
    	userProfileService.updatePassword(request,
    			UserDataBuilder.getChangePasswordRequest());
    	
    }
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test UpdateAdminPassword BadRequestThrowsException")
    public void testUpdateAdminPasswordThrowsBadRequestException() {
    	when(adminDetailsRepository.findByAdminIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(UserDataBuilder.getAdminDetailsCredentialsIsNull()));
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsAdmin();
    	userProfileService.updatePassword(request,
    			UserDataBuilder.getChangePasswordRequest());
    	
    }
    
    
    @Test
    @DisplayName("test fetchUserProfile")
    public void testfetchUserProfile() {
    	when(clientOnBoardingRepository
    		    .findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean())).thenReturn(Optional.of(DataBuilder.getClientOnboardingDetail()));
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsClient();
    	UserProfileDetails userProfileDetails=userProfileService.fetchUserProfile(request);
    	assertEquals("Bharath",userProfileDetails.getFirstName());
    	
    }
    
    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test UpdateAdminPassword BadRequestThrowsException")
    public void testfetchUserProfileThrowsException() {
    	when(clientOnBoardingRepository
    		    .findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean())).thenReturn(Optional.empty());
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsClient();
         userProfileService.fetchUserProfile(request);
    	
    	
    }
    
    @Test
    @DisplayName("test fetchUserProfileTypeOfUserIsUser")
    public void testfetchUserProfileTypeOfUserIsUser() {
    	when(userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(
    		    Mockito.anyString(), Mockito.anyString(), Mockito.any(), Mockito.anyBoolean())).thenReturn(Optional.of(UserDataBuilder.getUserDetail()));
    	when(siteOnboardingService.fetchSitesBySiteIds(Mockito.anyList(),Mockito.anyString())).thenReturn(SiteDataBuilder.getSiteOnboardingDetailsList());
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsUser();
    	UserProfileDetails userProfileDetails=userProfileService.fetchUserProfile(request);
    	assertEquals("Vijay",userProfileDetails.getFirstName());
    	
    }
    
    
    
    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test UpdateUserPasswordfetchUserProfile BadRequestThrowsException")
    public void testfetchUserProfileTypeOfUserIsUserThrowsException() {
    	when(userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(
    		    Mockito.anyString(), Mockito.anyString(), Mockito.any(), Mockito.anyBoolean())).thenReturn(Optional.empty());
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsUser();
         userProfileService.fetchUserProfile(request);
    	
    	
    }
    
    @Test
    @DisplayName("test fetchUserProfileTypeOfUserIsAdmin")
    public void testfetchUserProfileTypeOfUserIsAdmin() {
    	when(adminDetailsRepository
    		    .findByAdminIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean())).thenReturn(Optional.of(UserDataBuilder.getAdminDetails()));
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsAdmin();
    	UserProfileDetails userProfileDetails=userProfileService.fetchUserProfile(request);
    	assertEquals("admin",userProfileDetails.getFullName());
    	
    }
    
    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test fetchUserProfileTypeOfUserIsAdmin throws BadRequestThrowsException")
    public void testfetchUserProfileTypeOfUserIsAdminThrowsException() {
    	when(adminDetailsRepository
    		    .findByAdminIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean())).thenReturn(Optional.empty());
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsAdmin();
         userProfileService.fetchUserProfile(request);
    	
    	
    }
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test fetchUserProfileInvalidTypeOfUser throws BadRequestThrowsException")
    public void testfetchUserProfileInvalidTypeOfUserThrowsException() {
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequest();
    	request.setTypeOfUser("invalid");
         userProfileService.fetchUserProfile(request);
    	
    	
    }
    
    @Test
    @DisplayName("test UpdateUserProfileTypeOfUserIsClient")
    public void testUpdateUserProfileTypeOfUserIsClient() {
    	when(clientOnBoardingRepository
		    .findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
    .thenReturn(Optional.of(DataBuilder.getClientOnboardingDetail()));	
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsClient();
    	SuccessResponse response=userProfileService.updateUserProfile(request, UserDataBuilder.getUserProfileUpdateRequest());
    	assertEquals(Constants.PROFILE_UPDATE_SUCCESS,response.getMessage());
    }
    
    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test UpdateUserProfileTypeOfUserIsClient Throws Exception")
    public void testUpdateUserProfileTypeOfUserIsClientThrowsException() {
    	when(clientOnBoardingRepository
		    .findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
    .thenReturn(Optional.empty());	
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsClient();
    	userProfileService.updateUserProfile(request, UserDataBuilder.getUserProfileUpdateRequest());
    
    }
    
    @Test
    @DisplayName("test UpdateUserProfileTypeOfUserIsUser")
    public void testUpdateUserProfileTypeOfUserIsUser() {
    	when(userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(
    		   Mockito.anyString(), Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
    .thenReturn(Optional.of(UserDataBuilder.getUser11()));	
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsUser();
    	SuccessResponse response=userProfileService.updateUserProfile(request, UserDataBuilder.getUserProfileUpdateRequest());
    	assertEquals(Constants.PROFILE_UPDATE_SUCCESS,response.getMessage());
    }
    
    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test UpdateUserProfileTypeOfUserIsUser Throws Exception")
    public void testUpdateUserProfileTypeOfUserIsUserThrowsException() {
    	when(userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(
     		   Mockito.anyString(), Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
     .thenReturn(Optional.empty());	
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsUser();
    	userProfileService.updateUserProfile(request, UserDataBuilder.getUserProfileUpdateRequest());
    
    }
    
    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test UpdateUserProfileTypeOfUserIsUser Throws ResourceNotFoundException")
    public void testUpdateUserProfileTypeOfUserIsUserThrowsResourceNotFoundException() {
    	when(userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(
     		   Mockito.anyString(), Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
     .thenReturn(Optional.of(UserDataBuilder.getUser11()));	
    	when(userOnboardingRepository.existsByPersonnelPhoneNumberAndClientIdAndDeletedAndIdNot(
    			 Mockito.anyString(),  Mockito.anyString(),  Mockito.anyBoolean(),  Mockito.anyString())).thenReturn(true);
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsUser();
    	userProfileService.updateUserProfile(request, UserDataBuilder.getUserProfileUpdateRequest());
    
    }
    
    @Test
    @DisplayName("test UpdateUserProfileTypeOfUserIsAdmin")
    public void testUpdateUserProfileTypeOfUserIsAdmin() {
    	when(adminDetailsRepository
    		    .findByAdminIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
    			.thenReturn(Optional.of(UserDataBuilder.getAdminDetails()));
    	when(adminDetailsRepository.findByMobile(Mockito.anyString())).thenReturn(UserDataBuilder.getAdminDetails());
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsAdmin();
    	SuccessResponse response=userProfileService.updateUserProfile(request, UserDataBuilder.getUserProfileUpdateRequest());
    	assertEquals(Constants.PROFILE_UPDATE_SUCCESS,response.getMessage());
    }
    
    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test UpdateUserProfileTypeOfUserIsAdmin Throws Exception")
    public void testUpdateUserProfileTypeOfUserIsAdminThrowsException() {
    	when(adminDetailsRepository
    		    .findByAdminIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
    			.thenReturn(Optional.empty());
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsAdmin();
    	userProfileService.updateUserProfile(request, UserDataBuilder.getUserProfileUpdateRequest());
    
    }
    @Test(expected = BadRequestException.class)
    @DisplayName("test testUpdateUserProfileInvalidTypeOfUser throws BadRequestThrowsException")
    public void testUpdateUserProfileInvalidTypeOfUserThrowsException() {
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequest();
    	request.setTypeOfUser("invalid");
    	userProfileService.updateUserProfile(request, UserDataBuilder.getUserProfileUpdateRequest());
    	
    	
    }
    
    @Test
    @DisplayName("testuploadProfileTypeOfUserIsClient")
    public void testuploadProfileTypeOfUserIsClient() {
    	when(clientOnBoardingRepository
		.findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
    	  .thenReturn(Optional.of(DataBuilder.getClientOnboardingDetailWithProfileImage()));	
    	System.out.println(DataBuilder.getClientOnboardingDetailWithProfileImage().getProfileImage().getId());
    	when(fileService.saveFiles(Mockito.any(), Mockito.any(),Mockito.any())).thenReturn(DataBuilder.getFiles());
    	SuccessResponse response=userProfileService.uploadProfile(UserDataBuilder.uploadProfileImageRequestTypeOfUserIsClient());
    	assertEquals(Constants.IMAGE_UPLOADED_SUCCESSFULLY,response.getMessage());
    	
    }
    
    @Test
    @DisplayName("testuploadProfileTypeOfUserIsAdmin")
    public void testuploadProfileTypeOfUserIsAdmin() {
    	when(adminDetailsRepository.findByAdminIdAndStatusAndDeleted(Mockito.anyString(),
    			Mockito.any(), (Mockito.anyBoolean())))
    			.thenReturn(Optional.of(UserDataBuilder.getAdminDetailsWithProfileImage()));	
    	when(fileService.saveFiles(Mockito.any(), Mockito.any(),Mockito.any())).thenReturn(DataBuilder.getFiles());
    	SuccessResponse response=userProfileService.uploadProfile(UserDataBuilder.uploadProfileImageRequestTypeOfUserIsAdmin());
    	assertEquals(Constants.IMAGE_UPLOADED_SUCCESSFULLY,response.getMessage());
    	
    }
    
    @Test
    @DisplayName("testuploadProfileTypeOfUserIsUser")
    public void testuploadProfileTypeOfUserIsUser() {
    	when(userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.anyString(),
    			Mockito.any(), Mockito.anyBoolean())).
    	thenReturn(Optional.of(UserDataBuilder.getUserWithProfileImage()));	
    	when(fileService.saveFiles(Mockito.any(), Mockito.any(),Mockito.any())).thenReturn(DataBuilder.getFiles());
    	SuccessResponse response=userProfileService.uploadProfile(UserDataBuilder.uploadProfileImageRequestTypeOfUserIsUser());
    	assertEquals(Constants.IMAGE_UPLOADED_SUCCESSFULLY,response.getMessage());
    	
    }
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test testUpdateProfileInvalidTypeOfUser throws BadRequestThrowsException")
    public void testuploadProfileInvalidTypeOfUserThrowsException() {
    	userProfileService.uploadProfile(UserDataBuilder.uploadProfileImageRequestTypeOfUserIsInvalid());
    	
    	
    }
    
    @Test
    @DisplayName("testgetProfileTypeOfUserIsClient")
    public void testgetProfileTypeOfUserIsClient() {
    	when(clientOnBoardingRepository
    			.findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
    	    	  .thenReturn(Optional.of(DataBuilder.getClientOnboardingDetailWithProfileImage()));	
    	Files file=userProfileService.getProfile(UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsClient());
    	assertEquals("UUID", file.getFileUUID());
    	
    }
    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("testgetProfileTypeOfUserIsClientThrowsException")
    public void testgetProfileTypeOfUserIsClientThrowsException() {
    	when(clientOnBoardingRepository
    			.findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
    	    	  .thenReturn(Optional.of(DataBuilder.getClientOnboardingDetail()));	
    	userProfileService.getProfile(UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsClient());
   
    }
    
    @Test
    @DisplayName("testgetProfileTypeOfUserIsAdmin")
    public void testgetProfileTypeOfUserIsAdmin() {
    	when(adminDetailsRepository.findByAdminIdAndStatusAndDeleted(Mockito.anyString(),
    			Mockito.any(), (Mockito.anyBoolean())))
    			.thenReturn(Optional.of(UserDataBuilder.getAdminDetailsWithProfileImage()));	
    	Files file=userProfileService.getProfile(UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsAdmin());
    	assertEquals("UUID", file.getFileUUID());
    	
    }
    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("testgetProfileTypeOfUserIsAdminThrowsException")
    public void testgetProfileTypeOfUserIsAdminThrowsException() {
    	when(adminDetailsRepository.findByAdminIdAndStatusAndDeleted(Mockito.anyString(),
    			Mockito.any(), (Mockito.anyBoolean())))
    			.thenReturn(Optional.of(UserDataBuilder.getAdminDetails()));	
    	userProfileService.getProfile(UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsAdmin());
   
    }
    
    @Test
    @DisplayName("testgetProfileTypeOfUserIsUser")
    public void testgetProfileTypeOfUserIsUser() {
    	when(userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.anyString(),
    			Mockito.any(), Mockito.anyBoolean())).
    	thenReturn(Optional.of(UserDataBuilder.getUserWithProfileImage()));	
    	Files file=userProfileService.getProfile(UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsUser());
    	assertEquals("UUID", file.getFileUUID());
    	
    }
    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("testgetProfileTypeOfUserIsUserThrowsException")
    public void testgetProfileTypeOfUserIsUserThrowsException() {
    	when(userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.anyString(),
    			Mockito.any(), Mockito.anyBoolean())).
    	thenReturn(Optional.of(UserDataBuilder.getUser()));	
    	userProfileService.getProfile(UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsUser());
   
    }
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test testUpdateProfileInvalidTypeOfUser throws BadRequestThrowsException")
    public void testgetProfileInvalidTypeOfUserThrowsException() {
    	userProfileService.getProfile(UserDataBuilder.getTokenPayLoadRequestInvalidUser());
    	
    	
    }
    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("testgetProfileTypeOfUserIsUser throws Exception")
    public void testgetProfileTypeOfUserIsUserThrowsResourceNotFoundException() {
    	when(userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.anyString(),
    			Mockito.any(), Mockito.anyBoolean())).
    	thenReturn(Optional.empty());	
    	userProfileService.getProfile(UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsUser());
  
    }
    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("testgetProfileTypeOfUserIsAdmin Throws ResourceNotFoundException")
    public void testgetProfileTypeOfUserIsAdminThrowsResourceNotFoundException() {
    	when(adminDetailsRepository.findByAdminIdAndStatusAndDeleted(Mockito.anyString(),
    			Mockito.any(), (Mockito.anyBoolean())))
    			.thenReturn(Optional.empty());	
    	userProfileService.getProfile(UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsAdmin());
    	
    }
    
    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("testgetProfileTypeOfUserIsClient Throws ResourceNotFoundException")
    public void testgetProfileTypeOfUserIsClientThrowsResourceNotFoundException() {
    	when(clientOnBoardingRepository
    			.findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
    	    	  .thenReturn(Optional.empty());	
            userProfileService.getProfile(UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsClient());
    	
    }
    
    @Test(expected = BadRequestException.class)
    @DisplayName("test UpdateUserProfileTypeOfUserIsAdminBadRequestException")
    public void testUpdateUserProfileTypeOfUserIsAdminThrowsBadRequestException() {
    	when(adminDetailsRepository
    		    .findByAdminIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
    			.thenReturn(Optional.of(UserDataBuilder.getAdminDetails()));
    	when(adminDetailsRepository.findByMobile(Mockito.anyString())).thenReturn(UserDataBuilder.getAdminDetail());
    	TokenPayLoadDetails request = UserDataBuilder.getTokenPayLoadRequestTypeOfUserIsAdmin();
    	SuccessResponse response=userProfileService.updateUserProfile(request, UserDataBuilder.getUserProfileUpdateRequest());
    	assertEquals(Constants.PROFILE_UPDATE_SUCCESS,response.getMessage());
    }
    
}
