package com.wavelabs.sb.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

import com.wavelabs.sb.common.CollectionConstants;
import com.wavelabs.sb.documents.ReportColumns;
import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Operations;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.enums.request.FetchReportConfigurationsRequest;
import com.wavelabs.sb.request.CreateReportRequest;
import com.wavelabs.sb.request.CustomColumns;
import com.wavelabs.sb.request.CustomOperation;
import com.wavelabs.sb.request.FetchColumnsRequest;
import com.wavelabs.sb.request.ReportColumnRequest;
import com.wavelabs.sb.request.ReportsRequest;
import com.wavelabs.sb.request.UpdateReportRequest;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.response.CustomColumnsInfo;
import com.wavelabs.sb.response.CustomOperationResponse;
import com.wavelabs.sb.response.FetchColumnsResponse;
import com.wavelabs.sb.response.FetchReportResponse;
import com.wavelabs.sb.response.ModuleReportResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.ReportColumnsResponse;
import com.wavelabs.sb.response.ReportResponse;
import com.wavelabs.sb.response.RoleInfo;
import com.wavelabs.sb.response.SubModulesInfo;

public class ReportsDataBuilder {








    public static CreateReportRequest createReportRequest() {
	CreateReportRequest request = new CreateReportRequest();
	request.setClientId("clientId");
	request.setParentModuleId("moduleId");
	request.setIcon("icon");
	request.setName("Name");
	return request;
    }

    public static CreateReportModel createReportModel() {
	CreateReportModel request = new CreateReportModel();
	request.setRequest(null);
	request.setDetails(tokenDetails());
	return request;
    }

    public static TokenPayLoadDetails tokenDetails() {
	TokenPayLoadDetails details = new TokenPayLoadDetails();
	details.setId("clientId");

	return details;
    }

    public static CreateReportModel reportModel() {
	CreateReportModel request = new CreateReportModel();
	request.setRequest(createReportRequest());
	request.setDetails(tokenDetails());
	return request;
    }

    public static UpdateReportRequest updateReportRequest() {
	UpdateReportRequest request = new UpdateReportRequest();
	request.setParentModuleId("moduleId");
	request.setName("Name");
	request.setCustomColumns(getListOfCustomColumns());
	List<String> filters = new ArrayList<>();
	filters.add("SITE_ID");
	filters.add("DATE_RANGE");

	request.setFilter(filters);
	request.setId("1A");
	request.setRoleIds(getRoleIds());
	request.setStatus("Active");
	List<String> listOfSubmodules = new ArrayList<>();
	listOfSubmodules.add("main");
	listOfSubmodules.add("InfoPage");

	request.setSubmoduleIds(listOfSubmodules);
	return request;
    }

    public static List<String> getRoleIds() {
	List<String> listOfRoles = new ArrayList<>();
	listOfRoles.add("Manager");
	listOfRoles.add("Lead");
	return listOfRoles;
    }

    public static UpdateReportModel getUpdateReportModel() {
	UpdateReportModel model = new UpdateReportModel();
	model.setDetails(tokenDetails());
	model.setRequest(updateReportRequest());
	return model;
    }

    public static UpdateReportModel updateReportRequestData() {
	UpdateReportModel model = new UpdateReportModel();
	model.setDetails(tokenDetails());

	UpdateReportRequest request = new UpdateReportRequest();
//		request.setParentModuleId("moduleId");
//		request.setName("Name");
//		request.setCustomColumns(getListOfCustomColumns());
	List<String> filters = new ArrayList<>();
	filters.add("SITE_ID1");
	filters.add("DATE_RANGE2");
	request.setFilter(filters);
	model.setRequest(request);

	return model;
    }

    public static UpdateReportModel getUpdateReportModelData() {
	UpdateReportRequest request = new UpdateReportRequest();
	request.setParentModuleId("moduleId");
	request.setName("Name");
	List<String> filters = new ArrayList<>();
	filters.add("SITE_ID");
	filters.add("DATE_RANGE");

	request.setFilter(filters);
	request.setId("1A");
	request.setRoleIds(getRoleIds());
	request.setStatus("Active");
	List<String> listOfSubmodules = new ArrayList<>();
	listOfSubmodules.add("main");
	listOfSubmodules.add("InfoPage");

	request.setSubmoduleIds(listOfSubmodules);

	UpdateReportModel model = new UpdateReportModel();
	model.setDetails(tokenDetails());
	List<CustomColumns> listCustomColumns = new ArrayList<>();
	CustomColumns customColumns = new CustomColumns();
	CustomOperation customOperation = new CustomOperation();
	customOperation.setColumn("Firstcolumn");
	customOperation.setReference("oneA");
	customOperation.setSubModule("PickUp");
	customColumns.setFirst(customOperation);
	CustomOperation customOperation1 = new CustomOperation();
	customOperation1.setColumn("Secindcolumn");
	customOperation1.setReference("oneB");
	customOperation1.setSubModule("PickUp");
	customColumns.setId("G1");
	customColumns.setName("Ganesh");
	customColumns.setSecond(customOperation1);

	customColumns.setOperation(Operations.ADDITION);
	listCustomColumns.add(customColumns);
	request.setCustomColumns(listCustomColumns);

	model.setRequest(request);

	return model;
    }

    public static List<CustomColumns> getListOfCustomColumns() {
	List<CustomColumns> listCustomColumns = new ArrayList<>();
	CustomColumns customColumns = new CustomColumns();
	CustomOperation customOperation = new CustomOperation();
	customOperation.setColumn("Firstcolumn");
	customOperation.setReference("oneA");
	customOperation.setSubModule("showing");
	customColumns.setFirst(customOperation);
	CustomOperation customOperation1 = new CustomOperation();
	customOperation1.setColumn("Secindcolumn");
	customOperation1.setReference("oneB");
	customOperation1.setSubModule("PickUp");
	customColumns.setId("G1");
	customColumns.setName("Ganesh");
	customColumns.setSecond(customOperation1);

	customColumns.setOperation(Operations.ADDITION);
	listCustomColumns.add(customColumns);
	return listCustomColumns;
    } 

    public static List<LinkedHashMap<String, Object>> getFetchReports() {
	LinkedHashMap<String, Object> reports = new LinkedHashMap<>();

	reports.put("a", "value1");
	reports.put("b", "value2");
	reports.put("ComponentId", "ComponentId");
	List<LinkedHashMap<String, Object>> listReports = new ArrayList<>();
	listReports.add(reports);
	return listReports;

    }
    
    public static List<Hashtable<String, Object>> getFetchReportsHashtable() {
	Hashtable<String, Object> reports = new Hashtable<>();

	reports.put("a", "value1");
	reports.put("b", "value2");
	List<Hashtable<String, Object>> listReports = new ArrayList<>();
	listReports.add(reports);
	return listReports;

    }

    public static FetchReportResponse getFetchChatResponses() {
	FetchReportResponse responses = new FetchReportResponse();
	responses.setName("Junaid");
	responses.setFilter(ChartsData.getFilters());
	responses.setId("1A");
	responses.setParentModuleId("ParentId");
	responses.setReport(getFetchReports());
	List<CustomColumnsInfo> listInfo = new ArrayList<>();
	CustomColumnsInfo info = new CustomColumnsInfo();
	CustomOperationResponse response = new CustomOperationResponse();
	response.setColumn("Column1");
	response.setReference("Reference");
	response.setSubModule("SubModue1");
	info.setFirst(response);
	info.setId("IdOne");
	info.setName("Category");

	info.setOperation(Operations.ADDITION);
	CustomOperationResponse response1 = new CustomOperationResponse();
	response1.setColumn("Column2");
	response1.setReference("Reference2");
	response1.setSubModule("SubModue2");
	info.setSecond(response1);
	listInfo.add(info);
	responses.setCustomColumns(listInfo);

	List<RoleInfo> listRoleInfo = new ArrayList<>();
	RoleInfo roleInfo = new RoleInfo();
	roleInfo.setId("B1");
	roleInfo.setRole("Manager");
	listRoleInfo.add(roleInfo);
	responses.setRoles(listRoleInfo);
	responses.setStatus("ACTIVE");
	List<SubModulesInfo> listSubModuleInfo = new ArrayList<>();
	SubModulesInfo subModules = new SubModulesInfo();
	subModules.setId("ModuleA");
	subModules.setName("Main");
	listSubModuleInfo.add(subModules);
	responses.setSubmoduleIds(listSubModuleInfo);
	return responses;

    }

    public static DeleteReportModel getDeleteReportModel() {
	DeleteReportModel model = new DeleteReportModel();
	model.setReportId("ReportId");
	model.setTokenPayLoadDetails(ChartsData.getTokenPayLoadDetails());
	return model;

    }

    public static PaginationResponse<ReportConfigurations> getpaginationnResponse() {
	PaginationResponse<ReportConfigurations> response = new PaginationResponse<>();
	response.setConfigurations(ChartsData.listOfgetReportConfigurations());
	response.setMessage("message");
	response.setTotal(10);
	return response;

    }

    public static PaginationResponse<ReportConfigurationModel> getpaginationnResponseOfReportConfigurationModel() {
	PaginationResponse<ReportConfigurationModel> response = new PaginationResponse<>();
	ReportConfigurationModel model = new ReportConfigurationModel();
	model.setId("reportId");
	model.setName("Report Name");
	model.setParentModuleName("Parent module");
	model.setStatus("ACTIVE");
	List<ReportConfigurationModel> listOfReports = new ArrayList<>();
	listOfReports.add(model);
	response.setConfigurations(listOfReports);
	response.setMessage("message");
	response.setTotal(10);
	return response;

    }

    public static FetchReportConfigurationsRequest getFetchReportConfiguration() {
	FetchReportConfigurationsRequest request = new FetchReportConfigurationsRequest();
	request.setClientId("ClientId");
	request.setFrom("12-02-2022");
	request.setModuleId("ModuleId");
	request.setName("Hari");
	request.setPageNumber(Optional.of(0));
	request.setSize(Optional.of(13));
	request.setSortBy(Optional.of(FetchReportColumnOrder.REPORT_NAME));
	request.setSortOrder(Optional.of("Ram"));
	request.setStatus("Active");
	request.setTo("12-03-2022");

	return request;

    }

    public static FetchReportConfigurationsRequest getFetchReportConfigurationWithDateUnformat() {
	FetchReportConfigurationsRequest request = new FetchReportConfigurationsRequest();
	request.setClientId("ClientId");
	request.setFrom("12/02/2022");
	request.setModuleId("ModuleId");
	request.setName("Hari");
	request.setPageNumber(Optional.of(0));
	request.setSize(Optional.of(13));
	request.setSortBy(Optional.of(FetchReportColumnOrder.REPORT_NAME));
	request.setSortOrder(Optional.of("Ram"));
	request.setStatus("Active");
	request.setTo("12-03-2022");

	return request;

    }

    public static FetchReportConfigurationsRequest giveFetchReportConfiguration() {
	FetchReportConfigurationsRequest request = new FetchReportConfigurationsRequest();
	request.setClientId("ClientId");
	request.setFrom(null);
	request.setModuleId("ModuleId");
	request.setName("Hari");
	request.setPageNumber(Optional.of(0));
	request.setSize(Optional.of(13));
	request.setSortBy(Optional.of(FetchReportColumnOrder.REPORT_NAME));
	request.setSortOrder(Optional.of("Ram"));
	request.setStatus("Active");
	request.setTo("12-03-2021");

	return request;

    }

    public static FetchReportConfigurationsRequest giveFetchReportConfigurations() {
	FetchReportConfigurationsRequest request = new FetchReportConfigurationsRequest();
	request.setClientId("ClientId");
	request.setFrom("12-03-2021");
	request.setModuleId("ModuleId");
	request.setName("Hari");
	request.setPageNumber(Optional.of(0));
	request.setSize(Optional.of(13));
	request.setSortBy(Optional.of(FetchReportColumnOrder.REPORT_NAME));
	request.setSortOrder(Optional.of("Ram"));
	request.setStatus("Active");
	request.setTo(null);

	return request;

    }

    public static FetchReportConfigurationsRequest getFetchReportConfigurationWithNullClient() {
	FetchReportConfigurationsRequest request = new FetchReportConfigurationsRequest();
	request.setClientId(null);
	return request;

    }

    public static List<Object> listOfReportConfigs() {
	List<Object> obj = new ArrayList<>();
	obj.add(ChartsData.getReportConfigurations());

	return obj;
    }

    public static FetchReportColumnsModel getFetchReportColumnsModelData() {
	FetchReportColumnsModel model = new FetchReportColumnsModel();
	model.setDetails(ChartsData.getTokenPayLoadDetails());
	model.setReportId("ReportId");

	return model;
    }

    public static ReportColumns getColumnsData() {
	ReportColumns columns = new ReportColumns();
	List<String> listColumns = new ArrayList<>();
	listColumns.add("Secondcolumn");
	listColumns.add("Firstcolumn");

	columns.setColumns(listColumns);
	columns.setCreatedAt(Instant.now());
	columns.setModifiedAt(Instant.now());
	columns.setCreatedBy("Naveen");
	columns.setDeleted(false);
	columns.setId("G1");
	columns.setModifiedBy("ammulya");
	columns.setReportId("1A");
	columns.setStatus(Status.ACTIVE);

	return columns;

    }

    public static ReportColumnRequestModel getAllColumnModel() {
	ReportColumnRequestModel model = new ReportColumnRequestModel();
	List<String> listColumns = new ArrayList<>();
	listColumns.add("Column1");
	listColumns.add("Column2");
	model.setDetails(ChartsData.getTokenPayLoadDetails());
	model.setReportId("ReportId3");
	ReportColumnRequest request = new ReportColumnRequest();
	request.setColumns(listColumns);

	model.setRequest(request);
	return model;

    }

    public static ReportColumnRequest getAllColumnRequest() {
	return getAllColumnModel().getRequest();
    }

    public static FetchReportColumnsModel giveTokenDetails() {

	TokenPayLoadDetails tokenPayLoadDetails = new TokenPayLoadDetails();
	tokenPayLoadDetails.setAdminId("AdminId");
	tokenPayLoadDetails.setClientId("ClietId");
	tokenPayLoadDetails.setClientSystemId("622721821fbfa67babf797d6");
	tokenPayLoadDetails.setId("7716F");
	tokenPayLoadDetails.setLastName("Chilagani");
	tokenPayLoadDetails.setTypeOfUser("User");
	tokenPayLoadDetails.setUserId("TT71");
	tokenPayLoadDetails.setUserRole("Admin1");
	FetchReportColumnsModel model = new FetchReportColumnsModel();
	model.setDetails(tokenPayLoadDetails);
	model.setReportId("ReportId");
	return model;

    }

    public static ReportsRequest giveReportRequest() {

	ReportsRequest request = new ReportsRequest();
	request.setChartId("ChartId");
	request.setFrom("12-02-2021");
	request.setTo("25-02-2021");
	request.setId("Id1");
	List<String> sites = new ArrayList<>();
	sites.add("EduGorilla");
	sites.add("Java t point");
	request.setSites(sites);
	List<String> userId = new ArrayList<>();
	userId.add("GH552");
	userId.add("UU818");
	request.setUserIds(userId);
	return request;

    }

    public static ReportsRequestModel giveReportsRequestModel() {
	ReportsRequestModel model = new ReportsRequestModel();
	ReportsRequest request = new ReportsRequest();
	request.setChartId("ChartId");
	request.setFrom("12-02-2021");
	request.setTo("25-02-2021");
	request.setId("Id1");
	List<String> sites = new ArrayList<>();
	sites.add("EduGorilla");
	sites.add("Java t point");
	request.setSites(sites);
	List<String> userId = new ArrayList<>();
	userId.add("GH552");
	userId.add("UU818");
	request.setUserIds(userId);
	model.setRequest(request);
	return model;

    }

    public static List<Users> giveListOfUsers() {
	List<Users> users = new ArrayList<>();
	users.add(ChartsData.getUsers());
	return users;

    }

    public static FetchColumnsResponse giveFetchColumnResponse() {

	ReportColumnsResponse columnResponse = new ReportColumnsResponse();
	columnResponse.setColumnId("Column1");
	columnResponse.setColumnName("Serail No");
	columnResponse.setStatus(Status.ACTIVE);
	columnResponse.setSubModuleId("SubModule1");
	List<ReportColumnsResponse> columns = new ArrayList<>();
	columns.add(columnResponse);
	FetchColumnsResponse response = new FetchColumnsResponse();
	response.setColumns(columns);

	return response;

    }

    public static FetchColumnsRequest giveFetchColumnsRequest() {
	FetchColumnsRequest fetchColumnsRequest = new FetchColumnsRequest();
	fetchColumnsRequest.setModuleId("Module1");
	List<String> listOfSubmodules = new ArrayList<>();
	listOfSubmodules.add("main");
	listOfSubmodules.add("InfoPage");
	fetchColumnsRequest.setSubmoduleIds(listOfSubmodules);
	return fetchColumnsRequest; 

    }

    public static List<ColumnsResponse> getColumnsResponse() {

	ColumnsResponse response = new ColumnsResponse();
	response.setComponentId("ComponentId");
	response.setHint("HintId");
	response.setType(CollectionConstants.TIME);
	List<ColumnsResponse> columnsResponse = new ArrayList<>();
	columnsResponse.add(response);
	return columnsResponse;

    }

    public static ModuleReportResponse getModuleReportResponse() {
	List<ReportResponse> listOfResponses = new ArrayList<>();
	ReportResponse reportResponse = new ReportResponse();
	reportResponse.setFilters(ChartsData.getFilters());
	reportResponse.setIcon("Star Icon");
	reportResponse.setId("Id1");
	reportResponse.setName("Ashu");
	listOfResponses.add(reportResponse);
	ModuleReportResponse response = new ModuleReportResponse();
	response.setReports(listOfResponses);
	return response;

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

}
