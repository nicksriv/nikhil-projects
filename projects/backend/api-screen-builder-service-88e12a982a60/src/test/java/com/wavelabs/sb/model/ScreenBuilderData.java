package com.wavelabs.sb.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.mongodb.client.MongoCollection;
import com.wavelabs.sb.common.CollectionConstants;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ClientsCredentials;
import com.wavelabs.sb.documents.CustomColumns;
import com.wavelabs.sb.documents.FeatureTemplate;
import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.documents.RoleModules;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.Screen;
import com.wavelabs.sb.documents.ScreenFields;
import com.wavelabs.sb.documents.ScreenFlows;
import com.wavelabs.sb.documents.ScreenWorkFlow;
import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.ColumnOrder;
import com.wavelabs.sb.enums.Operations;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.request.AddSubmoduleRequest;
import com.wavelabs.sb.request.ClientRolesRequest;
import com.wavelabs.sb.request.CreateModuleRequest;
import com.wavelabs.sb.request.CreateScreenRequest;
import com.wavelabs.sb.request.FetchAllModAndSubModRequest;
import com.wavelabs.sb.request.FetchFormsRequest;
import com.wavelabs.sb.request.FormRequest;
import com.wavelabs.sb.request.ModuleCloneRequest;
import com.wavelabs.sb.request.SaveFeatureTemplateRequest;
import com.wavelabs.sb.request.SaveWorkflowRequest;
import com.wavelabs.sb.request.ScreenFieldsRequest;
import com.wavelabs.sb.request.ScreenFlowsRequest;
import com.wavelabs.sb.request.UpdateModuleRequest;
import com.wavelabs.sb.request.UpdateScreenRequest;
import com.wavelabs.sb.response.DynamicWorkFlowDetailsResponse;
import com.wavelabs.sb.response.FeatureTemplateInfo;
import com.wavelabs.sb.response.FeatureTemplateResponse;
import com.wavelabs.sb.response.FetchAllModAndSubModResponse;
import com.wavelabs.sb.response.FetchAllModulesResponse;
import com.wavelabs.sb.response.FetchAllSubmodResponse;
import com.wavelabs.sb.response.FetchFormResponse;
import com.wavelabs.sb.response.FormsResponse;
import com.wavelabs.sb.response.ModuleResponse;
import com.wavelabs.sb.response.Modules;
import com.wavelabs.sb.response.RoleInfo;
import com.wavelabs.sb.response.RolesResponse;
import com.wavelabs.sb.response.SaveScreenResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.WorkFlowDetails;
import com.wavelabs.sb.response.WorkFlowDetailsResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

public class ScreenBuilderData {

    public static Module getModule() {
	Module module = new Module();
	module.setCreatedAt(Instant.now());
	module.setId("moduleId1");
	module.setModifiedAt(Instant.now());
	module.setName("name");
	module.setStatus(Status.ACTIVE);
	module.setClientId("clientId");
	module.setCreatedBy("Tillu");
	module.setDeleted(false);
	module.setIconUrl("www.javatpoint.com");
	module.setModifiedBy("Madhu");

	module.setRoles(getRoleDetails());
	return module;
    }

    public static Module getModuleDataForUpdeteModule() {
	Module module = new Module();

	module.setId("moduleId");

	module.setDeleted(false);
	module.setIconUrl("www.javatpoint.com");
	module.setModifiedBy("Madhu");
	module.setName("Module Name");
	module.setClientId("client");

	module.setRoles(getRoleDetails());
	return module;
    }

    public static Module giveModuleData() {
	Module module = new Module();

	module.setName("module");

	module.setClientId("client");

	module.setDeleted(false);
	module.setCreatedAt(Instant.now());
	module.setId("613a080fb75b44660a46a79b");
	module.setModifiedAt(Instant.now());
	module.setStatus(Status.ACTIVE);
	module.setCreatedBy("Tillu");
	module.setIconUrl("www.javatpoint.com");
	module.setModifiedBy("Madhu");

	module.setRoles(getRoleDetails());
	return module;
    }

    public static List<Module> getListOfModuleData() {
	List<Module> modules = new ArrayList<>();
	Module module = new Module();
	module.setCreatedAt(Instant.now());
	module.setId("613a080fb75b44660a46a79b");
	module.setModifiedAt(Instant.now());
	module.setName("name");
	module.setStatus(Status.ACTIVE);
	module.setClientId("clientId");
	module.setCreatedBy("Tillu");
	module.setDeleted(false);
	module.setIconUrl("www.javatpoint.com");
	module.setModifiedBy("Madhu");

	module.setRoles(getRoleDetails());
	modules.add(module);
	return modules;

    }

    public static Module giveModule() {
	Module module = new Module();
	module.setCreatedAt(Instant.now());
	module.setId("61dc0d2819163b12aff9a3b2");
	module.setModifiedAt(Instant.now());
	module.setName("name");
	module.setStatus(Status.ACTIVE);
	module.setClientId("clientId");
	module.setCreatedBy("Tillu");
	module.setDeleted(false);
	module.setIconUrl("www.javatpoint.com");
	module.setModifiedBy("Madhu");
	module.setRoles(getRoleDetails());
	return module;
    }

    public static Module getModuleData() {
	Module module = new Module();
	module.setCreatedAt(Instant.now());
	module.setId("moduleId2");
	module.setModifiedAt(Instant.now());
	module.setName("Dinesh");
	module.setStatus(Status.ACTIVE);
	return module;
    }

    public static Module getModuleDataForUnmatchedClient() {
	Module module = new Module();
	module.setCreatedAt(Instant.now());
	module.setId("moduleId2");
	module.setModifiedAt(Instant.now());
	module.setName("Dinesh");
	module.setStatus(Status.ACTIVE);
	module.setClientId("clientid1");
	return module;
    }

    public static AddSubmoduleRequest getAddSubmoduleRequest() {
	AddSubmoduleRequest addSubmoduleRequest = new AddSubmoduleRequest();
	addSubmoduleRequest.setIcon("icon");
	addSubmoduleRequest.setName("moduleName");
	addSubmoduleRequest.setClientId("clientId");
	addSubmoduleRequest.setModuleId("moduleId");
	return addSubmoduleRequest;
    }

    public static CreateSubModuleModel getCreateSubModuleModel() {
	CreateSubModuleModel model = new CreateSubModuleModel();
	model.setRequest(getAddSubmoduleRequest());
	model.setTokenPayLoadDetails(getTokenPayLoadDetails());
	return model;
    }

    public static Optional<SubModules> getSubmodules() {
	SubModules subModules = new SubModules();

	subModules.setClientId("clientId");
	subModules.setCreatedAt(Instant.now());
	subModules.setIconUrl("icon");
	subModules.setId("submoduleId");
	subModules.setModifiedAt(Instant.now());
	subModules.setModuleId("moduleId");
	subModules.setName("name");
	subModules.setStatus(Status.ACTIVE);
	subModules.setRoles(getRoleDetails());
	subModules.setDeleted(false);
	return Optional.of(subModules);

    }

    public static List<SubModules> getSubmodulesOjects() {
	List<SubModules> listSubModules = new ArrayList<>();
	SubModules subModules = new SubModules();

	subModules.setClientId("clientId");
	subModules.setCreatedAt(Instant.now());
	subModules.setIconUrl("icon");
	subModules.setId("submoduleId");
	subModules.setModifiedAt(Instant.now());
	subModules.setModuleId("613a080fb75b44660a46a79b");
	subModules.setName("name");
	subModules.setStatus(Status.ACTIVE);
	subModules.setRoles(getRoleDetails());
	subModules.setDeleted(false);

	SubModules subModules2 = new SubModules();

	subModules2.setClientId("clientId");
	subModules2.setCreatedAt(Instant.now());
	subModules2.setIconUrl("icon");
	subModules2.setId("submoduleId2");
	subModules2.setModifiedAt(Instant.now());
	subModules2.setModuleId("613a080fb75b44660a46a79b");
	subModules2.setName("name");
	subModules2.setStatus(Status.ACTIVE);
	subModules2.setRoles(getRoleDetails());
	subModules2.setDeleted(false);
	listSubModules.add(subModules);
	listSubModules.add(subModules2);

	return listSubModules;

    }

    public static Optional<SubModules> getSubmodule() {
	SubModules subModules = new SubModules();

	subModules.setModuleId("moduleId");
	subModules.setName("moduleName");

	return Optional.of(subModules);

    }

    public static Optional<SubModules> getSubmoduleData() {
	SubModules subModules = new SubModules();

	subModules.setModuleId("main");
	subModules.setName("moduleName");

	return Optional.of(subModules);

    }

    public static Optional<SubModules> getSubmodulesData() {
	SubModules subModules = new SubModules();

	subModules.setClientId("clientId");
	subModules.setCreatedAt(Instant.now());
	subModules.setModifiedAt(Instant.now());
	subModules.setIconUrl("icon");
	subModules.setId("submoduleId");
	subModules.setModifiedAt(Instant.now());
	subModules.setModuleId("moduleId");
	subModules.setName("name");
	subModules.setStatus(Status.ACTIVE);
	subModules.setRoles(getRoleDetails());
	subModules.setDeleted(true);
	subModules.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(ScreenBuilderData.getTokenPayLoadDetails()));
	return Optional.of(subModules);

    }

    public static SubModules getSubmodulesDataObjects() {

	SubModules subModules = new SubModules();

	subModules.setClientId("clientId");
	subModules.setCreatedAt(Instant.now());
	subModules.setModifiedAt(Instant.now());
	subModules.setIconUrl("icon");
	subModules.setId("submoduleId1");
	subModules.setModifiedAt(Instant.now());
	subModules.setModuleId("moduleId");
	subModules.setName("name");
	subModules.setStatus(Status.ACTIVE);
	subModules.setRoles(getRoleDetails());
	subModules.setDeleted(false);
	return subModules;
    }

    public static List<SubModules> getListSubmodules() {
	List<SubModules> list = new ArrayList<>();

	SubModules subModules = new SubModules();

	subModules.setClientId("clientId");
	subModules.setCreatedAt(Instant.now());
	subModules.setModifiedAt(Instant.now());
	subModules.setIconUrl("icon");
	subModules.setId("submoduleId");
	subModules.setModifiedAt(Instant.now());
	subModules.setModuleId("moduleId");
	subModules.setName("name");
	subModules.setStatus(Status.ACTIVE);
	subModules.setRoles(getRoleDetails());
	subModules.setDeleted(false);

	SubModules subModules1 = new SubModules();

	subModules1.setClientId("clientId");
	subModules1.setCreatedAt(Instant.now());
	subModules1.setModifiedAt(Instant.now());
	subModules1.setIconUrl("icon");
	subModules1.setId("submoduleId");
	subModules1.setModifiedAt(Instant.now());
	subModules1.setModuleId("moduleId1");
	subModules1.setName("name");
	subModules1.setStatus(Status.ACTIVE);
	subModules1.setRoles(getRoleDetails());
	subModules1.setDeleted(false);

	list.add(subModules1);
	list.add(subModules1);
	return list;

    }

    public static DeleteSubModuleModel getDeleteSubModuleModel() {
	DeleteSubModuleModel model = new DeleteSubModuleModel();
	model.setSubModuleId("test-module-id");
	model.setTokenPayLoadDetails(getTokenPayLoadDetails());
	return model;
    }

    public static ClientOnboardingDetails getClientOnBoardingDetailsObject() {
	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setId("client");

	clientOnboardingDetails.setAddress("address");
	clientOnboardingDetails.setArea("area");
	clientOnboardingDetails.setCity("city");
	clientOnboardingDetails.setClientCredentials(getClientCredits());
	clientOnboardingDetails.setClientId("clientId");
	clientOnboardingDetails.setClientName("clientName");
	clientOnboardingDetails.setClientRoles(getClientRolesRequest());
	clientOnboardingDetails.setCountry("country");
	clientOnboardingDetails.setCreatedAt(Instant.now());
	clientOnboardingDetails.setDeleted(true);
	clientOnboardingDetails.setEmail("email");
	clientOnboardingDetails.setFirstName("firstName");
	clientOnboardingDetails.setLastName("lastName");
	clientOnboardingDetails.setHeadOfficeName("headOfficeName");
	clientOnboardingDetails.setMiddleName("middleName");
	clientOnboardingDetails.setMobile("mobile");
	clientOnboardingDetails.setModifiedAt(Instant.now());
	clientOnboardingDetails.setModules(getListOfModules());
	clientOnboardingDetails.setPinCode("pinCode");
	clientOnboardingDetails.setState("state");
	clientOnboardingDetails.setStatus(Status.ACTIVE);
	return clientOnboardingDetails;

    }

    public static ClientOnboardingDetails getClientOnBoardingDetails() {
	ClientOnboardingDetails clientOnboardingDetails = new ClientOnboardingDetails();
	clientOnboardingDetails.setAddress("address");
	clientOnboardingDetails.setArea("area");
	clientOnboardingDetails.setCity("city");
	clientOnboardingDetails.setClientCredentials(getClientCredits());
	clientOnboardingDetails.setClientId("clientId");
	clientOnboardingDetails.setClientName("clientName");
	clientOnboardingDetails.setClientRoles(getClientRolesRequest());
	clientOnboardingDetails.setCountry("country");
	clientOnboardingDetails.setCreatedAt(Instant.now());
	clientOnboardingDetails.setDeleted(true);
	clientOnboardingDetails.setEmail("email");
	clientOnboardingDetails.setFirstName("firstName");
	clientOnboardingDetails.setLastName("lastName");
	clientOnboardingDetails.setHeadOfficeName("headOfficeName");
	clientOnboardingDetails.setId("clientId");
	clientOnboardingDetails.setMiddleName("middleName");
	clientOnboardingDetails.setMobile("mobile");
	clientOnboardingDetails.setModifiedAt(Instant.now());
	clientOnboardingDetails.setModules(getListOfModules());
	clientOnboardingDetails.setPinCode("pinCode");
	clientOnboardingDetails.setState("state");
	clientOnboardingDetails.setStatus(Status.ACTIVE);
	return clientOnboardingDetails;
    }

    public static List<ClientRolesRequest> getClientRolesRequest() {
	List<ClientRolesRequest> clientRolesRequest = new ArrayList<>();
	ClientRolesRequest request = new ClientRolesRequest();
	request.setEditTheme(true);
	request.setEditWorkFlow(true);
	request.setModuleId("moduleId");
	request.setView(true);
	clientRolesRequest.add(request);
	return clientRolesRequest;
    }

    public static ClientsCredentials getClientCredits() {
	ClientsCredentials clientsCredentials = new ClientsCredentials();
	clientsCredentials.setClientId("clientId");
	clientsCredentials.setClientName("clientName");
	clientsCredentials.setCreatedAt(Instant.now());
	clientsCredentials.setId("id");
	clientsCredentials.setModifiedAt(Instant.now());
	clientsCredentials.setPassword("password");

	return clientsCredentials;
    }

    public static List<Module> getListOfModules() {
	List<Module> list = new ArrayList<>();
	Module module = getModule();
	list.add(module);
	return list;
    }

    public static List<FetchAllSubmodResponse> getFetchAllSubmodulesResponse() {
	List<FetchAllSubmodResponse> response = new ArrayList<>();
	FetchAllSubmodResponse res = new FetchAllSubmodResponse();
	List<RoleInfo> list = new ArrayList<>();
	list.add(getRoleInfo());
	res.setIcon("icon");
	res.setName("moduleName");
	res.setModuleId("moduleId");
	res.setRoles(list);
	res.setId("id");
	res.setStatus("Active");
	response.add(res);
	return response;
    }

    private static RoleInfo getRoleInfo() {
	RoleInfo role = new RoleInfo();
	role.setId("roleId");
	role.setRole("Role");
	return role;
    }

    public static List<SubModules> getSubmodulesList() {
	SubModules submodules = getSubmodules().get();
	List<SubModules> list = new ArrayList<>();
	list.add(submodules);
	return list;
    }

    public static UpdateModuleRequest getUpdateSubmoduleRequest() {
	UpdateModuleRequest request = new UpdateModuleRequest();

	request.setName("name");
	return request;
    }

    public static SuccessResponse getSuccessResponse() {
	return new SuccessResponse("id", "message");
    }

    public static SaveWorkflowRequest getSaveWorkflowRequest() {
	SaveWorkflowRequest request = new SaveWorkflowRequest();
	List<ScreenFlowsRequest> workflows = new ArrayList<>();
	List<String> roleIds = new ArrayList<>();
	roleIds.add("roleId");
	roleIds.add("roleId2");
	roleIds.add("roleId3");
	request.setRoleIds(roleIds);
	request.setClientId("clientId");
	request.setSubmoduleId("submoduleId");
	request.setId("test-id");
	request.setModuleId("moduleId");
	request.setStatus(Status.ACTIVE);
	ScreenFlowsRequest workflow = new ScreenFlowsRequest();
	workflow.setNextScreenId("NextScreenId");
	workflow.setPreviousSceenId("previousSceenId");
	workflow.setScreenId("screenId");
	workflow.setScreenName("Dashboard");
	workflow.setStatus(Status.ACTIVE);
	workflows.add(workflow);
	ScreenFlowsRequest workflow2 = new ScreenFlowsRequest();
	workflow2.setNextScreenId("NextScreenId");
	workflow2.setPreviousSceenId("previousSceenId");
	workflow2.setScreenId("screenId");
	workflow2.setScreenName("Dashboard");
	workflow2.setStatus(Status.ACTIVE);
	workflow2.setId("workflowId");
	workflows.add(workflow2);
	workflows.add(workflow);
	request.setWorkflows(workflows);
	return request;
    }

    public static SaveWorkflowModel getSaveWorkflowModel() {
	SaveWorkflowModel model = new SaveWorkflowModel();
	model.setRequest(getSaveWorkflowRequest());
	model.setTokenPayLoadDetails(getTokenPayLoadDetails());
	return model;
    }

    public static CreateScreenRequest getCreateScreenRequest() {
	CreateScreenRequest request = new CreateScreenRequest();
	request.setClientId("clientId");
	request.setSubmoduleId("submoduleId");
	request.setModuleId("moduleId");
	request.setName("Role Management");
	List<String> roles = new ArrayList<>();
	roles.add("Manager");
	List<Map<String, Object>> form = new ArrayList<Map<String, Object>>();
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("element", "Header");
	map.put("fieldVariant", "outlined");
	map.put("fieldName", "header_9DAFE675-994E-4CF9-8F5C-AABF25880029");
	form.add(map);
	request.setForm(form);
	List<ScreenFieldsRequest> fields = new ArrayList<>();
	fields.add(getScreenField());
	request.setFields(fields);
	request.setSubModuleName("Dashboard");
	return request;
    }

    public static CreateScreenModel getCreateScreenModel() {
	CreateScreenModel model = new CreateScreenModel();
	model.setRequest(getCreateScreenRequest());
	model.setTokenPayLoadDetails(getTokenPayLoadDetails());
	return model;
    }

    private static ScreenFieldsRequest getScreenField() {
	ScreenFieldsRequest fieldsRequest = new ScreenFieldsRequest();
	fieldsRequest.setComponentId("componentId");
	fieldsRequest.setType("componentType");
	fieldsRequest.setFiltered(false);
	fieldsRequest.setVisibleOnTable(false);
	return fieldsRequest;
    }

    public static UpdateScreenRequest getUpdateScreenRequest() {
	UpdateScreenRequest request = new UpdateScreenRequest();
	request.setClientId("clientId");
	request.setScreenId("screenId");
	request.setSubmoduleId("submoduleId");
	request.setModuleId("moduleId");
	request.setName("Role Management");
	List<String> roles = new ArrayList<>();
	roles.add("Manager");
	request.setRoles(roles);
	List<Map<String, Object>> form = new ArrayList<Map<String, Object>>();
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("element", "Header");
	map.put("fieldVariant", "outlined");
	map.put("fieldName", "header_9DAFE675-994E-4CF9-8F5C-AABF25880029");
	map.put("componentId", "test");
	form.add(map);
	request.setForm(form);
	List<ScreenFieldsRequest> fields = new ArrayList<>();
	fields.add(getScreenField());
	request.setFields(fields);
	request.setSubModuleName("Dashboard");
	return request;
    }

    public static UpdateScreenModel getUpdateScreenModel() {
	UpdateScreenModel model = new UpdateScreenModel();
	model.setRequest(getUpdateScreenRequest());
	model.setTokenPayLoadDetails(getTokenPayLoadDetails());
	return model;
    }

    public static Screen getScreen() {
	Screen screen = new Screen();
	screen.setId("screenId");
	screen.setCreatedAt(Instant.now());
	screen.setModuleId("moduleId");
	screen.setClientId("clientId");
	screen.setSubModuleId("subModuleId");
	return screen;
    }

    public static List<ScreenFlows> getListOfWorkkFlows() {
	List<ScreenFlows> list = new ArrayList<>();
	ScreenFlows workflow = getScreenFlows();
	workflow.setNextScreenId("screenId");
	workflow.setPreviousScreenId(null);
	workflow.setScreenId("previousScreenId");
	list.add(workflow);
	ScreenFlows workflow2 = getScreenFlows();
	workflow2.setPreviousScreenId("previousScreenId");
	workflow2.setNextScreenId("screenId2");
	workflow2.setScreenName("screenName2");
	workflow2.setScreenId("screenId");
	list.add(workflow2);
	ScreenFlows workflow3 = getScreenFlows();
	workflow3.setPreviousScreenId("screenId");
	workflow3.setScreenName("screenName3");
	workflow3.setScreenId("screenId2");
	workflow3.setNextScreenId(null);
	list.add(workflow3);

	return list;
    }

    private static ScreenFlows getScreenFlows() {
	ScreenFlows workflow = new ScreenFlows();
	workflow.setClientId("clientId");
	workflow.setCreatedAt(Instant.now());
	workflow.setId("workflowId");
	workflow.setModifiedAt(Instant.now());
	workflow.setModuleId("moduleId");
	workflow.setNextScreenId("nextScreenId");
	workflow.setPreviousScreenId("previousScreenId");
	workflow.setScreenId("screenId");
	workflow.setScreenName("screenName");
	workflow.setSubModuleId("subModuleId");
	workflow.setVersion("version");
	workflow.setStatus(Status.ACTIVE);
	return workflow;
    }

    public static ResponseEntity<WorkFlowDetailsResponse> getWorkFlowDetailsResponse() {
	WorkFlowDetailsResponse response = new WorkFlowDetailsResponse();
	response.setClientId("clientId");
	response.setSubmoduleId("submoduleId");
	List<WorkFlowDetails> details = new ArrayList<>();
	WorkFlowDetails workFlowDetails = new WorkFlowDetails();
	workFlowDetails.setId("id");
	workFlowDetails.setNextScreenId("nextScreenId");
	workFlowDetails.setPreviousScreenId("previousScreenId");
	workFlowDetails.setScreenId("screenId");
	workFlowDetails.setStatus(Status.ACTIVE);
	details.add(workFlowDetails);
	response.setWorkFlows(details);
	return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    public static WorkFlowDetailsResponse getWorkFlowDetailsReq() {
	WorkFlowDetailsResponse response = new WorkFlowDetailsResponse();
	response.setClientId("clientId");
	response.setSubmoduleId("submoduleId");
	List<WorkFlowDetails> details = new ArrayList<>();
	WorkFlowDetails workFlowDetails = new WorkFlowDetails();
	workFlowDetails.setId("id");
	workFlowDetails.setNextScreenId("nextScreenId");
	workFlowDetails.setPreviousScreenId("previousScreenId");
	workFlowDetails.setScreenId("screenId");
	workFlowDetails.setStatus(Status.ACTIVE);
	details.add(workFlowDetails);
	response.setWorkFlows(details);
	return response;
    }

    public static ResponseEntity<WorkFlowDetailsResponse> getWorkFlowDetailsRequest() {
	WorkFlowDetailsResponse request = new WorkFlowDetailsResponse();
	request.setClientId("clientId");
	request.setSubmoduleId("submoduleId");
	List<WorkFlowDetails> details = new ArrayList<>();
	WorkFlowDetails workFlowDetails = new WorkFlowDetails();
	workFlowDetails.setId("id");
	workFlowDetails.setNextScreenId("nextScreenId");
	workFlowDetails.setPreviousScreenId("previousScreenId");
	workFlowDetails.setScreenId("screenId");
	workFlowDetails.setStatus(Status.ACTIVE);
	details.add(workFlowDetails);
	request.setWorkFlows(details);
	return ResponseEntity.status(HttpStatus.OK).body(request);
    }

    public static SaveScreenResponse getSaveScreenResponse() {
	return new SaveScreenResponse("screenId", "message");
    }

    public static FeatureTemplate getFeatureTemplate() {
	FeatureTemplate futureTemplateRequest = new FeatureTemplate();
	futureTemplateRequest.setClientId("clientId");
	List<Map<String, Object>> form = new ArrayList<Map<String, Object>>();
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("element", "Header");
	map.put("fieldVariant", "outlined");
	map.put("fieldName", "header_9DAFE675-994E-4CF9-8F5C-AABF25880029");
	map.put("componentId", "test");
	form.add(map);
	futureTemplateRequest.setForm(form);
	futureTemplateRequest.setId("test-id");
	futureTemplateRequest.setName("name");
	return futureTemplateRequest;
    }

    public static FeatureTemplate getFeatureTemplateForName() {
	FeatureTemplate futureTemplateRequest = new FeatureTemplate();

	futureTemplateRequest.setName("test-feature-template-name");
	return futureTemplateRequest;
    }

    public static List<FeatureTemplate> getFutureTemplateDetails() {
	List<FeatureTemplate> list = new ArrayList<>();
	FeatureTemplate futureTemplate = getFeatureTemplate();
	list.add(futureTemplate);
	return list;

    }

    public static FeatureTemplateInfo getFeatureTemplateRequest() {
	FeatureTemplateInfo request = new FeatureTemplateInfo();
	request.setClientId("clientId");
	List<Map<String, Object>> form = new ArrayList<Map<String, Object>>();
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("element", "Header");
	map.put("fieldVariant", "outlined");
	map.put("fieldName", "header_9DAFE675-994E-4CF9-8F5C-AABF25880029");
	map.put("componentId", "test");
	form.add(map);
	request.setForm(form);
	request.setId("id");
	request.setName("name");
	return request;
    }

    public static ResponseEntity<RolesResponse> getRoleResponse() {
	RolesResponse rolesResponse = new RolesResponse();
	List<String> list = new ArrayList<>();
	list.add("abc");
	rolesResponse.setMessage("message");
	rolesResponse.setRoles(list);
	return ResponseEntity.status(HttpStatus.OK).body(rolesResponse);
    }

    public static RolesResponse getRoleRes() {
	RolesResponse rolesResponse = new RolesResponse();
	List<String> list = new ArrayList<>();
	list.add("abc");
	rolesResponse.setMessage("message");
	rolesResponse.setRoles(list);
	return rolesResponse;
    }

    public static ResponseEntity<FetchFormResponse> getFormBuilder() {
	FetchFormResponse response = new FetchFormResponse();
	response.setClientId("clientId");
	response.setModuleId("moduleId");
	response.setName("module-name");
	response.setRoles(new ArrayList<String>());
	response.setForm(new ArrayList<>());
	response.setSubModuleId("sub-module-id");
	response.setSubModuleName("sub-module-name");
	return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    public static FetchFormResponse getFormBuilderResponse() {
	FetchFormResponse response = new FetchFormResponse();
	response.setClientId("test-clientId");
	response.setModuleId("moduleId");
	response.setName("module-name");
	response.setRoles(new ArrayList<String>());
	response.setForm(new ArrayList<>());
	response.setSubModuleId("sub-module-id");
	response.setSubModuleName("sub-module-name");
	return response;
    }

    public static Screen getScreenSample() {
	Screen screen = new Screen();
	screen.setId("test-id");
	List<Map<String, Object>> form = new ArrayList<Map<String, Object>>();
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("one", "object");
	form.add(map);
	screen.setForm(form);
	screen.setModuleId("moduleId");
	screen.setClientId("clientId");
	screen.setSubModuleId("subModuleId");
	screen.setName("Screen");
	;
	return screen;
    }

    public static ScreenWorkFlow getScreenWorkFlow() {
	ScreenWorkFlow screenWorkFlow = new ScreenWorkFlow();
	screenWorkFlow.setClientId(getClientOnBoardingDetails().getId());
	screenWorkFlow.setCreatedAt(Instant.now());
	screenWorkFlow.setId("id");
	screenWorkFlow.setModifiedAt(Instant.now());
	screenWorkFlow.setModuleId(getModule().getId());
	screenWorkFlow.setScreenFlows(getListOfWorkkFlows());
	screenWorkFlow.setStatus(Status.ACTIVE);
	screenWorkFlow.setSubModuleId(getSubmodules().get().getId());
	screenWorkFlow.setScreenFlows(getListOfWorkkFlows());
	screenWorkFlow.setRoles(getRoleDetails());
	return screenWorkFlow;
    }

    public static SaveFeatureTemplateRequest getSaveFeatureTemplateRequest() {
	SaveFeatureTemplateRequest req = new SaveFeatureTemplateRequest();
	req.setClientId("test-client-id");
	req.setName("test-feature-template-name");
	List<Map<String, Object>> form = new ArrayList<Map<String, Object>>();
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("one", "object");
	form.add(map);
	req.setForm(form);
	return req;
    }

    public static SaveFeatureTemplateModel getFeatureTemplateModel() {
	SaveFeatureTemplateModel model = new SaveFeatureTemplateModel();
	model.setRequest(getSaveFeatureTemplateRequest());
	model.setTokenPayLoadDetails(getTokenPayLoadDetails());
	return model;
    }

    public static DeleteFeatureTemplateModel getDeleteFeatureTemplateModel() {
	DeleteFeatureTemplateModel model = new DeleteFeatureTemplateModel();
	model.setTemplateId("test-template-id");
	model.setTokenPayLoadDetails(getTokenPayLoadDetails());
	return model;
    }

    public static TokenPayLoadDetails getTokenPayLoadDetails() {
	TokenPayLoadDetails loadDetails = new TokenPayLoadDetails();
	loadDetails.setClientId("clientId");
	loadDetails.setUserId("userId");
	loadDetails.setTypeOfUser("User");
	loadDetails.setId("Token-Id");
	loadDetails.setLastName("Ramu");
	loadDetails.setAdminId("adminId");
	loadDetails.setClientSystemId("systemId");
	loadDetails.setFirstName("Penti");
	loadDetails.setUserRole("Developer");

	return loadDetails;
    }

    public static CreateModuleRequest getCreateModuleRequest() {
	CreateModuleRequest createModuleRequest = new CreateModuleRequest();
	createModuleRequest.setName("module");

	createModuleRequest.setIcon("icon");
	createModuleRequest.setClientId("clientId");

	return createModuleRequest;
    }

    public static CreateModuleAndSubmoduleModel getCreateModuleAndSubmoduleModelData() {
	CreateModuleAndSubmoduleModel model = new CreateModuleAndSubmoduleModel();
	CreateModuleRequest createModuleRequest = new CreateModuleRequest();
	createModuleRequest.setName("module");

	createModuleRequest.setIcon("icon");
	createModuleRequest.setClientId("client");
	model.setRequest(createModuleRequest);
	model.setTokenPayLoadDetails(getTokenPayLoadDetails());
	return model;
    }

    public static CreateModuleAndSubmoduleModel getCreateModuleAndSubmoduleModel() {
	CreateModuleAndSubmoduleModel model = new CreateModuleAndSubmoduleModel();
	model.setRequest(getCreateModuleRequest());
	model.setTokenPayLoadDetails(getTokenPayLoadDetails());
	return model;
    }

    public static UpdateModuleRequest getUpdateModuleRequest() {
	UpdateModuleRequest request = new UpdateModuleRequest();
	request.setName("Module Name");
	return request;
    }

    public static List<Module> fetchAllModules() {

	return null;
    }

    public static FetchAllModulesResponse fetchAllModulesResponse() {
	FetchAllModulesResponse response = new FetchAllModulesResponse();
	List<ModuleResponse> data = new ArrayList<ModuleResponse>();
	ModuleResponse module = new ModuleResponse();
	module.setId("moduleId");
	module.setName("module");
	data.add(module);
	response.setModules(data);
	return response;
    }

    public static FetchAllModAndSubModModel getFetchAllModAndSubModModel() {
	FetchAllModAndSubModRequest request = new FetchAllModAndSubModRequest();
	request.setSize(10);
	request.setPage(0);

	FetchAllModAndSubModModel model = new FetchAllModAndSubModModel();
	model.setClientId("clientId");
	model.setFetchAllRequest(request);
	model.setTokenPayLoadDetails(getTokenPayLoadDetails());
	return model;
    }

    public static FetchAllModAndSubModModel getFetchAllModAndSubModModelData() {
	FetchAllModAndSubModRequest request = new FetchAllModAndSubModRequest();
	request.setSize(10);
	request.setPage(0);
	request.setFrom("12-01-2022");
	request.setTo("18-02-2022");
	request.setModuleName("ModuleI");
	request.setPaginationRequired(false);

	request.setSortBy(Optional.of(ColumnOrder.STATUS));

	request.setSortOrder(Optional.of("Greaterthan"));
	request.setStatus("ACTIVE");

	TokenPayLoadDetails loadDetails = new TokenPayLoadDetails();
	loadDetails.setClientId("clientId");
	loadDetails.setUserId("userId");
	loadDetails.setTypeOfUser("admin");
	loadDetails.setAdminId("adminId");
	loadDetails.setClientSystemId("SystemId1");
	loadDetails.setFirstName("Dudam");
	loadDetails.setLastName("Ramesh");
	loadDetails.setUserRole("admin");
	loadDetails.setId("AA1");

	FetchAllModAndSubModModel model = new FetchAllModAndSubModModel();
	model.setClientId("clientId");
	model.setFetchAllRequest(request);
	model.setTokenPayLoadDetails(loadDetails);
	return model;
    }

    public static FetchAllModAndSubModModel getFetchAllModAndSubModModelDataWithFromDateNull() {
	FetchAllModAndSubModRequest request = new FetchAllModAndSubModRequest();
	request.setSize(10);
	request.setPage(0);
	request.setFrom(null);
	request.setTo("18-02-2022");
	request.setModuleName("ModuleI");
	request.setPaginationRequired(false);

	request.setSortBy(Optional.of(ColumnOrder.STATUS));

	request.setSortOrder(Optional.of("Greaterthan"));
	request.setStatus("ACTIVE");

	TokenPayLoadDetails loadDetails = new TokenPayLoadDetails();
	loadDetails.setClientId("clientId");
	loadDetails.setUserId("userId");
	loadDetails.setTypeOfUser("admin");
	loadDetails.setAdminId("adminId");
	loadDetails.setClientSystemId("SystemId1");
	loadDetails.setFirstName("Dudam");
	loadDetails.setLastName("Ramesh");
	loadDetails.setUserRole("Teamlead");
	loadDetails.setId("AA1");

	FetchAllModAndSubModModel model = new FetchAllModAndSubModModel();
	model.setClientId("clientId");
	model.setFetchAllRequest(request);
	model.setTokenPayLoadDetails(loadDetails);
	return model;
    }

    public static FetchAllModAndSubModModel getFetchAllModAndSubModModelDataToDateNull() {
	FetchAllModAndSubModRequest request = new FetchAllModAndSubModRequest();
	request.setSize(10);
	request.setPage(0);
	request.setFrom("12-01-2022");
	request.setTo(null);
	request.setModuleName("ModuleI");
	request.setPaginationRequired(false);

	request.setSortBy(Optional.of(ColumnOrder.STATUS));

	request.setSortOrder(Optional.of("Greaterthan"));
	request.setStatus("ACTIVE");

	TokenPayLoadDetails loadDetails = new TokenPayLoadDetails();
	loadDetails.setClientId("clientId");
	loadDetails.setUserId("userId");
	loadDetails.setTypeOfUser("admin");
	loadDetails.setAdminId("adminId");
	loadDetails.setClientSystemId("SystemId1");
	loadDetails.setFirstName("Dudam");
	loadDetails.setLastName("Ramesh");
	loadDetails.setUserRole("Teamlead");
	loadDetails.setId("AA1");

	FetchAllModAndSubModModel model = new FetchAllModAndSubModModel();
	model.setClientId("clientId");
	model.setFetchAllRequest(request);
	model.setTokenPayLoadDetails(loadDetails);
	return model;
    }

    public static FetchAllModAndSubModModel getFetchAllModAndSubModModelDataToDateInFormat() {
	FetchAllModAndSubModRequest request = new FetchAllModAndSubModRequest();
	request.setSize(10);
	request.setPage(0);
	request.setFrom("12/01/2022");
	request.setTo("12/02/2022");
	request.setModuleName("ModuleI");
	request.setPaginationRequired(false);

	request.setSortBy(Optional.of(ColumnOrder.STATUS));

	request.setSortOrder(Optional.of("Greaterthan"));
	request.setStatus("ACTIVE");

	TokenPayLoadDetails loadDetails = new TokenPayLoadDetails();
	loadDetails.setClientId("clientId");
	loadDetails.setUserId("userId");
	loadDetails.setTypeOfUser("admin");
	loadDetails.setAdminId("adminId");
	loadDetails.setClientSystemId("SystemId1");
	loadDetails.setFirstName("Dudam");
	loadDetails.setLastName("Ramesh");
	loadDetails.setUserRole("Teamlead");
	loadDetails.setId("AA1");

	FetchAllModAndSubModModel model = new FetchAllModAndSubModModel();
	model.setClientId("clientId");
	model.setFetchAllRequest(request);
	model.setTokenPayLoadDetails(loadDetails);
	return model;
    }

    public static FetchAllModAndSubModRequest getFetchAllModAndSubModRequest() {
	FetchAllModAndSubModRequest request = new FetchAllModAndSubModRequest();
	request.setSize(10);
	request.setPage(0);
	return request;
    }

    public static MongoCollection<Document> getCollection() {
	return null;
    }

    public static Document getModuleFormDocument() {
	Document document = new Document();
	document.put(CollectionConstants.ID, "61d2cc5ab4751248a306fccf");
	document.put(CollectionConstants.DELETED, false);
	document.put("name", "document");
	return document;
    }

    public static List<Object> getListOfModulesList() {
	return Arrays.asList(getModule());
    }

    public static List<Object> getListOfModulesObjects() {
	return Arrays.asList(ScreenBuilderData.getListOfModuleData().get(0));
    }

    public static DynamicWorkFlowDetailsResponse getDynamicWorkFlowDetailsResponse() {
	DynamicWorkFlowDetailsResponse details = new DynamicWorkFlowDetailsResponse();
	details.setFirstScreenName("testScreenName");
	return details;
    }

    public static FeatureTemplateResponse getFeatureTemplateResponse() {
	FeatureTemplateResponse response = new FeatureTemplateResponse();
	return response;
    }

    public static FetchAllModAndSubModResponse getFetchAllModAndSubModResponse() {
	return new FetchAllModAndSubModResponse(10L, Arrays.asList(new Modules()));
    }

    public static FetchFormsRequest getFetchFormsRequest() {
	return new FetchFormsRequest();
    }

    public static FormsResponse getFormsResponse() {
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("record1", "value1");
	map.put("record2", "value2");
	map.put("record3", "value3");
	List<Map<String, Object>> records = new ArrayList<Map<String, Object>>();
	records.add(map);
	FormsResponse response = new FormsResponse(10L, records, null);
	return response;
    }

    public static Map<String, Object> getMapOfStringObject() {
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("record1", "value1");
	map.put("record2", "value2");
	map.put("record3", "value3");
	return map;
    }

    public static List<ScreenFields> getScreenFields() {
	List<ScreenFields> fields = new ArrayList<>();
	ScreenFields field = new ScreenFields();
	field.setClientId("clientId");
	field.setComponentHint("component hint");
	field.setComponentId("componentId");
	field.setComponentType("component Type");
	field.setModuleId("moduleId");
	field.setSubModuleId("submoduleId");
	field.setVisibleontable(true);
	fields.add(field);
	return fields;
    }

    public static List<ScreenFields> getScreenFieldsData() {
	List<ScreenFields> fields = new ArrayList<>();
	ScreenFields field = new ScreenFields();
	field.setClientId("clientId");
	field.setComponentHint("component hint");
	field.setComponentId("componentId");
	field.setComponentType("component Type");
	field.setModuleId("moduleId");
	field.setSubModuleId("subModuleId");
	field.setFilterable(true);
	field.setVisibleontable(true);
	fields.add(field);
	return fields;
    }

    public static FormRequest getFormRequest() {
	FormRequest form = new FormRequest();
	form.setModuleId("moduleId");
	form.setSubmoduleId("submoduleId");
	form.setFormId("formId");
	form.setForm(getModuleFormDocument());
	return form;
    }

    public static FormRequest getFormRequestData() {
	FormRequest form = new FormRequest();
	form.setModuleId("moduleId");
	form.setSubmoduleId("submoduleId");
	form.setFormId("formId");
	form.setWorlflowId("workFlowId");
	form.setDetails(getTokenPayLoadDetails());
	form.setForm(getModuleFormDocument());
	return form;
    }

    public static FormRequest getFormRequestWithId() {
	FormRequest form = new FormRequest();
	form.setModuleId("moduleId1");
	form.setSubmoduleId("subModuleId");
	form.setFormId("formId");
	form.setDetails(getTokenPayLoadDetails());
	form.setMappedBy("anil");
	form.setWorlflowId("WorkFlow1");
	form.setForm(getModuleFormDocument());

	return form;
    }

    public static List<RoleOnboardingDetails> getRoleDetails() {
	List<RoleOnboardingDetails> roles = new ArrayList<>();
	RoleOnboardingDetails role = new RoleOnboardingDetails();
	role.setId("roleId");
	role.setRole("Role");
	role.setClientId("clientId");
	role.setCreatedAt(Instant.now());
	role.setCreatedBy("Chandu");
	role.setDeleted(false);
	role.setDescription("RoleBoarding");
	role.setModifiedAt(Instant.now());
	role.setModifiedBy("Anvesh");
	List<RoleModules> modules = new ArrayList<>();
	RoleModules module = new RoleModules();
	module.setId("moduleId");
	module.setName("ModuleName");
	module.setStatus(Status.ACTIVE);
	modules.add(module);
	role.setModule(modules);
	role.setRole("Role");
	role.setStatus(Status.ACTIVE);

	roles.add(role);

	RoleOnboardingDetails role2 = new RoleOnboardingDetails();
	role2.setId("roleId");
	role2.setRole("Role");
	role2.setClientId("clientId");
	role2.setCreatedAt(Instant.now());
	role2.setCreatedBy("Chandu");
	role2.setDeleted(false);
	role2.setDescription("RoleBoarding");
	role2.setModifiedAt(Instant.now());
	role2.setModifiedBy("Anvesh");
	role2.setModule(modules);
	role2.setRole("Role");
	role2.setStatus(Status.ACTIVE);

	roles.add(role2);

	return roles;
    }

    public static ModuleCloneRequest getModuleCloneRequest() {
	ModuleCloneRequest request = new ModuleCloneRequest();
	request.setClientId("clientId2");
	request.setModuleIcon("icon");
	request.setModuleName("New Module");
	request.setParentModuleId("moduleId2");
	request.setSubmoduleId("submoduleId");
	return request;
    }

    public static CloneModulesModel getCloneModulesModel() {
	CloneModulesModel model = new CloneModulesModel();
	model.setRequest(getModuleCloneRequest());
	model.setTokenPayLoadDetails(getTokenPayLoadDetails());
	return model;
    }

    public static List<Screen> getScreens() {
	List<Screen> screens = new ArrayList<>();
	Screen screen1 = getScreen();
	screen1.setId("previousScreenId");
	screen1.setName("screenName");
	Screen screen2 = getScreen();
	screen2.setId("screenId");
	screen2.setName("screenName2");
	Screen screen3 = getScreen();
	screen3.setId("screenId2");
	screen3.setName("screenName3");
	screens.add(screen1);
	screens.add(screen2);
	screens.add(screen3);
	return screens;
    }

    public static Module getModules() {
	return getListOfModules().get(0);
    }

    public static FetchAllModulesByUesrModel getFetchAllModulesByUesrModel() {
	FetchAllModulesByUesrModel model = new FetchAllModulesByUesrModel();
	model.setId("IdOne");
	model.setType("User");
	return model;

    }

    public static FetchAllModulesByUesrModel getFetchAllModulesByClientModel() {
	FetchAllModulesByUesrModel model = new FetchAllModulesByUesrModel();
	model.setId("IdOne");
	model.setType("client");
	return model;

    }

    public static List<Module> getModuleContent() {
	List<Module> list = new ArrayList<>();

	Module module = new Module();
	module.setCreatedAt(Instant.now());
	module.setId("61d4305c10c64e2d08d43a30");
	module.setModifiedAt(Instant.now());
	module.setName("name");
	module.setStatus(Status.ACTIVE);
	module.setClientId("clientId");
	module.setCreatedBy("Tillu");
	module.setDeleted(false);
	module.setIconUrl("www.javatpoint.com");
	module.setModifiedBy("Madhu");
	module.setRoles(getRoleDetails());
	list.add(module);
	return list;
    }

    public static List<ObjectId> getListOfIds() {

	List<ObjectId> listOfIds = new ArrayList<>();
	listOfIds.add(new ObjectId("61d4305c10c64e2d08d43a30"));
	listOfIds.add(new ObjectId("61d4305c10c64e2d08d43a31"));
	return listOfIds;

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

    public static List<Users> getUsersList() {
	List<Users> users = new ArrayList<>();
	Users user = getUsers1();
	user.setId("01");
	users.add(user);
	return users;
    }
    public static List<Object> getUserObjectsList() {
	List<Object> users = new ArrayList<>();
	Users user = getUsers1();
	user.setId("01");
	users.add(user);
	return users;
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
	// customColumns.setSecound(customOperation1);
	customColumns.setOperation(Operations.ADDITION);

	listCustomColumns.add(customColumns);
	ReportConfigurations reportConfigurations = new ReportConfigurations();
	reportConfigurations.setClientId("ClientId");
	reportConfigurations.setCreatedAt(Instant.now());
	reportConfigurations.setCreatedBy("Ram");
	reportConfigurations.setCustomColumns(listCustomColumns);
	reportConfigurations.setDeleted(false);
	reportConfigurations.setFilters(ChartsData.getFilters());
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
}
