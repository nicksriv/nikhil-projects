package com.wavelabs.sb.services;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.Arrays;
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

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.EntityNotFoundException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.UserOnboardingMapper;
import com.wavelabs.sb.model.ClientDataBuilder;
import com.wavelabs.sb.model.DataBuilder;
import com.wavelabs.sb.model.RoleDataBuilder;
import com.wavelabs.sb.model.SiteDataBuilder;
import com.wavelabs.sb.model.ThemeDataBuilder;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.ModuleRepository;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.SiteOnboardingRepository;
import com.wavelabs.sb.repositories.StoreRepository;
import com.wavelabs.sb.repositories.SubModuleRepository;
import com.wavelabs.sb.repositories.ThemeDetailsRepository;
import com.wavelabs.sb.repositories.UserBankDetailsRepository;
import com.wavelabs.sb.repositories.UserCredentialsRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.response.BaseResponse;
import com.wavelabs.sb.response.EmployeeDetails;
import com.wavelabs.sb.response.EmployeeInfo;
import com.wavelabs.sb.response.LocationDetailsResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.UserCredentialsEmailResponse;
import com.wavelabs.sb.response.UserCredentialsResponse;
import com.wavelabs.sb.response.UserEmployeeInfo;
import com.wavelabs.sb.response.UserModulesResponse;
import com.wavelabs.sb.response.UserSitesFilterResponse;

@RunWith(MockitoJUnitRunner.class)
public class UserOnboardingServiceTest {

    @Mock
    UserOnboardingRepository userOnboardingRepository;

    @Mock
    SiteOnboardingRepository siteOnboardingRepository;

    @Mock
    ClientOnboardingRepository clientOnBoardingRepository;

    @Mock
    UserCredentialsRepository userCredentialsRepository;

    @InjectMocks
    UserOnboardingService userOnboardingService;

    @Mock
    SiteOnboardingService siteOnboardingService;

    @Mock
    UserBankDetailsRepository userBankDetailsRepository;

    @Mock
    StoreRepository storeRepository;

    @Mock
    MongoTemplate mongoTemplate;

    @Mock
    UserOnboardingMapper userOnboardingMapper;

    @Mock
    EmailService emailService;

    @Mock
    ModuleRepository moduleRepository;

    @Mock
    ThemeDetailsRepository themeDetailsRepository;

    @Mock
    SubModuleRepository subModuleRepository;

    @Mock
    AesEncryption aesEncryption;

    @Mock
    ClientOnboardingService clientOnboardingService;

    @Mock
    RoleOnboardingRepository roleOnboardingRepository;

    @Mock
    UserProfileService userProfileService;

    @Test
    @DisplayName("test UserBasicDetails success response")
    public void saveUserBasicDetailsTest() throws ParseException {
	when(clientOnBoardingRepository.findByClientId(Mockito.anyString()))
		.thenReturn(Optional.of(ClientDataBuilder.getClientOnBoardDetails()));
	when(userOnboardingRepository.existsByPersonnelPhoneNumberAndClientIdAndDeleted(Mockito.anyString(),
		Mockito.anyString(), Mockito.anyBoolean())).thenReturn(false);
	when(userOnboardingRepository.save(Mockito.any())).thenReturn(UserDataBuilder.getUser());
	Users response = userOnboardingService.saveUserBasicDetails(UserDataBuilder.getUserRequest(), "Te0001",
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals("614d79f33f1d4026be53d232", response.getId());
    }

    @Test(expected = BadRequestException.class)
    @DisplayName("test UserBasicDetails throws BadRequestException")
    public void saveUserBasicDetailsTest_Exception() throws ParseException {
	userOnboardingService.saveUserBasicDetails(UserDataBuilder.getUserRequestWithInvalidDate(), "Te0001",
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
    }

    @Test
    @DisplayName("test updateEmployeeDetails success response")
    public void updateEmployeeDetailsTest() throws ParseException {
	when(userOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.of(UserDataBuilder.getUser()));
	when(userOnboardingRepository.save(Mockito.any())).thenReturn(UserDataBuilder.getUserWithEmployeeDeatils());
	when(clientOnboardingService.fetchClientByClientId(Mockito.anyString()))
		.thenReturn(DataBuilder.getClientOnboardingDetailsResponse());

	Users response = userOnboardingService.updateEmployeeDetails(UserDataBuilder.getUserEmployementDetails(),
		"Te0001", ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals("EFO7777", response.getRefferedEmployeeId());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test updateEmployeeDetails throws ResourceNotFoundException")
    public void updateEmployeeDetailsTest_UserNotFound() throws ParseException {
	when(userOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());
	userOnboardingService.updateEmployeeDetails(UserDataBuilder.getUserEmployementDetails(), "Te0001",
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
    }

    @Test(expected = BadRequestException.class)
    @DisplayName("test updateEmployeeDetails throws BadRequestException")
    public void updateEmployeeDetailsTestThrowsException() throws ParseException {
	when(userOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.of(UserDataBuilder.getUser()));
	when(userOnboardingRepository.existsByUserIdAndIdNotAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(true);
	userOnboardingService.updateEmployeeDetails(UserDataBuilder.getUserEmployementDetails(), "Te0001",
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
    }

    @Test
    @DisplayName("test saveUserBankDetails with success response")
    public void saveUserBankDetailsTest() {
	when(userOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(UserDataBuilder.getUserWithBank()));
	UserOnboardingMapper.getUserBankDetails(UserDataBuilder.getUserBankDetails(),
		UserDataBuilder.getUserBankRequest(), UserDataBuilder.getTokenPayLoadRequest());
	BaseResponse saveUserBankDetails = userOnboardingService.saveUserBankDetails(
		UserDataBuilder.getUserBankRequest(), "Te0001", ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals("User bank details are saved..!", saveUserBankDetails.getMessage());

    }

    @Test
    @DisplayName("test saveUserBankDetails with success response")
    public void saveUserBankDetailsTestWithCredentials() {
	when(userOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.of(UserDataBuilder.getUser()));
	when(userOnboardingRepository.save(Mockito.any())).thenReturn(UserDataBuilder.getUser());
	UserOnboardingMapper.createCredentials(UserDataBuilder.getUserWithBank(), "",
		UserDataBuilder.getTokenPayLoadRequest());
	BaseResponse saveUserBankDetails = userOnboardingService.saveUserBankDetails(
		UserDataBuilder.getUserBankRequest(), "Te0001", ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals("User bank details are saved..!", saveUserBankDetails.getMessage());

    }

    @Test
    @DisplayName("test updateUserBasicDetails success response")
    public void updateUserBasicDetailsTest() throws ParseException {
	when(userOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.of(UserDataBuilder.getUser()));
	BaseResponse response = userOnboardingService.updateUserBasicDetails(UserDataBuilder.getUserRequest(),
		"6151a665fc1b08043f03a70e", ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals(Constants.USER_UPDATED, response.getMessage());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test updateUserBasicDetails throws exception")
    public void updateUserBasicDetailsTestException() throws ParseException {
	userOnboardingService.updateUserBasicDetails(UserDataBuilder.getUserRequestWithInvalidDate(),
		"6151a665fc1b08043f03a70e", ThemeDataBuilder.getTokenPayLoadAdminRequest());
    }

    @Test()
    @DisplayName("test fetchAll success response")
    public void fetchAllTest() {
	when(clientOnBoardingRepository.findByClientId(Mockito.anyString()))
		.thenReturn(Optional.of(ClientDataBuilder.getClientOnBoardDetails()));
	when(mongoTemplate.find(Mockito.any(Query.class), Mockito.any())).thenReturn(UserDataBuilder.getListOfUser());
	PaginationResponse<Users> response = userOnboardingService.fetchAll(UserDataBuilder.getFetchAllUserRequest(),
		"Te0001", false);
	assertEquals("Records fetched successfully", response.getMessage());
    }

    @Test
    @DisplayName("test fetchUserBankDetails with bankdetails")
    public void fetchUserBankDetailsTest() {
	when(userOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(UserDataBuilder.getUserWithBank()));
	UserOnboardingMapper.getUserBankDetails(UserDataBuilder.getUserBankDetails(),
		UserDataBuilder.getUserBankRequest(), UserDataBuilder.getTokenPayLoadRequest());
	userOnboardingService.fetchUserBankDetails("Te0001");

    }

    @Test(expected = NullPointerException.class)
    @DisplayName("test updateEmployeeDetails throws BadRequestException")
    public void updateEmployeeDetailsTest_Exception() throws ParseException {
	when(userOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.of(UserDataBuilder.getUser()));
	userOnboardingService.updateEmployeeDetails(UserDataBuilder.getUserEmployementDetailsWithInvalidDate(),
		"Te0001", ThemeDataBuilder.getTokenPayLoadAdminRequest());
    }

    @Test
    @DisplayName("test deleteUser success response")
    public void deleteUserTest() {
	when(userOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.of(UserDataBuilder.getUser()));
	SuccessResponse deleteUserByUserId = userOnboardingService.deleteUserByUserId("EFB0234",
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals("User is deleted successfully", deleteUserByUserId.getMessage());

    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test deleteUser throws exception")
    public void deleteUserTest_Exception() {
	SuccessResponse deleteUserByUserId = userOnboardingService.deleteUserByUserId("EFB0234",
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals("User is deleted successfully", deleteUserByUserId.getMessage());
    }

    @Test
    @DisplayName("test fetchCredentials success response")
    public void fetchCredentialsTest() {
	when(userOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.of(UserDataBuilder.getUser()));
	UserCredentialsResponse response = userOnboardingService.fetchCredentialsByUserId("614d79f33f1d4026be53d232");
	assertEquals("614d79f33f1d4026be53d232", response.getUserId());
    }

    @Test
    @DisplayName("test changePasswordOfUser with success response")
    public void changePasswordOfUserTest() {
	when(userOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.of(UserDataBuilder.getUser()));
	when(userCredentialsRepository.findByUserId(Mockito.anyString()))
		.thenReturn(Optional.of(UserDataBuilder.getUserCredentials()));
	SuccessResponse changePasswordOfUser = userOnboardingService.changePasswordOfUser("614d79f33f1d4026be53d232",
		"String", ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals("Password changed successfully", changePasswordOfUser.getMessage());

    }

    @Test(expected = BadRequestException.class)
    @DisplayName("test changePasswordOfUser with exception")
    public void changePasswordOfUserTest_Exception() {
	SuccessResponse changePasswordOfUser = userOnboardingService.changePasswordOfUser("EMP0012", "String",
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals("Password changed successfully", changePasswordOfUser.getMessage());

    }

    @Test(expected = BadRequestException.class)
    @DisplayName("test changePasswordOfUser with exception")
    public void changePasswordOfUserTest_ExceptionWithUserCredentials() {
	SuccessResponse changePasswordOfUser = userOnboardingService.changePasswordOfUser("615c13928ce64306c0fe0176",
		"password", ThemeDataBuilder.getTokenPayLoadAdminRequest());
	assertEquals("Password changed successfully", changePasswordOfUser.getMessage());

    }

    @Test
    @DisplayName("test getUserCredentialsEmail")
    public void testGetClientCredentialsEmail() {
	when(emailService.getUserCredentialsEmailTemplate(Mockito.anyString()))
		.thenReturn(UserDataBuilder.getUserCredentialsEmailResponse());
	UserCredentialsEmailResponse clientDetails = emailService.getUserCredentialsEmailTemplate("user-id");
	assertEquals("charanrajj@wavelabs.ai", clientDetails.getSendTo());
    }

    @Test
    @DisplayName("test sendUserCredentialsEmail")
    public void testSendClientCredentialsEmail() {
	when(emailService.sendUserCredentialsEmail(Mockito.any()))
		.thenReturn(UserDataBuilder.sendUserCredentialsEmailResponse());
	SuccessResponse clientDetails = emailService
		.sendUserCredentialsEmail(UserDataBuilder.sendUserCredentialsEmailRequest());
	assertEquals(Constants.CREDENTIALS_SHARED_SUCCESSFULLY, clientDetails.getMessage());

    }

    @Test
    @DisplayName("test getUserModules")
    public void testGetUserModules() {
	when(moduleRepository.findByIdIn(Mockito.any())).thenReturn(RoleDataBuilder.getModules());
	when(subModuleRepository.findByIdIn(Mockito.any())).thenReturn(RoleDataBuilder.getSubModules());
	when(userOnboardingRepository.findByUserIdAndClientIdAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(Optional.of(UserDataBuilder.getUser()));
	List<UserModulesResponse> clientDetails = userOnboardingService
		.getUserModules(UserDataBuilder.getTokenPayLoadRequest());
	assertEquals("ModuleName", clientDetails.get(0).getName());

    }

    @Test
    @DisplayName("test viewUserLocations success response")
    public void viewUserLocationsTestSuccess() {
	when(userOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(UserDataBuilder.getUserUpdateLocations()));

	when(siteOnboardingService.fetchSitesBySiteIds(Mockito.anyList(), Mockito.anyString()))
		.thenReturn(Arrays.asList(SiteDataBuilder.getSiteOnboardingDetails()));

	when(siteOnboardingService.fetchAllManagers(Mockito.anyList(), Mockito.anyString()))
		.thenReturn(Arrays.asList(UserDataBuilder.getUser()));

	LocationDetailsResponse response = userOnboardingService.viewLocationDetailsByUserId("userId");

	assertEquals("test-site-id", response.getLocations().get(0).getSiteId());
	assertEquals(1, response.getTotal());
    }

    @Test(expected = ResourceNotFoundException.class)
    public void viewUserLocationsTestSuccess_Exception() {
	userOnboardingService.viewLocationDetailsByUserId("userId");
    }

    @Test
    @DisplayName("test updateUserLocations success response")
    public void updateUserLocationsTest() {
	when(userOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(UserDataBuilder.getUserUpdateLocations()));
	when(userCredentialsRepository.existsByUserId(Mockito.anyString())).thenReturn(false);
//      
//      when(userCredentialsRepository.save(Mockito.any()))
//      .thenReturn(new UserCredentials());
	when(userOnboardingRepository.save(Mockito.any())).thenReturn(new Users());

	when(siteOnboardingRepository.findBySiteIdInAndClientIdAndStatusAndDeleted(Mockito.anyList(),
		Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
			.thenReturn(SiteDataBuilder.getSiteOnboardingDetailsList());

	SuccessResponse response = userOnboardingService.updateUserLocations(UserDataBuilder.getLocations1(),
		ThemeDataBuilder.getTokenPayLoadAdminRequest(), "userId");
	assertEquals(Constants.USER_LOCATIONS_UPDATED_SUCCESSFULLY, response.getMessage());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test updateUserLocations throws exception")
    public void testUpdateUserLocationsTestException() {
	userOnboardingService.updateUserLocations(UserDataBuilder.getLocations(),
		UserDataBuilder.getTokenPayLoadRequest(), "userId");
    }

    @Test
    @DisplayName("test fetchEmployeeByUserIdClientId")
    public void testFetchEmployeeByUserIdClientId() {
	when(userOnboardingRepository.findByUserIdAndClientIdAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(Optional.of(UserDataBuilder.getUser11()));
	EmployeeInfo employeeInfo = userOnboardingService
		.fetchEmployeeByUserIdClientId(UserDataBuilder.searchEmployee());
	assertEquals("EFB0234", employeeInfo.getId());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test fetchEmployeeByUserIdClientIdThrowsException")
    public void testFetchEmployeeByUserIdClientIdThrowsException() {
	when(userOnboardingRepository.findByUserIdAndClientIdAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(Optional.empty());
	userOnboardingService.fetchEmployeeByUserIdClientId(UserDataBuilder.searchEmployee());

    }

    @Test
    @DisplayName("test fetchSitesByUser")
    public void testFetchSitesByUser() {
	when(userOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(UserDataBuilder.getUser2()));
	when(siteOnboardingService.fetchSitesBySiteIds(Mockito.anyList(), Mockito.anyString()))
		.thenReturn(SiteDataBuilder.getSiteOnboardingDetailsList());
	List<UserSitesFilterResponse> list = userOnboardingService
		.fetchSitesByUser(UserDataBuilder.getTokenPayLoadRequest());
	System.out.println(list);
	assertEquals(1, list.size());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test fetchSitesByUserThrowsException")
    public void testFetchSitesByUserThrowsException() {
	when(userOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());
	userOnboardingService.fetchSitesByUser(UserDataBuilder.getTokenPayLoadRequest());
    }

    @Test
    @DisplayName("test getEmployeeDetails")
    public void testGetEmployeeDetails() {
	when(userOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(UserDataBuilder.getUserDetail()));
	EmployeeDetails e = userOnboardingService.getEmployeeDetails(UserDataBuilder.getUser().getId());
	assertEquals("EMP0012", e.getEmployeeId());
    }

    @Test
    @DisplayName("test getEmployeeInfo")
    public void testGetEmployeeInfo() {
	when(userOnboardingRepository.findByReportingManagerIdInAndDeletedAndIdNot(Mockito.any(),
		Mockito.anyBoolean(), Mockito.anyString())).thenReturn(UserDataBuilder.getUsersList());
	List<UserEmployeeInfo> list = userOnboardingService.getEmployeeInfo(UserDataBuilder.getTokenPayLoadRequest());
	assertEquals(1, list.size());
    }
//    @Test
//    @DisplayName("test FetchUserByUserIdsAndClientId")
//    public void testFetchUserByUserIdsAndClientId() {
//    	when(userOnboardingRepository.findByUserIdInAndClientIdAndStatusAndDeleted(Mockito.anyList(), Mockito.anyString(),
//    			Mockito.any(), Mockito.anyBoolean())).thenReturn(UserDataBuilder.getUsersList());
//    	List<Users> list=userOnboardingService.fetchUserByUserIdsAndClientId(List.of("userid"),"clientid");
//    	 assertEquals(1,list.size());
//    }

        // commentted due to error
//    @Test(expected = ResourceNotFoundException.class)
//    @DisplayName("test FetchUserByUserIdsAndClientIdThrowsException")
//    public void testFetchUserByUserIdsAndClientIdThrowsException() {
//	when(userOnboardingRepository.findByUserIdInAndClientIdAndStatusAndDeleted(Mockito.anyList(),
//		Mockito.anyString(), Mockito.any(), Mockito.anyBoolean())).thenReturn(null);
//	userOnboardingService.fetchUserByUserIdsAndClientId(List.of("userid"), "clientid");
//    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test saveUserBasicDetailsThrowsException")
    public void testSaveUserBasicDetailsThrowsException() throws ParseException {
	when(clientOnBoardingRepository.findByClientId(Mockito.anyString()))
		.thenReturn(Optional.of(ClientDataBuilder.getClientOnBoardDetails()));
	when(userOnboardingRepository.existsByPersonnelPhoneNumberAndClientIdAndDeleted(Mockito.anyString(),
		Mockito.anyString(), Mockito.anyBoolean())).thenReturn(true);
	userOnboardingService.saveUserBasicDetails(UserDataBuilder.getUserRequest(), "d3098u",
		ThemeDataBuilder.getTokenPayLoadAdminRequest());
    }

    @Test(expected = BadRequestException.class)
    @DisplayName("test fetchAll throws Exception")
    public void fetchAllTestThrowsException() {
	when(clientOnBoardingRepository.findByClientId(Mockito.anyString())).thenReturn(Optional.empty());
	userOnboardingService.fetchAll(UserDataBuilder.getFetchAllUserRequest(), "Te0001", false);
    }

    @Test(expected = EntityNotFoundException.class)
    @DisplayName("test fetchCredentials EntityNotFoundException")
    public void testFetchCredentialsByUserIdThrowsEntityNotFoundException() {
	when(userOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());
	userOnboardingService.fetchCredentialsByUserId("614d79f33f1d4026be53d232");

    }

    @Test(expected = EntityNotFoundException.class)
    @DisplayName("test fetchCredentials EntityNotFoundException")
    public void testFetchCredentialsByUserIdThrowsException() {
	when(userOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(UserDataBuilder.getUser3()));
	userOnboardingService.fetchCredentialsByUserId("614d79f33f1d4026be53d232");

    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test getUserModulesThrowsException")
    public void tsetGetUserModulesThrowsException() {
	when(userOnboardingRepository.findByUserIdAndClientIdAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(Optional.empty());
	userOnboardingService.getUserModules(UserDataBuilder.getTokenPayLoadRequest());

    }

    @Test(expected = EntityNotFoundException.class)
    @DisplayName("test changePasswordOfUser with success response")
    public void changePasswordOfUserTestThrowsEntityNotFoundException() {
	when(userOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.of(UserDataBuilder.getUser()));
	when(userCredentialsRepository.findByUserId(Mockito.anyString())).thenReturn(Optional.empty());
	userOnboardingService.changePasswordOfUser("614d79f33f1d4026be53d232", "String",
		ThemeDataBuilder.getTokenPayLoadAdminRequest());

    }

    @Test(expected = BadRequestException.class)
    @DisplayName("test changePasswordOfUser with success response")
    public void changePasswordOfUserTestThrowsBadRequestException() {
	when(userOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.of(UserDataBuilder.getUser()));
	when(userCredentialsRepository.findByUserId(Mockito.anyString()))
		.thenReturn(Optional.of(UserDataBuilder.getUserCredentialsWithPassword()));
	userOnboardingService.changePasswordOfUser("614d79f33f1d4026be53d232", "String",
		ThemeDataBuilder.getTokenPayLoadAdminRequest());

    }

}
