package com.wavelabs.sb.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;

import com.wavelabs.sb.common.CollectionConstants;
import com.wavelabs.sb.documents.CustomColumns;
import com.wavelabs.sb.documents.CustomOperation;
import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.documents.RoleModules;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Operations;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.ReportsRequest;

public class DynamicReportDataBuilder {

    public static Optional<ReportConfigurations> getReportConfiguration() {
	ReportConfigurations reportConfigurations = new ReportConfigurations();
	reportConfigurations.setModifiedBy("test-modifiedBY");
	reportConfigurations.setDeleted(false);
	reportConfigurations.setClientId("test-clientId");
	reportConfigurations.setClientId("test-clientId");
	reportConfigurations.setIcon("test-icon");
	List<CustomColumns> customColumnList = new ArrayList<>();
	CustomColumns customColumns = new CustomColumns();
	customColumns.setId("test-id");
	customColumns.setName("test-name");
	CustomOperation customOperation = new CustomOperation();
	customOperation.setUuid("test-id");
	customOperation.setColumn("test-column");
	customOperation.setReference("test-reference");
	customOperation.setSubModule("same");
	customColumns.setFirst(customOperation);
	customColumns.setSecond(customOperation);
	customColumns.setOperation(Operations.ADDITION);
	customColumnList.add(customColumns);
	reportConfigurations.setCustomColumns(customColumnList);
	List<String> filtersList = new ArrayList<>();
	filtersList.add("filterOne");
	filtersList.add("filterTwo");
	reportConfigurations.setFilters(filtersList);
	List<RoleOnboardingDetails> roleOnBoardingDetailsList = new ArrayList<>();
	RoleOnboardingDetails roleOnboardingDetails = new RoleOnboardingDetails();
	roleOnboardingDetails.setRole("testRole");
	roleOnBoardingDetailsList.add(roleOnboardingDetails);
	reportConfigurations.setRoles(roleOnBoardingDetailsList);
	List<SubModules> submoduleList = new ArrayList<>();
	SubModules subModules = new SubModules();
	subModules.setName("test-name");
	subModules.setClientId("test-clientId");
	subModules.setId("test-id");
	submoduleList.add(subModules);
	reportConfigurations.setSubModules(submoduleList);
	Module module = new Module();
	module.setId("test-Id");
	module.setName("test-module");
	reportConfigurations.setModule(module);
	return Optional.of(reportConfigurations);
    }

    public static List<CustomColumns> getListOfCustomColumns() {
	List<CustomColumns> customColumnList = new ArrayList<>();
	CustomColumns customColumns = new CustomColumns();
	customColumns.setId("test-id");
	customColumns.setName("test-name");
	CustomOperation customOperation = new CustomOperation();
	customOperation.setUuid("test-id");
	customOperation.setColumn("test-column");
	customOperation.setReference("test-reference");
	customOperation.setSubModule("same");
	customColumns.setFirst(customOperation);
	customColumns.setSecond(customOperation);
	customColumns.setOperation(Operations.ADDITION);
	CustomColumns customColumns2 = new CustomColumns();
	customColumns2.setId("test-id");
	customColumns2.setName("test-name");
	CustomOperation customOperation2 = new CustomOperation();
	customOperation2.setUuid("test-id");
	customOperation2.setColumn("test-column");
	customOperation2.setReference("test-reference");
	customOperation2.setSubModule("two");
	customColumns2.setFirst(customOperation2);
	customColumns2.setSecond(customOperation);
	customColumns2.setOperation(Operations.SUBSTRACTION);
	CustomColumns customColumns3 = new CustomColumns();
	customColumns3.setId("test-id");
	customColumns3.setName("test-name");
	CustomOperation customOperation3 = new CustomOperation();
	customOperation.setUuid("test-id");
	customOperation3.setColumn("test-column");
	customOperation3.setReference("test-reference");
	customOperation3.setSubModule("same");
	customColumns3.setFirst(customOperation3);
	customColumns3.setSecond(customOperation3);
	customColumns3.setOperation(Operations.MULTIPLICATION);
	CustomColumns customColumns4 = new CustomColumns();
	customColumns4.setId("test-id");
	customColumns4.setName("test-name");
	CustomOperation customOperation4 = new CustomOperation();
	customOperation4.setUuid("test-id");
	customOperation4.setColumn("test-column");
	customOperation4.setReference("test-reference");
	customOperation4.setSubModule("same");
	customColumns4.setFirst(customOperation4);
	customColumns4.setSecond(customOperation4);
	customColumns4.setOperation(Operations.DIVISION);
	customColumnList.add(customColumns);
	customColumnList.add(customColumns2);
	customColumnList.add(customColumns3);
	customColumnList.add(customColumns4);
	return customColumnList;
    }

    public static Optional<ReportConfigurations> getReportConfigurationEmptySubmodule() {
	ReportConfigurations reportConfigurations = new ReportConfigurations();
	reportConfigurations.setModifiedBy("test-modifiedBY");
	reportConfigurations.setDeleted(false);
	reportConfigurations.setClientId("test-clientId");
	reportConfigurations.setClientId("test-clientId");
	reportConfigurations.setIcon("test-icon");
	List<CustomColumns> customColumnList = new ArrayList<>();
	CustomColumns customColumns = new CustomColumns();
	customColumns.setId("test-id");
	customColumns.setName("test-name");
	CustomOperation customOperation = new CustomOperation();
	customOperation.setUuid("test-id");
	customOperation.setColumn("test-column");
	customOperation.setReference("test-reference");
	customOperation.setSubModule("");
	customColumns.setFirst(customOperation);
	customColumns.setSecond(customOperation);
	customColumns.setOperation(Operations.ADDITION);
	customColumnList.add(customColumns);
	reportConfigurations.setCustomColumns(customColumnList);
	List<String> filtersList = new ArrayList<>();
	filtersList.add("filterOne");
	filtersList.add("filterTwo");
	reportConfigurations.setFilters(filtersList);
	List<RoleOnboardingDetails> roleOnBoardingDetailsList = new ArrayList<>();
	RoleOnboardingDetails roleOnboardingDetails = new RoleOnboardingDetails();
	roleOnboardingDetails.setRole("testRole");
	roleOnBoardingDetailsList.add(roleOnboardingDetails);
	reportConfigurations.setRoles(roleOnBoardingDetailsList);
	List<SubModules> submoduleList = new ArrayList<>();
	SubModules subModules = new SubModules();
	subModules.setName("test-name");
	subModules.setClientId("test-clientId");
	subModules.setId("test-id");
	submoduleList.add(subModules);
	Module module = new Module();
	module.setId("test-Id");
	module.setName("test-module");
	reportConfigurations.setModule(module);
	reportConfigurations.setSubModules(submoduleList);
	return Optional.of(reportConfigurations);
    }

    public static ReportsRequest reportsRequest() {
	ReportsRequest request = new ReportsRequest();
	request.setId("test_id");
	request.setFrom("15-06-1979");
	request.setChartId("test-chartId");
	request.setTo("15-06-1979");
	List<String> userIdsList = new ArrayList<>();
	userIdsList.add("user1");
	userIdsList.add("user2");
	userIdsList.add("user3");
	request.setUserIds(userIdsList);
	List<String> sitesList = new ArrayList<>();
	sitesList.add("site1");
	sitesList.add("site2");
	request.setSites(sitesList);
	return request;
    }

    public static List<Users> getUserList() {
	Users users = new Users();
	users.setAadharNumber("626255558551");
	users.setAddress("KPHB");
	users.setArea("KPHB");
	users.setCity("Hyderabad");
	users.setClientId("");
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
	users.setOfficialEmail(null);
	users.setPanNumber("AAAAA9999A");
	users.setPersonnelEmail("vijay@wavelabs.ai");
	users.setPersonnelPhoneNumber("9999777743");
	users.setPincode("500076");
	users.setReferedEmployeeRole(null);
	users.setRefferedEmployeeId(null);
	users.setRefferedEmployeeName(null);
	users.setReportingManagerId(null);
	users.setReportingManagerName("AJAY");
	users.setReportingManagerRole(null);
	users.setRoles(getRoleOnboardingList());
	users.setState("TS");
	users.setStatus(Status.ACTIVE);
	users.setTypeOfEmployment("Full Time");
	users.setUserId("EFB0234");
	users.setId("614d79f33f1d4026be53d232");
	List<String> sites = new ArrayList<>();
	sites.add("site1");
	sites.add("site2");
	users.setLocations(sites);
	List<Users> usersList = new ArrayList<>();
	usersList.add(users);
	return usersList;
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
	rolesList.add(details);
	return rolesList;
    }

    public static List<Hashtable<String, Object>> getFetchReports() {
	Hashtable<String, Object> reports = new Hashtable<>();
	reports.put("a", "value1");
	reports.put("b", "value2");
	List<Hashtable<String, Object>> listReports = new ArrayList<>();
	listReports.add(reports);
	return listReports;
    }

    public static AggregationResults<Object> getAggregationResults() {
	Document document = new Document();
	document.put(CollectionConstants.CREATED_AT, Instant.now());
	document.put(CollectionConstants.CREATED_BY, "UserId");
	document.put(CollectionConstants.MODIFIED_AT, Instant.now());
	document.put(CollectionConstants.MODIFIED_BY, "UserId");
	document.put(CollectionConstants.USER_TYPE, "User");
	document.put(CollectionConstants.STATUS, Status.ACTIVE.toString());
	document.put(CollectionConstants.DELETED, false);
	document.put(CollectionConstants.USER_ID, "userId");
	document.put(CollectionConstants.EMPLOYEE_ID, CollectionConstants.EMPLOYEE_ID);
	document.put(CollectionConstants.USER_NAME, CollectionConstants.USER_NAME);
	document.put(CollectionConstants.ROLES, CollectionConstants.ROLES);
	Document document2 = new Document();
	document2.put(CollectionConstants.ID, Instant.now());
	document.put("ComponentId", document2);
	document.put("ComponentId2", "[Option1,Option2]");
	document.put("ComponentId3", "[Option1,Option2]");

	AggregationResults<Object> data = new AggregationResults<>(FormDataBuilder.getFetchAllFormsDataResponse(),
		document);

	return data;
    }
}
