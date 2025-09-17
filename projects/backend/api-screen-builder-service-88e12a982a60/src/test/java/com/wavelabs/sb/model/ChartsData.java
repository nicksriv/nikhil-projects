package com.wavelabs.sb.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;

import org.bson.types.ObjectId;

import com.wavelabs.sb.documents.ChartDetails;
import com.wavelabs.sb.documents.CustomColumns;
import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.documents.RoleModules;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.ScreenFields;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Operations;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.ChartsPriorityRequest;
import com.wavelabs.sb.request.CreateChartRequest;
import com.wavelabs.sb.request.CustomOperation;
import com.wavelabs.sb.request.UpdateChartRequest;
import com.wavelabs.sb.response.AxisInfo;
import com.wavelabs.sb.response.ChartsResponse;
import com.wavelabs.sb.response.FetchChartResponse;
import com.wavelabs.sb.response.ListResponse;
import com.wavelabs.sb.response.ModuleChartsResponse;

public class ChartsData {

    public static List<String> getFilters() {
	List<String> nameFilters = new ArrayList<>();
	nameFilters.add("filterone");
	nameFilters.add("SecondFilter");
	return nameFilters;
    }

    public static CreateChartModel getChartData() {
	CreateChartModel createChartModel = new CreateChartModel();

	createChartModel.setCreateChartRequest(getCreateChartRequest());
	createChartModel.setTokenPayLoadDetails(getTokenPayLoadDetails());

	return createChartModel;
    }

    public static TokenPayLoadDetails getTokenPayLoadDetails() {
	TokenPayLoadDetails tokenPayLoadDetails = new TokenPayLoadDetails();
	tokenPayLoadDetails.setAdminId("AdminId");
	tokenPayLoadDetails.setClientId("ClietId");
	tokenPayLoadDetails.setClientSystemId("622721821fbfa67babf797d6");
	tokenPayLoadDetails.setId("7716F");
	tokenPayLoadDetails.setLastName("Chilagani");
	tokenPayLoadDetails.setTypeOfUser("User");

	tokenPayLoadDetails.setUserId("TT71");
	tokenPayLoadDetails.setUserRole("Admin");
	return tokenPayLoadDetails;
    }

    public static CreateChartRequest getCreateChartRequest() {
	CreateChartRequest createChartRequest = new CreateChartRequest();

	List<String> nameFilters = new ArrayList<>();
	nameFilters.add("filterone");
	nameFilters.add("SecondFilter");
	createChartRequest.setFilters(nameFilters);
	createChartRequest.setName("Chartone");
	createChartRequest.setReportConfigurationId("62272");
	createChartRequest.setShowOnDesktop(false);
	createChartRequest.setSwitchRowsAndcolumns(false);
	createChartRequest.setType("normaltype");
	createChartRequest.setxAxis("100");
	createChartRequest.setyAxis("20");
	return createChartRequest;

    }

    public static UpdateChartRequest getUpdateChartRequest() {
	List<String> nameFilters = new ArrayList<>();
	nameFilters.add("filterone");
	nameFilters.add("SecondFilter");
	UpdateChartRequest updateChartRequest = new UpdateChartRequest();
	updateChartRequest.setFilters(getFilters());

	updateChartRequest.setName("Chartwo");
	updateChartRequest.setShowOnDesktop(false);
	updateChartRequest.setSwitchRowsAndcolumns(false);
	updateChartRequest.setType("Ordinarytype");
	updateChartRequest.setxAxis("200");
	updateChartRequest.setyAxis("20");
	return updateChartRequest;

    }

    public static ListResponse<ChartsDataModel> getDataOfChatResponse() {

	ChartsDataModel chartsDataModel = new ChartsDataModel();
	chartsDataModel.setFilters(getFilters());
	chartsDataModel.setName("Ganesh");
	chartsDataModel.setShowOnDesktop(false);
	chartsDataModel.setSwitchRowsAndColumns(false);
	chartsDataModel.setType("Circle");
	chartsDataModel.setxAxis(getAxis());
	chartsDataModel.setyAxis(getAxis());
	List<ChartsDataModel> listOfChartsModel = new ArrayList<>();
	listOfChartsModel.add(chartsDataModel);

	ChartsDataModel chartsDataModel1 = new ChartsDataModel();
	chartsDataModel1.setFilters(getFilters());
	chartsDataModel1.setName("Giri");
	chartsDataModel1.setShowOnDesktop(false);
	chartsDataModel1.setSwitchRowsAndColumns(false);
	chartsDataModel1.setType("Table");
	chartsDataModel.setxAxis(getAxis());
	chartsDataModel.setyAxis(getAxis());
	List<ChartsDataModel> listOfChartsModel1 = new ArrayList<>();
	listOfChartsModel1.add(chartsDataModel1);

	ListResponse<ChartsDataModel> chartDataModel = new ListResponse<>();

	chartDataModel.setData(listOfChartsModel1);
	chartDataModel.setSize(12);
	chartDataModel.setMessage("message");

	return chartDataModel;
    }

    private static AxisInfo getAxis() {
	AxisInfo info = new AxisInfo();
	info.setComponentId("ComponentId");
	info.setHint("Hint");
	return info;
    }

    public static FetchChartResponse getFetchChatResponse() {
	FetchChartResponse fetchChartResponse = new FetchChartResponse();
	fetchChartResponse.setFilters(getFilters());
	fetchChartResponse.setName("Harish");
	fetchChartResponse.setShowOnDesktop(false);
	fetchChartResponse.setSwitchRowsAndColumns(false);
	fetchChartResponse.setType("Flat");
	fetchChartResponse.setxAxis(getAxis());
	fetchChartResponse.setyAxis(getAxis());
	return fetchChartResponse;
    }

    public static List<ReportConfigurations> giveListReportConfigurations() {
	List<ReportConfigurations> list = new ArrayList<>();
	List<CustomColumns> listCustomColumns = new ArrayList<>();
	CustomColumns customColumns = new CustomColumns();
	com.wavelabs.sb.documents.CustomOperation customOperation = new com.wavelabs.sb.documents.CustomOperation();
	customOperation.setColumn("Firstcolumn");
	customOperation.setReference("oneA");
	customOperation.setSubModule("PickUp");

	customColumns.setId("G1");
	customColumns.setFirst(customOperation);

	com.wavelabs.sb.documents.CustomOperation customOperation1 = new com.wavelabs.sb.documents.CustomOperation();
	customOperation1.setColumn("Secondcolumn");
	customOperation1.setReference("oneB");
	customOperation1.setSubModule("PickUp");
	customColumns.setSecond(customOperation1);
	customColumns.setOperation(Operations.ADDITION);

	listCustomColumns.add(customColumns);
	ReportConfigurations reportConfigurations = new ReportConfigurations();
	reportConfigurations.setClientId("ClientId");
	reportConfigurations.setCreatedAt(Instant.now());
	reportConfigurations.setCreatedBy("Ram");
	reportConfigurations.setCustomColumns(listCustomColumns);
	reportConfigurations.setDeleted(false);
	reportConfigurations.setFilters(getFilters());
	reportConfigurations.setIcon("Mango Logo");
	reportConfigurations.setId("dumy");
	reportConfigurations.setModifiedAt(Instant.now());
	reportConfigurations.setModifiedBy("Dinesh");
	reportConfigurations.setModule(ScreenBuilderData.getModule());
	reportConfigurations.setName("Firoj");
	reportConfigurations.setRoles(ScreenBuilderData.getRoleDetails());
	reportConfigurations.setStatus(Status.ACTIVE);
	reportConfigurations.setSubModules(ScreenBuilderData.getSubmodulesList());
	list.add(reportConfigurations);

	return list;

    }

    public static ReportConfigurations getReportConfigurations() {

	List<CustomColumns> listCustomColumns = new ArrayList<>();
	CustomColumns customColumns = new CustomColumns();
	com.wavelabs.sb.documents.CustomOperation customOperation = new com.wavelabs.sb.documents.CustomOperation();
	customOperation.setColumn("Firstcolumn");
	customOperation.setReference("oneA");
	customOperation.setSubModule("PickUp");

	customColumns.setId("G1");
	customColumns.setFirst(customOperation);

	com.wavelabs.sb.documents.CustomOperation customOperation1 = new com.wavelabs.sb.documents.CustomOperation();
	customOperation1.setColumn("Secondcolumn");
	customOperation1.setReference("oneB");
	customOperation1.setSubModule("PickUp");
	customColumns.setSecond(customOperation1);
	customColumns.setOperation(Operations.ADDITION);

	listCustomColumns.add(customColumns);
	ReportConfigurations reportConfigurations = new ReportConfigurations();
	reportConfigurations.setClientId("ClientId");
	reportConfigurations.setCreatedAt(Instant.now());
	reportConfigurations.setCreatedBy("Ram");
	reportConfigurations.setCustomColumns(listCustomColumns);
	reportConfigurations.setDeleted(false);
	reportConfigurations.setFilters(getFilters());
	reportConfigurations.setIcon("Mango Logo");
	reportConfigurations.setId("1A");
	reportConfigurations.setModifiedAt(Instant.now());
	reportConfigurations.setModifiedBy("Dinesh");
	reportConfigurations.setModule(ScreenBuilderData.getModule());
	reportConfigurations.setName("Firoj");
	reportConfigurations.setRoles(ScreenBuilderData.getRoleDetails());
	reportConfigurations.setStatus(Status.ACTIVE);
	reportConfigurations.setSubModules(ScreenBuilderData.getSubmodulesList());
	return reportConfigurations;

    }

    public static List<ScreenFields> getScreenFields() {
	List<ScreenFields> fields = new ArrayList<>();
	ScreenFields field = new ScreenFields();
	field.setClientId("clientId");
	field.setComponentHint("component hint");
	field.setComponentId("Secondcolumn");
	field.setComponentType("component Type");
	field.setModuleId("moduleId");
	field.setSubModuleId("subModuleId");

	ScreenFields field2 = new ScreenFields();
	field2.setClientId("clientId");
	field2.setComponentHint("component hint");
	field2.setComponentId("Firstcolumn");
	field2.setComponentType("component Type");
	field2.setModuleId("moduleId");
	field2.setSubModuleId("subModuleId");
	fields.add(field);
	fields.add(field2);
	return fields;
    }

    public static ReportConfigurations getReportConfigurationsWithNullModule() {
	ReportConfigurations reportConfigurations = new ReportConfigurations();
	reportConfigurations.setClientId("ClientId");
	reportConfigurations.setCreatedAt(Instant.now());
	reportConfigurations.setCreatedBy("Ram");
	reportConfigurations.setClientId("ClientId");
	reportConfigurations.setCreatedAt(Instant.now());
	reportConfigurations.setCreatedBy("Ram");
	List<CustomColumns> listCustomColumns = new ArrayList<>();
	CustomColumns customColumns = new CustomColumns();
	CustomOperation customOperation = new CustomOperation();
	customOperation.setColumn("Firstcolumn");
	customOperation.setReference("oneA");
	customOperation.setSubModule("showing");

	customColumns.setId("G1");
	CustomOperation customOperation1 = new CustomOperation();
	customOperation1.setColumn("Secindcolumn");
	customOperation1.setReference("oneB");
	customOperation1.setSubModule("PickUp");

	customColumns.setOperation(Operations.ADDITION);
	listCustomColumns.add(customColumns);
	reportConfigurations.setCustomColumns(listCustomColumns);
	reportConfigurations.setDeleted(false);
	reportConfigurations.setFilters(getFilters());
	reportConfigurations.setIcon("Mango Logo");
	reportConfigurations.setId("1A");

	reportConfigurations.setModifiedAt(Instant.now());
	reportConfigurations.setModifiedBy("Dinesh");
	reportConfigurations.setModule(null);
	reportConfigurations.setName("Firoj");
	reportConfigurations.setRoles(ScreenBuilderData.getRoleDetails());
	reportConfigurations.setStatus(Status.ACTIVE);
	reportConfigurations.setSubModules(ScreenBuilderData.getSubmodulesList());
	return reportConfigurations;

    }

    public static ReportConfigurations getNotRepeatedReportConfigurations() {
	ReportConfigurations reportConfigurations = new ReportConfigurations();
	reportConfigurations.setClientId("ClientId1");
	reportConfigurations.setCreatedAt(Instant.now());
	reportConfigurations.setCreatedBy("Revathi");
	List<CustomColumns> listCustomColumns = new ArrayList<>();
	CustomColumns customColumns = new CustomColumns();

	com.wavelabs.sb.documents.CustomOperation customOperation = new com.wavelabs.sb.documents.CustomOperation();
	customOperation.setColumn("FouthColumn");
	customOperation.setReference("oneC");
	customOperation.setSubModule("Writing");
	customOperation.setUuid("619736d5bd7ff36606ea8e93");

	customColumns.setId("G2");
	com.wavelabs.sb.documents.CustomOperation customOperation1 = new com.wavelabs.sb.documents.CustomOperation();

	customOperation1.setColumn("Fifthcolumn");
	customOperation1.setReference("oneC");
	customOperation1.setSubModule("Calling");
	customOperation1.setUuid("619736d5bd7ff36606ba8e93");

	customColumns.setOperation(Operations.ADDITION);
	customColumns.setFirst(customOperation);
	customColumns.setSecond(customOperation1);
	customColumns.setName("Jwala");

	listCustomColumns.add(customColumns);
	reportConfigurations.setCustomColumns(listCustomColumns);
	reportConfigurations.setDeleted(false);
	reportConfigurations.setFilters(getFilters());
	reportConfigurations.setIcon("Star Logo");
	reportConfigurations.setId("1B");

	reportConfigurations.setModifiedAt(Instant.now());
	reportConfigurations.setModifiedBy("Faima");
	reportConfigurations.setModule(ScreenBuilderData.getModule());
	reportConfigurations.setName("Pradeep");
	reportConfigurations.setRoles(ScreenBuilderData.getRoleDetails());
	reportConfigurations.setStatus(Status.ACTIVE);
	reportConfigurations.setSubModules(ScreenBuilderData.getSubmodulesList());
	return reportConfigurations;

    }

    public static ChartDetails getChartDetails() {
	ChartDetails chartDetails = new ChartDetails();
	chartDetails.setClientId("ClientId");
	chartDetails.setCreatedAt(Instant.now());
	chartDetails.setCreatedBy("Sukesh");
	chartDetails.setDeleted(false);
	chartDetails.setDesktop(true);
	chartDetails.setFilters(getFilters());
	chartDetails.setId("IdB");
	chartDetails.setModifiedAt(Instant.now());
	chartDetails.setModifiedBy("Junaid");
	chartDetails.setName("Ram");
	chartDetails.setReportId("ReportId");
	chartDetails.setRowColumn(false);
	chartDetails.setStatus(Status.ACTIVE);
	chartDetails.setType("Rectangle");
	chartDetails.setxAxis("66");
	chartDetails.setyAxis("22");
	return chartDetails;
    }

    public static ChartDetails getChartDetails2() {
	ChartDetails chartDetails = new ChartDetails();
	chartDetails.setClientId("ClientId");
	chartDetails.setCreatedAt(Instant.now());
	chartDetails.setCreatedBy("Sukesh");
	chartDetails.setDeleted(false);
	chartDetails.setDesktop(false);
	chartDetails.setFilters(getFilters());
	chartDetails.setId("1A");
	chartDetails.setModifiedAt(Instant.now());
	chartDetails.setModifiedBy("Junaid");
	chartDetails.setName("Ram");
	chartDetails.setReportId("ReportId");
	chartDetails.setRowColumn(false);
	chartDetails.setStatus(Status.ACTIVE);
	chartDetails.setType("Rectangle");
	chartDetails.setxAxis("66");
	chartDetails.setyAxis("22");
	return chartDetails;
    }

    public static ChartDetails getChartDetails1() {
	ChartDetails chartDetails = new ChartDetails();
	chartDetails.setClientId("ClientId");
	chartDetails.setCreatedAt(Instant.now());
	chartDetails.setCreatedBy("Suresh");
	chartDetails.setDeleted(false);
	chartDetails.setDesktop(false);
	chartDetails.setFilters(getFilters());
	chartDetails.setId("IdB");
	chartDetails.setModifiedAt(Instant.now());
	chartDetails.setModifiedBy("Jalaja");
	chartDetails.setName("Rahim");
	chartDetails.setReportId("ReportId");
	chartDetails.setRowColumn(false);
	chartDetails.setStatus(Status.ACTIVE);
	chartDetails.setType("Rectangle");
	chartDetails.setxAxis("66");
	chartDetails.setyAxis("22");
	return chartDetails;
    }

    public static UpdateChartModel getUpdateChartModel() {
	UpdateChartModel updateChartModel = new UpdateChartModel();
	updateChartModel.setId("1B");

	updateChartModel.setTokenPayLoadDetails(getTokenPayLoadDetails());
	updateChartModel.setUpdateChartRequest(getUpdateChartRequest());
	return updateChartModel;
    }

    public static CreateChartModel getChartDataWithANullValue() {
	CreateChartModel createChartModel = new CreateChartModel();

	CreateChartRequest createChartRequest = new CreateChartRequest();

	List<String> nameFilters = new ArrayList<>();
	nameFilters.add("filterone");
	nameFilters.add("SecondFilter");
	createChartRequest.setFilters(nameFilters);
	createChartRequest.setName("Chartone");
	createChartRequest.setReportConfigurationId(null);
	createChartRequest.setShowOnDesktop(false);
	createChartRequest.setSwitchRowsAndcolumns(false);
	createChartRequest.setType("normaltype");
	createChartRequest.setxAxis("100");
	createChartRequest.setyAxis("20");
	createChartModel.setCreateChartRequest(getCreateChartRequest());
	createChartModel.setTokenPayLoadDetails(getTokenPayLoadDetails());

	return createChartModel;
    }

    public static UpdateChartModel getUpdateChartModelWithAdingToObject() {
	UpdateChartModel updateChartModel = new UpdateChartModel();
	updateChartModel.setId("1C");
	List<String> nameFilters = new ArrayList<>();
	nameFilters.add("filterone");
	nameFilters.add("SecondFilter");
	UpdateChartRequest updateChartRequest = new UpdateChartRequest();
	updateChartRequest.setFilters(getFilters());

	updateChartRequest.setName("Charthree");
	updateChartRequest.setShowOnDesktop(false);
	updateChartRequest.setSwitchRowsAndcolumns(false);
	updateChartRequest.setType("NotOrdinarytype");
	updateChartRequest.setxAxis("207");
	updateChartRequest.setyAxis("10");

	updateChartModel.setTokenPayLoadDetails(getTokenPayLoadDetails());
	updateChartModel.setUpdateChartRequest(updateChartRequest);
	return updateChartModel;
    }

    public static List<ChartDetails> listOfChartDetails() {
	List<ChartDetails> listOfCharts = new ArrayList<>();
	listOfCharts.add(getChartDetails());
	return listOfCharts;
    }

    public static ChartsResponse ChartResponseChartDetails() {
	ChartsResponse listOfCharts = new ChartsResponse();

	listOfCharts.setCharts(ReportsDataBuilder.getFetchReportsHashtable());
	ChartDetails chartDetails = new ChartDetails();
	chartDetails.setClientId("ClientId1");
	chartDetails.setCreatedAt(Instant.now());
	chartDetails.setCreatedBy("Suresh");
	chartDetails.setDeleted(false);
	chartDetails.setDesktop(false);
	chartDetails.setFilters(getFilters());
	chartDetails.setId("IdC");
	chartDetails.setModifiedAt(Instant.now());
	chartDetails.setModifiedBy("saketh");
	chartDetails.setName("Ramu");
	chartDetails.setReportId("ReportId1");
	chartDetails.setRowColumn(false);
	chartDetails.setStatus(Status.ACTIVE);
	chartDetails.setType("Rectangle");
	chartDetails.setxAxis("66");
	chartDetails.setyAxis("22");
	List<ChartDetails> listofCharts2 = new ArrayList<>();
	listofCharts2.add(chartDetails);

	listOfCharts.setData(listofCharts2);
	listOfCharts.setMessage("ChartResponse");
	return listOfCharts;

    }

    public static List<ReportConfigurations> listOfgetReportConfigurations() {
	List<ReportConfigurations> listOfReportConfigurations = new ArrayList<>();
	listOfReportConfigurations.add(getReportConfigurations());
	return listOfReportConfigurations;
    }

    public static Users getUsers() {
	Users users = new Users();
	users.setAadharNumber("626255558551");
	users.setAddress("KPHB");
	users.setArea("KPHB");
	users.setCity("Hyderabad");
	users.setClientId("clientId");
	users.setCountry("IN");
	users.setCreatedAt(Instant.now());
	users.setDateofBirth(new Date());
	users.setDateOfJoining(new Date());
	users.setDeleted(false);
	users.setFirstname("Vijay");
	users.setLastname("Pitla");
	users.setLocations(new ArrayList<>());
	users.setMiddlename("Kumar");
	users.setModifiedAt(Instant.now());
	users.setOfficialEmail("vijayp@wavelabs.ai");
	users.setPanNumber("AAAAA9999A");
	users.setPersonnelEmail("vijay@gmail.com");
	users.setPersonnelPhoneNumber("9999777743");
	users.setPincode("500076");
	users.setReferedEmployeeRole(null);
	users.setRefferedEmployeeId(null);
	users.setRefferedEmployeeName(null);
	users.setReportingManagerId(null);
	users.setReportingManagerName("AJAY");
	users.setReportingManagerRole(null);
	users.setState("TS");
	users.setStatus(Status.ACTIVE);
	users.setTypeOfEmployment("Full Time");
	users.setUserId("EMP0012");
	users.setId("7716F");
	users.setUserCredentials(getUserCredentials());
	users.setRoles(getRoleOnboardingList());
	return users;

    }

    public static UserCredentials getUserCredentials() {
	UserCredentials userCredentials = new UserCredentials();
	userCredentials.setCreatedAt(Instant.now());
	userCredentials.setId("id");
	userCredentials.setModifiedAt(Instant.now());
	userCredentials.setName("name");
	userCredentials.setPassword("password");
	userCredentials.setUserId("userId");
	return userCredentials;
    }

    public static List<RoleOnboardingDetails> getRoleOnboardingList1() {
	List<RoleOnboardingDetails> rolesList = new ArrayList<>();
	RoleOnboardingDetails details = new RoleOnboardingDetails();
	details.setClientId("clientId");
	List<RoleModules> modules = new ArrayList<>();
	RoleModules module = new RoleModules();
	module.setId("613a080fb75b44660a46a79b");
	module.setName("ModuleName");
	module.setStatus(Status.ACTIVE);
	modules.add(module);
	details.setModule(modules);
	details.setRole("Role");
	details.setDeleted(false);
	details.setId("613a080fb75b44660a46a79b");
	details.setStatus(Status.ACTIVE);
	rolesList.add(details);
	return rolesList;

    }

    public static List<RoleOnboardingDetails> getRoleOnboardingList() {
	List<RoleOnboardingDetails> rolesList = new ArrayList<>();
	RoleOnboardingDetails details = new RoleOnboardingDetails();
	details.setClientId("clientId");
	List<RoleModules> modules = new ArrayList<>();
	RoleModules module = new RoleModules();
	module.setId("moduleId");
	module.setName("ModuleName");
	module.setStatus(Status.ACTIVE);
	modules.add(module);
	details.setModule(modules);
	details.setRole("Role");
	details.setDeleted(false);
	details.setId("613a080fb75b44660a46a79b");
	details.setStatus(Status.ACTIVE);

	RoleOnboardingDetails details1 = new RoleOnboardingDetails();
	details1.setClientId("clientId");
	List<RoleModules> modules1 = new ArrayList<>();
	RoleModules module1 = new RoleModules();
	module1.setId("moduleId1");
	module1.setName("ModuleName");
	module1.setStatus(Status.ACTIVE);
	modules1.add(module1);
	details1.setModule(modules1);
	details1.setRole("Role");
	details1.setDeleted(false);
	details1.setId("613a080fb75b44660a46a79b");
	rolesList.add(details);
	rolesList.add(details1);
	details1.setStatus(Status.ACTIVE);
	return rolesList;
    }

    public static FetchReportChartsByModuleIdModel getFetchReportChartsByModuleIdModel() {
	FetchReportChartsByModuleIdModel fetchReportChartsByModuleIdModel = new FetchReportChartsByModuleIdModel();
	fetchReportChartsByModuleIdModel.setDetails(getTokenPayLoadDetails());
	fetchReportChartsByModuleIdModel.setModuleId("61dc0d2819163b12aff9a3b2");
	return fetchReportChartsByModuleIdModel;
    }

    public static List<ObjectId> getRoleObjectIds() {
	List<ObjectId> objectIds = new ArrayList<>();

	objectIds.add(new ObjectId("61dc0d2819163b12aff9a3b2"));
	return objectIds;
    }

    public static ListResponse<ModuleChartsResponse> getChartResponse() {
	ListResponse<ModuleChartsResponse> chartResponses = new ListResponse<>();

	ModuleChartsResponse moduleChartsResponse = new ModuleChartsResponse();

	moduleChartsResponse.setCharts(ReportsDataBuilder.getFetchReportsHashtable());
	moduleChartsResponse.setFilters(getFilters());
	moduleChartsResponse.setName("Abhi");
	moduleChartsResponse.setPriority(3);
	moduleChartsResponse.setShowOnDesktop(false);
	moduleChartsResponse.setSwitchRowsAndColumns(false);
	moduleChartsResponse.setType("Box");
	moduleChartsResponse.setxAxis(getAxis());
	moduleChartsResponse.setyAxis(getAxis());
	List<ModuleChartsResponse> listModuleChartsResponse = new ArrayList<>();
	listModuleChartsResponse.add(moduleChartsResponse);
	chartResponses.setData(listModuleChartsResponse);
	chartResponses.setMessage("message");
	chartResponses.setSize(22);

	return chartResponses;
    }

    public static ModuleChartsResponse getModuleChartsResponse() {
	ModuleChartsResponse moduleChartsResponse = new ModuleChartsResponse();

	moduleChartsResponse.setFilters(getFilters());
	moduleChartsResponse.setCharts(ReportsDataBuilder.getFetchReportsHashtable());
	moduleChartsResponse.setName("Shyam");
	moduleChartsResponse.setPriority(1);
	moduleChartsResponse.setShowOnDesktop(false);
	moduleChartsResponse.setSwitchRowsAndColumns(false);
	moduleChartsResponse.setType("Table");
	moduleChartsResponse.setxAxis(getAxis());
	moduleChartsResponse.setyAxis(getAxis());

	return moduleChartsResponse;
    }

    public static ListResponse<ModuleChartsResponse> getlistOfResponse() {
	ListResponse<ModuleChartsResponse> listOfModuleChartsResponse = new ListResponse<>();
	List<ModuleChartsResponse> listOfModule = new ArrayList<>();
	listOfModule.add(getModuleChartsResponse());
	listOfModuleChartsResponse.setData(listOfModule);
	listOfModuleChartsResponse.setMessage("message");
	listOfModuleChartsResponse.setSize(1);
	return listOfModuleChartsResponse;

    }

    public static Hashtable<String, List<Hashtable<String, Object>>> giveFetchAllReports() {
	Hashtable<String, List<Hashtable<String, Object>>> AllReports = new Hashtable<>();
	AllReports.put("one", ReportsDataBuilder.getFetchReportsHashtable());
	return AllReports;

    }

    public static Users getUsersData() {
	Users users = new Users();
	users.setAadharNumber("626255558551");
	users.setAddress("KPHB");
	users.setArea("KPHB");
	users.setCity("Hyderabad");
	users.setClientId("clientId");
	users.setCountry("IN");
	users.setCreatedAt(Instant.now());
	users.setDateofBirth(new Date());
	users.setDateOfJoining(new Date());
	users.setDeleted(false);
	users.setFirstname("Vijay");
	users.setLastname("Pitla");
	users.setLocations(new ArrayList<>());
	users.setMiddlename("Kumar");
	users.setModifiedAt(Instant.now());
	users.setOfficialEmail("vijayp@wavelabs.ai");
	users.setPanNumber("AAAAA9999A");
	users.setPersonnelEmail("vijay@gmail.com");
	users.setPersonnelPhoneNumber("9999777743");
	users.setPincode("500076");
	users.setReferedEmployeeRole(null);
	users.setRefferedEmployeeId(null);
	users.setRefferedEmployeeName(null);
	users.setReportingManagerId(null);
	users.setReportingManagerName("AJAY");
	users.setReportingManagerRole(null);
	users.setState("TS");
	users.setStatus(Status.ACTIVE);
	users.setTypeOfEmployment("Full Time");
	users.setUserId("userId");
	users.setId("7716F");
	users.setUserCredentials(getUserCredentials());
	users.setRoles(getRoleOnboardingList());
	return users;

    }

    public static Users getUsersDataWithUserAndClientId() {
	Users users = new Users();
	users.setAadharNumber("626255558551");
	users.setAddress("KPHB");
	users.setArea("KPHB");
	users.setCity("Hyderabad");

	users.setClientId("c");
	users.setCountry("IN");
	users.setCreatedAt(Instant.now());
	users.setDateofBirth(new Date());
	users.setDateOfJoining(new Date());
	users.setDeleted(false);
	users.setFirstname("Vijay");
	users.setLastname("Pitla");
	users.setLocations(new ArrayList<>());
	users.setMiddlename("Kumar");
	users.setModifiedAt(Instant.now());
	users.setOfficialEmail("vijayp@wavelabs.ai");
	users.setPanNumber("AAAAA9999A");
	users.setPersonnelEmail("vijay@gmail.com");
	users.setPersonnelPhoneNumber("9999777743");
	users.setPincode("500076");
	users.setReferedEmployeeRole(null);
	users.setRefferedEmployeeId(null);
	users.setRefferedEmployeeName(null);
	users.setReportingManagerId(null);
	users.setReportingManagerName("AJAY");
	users.setReportingManagerRole(null);
	users.setState("TS");
	users.setStatus(Status.ACTIVE);
	users.setTypeOfEmployment("Full Time");
	users.setDeleted(true);

	users.setUserId("u");
	users.setId("7716F");
	users.setUserCredentials(getUserCredentials());
	users.setRoles(getRoleOnboardingList());
	users.setStatus(Status.INACTIVE);

	return users;

    }

    public static Users getUsers1() {
	Users users = new Users();
	users.setAadharNumber("626255558551");
	users.setAddress("KPHB");
	users.setArea("KPHB");
	users.setCity("Hyderabad");
	users.setClientId("clientId");
	users.setCountry("IN");
	users.setCreatedAt(Instant.now());
	users.setDateofBirth(new Date());
	users.setDateOfJoining(new Date());
	users.setDeleted(false);
	users.setFirstname("Vijay");
	users.setLastname("Pitla");
	users.setLocations(new ArrayList<>());
	users.setMiddlename("Kumar");
	users.setModifiedAt(Instant.now());
	users.setOfficialEmail("vijayp@wavelabs.ai");
	users.setPanNumber("AAAAA9999A");
	users.setPersonnelEmail("vijay@gmail.com");
	users.setPersonnelPhoneNumber("9999777743");
	users.setPincode("500076");
	users.setReferedEmployeeRole(null);
	users.setRefferedEmployeeId(null);
	users.setRefferedEmployeeName(null);
	users.setReportingManagerId(null);
	users.setReportingManagerName("AJAY");
	users.setReportingManagerRole(null);
	users.setState("TS");
	users.setStatus(Status.ACTIVE);
	users.setTypeOfEmployment("Full Time");
	users.setUserId("EMP0012");
	users.setId("614d79f33f1d4026be53d232");
	users.setUserCredentials(getUserCredentials());
	users.setRoles(getRoleOnboardingList1());
	return users;

    }

    public static Users getUsers2() {
	Users users = new Users();
	users.setAadharNumber("626255558551");
	users.setAddress("KPHB");
	users.setArea("KPHB");
	users.setCity("Hyderabad");
	users.setClientId("clientId");
	users.setCountry("IN");
	users.setCreatedAt(Instant.now());
	users.setDateofBirth(new Date());
	users.setDateOfJoining(new Date());
	users.setDeleted(false);
	users.setFirstname("Vijay");
	users.setLastname("Pitla");
	users.setLocations(new ArrayList<>());
	users.setMiddlename("Kumar");
	users.setModifiedAt(Instant.now());
	users.setOfficialEmail("vijayp@wavelabs.ai");
	users.setPanNumber("AAAAA9999A");
	users.setPersonnelEmail("vijay@gmail.com");
	users.setPersonnelPhoneNumber("9999777743");
	users.setPincode("500076");
	users.setReferedEmployeeRole(null);
	users.setRefferedEmployeeId(null);
	users.setRefferedEmployeeName(null);
	users.setReportingManagerId(null);
	users.setReportingManagerName("AJAY");
	users.setReportingManagerRole(null);
	users.setState("TS");
	users.setStatus(Status.ACTIVE);
	users.setTypeOfEmployment("Full Time");
	users.setUserId("EMP0012");
	users.setId("IdOne");
	users.setUserCredentials(getUserCredentials());
	users.setRoles(getRoleOnboardingList1());
	return users;

    }

    public static FetchAllChartsModel getFetchAllChartsModel() {
	FetchAllChartsModel model = new FetchAllChartsModel();
	model.setReportId("614d79f33f1d4026be53d232");
	return model;
    }

    // by me
    public static List<ChartDetails> getChartsDetailsList() {
	List<ChartDetails> detailsList = new ArrayList<>();
	detailsList.add(getChartDetails());
	return detailsList;
    }

    // by me
    public static ChartsPriorityRequestModel getChartsPriorityRequestModel() {
	ChartsPriorityRequestModel model = new ChartsPriorityRequestModel();
	ChartsPriorityRequest request = new ChartsPriorityRequest();
	request.setChartId("IdB");
	request.setPriority(0);
	ChartsPriorityRequest request1 = new ChartsPriorityRequest();
	request1.setChartId("IdB");
	request1.setPriority(1);
	List<ChartsPriorityRequest> listRequests = new ArrayList<>();
	listRequests.add(request1);
	listRequests.add(request1);
	model.setDetails(getTokenPayLoadDetails());
	model.setReportId("1A");
	model.setRequest(listRequests);
	return model;
    }

    public static ChartsPriorityRequestModel getChartsPriorityRequestModelWithRequestNull() {
	ChartsPriorityRequestModel model = new ChartsPriorityRequestModel();

	model.setDetails(getTokenPayLoadDetails());
	model.setReportId("1A");
	model.setRequest(null);
	return model;
    }

    public static ChartsPriorityRequestModel getChartsPriorityRequestModelWithRequestWithUnmatchedIds() {
	ChartsPriorityRequestModel model = new ChartsPriorityRequestModel();
	ChartsPriorityRequest request1 = new ChartsPriorityRequest();
	request1.setChartId("ChartId");
	request1.setPriority(1);
	ChartsPriorityRequest requests = new ChartsPriorityRequest();
	request1.setChartId("IdB2");
	request1.setPriority(1);
	List<ChartsPriorityRequest> listRequests = new ArrayList<>();
	listRequests.add(request1);
	listRequests.add(requests);
	model.setDetails(getTokenPayLoadDetails());
	model.setReportId("1A");
	model.setRequest(listRequests);
	return model;
    }

    public static ReportConfigurations getDataOfReports() {
	ReportConfigurations reports = new ReportConfigurations();
	reports.setId("ReportId3");
	reports.setDeleted(false);
	reports.setClientId("clientid");
	return reports;
    }

    public static List<Users> getUsersList() {
	Users users = getUsers();
	users.setUserId("test-user-id");
	return Arrays.asList(users);

    }

    public static List<Hashtable<String, Object>> getFetchReports() {
	Hashtable<String, Object> reports = new Hashtable<>();

	reports.put("a", "value1");
	reports.put("b", "value2");
	List<Hashtable<String, Object>> listReports = new ArrayList<>();
	listReports.add(reports);
	return listReports;

    }

}
