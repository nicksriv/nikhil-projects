package com.wavelabs.sb.services;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.model.RoleDataBuilder;
import com.wavelabs.sb.model.StoreDataBuilder;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.model.UsersUploadDataBuilder;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.RolesRepository;
import com.wavelabs.sb.repositories.StoreRepository;
import com.wavelabs.sb.repositories.UserBankDetailsRepository;
import com.wavelabs.sb.repositories.UserCredentialsRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.request.UploadUserRequest;
import com.wavelabs.sb.response.ErrorRecord;

@RunWith(MockitoJUnitRunner.class)
public class UsersUploadServiceTest {

    @Mock
    UserOnboardingRepository userOnboardingRepository;
    @Mock
    UserOnboardingService userOnboardingService;

    @Mock
    StoreRepository storeRepository;
    @Mock
    RolesRepository rolesRepository;

    @InjectMocks
    UsersUploadService usersUploadService;

    @Mock
    UserCredentialsRepository userCredentialsRepository;

    @Mock
    UserBankDetailsRepository bankDetailsRepository;

    @Mock
    RoleOnboardingRepository roleOnboardingRepository;

    @Mock
    AesEncryption aesEncryption;
    
    @Mock
    EmailService emailService;


    @DisplayName("test UserBasicDetails throws BadRequestException")
    public void saveUserTestWithInvalidDate() throws ParseException {
	lenient().when(userOnboardingRepository.save(Mockito.any())).thenReturn(UserDataBuilder.getUser());
	UploadUserRequest request = UsersUploadDataBuilder.getUserRequest();
	when(storeRepository.findByStoreIdAndClientId(Mockito.anyString(), Mockito.anyString()))
		.thenReturn(Optional.of(StoreDataBuilder.getSaveStore_successResponse()));
	when(roleOnboardingRepository.findByRoleInAndClientIdAndDeleted(Mockito.any(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(RoleDataBuilder.getRoleOnboardingList());
	request.setDob("12 APRIL 2001");
	ErrorRecord response = usersUploadService.saveUser(request, "EMP0012", "clientId", UserDataBuilder.getTokenPayLoadRequest());
	assertEquals("Please provide date dd-mm-yyyy format", response.getMessage());
    }
    
    @Test
    @DisplayName("test UserBasicDetails success response")
    public void testSaveUser() throws ParseException {
    	when(roleOnboardingRepository.findByRoleInAndClientIdAndDeleted(Mockito.any(), Mockito.anyString(),
   			Mockito.anyBoolean())).thenReturn(RoleDataBuilder.getRoleOnboardingList());
    	when(storeRepository.findByStoreIdAndClientId(Mockito.anyString(), Mockito.anyString()))
		.thenReturn(Optional.of(StoreDataBuilder.getSaveStore_successResponse()));
    	when(userOnboardingRepository.save(Mockito.any())).thenReturn(UserDataBuilder.getUser());
    	when(userCredentialsRepository.save(Mockito.any())).thenReturn(UserDataBuilder.getUserCredentials());
    	
    	ErrorRecord response = usersUploadService.saveUser(UsersUploadDataBuilder.getUserRequest(), "referral id",
    			"ReportingManager id", UserDataBuilder.getTokenPayLoadRequest());
    		assertEquals(null, response);
    }
    
    
    
    @Test
    @DisplayName("test UserBasicDetails Throws BadRequestException")
    public void testSaveUserThrowsBadRequestException() throws ParseException {
    	when(userOnboardingRepository.existsByUserIdAndDeleted(Mockito.anyString(),
			Mockito.anyBoolean())).thenReturn(true);
    	usersUploadService.saveUser(UsersUploadDataBuilder.getUserRequest(), "referral id",
    			"ReportingManager id", UserDataBuilder.getTokenPayLoadRequest());
    }
    
    
    @Test
    @DisplayName("test SaveUser Throws ResourceNotFoundException")
    public void testSaveUserThrowsResourceNotFoundException() throws ParseException {
    	when(userOnboardingRepository.existsByPersonnelPhoneNumberAndClientIdAndDeleted(
    		   Mockito.anyString(),  Mockito.anyString(),  Mockito.anyBoolean())).thenReturn(true);
    	usersUploadService.saveUser(UsersUploadDataBuilder.getUserRequest(), "referral id",
    			"ReportingManager id", UserDataBuilder.getTokenPayLoadRequest());
    }
    
    @Test
    @DisplayName("test UserBasicDetails success response")
    public void testSaveUserWhenLocationIsNull() throws ParseException {
    	when(roleOnboardingRepository.findByRoleInAndClientIdAndDeleted(Mockito.any(), Mockito.anyString(),
   			Mockito.anyBoolean())).thenReturn(RoleDataBuilder.getRoleOnboardingList());
    	when(storeRepository.findByStoreIdAndClientId(Mockito.anyString(), Mockito.anyString()))
		.thenReturn(Optional.empty());
    	when(userOnboardingRepository.save(Mockito.any())).thenReturn(UserDataBuilder.getUser());
    	when(userCredentialsRepository.save(Mockito.any())).thenReturn(UserDataBuilder.getUserCredentials());
    	
    	ErrorRecord response = usersUploadService.saveUser(UsersUploadDataBuilder.getUserRequest(), "referral id",
    			"ReportingManager id", UserDataBuilder.getTokenPayLoadRequest());
    		assertEquals(null, response);
    }
    
    @Test
    @DisplayName("test UserBasicDetails ThrowsException")
    public void testSaveUserThrowsException() throws ParseException {
         usersUploadService.saveUser(UsersUploadDataBuilder.getUserRequestWithRoleIsSiteManager(), "referral id",
    			"ReportingManager id", UserDataBuilder.getTokenPayLoadRequest());
    	
    }
    
   
    
   
}

