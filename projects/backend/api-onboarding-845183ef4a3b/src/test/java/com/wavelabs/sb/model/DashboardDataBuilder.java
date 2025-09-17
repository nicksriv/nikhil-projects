package com.wavelabs.sb.model;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.*;
import com.wavelabs.sb.enums.Gender;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.response.*;
import org.bson.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.util.*;

public class DashboardDataBuilder {

    public static TokenPayLoadDetails getTokenPayLoadDetails() {
	TokenPayLoadDetails tokenPayLoadDetails = new TokenPayLoadDetails();
	tokenPayLoadDetails.setTypeOfUser(Constants.CLIENT);
	tokenPayLoadDetails.setId("test-id");
	tokenPayLoadDetails.setClientId("test-clientId");
	tokenPayLoadDetails.setAdminId("test-adminId");
	tokenPayLoadDetails.setFirstName("test-firstName");
	tokenPayLoadDetails.setUserRole("test-userRole");
	return tokenPayLoadDetails;
    }

    public static TokenPayLoadDetails getTokenPayLoadDetailsClient() {
	TokenPayLoadDetails tokenPayLoadDetails = new TokenPayLoadDetails();
	tokenPayLoadDetails.setTypeOfUser(Constants.CLIENT);
	tokenPayLoadDetails.setId("test-id");
	tokenPayLoadDetails.setClientId("test-clientId");
	tokenPayLoadDetails.setAdminId("test-adminId");
	tokenPayLoadDetails.setFirstName("test-firstName");
	tokenPayLoadDetails.setUserRole("test-userRole");
	return tokenPayLoadDetails;
    }

    public static TokenPayLoadDetails getTokenPayLoadDetailsUser() {
	TokenPayLoadDetails tokenPayLoadDetails = new TokenPayLoadDetails();
	tokenPayLoadDetails.setTypeOfUser(Constants.USER);
	tokenPayLoadDetails.setId("test-id");
	tokenPayLoadDetails.setClientId("test-clientId");
	tokenPayLoadDetails.setAdminId("test-adminId");
	tokenPayLoadDetails.setFirstName("test-firstName");
	tokenPayLoadDetails.setUserRole("test-userRole");
	return tokenPayLoadDetails;
    }

    public static ResponseEntity<UserDashboardResponse> getUserDashboardResponse() {
	UserDashboardResponse userDashboardResponse = new UserDashboardResponse();
	List<ModulesInfo> modulesInfoList = new ArrayList<>();
	ModulesInfo modulesInfo = new ModulesInfo();
	modulesInfo.setName("test-name");
	modulesInfo.setIconId("test-iconid");
	modulesInfo.setIconMobile("test-iconMobile");
	modulesInfo.setSubModulesCount(10l);
	modulesInfoList.add(modulesInfo);
	userDashboardResponse.setModules(modulesInfoList);
	List<ChartInfo> chartInfoList = new ArrayList<>();
	ChartInfo chartInfo = new ChartInfo();
	chartInfo.setId("chartId");
	chartInfo.setName("chartName");
	chartInfo.setType("chartType");
	chartInfoList.add(chartInfo);
	userDashboardResponse.setCharts(chartInfoList);
	LoginInfo loginInfo = new LoginInfo();
	loginInfo.setBrowser("test-browser");
	loginInfo.setIp("test-ip");
	loginInfo.setTime("test-time");
	userDashboardResponse.setLogin(loginInfo);
	ReportingOrTeamInfo reportingOrTeamInfo = new ReportingOrTeamInfo();
	reportingOrTeamInfo.setProfileid("test-profileId");
	reportingOrTeamInfo.setEmployeId("test-employeeId");
	reportingOrTeamInfo.setName("test-name");
	userDashboardResponse.setReporting(reportingOrTeamInfo);
	return ResponseEntity.ok(userDashboardResponse);
    }

    public static UserDashboardResponse getUserDashboardResponseWithoutResponseEntity() {
	UserDashboardResponse userDashboardResponse = new UserDashboardResponse();
	List<ModulesInfo> modulesInfoList = new ArrayList<>();
	ModulesInfo modulesInfo = new ModulesInfo();
	modulesInfo.setName("test-name");
	modulesInfo.setIconId("test-iconid");
	modulesInfo.setIconMobile("test-iconMobile");
	modulesInfo.setSubModulesCount(10l);
	modulesInfoList.add(modulesInfo);
	userDashboardResponse.setModules(modulesInfoList);
	List<ChartInfo> chartInfoList = new ArrayList<>();
	ChartInfo chartInfo = new ChartInfo();
	chartInfo.setId("chartId");
	chartInfo.setName("chartName");
	chartInfo.setType("chartType");
	chartInfoList.add(chartInfo);
	userDashboardResponse.setCharts(chartInfoList);
	LoginInfo loginInfo = new LoginInfo();
	loginInfo.setBrowser("test-browser");
	loginInfo.setIp("test-ip");
	loginInfo.setTime("test-time");
	userDashboardResponse.setLogin(loginInfo);
	ReportingOrTeamInfo reportingOrTeamInfo = new ReportingOrTeamInfo();
	reportingOrTeamInfo.setProfileid("test-profileId");
	reportingOrTeamInfo.setEmployeId("test-employeeId");
	reportingOrTeamInfo.setName("test-name");
	userDashboardResponse.setReporting(reportingOrTeamInfo);
	return userDashboardResponse;
    }

    public static ResponseEntity<AdminDashboardResponse> getAdminDashboardResponse() {
	AdminDashboardResponse adminDashboardResponse = new AdminDashboardResponse();
	List<ModulesInfo> modulesInfoList = new ArrayList<>();
	ModulesInfo modulesInfo = new ModulesInfo();
	modulesInfo.setName("test-name");
	modulesInfo.setIconId("test-iconid");
	modulesInfo.setIconMobile("test-iconMobile");
	modulesInfo.setSubModulesCount(10l);
	modulesInfoList.add(modulesInfo);
	adminDashboardResponse.setModules(modulesInfoList);

	LoginInfo loginInfo = new LoginInfo();
	loginInfo.setBrowser("test-browser");
	loginInfo.setIp("test-ip");
	loginInfo.setTime("test-time");
	adminDashboardResponse.setLogin(loginInfo);

	return ResponseEntity.ok(adminDashboardResponse);
    }

    public static SuccessResponse getTestSuccessResponse() {
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId("test-id");
	successResponse.setMessage(Constants.FILE_UPLOADED_SUCCESSFULLY);
	return successResponse;
    }

    public static AdminDetails getAdminDetails() {
	AdminDetails adminDetails = new AdminDetails();
	AdminCredentials adminCredentials = new AdminCredentials();
	adminCredentials.setAdminId("test-adminId");
	adminCredentials.setPassword("test-password");
	adminDetails.setId("test-id");
	adminDetails.setAdminId("test-adminId");
	adminDetails.setAddress("test-hyd");
	adminDetails.setCity("test-city");
	adminDetails.setArea("test-area");
	adminDetails.setGender(Gender.MALE);
	adminDetails.setState("test-state");
	adminDetails.setFullName("test-fullName");
	adminDetails.setMobile("1234567890");
	adminDetails.setAdminCredentials(adminCredentials);
	return adminDetails;
    }

    public static List<String> getRoles() {
	List<String> roleIds = new ArrayList<>();
	roleIds.add("test-id");
	roleIds.add("id2");
	roleIds.add("id3");
	return roleIds;
    }

    public static ClientOnboardingDetails getClientOnboardDetails() {
	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setStatus(Status.ACTIVE);
	Modules module = new Modules();
	module.setId("test-id");
	module.setName("Some Module Name");

	List<Modules> moduleList = new ArrayList<Modules>();
	moduleList.add(module);
	clientOnboardingDetails.setModules(moduleList);
	clientOnboardingDetails.setClientId("test-clientId");
	return clientOnboardingDetails;
    }

    public static ResponseEntity<UserStatisticsResponse> getUserStatisticsResponse() {
	UserStatisticsResponse userStatisticsResponse = new UserStatisticsResponse();
	List<UserStatisticsChart> chartInfoList = new ArrayList<>();
	UserStatisticsChart chartInfo = new UserStatisticsChart();
	chartInfo.setxAxis("test-xaxis");
	chartInfo.setyAxis(10l);
	chartInfoList.add(chartInfo);
	userStatisticsResponse.setCharts(chartInfoList);
	userStatisticsResponse.setClientId("test-clientId");
	userStatisticsResponse.setId("test-id");
	return ResponseEntity.ok(userStatisticsResponse);
    }

    public static Users getUsers() {
	Users user = new Users();
	user.setFirstname("test-firstName");
	user.setUserId("test-userId");
	user.setClientId("test-clientId");
	List<RoleOnboardingDetails> roleOnboardingDetailsList = new ArrayList<>();
	RoleOnboardingDetails roleOnboardingDetails = new RoleOnboardingDetails();
	roleOnboardingDetails.setDeleted(false);
	roleOnboardingDetails.setRole("test-role");
	roleOnboardingDetails.setId("test-id");
	user.setRoles(roleOnboardingDetailsList);
	List<String> locationsList = new ArrayList<>();
	locationsList.add("hyd");
	locationsList.add("mumbai");
	user.setLocations(locationsList);
	user.setReportingManagerId("test-reportingManagerId");
	return user;
    }

    public static Page<AuthenticationAuditingDetails> getAuthenticationAuditingDetails() {
	List<AuthenticationAuditingDetails> authenticationAuditingDetailsList = new ArrayList<>();
	AuthenticationAuditingDetails authenticationAuditingDetails = new AuthenticationAuditingDetails();
	authenticationAuditingDetails.setId("test-id");
	authenticationAuditingDetails.setStatus(Status.ACTIVE);
	authenticationAuditingDetails.setTypeOfUser("test-typeOfuser");
	authenticationAuditingDetails.setLoginAt(Instant.now());
	AuthenticationAuditingDetails authenticationAuditingDetails2 = new AuthenticationAuditingDetails();
	authenticationAuditingDetails2.setId("test-id");
	authenticationAuditingDetails2.setStatus(Status.ACTIVE);
	authenticationAuditingDetails2.setTypeOfUser("test-typeOfuser");
	authenticationAuditingDetails2.setLoginAt(Instant.now());
	authenticationAuditingDetailsList.add(authenticationAuditingDetails);
	authenticationAuditingDetailsList.add(authenticationAuditingDetails2);
	Page<AuthenticationAuditingDetails> pagedResponse = new PageImpl<>(authenticationAuditingDetailsList);
	return pagedResponse;
    }


    public static List<Users> getUsersList() {
	Users user = new Users();
	user.setFirstname("test-firstName");
	user.setUserId("test-userId");
	user.setClientId("test-clientId");
	List<RoleOnboardingDetails> roleOnboardingDetailsList = new ArrayList<>();
	RoleOnboardingDetails roleOnboardingDetails = new RoleOnboardingDetails();
	roleOnboardingDetails.setDeleted(false);
	roleOnboardingDetails.setRole("test-role");
	roleOnboardingDetails.setId("test-id");
	user.setRoles(roleOnboardingDetailsList);
	List<String> locationsList = new ArrayList<>();
	locationsList.add("hyd");
	locationsList.add("mumbai");
	user.setLocations(locationsList);
	user.setReportingManagerId("test-reportingManagerId");
	List<Users> userList = new ArrayList<>();
	userList.add(user);
	return userList;
    }

    public static RoleOnboardingDetails getRoleOnboardingDetails() {
	RoleOnboardingDetails roleOnboardingDetails = new RoleOnboardingDetails();
	roleOnboardingDetails.setId("61e65ca228fba1213998362c");
	roleOnboardingDetails.setRole("test-role");
	roleOnboardingDetails.setStatus(Status.ACTIVE);
	roleOnboardingDetails.setClientId("test-clientId");
	List<RoleModules> roleModuleList = new ArrayList<>();
	RoleModules roleModules = new RoleModules();
	roleModules.setName("test-roleModuleName");
	roleModules.setStatus(Status.ACTIVE);
	roleModules.setName("test-name");
	roleModuleList.add(roleModules);
	roleOnboardingDetails.setModule(roleModuleList);
	return roleOnboardingDetails;
    }

    public static List<AdminDetails> getAdminDetailsList() {
	AdminDetails adminDetails = new AdminDetails();
	AdminCredentials adminCredentials = new AdminCredentials();
	adminCredentials.setAdminId("test-adminId");
	adminCredentials.setPassword("test-password");
	adminDetails.setId("test-id");
	adminDetails.setAdminId("test-adminId");
	adminDetails.setAddress("test-hyd");
	adminDetails.setCity("test-city");
	adminDetails.setArea("test-area");
	adminDetails.setGender(Gender.MALE);
	adminDetails.setState("test-state");
	adminDetails.setFullName("test-fullName");
	adminDetails.setMobile("1234567890");
	adminDetails.setAdminCredentials(adminCredentials);
	List<AdminDetails> adminDetailsList = new ArrayList<>();
	adminDetailsList.add(adminDetails);
	return adminDetailsList;
    }

    public static TokenPayLoadDetails getTokenPayLoadDetailsAdmin() {
	TokenPayLoadDetails tokenPayLoadDetails = new TokenPayLoadDetails();
	tokenPayLoadDetails.setTypeOfUser(Constants.ADMIN);
	tokenPayLoadDetails.setId("test-id");
	tokenPayLoadDetails.setClientId("test-clientId");
	tokenPayLoadDetails.setAdminId("test-adminId");
	tokenPayLoadDetails.setFirstName("test-firstName");
	tokenPayLoadDetails.setUserRole("test-userRole");
	return tokenPayLoadDetails;
    }

    public static UserStatisticsModel getUserStatisticsModel() {
	UserStatisticsModel userStatisticsModel = new UserStatisticsModel();
	userStatisticsModel.setClientId("test-clientId");
	userStatisticsModel.setDetails(getTokenPayLoadDetailsAdmin());
	return userStatisticsModel;
    }

    public static AggregationResults<Users> getAggregationResults() {

	Document rawResults = new Document();
	List<Users> users = new ArrayList<>();
	Users user = new Users();
	user.setUserId("test-id");
	users.add(user);
	AggregationResults<Users> ausers = new AggregationResults<>(users, rawResults);
	return ausers;
    }
}
