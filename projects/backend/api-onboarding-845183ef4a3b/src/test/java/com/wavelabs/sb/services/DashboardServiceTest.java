package com.wavelabs.sb.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.bson.Document;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;

import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.DashboardDataBuilder;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.repositories.AdminDetailsRepository;
import com.wavelabs.sb.repositories.AuthenticationRepository;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.response.AdminDashboardResponse;
import com.wavelabs.sb.response.UserDashboardResponse;
import com.wavelabs.sb.response.UserStatisticsResponse;

@RunWith(MockitoJUnitRunner.class)
public class DashboardServiceTest {

    @InjectMocks
    DashboardService dashboardService;

    @Mock
    UserOnboardingService onboardingService;

    @Mock
    MongoTemplate mongoTemplate;

    @Mock
    UserProfileService profileService;

    @Mock
    ScreenBuilderService builderService;

    @Mock
    AuthenticationRepository authenticationRepository;

    @Mock
    UserOnboardingRepository userOnboardingRepository;

    @Mock
    ClientOnboardingRepository clientOnboardingRepository;

    @Mock
    RoleOnboardingRepository roleOnboardingRepository;

    @Mock
    AdminDetailsRepository adminDetailsRepository;

    @Test
    @DisplayName("test fetchUserDashboardData")
    public void fetchUserDashboardData() {
	when(onboardingService.getUser(Mockito.any())).thenReturn(DashboardDataBuilder.getUsers());
	// when(profileService.getUserOrNull(Mockito.any())).thenReturn(DashboardDataBuilder.getUsers());
	when(builderService.fetchUserModules(Mockito.any(), Mockito.any()))
		.thenReturn(DashboardDataBuilder.getUserDashboardResponseWithoutResponseEntity());
	when(authenticationRepository.findRecentToken(Mockito.any(), Mockito.any(Pageable.class)))
		.thenReturn(DashboardDataBuilder.getAuthenticationAuditingDetails());
	UserDashboardResponse response = dashboardService
		.fetchUserDashboardData(DashboardDataBuilder.getTokenPayLoadDetails());
	assertEquals("chartName", response.getCharts().get(0).getName());
    }

    @Test
    @DisplayName("test fetchAdminDashboardDataClient")
    public void fetchAdminDashboardDataClient() {
	when(userOnboardingRepository.findByClientIdAndStatusAndDeletedAndRolesIn(Mockito.any(), Mockito.any(),
		Mockito.anyBoolean(), Mockito.any())).thenReturn(DashboardDataBuilder.getUsersList());
	when(builderService.fetchUserModules(Mockito.any(), Mockito.any()))
		.thenReturn(DashboardDataBuilder.getUserDashboardResponseWithoutResponseEntity());
	when(clientOnboardingRepository.findByClientIdAndStatusAndDeleted(Mockito.any(), Mockito.any(),
		Mockito.anyBoolean())).thenReturn(Optional.of(DashboardDataBuilder.getClientOnboardDetails()));
	when(roleOnboardingRepository.findByClientIdAndDeletedAndRoleIgnoreCase(Mockito.any(), Mockito.anyBoolean(),
		Mockito.any())).thenReturn(DashboardDataBuilder.getRoleOnboardingDetails());
	when(authenticationRepository.findRecentToken(Mockito.anyString(), Mockito.any(Pageable.class)))
		.thenReturn(DashboardDataBuilder.getAuthenticationAuditingDetails());
	AdminDashboardResponse response = dashboardService
		.fetchAdminDashboardData(DashboardDataBuilder.getTokenPayLoadDetailsClient());
    }

    @Test
    @DisplayName("test fetchAdminDashboardDataUser")
    public void fetchAdminDashboardDataUser() {
	when(userOnboardingRepository.findById(Mockito.any())).thenReturn(Optional.of(DashboardDataBuilder.getUsers()));

	when(builderService.fetchUserModules(Mockito.any(), Mockito.any()))
		.thenReturn(DashboardDataBuilder.getUserDashboardResponseWithoutResponseEntity());
	when(authenticationRepository.findRecentToken(Mockito.any(), Mockito.any(Pageable.class)))
		.thenReturn(DashboardDataBuilder.getAuthenticationAuditingDetails());
	AdminDashboardResponse response = dashboardService
		.fetchAdminDashboardData(DashboardDataBuilder.getTokenPayLoadDetailsUser());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test fetchAdminDashboardDataThrowsException")
    public void fetchAdminDashboardDataThrowsException() {
	// when(adminDetailsRepository.findById(Mockito.any())).thenReturn(Optional.of(DashboardDataBuilder.getAdminDetails()));
	// when(adminDetailsRepository.findByDeletedAndIdNot(Mockito.anyBoolean(),Mockito.any())).thenReturn(DashboardDataBuilder.getAdminDetailsList());
	// when(authenticationRepository.findRecentToken(Mockito.any(),Mockito.any(Pageable.class))).thenReturn(DashboardDataBuilder.getAuthenticationAuditingDetails());
	AdminDashboardResponse response = dashboardService
		.fetchAdminDashboardData(DashboardDataBuilder.getTokenPayLoadDetailsUser());
    }

    @Test()
    @DisplayName("test fetchAdminDashboardDataUser")
    public void fetchAdminDashboardDataAdmin() {
	when(adminDetailsRepository.findById(Mockito.any()))
		.thenReturn(Optional.of(DashboardDataBuilder.getAdminDetails()));
	when(adminDetailsRepository.findByDeletedAndIdNot(Mockito.anyBoolean(), Mockito.any()))
		.thenReturn(DashboardDataBuilder.getAdminDetailsList());
	when(authenticationRepository.findRecentToken(Mockito.any(), Mockito.any(Pageable.class)))
		.thenReturn(DashboardDataBuilder.getAuthenticationAuditingDetails());
	AdminDashboardResponse response = dashboardService
		.fetchAdminDashboardData(DashboardDataBuilder.getTokenPayLoadDetailsAdmin());
    }

    @Test()
    @DisplayName("test getAdmin")
    public void getAdmin() {
	when(adminDetailsRepository.findByAdminIdAndStatusAndDeleted(Mockito.any(), Mockito.any(),
		Mockito.anyBoolean())).thenReturn(Optional.of(DashboardDataBuilder.getAdminDetails()));
	AdminDetails response = dashboardService.getAdmin("test-adminId");
	assertEquals("test-fullName", response.getFullName());
    }

    @Test(expected = BadRequestException.class)
    @DisplayName("test fetchUserStatistics")
    public void fetchUserStatisticsEx() {
	when(clientOnboardingRepository.findById(Mockito.any()))
		.thenReturn(Optional.of(DashboardDataBuilder.getClientOnboardDetails()));
	/*
	 * when(clientOnboardingRepository.findByClientId(Mockito.any()))
	 * .thenReturn(Optional.of(DashboardDataBuilder.getClientOnboardDetails()));
	 */
	UserStatisticsResponse response = dashboardService
		.fetchUserStatistics(DashboardDataBuilder.getUserStatisticsModel());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test fetchUserStatistics")
    public void fetchUserStatistics() {
	Map<String, Object> users = new HashMap<>();
	users.put("results", UserDataBuilder.getUsersList());
	Document doc = new Document(users);
	AggregationResults<Object> data = new AggregationResults(UserDataBuilder.getUsersList(), doc);
	/*
	 * when(mongoTemplate.aggregate(Mockito.any(), Mockito.anyString(),
	 * Mockito.any())).thenReturn(data);
	 * when(clientOnboardingRepository.findById(Mockito.any()))
	 * .thenReturn(Optional.of(DashboardDataBuilder.getClientOnboardDetails()));
	 * when(clientOnboardingRepository.findByClientId(Mockito.any()))
	 * .thenReturn(Optional.of(DashboardDataBuilder.getClientOnboardDetails()));
	 */
	UserStatisticsResponse response = dashboardService
		.fetchUserStatistics(DashboardDataBuilder.getUserStatisticsModel());
    }

}
