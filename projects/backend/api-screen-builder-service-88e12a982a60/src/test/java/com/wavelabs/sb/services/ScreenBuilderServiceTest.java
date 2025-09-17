package com.wavelabs.sb.services;

import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.FeatureTemplate;
import com.wavelabs.sb.documents.Screen;
import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.ChartsData;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.repository.ChartDetailsRepository;
import com.wavelabs.sb.repository.ClientOnboardingRepository;
import com.wavelabs.sb.repository.FeatureTemplateRepository;
import com.wavelabs.sb.repository.ModuleColorsMasterRepository;
import com.wavelabs.sb.repository.ModuleRepository;
import com.wavelabs.sb.repository.ReportConfigurationsRepository;
import com.wavelabs.sb.repository.RoleOnboardingRepository;
import com.wavelabs.sb.repository.ScreenRepository;
import com.wavelabs.sb.repository.ScreenWorkFlowRepository;
import com.wavelabs.sb.repository.SubModuleRepository;
import com.wavelabs.sb.repository.UserOnboardingRepository;
import com.wavelabs.sb.response.FeatureTemplateInfo;
import com.wavelabs.sb.response.FeatureTemplateResponse;
import com.wavelabs.sb.response.FetchAllModAndSubModResponse;
import com.wavelabs.sb.response.FetchAllModulesResponse;
import com.wavelabs.sb.response.FetchFormResponse;
import com.wavelabs.sb.response.ModuleReportResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.UserModulesResponse;

@RunWith(MockitoJUnitRunner.class)
public class ScreenBuilderServiceTest {

    @Mock
    SubModuleRepository subModuleRepository;

    @Mock
    RoleOnboardingRepository roleOnboardingRepository;
    @Mock
    UserOnboardingRepository userOnboardingRepository;

    @Mock
    ReportConfigurationsRepository reportConfigurationsRepository;

    @Mock
    ModuleRepository moduleRepository;

    @InjectMocks
    ScreenBuilderService screenBuilderService;

    @Mock
    ScreenWorkFlowRepository screenWorkFlowRepository;

    @Mock
    ScreenRepository screenRepository;

    @Mock
    ClientOnboardingRepository clientOnboardingRepository;

    @Mock
    private Sort pageableMock;

    @Mock
    private Page<FeatureTemplate> futureTemplate;

    @Mock
    MongoTemplate mongoTemplate;

    @Mock
    FeatureTemplateRepository featureTemplateRepository;

    @Mock
    ChartDetailsRepository chartDetailsRepository;

    @Mock
    ModuleColorsMasterRepository moduleColorsMasterRepository;

    @Test
    @DisplayName("test createSubmodules with success response")
    public void createSubmodulesTest() {
	when(moduleRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ScreenBuilderData.getModule()));
	when(subModuleRepository.save(Mockito.any())).thenReturn(ScreenBuilderData.getSubmodules().get());
	when(clientOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getClientOnBoardingDetails()));
	SuccessResponse response = screenBuilderService.createSubModule(ScreenBuilderData.getCreateSubModuleModel());
	assertEquals("submoduleId", response.getId());
    }

    @Test
    @DisplayName("test fetchAllSubmodules with success response")
    public void fetchAllSubmodulesTest() {
	when(subModuleRepository.findByModuleIdAndStatusAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getSubmodulesList());
	when(moduleRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ScreenBuilderData.getModuleDataForUpdeteModule()));
	List<SubModules> list = screenBuilderService.fetchAllSubModules("moduleId");
	assertEquals("submoduleId", list.get(0).getId());
    }

    @Test
    @DisplayName("test saveModules with success response")
    public void saveModulesTest() {

	List<String> modules = new ArrayList<String>();
	modules.add("Module");
	SuccessResponse successResponse = screenBuilderService.saveModules(modules,
		ScreenBuilderData.getTokenPayLoadDetails());
	assertEquals(Constants.DATA_CREATED_SUCCESSFULLY, successResponse.getMessage());
    }

    @Test
    @DisplayName("test updateSubmodules with Exception")
    public void updateSubmodules_ThrowsmoduleException() {
	when(subModuleRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getSubmodules().get()));
	screenBuilderService.updateSubModules(ScreenBuilderData.getUpdateSubmoduleRequest(), "61a5d9e54d9bf274ac012db4",
		ScreenBuilderData.getTokenPayLoadDetails());
    }

    @Test
    @DisplayName("test updateSubmodules with Exception")
    public void updateSubmodules_ThrowsClientDetailsException() {
	when(subModuleRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getSubmodules().get()));
	screenBuilderService.updateSubModules(ScreenBuilderData.getUpdateSubmoduleRequest(), "61a5d9e54d9bf274ac012db4",
		ScreenBuilderData.getTokenPayLoadDetails());

    }

    @Test
    @DisplayName("test fetchFutureTemplateDetails with success response")
    public void fetchFutureTemplateDetails() {
	when(featureTemplateRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ScreenBuilderData.getFeatureTemplate()));
	FeatureTemplateInfo templateById = screenBuilderService.getFeatureTemplateById("templateId");
	assertEquals("test-id", templateById.getId());
    }

    @Test
    @DisplayName("test fetchFutureTemplateDetails throws exception")
    public void fetchFutureTemplate_ThrowsException() {
	Throwable exception = assertThrows(ResourceNotFoundException.class, () -> {
	    screenBuilderService.getFeatureTemplateById("templateId");
	});
	assertEquals(Constants.FEATURE_TEMPLATE_NOT_FOUND_WITH_THIS_ID + "templateId", exception.getMessage());
    }

    @Test
    @DisplayName("test fetchFutureTemplateDetails with success response")
    public void getFutureTemplateDetailsTest() {
	when(featureTemplateRepository.findAllByDeleted(Mockito.anyBoolean()))
		.thenReturn(ScreenBuilderData.getFutureTemplateDetails());
	FeatureTemplateResponse response = screenBuilderService.getFeatureTemplateDetails();
	assertEquals("test-id", response.getData().get(0).getId());
    }

    @Test
    @DisplayName("test fetchFutureTemplateDetails with success response")
    public void getFutureTemplateDetailsTestException() {
	List<FeatureTemplate> list = new ArrayList<>();
	when(featureTemplateRepository.findAllByDeleted(Mockito.anyBoolean())).thenReturn(list);
	Throwable exception = assertThrows(ResourceNotFoundException.class, () -> {
	    screenBuilderService.getFeatureTemplateDetails();
	});
	assertEquals(Constants.FEATURE_TEMPLATE_DETAILS_NOT_FOUND, exception.getMessage());

    }

    @Test
    @DisplayName("test fetchFormWithScreenId with success response")
    public void fetchFormWithScreenId() {
	when(screenRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getScreenSample()));
	FetchFormResponse fetchFormResponse = screenBuilderService.fetchFormWithScreenId("screenId");
	assertEquals("Screen", fetchFormResponse.getName());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test updateSubModules with success response")
    public void updateSubModulesTest() {
	when(screenBuilderService.getSubModule(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(screenBuilderService.getClientDetails(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getClientOnBoardingDetails());
	SuccessResponse response = screenBuilderService.updateSubModules(ScreenBuilderData.getUpdateSubmoduleRequest(),
		"submoduleId", ScreenBuilderData.getTokenPayLoadDetails());
	assertEquals(Constants.SUBMODULES_UPDATED_SUCCESSFULLY, response.getMessage());
    }

    @Test
    @DisplayName("test deleteSubModules with success response")
    public void deleteSubModulesTest() {
	when(subModuleRepository.findById(Mockito.anyString())).thenReturn(ScreenBuilderData.getSubmodules());
	SuccessResponse message = screenBuilderService.deleteSubModules(ScreenBuilderData.getDeleteSubModuleModel());
	assertEquals(Constants.SUB_MODULE_SUCCESSFULLY_DELETED, message.getMessage());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test fetchFormWithScreenId throw exception")
    public void fetchFormWithScreenId_Exception() {
	screenBuilderService.fetchFormWithScreenId("screenId");
    }

    @Test
    @DisplayName("test createModuleTest with success response")
    public void createModuleTest() {

	when(moduleRepository.findByNameIgnoreCaseAndClientIdAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(Optional.empty());
	when(clientOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getClientOnBoardingDetails()));
	when(moduleRepository.save(Mockito.any())).thenReturn(ScreenBuilderData.getModuleData());
	SuccessResponse response = screenBuilderService
		.createModule(ScreenBuilderData.getCreateModuleAndSubmoduleModelData());
	assertEquals("module" + Constants.MODULE_CREATED, response.getMessage());
    }

    @Test
    @DisplayName("test createModuleTest with success response")
    public void createModuleTestWithclientDetailsNotFoundException() {

	when(clientOnboardingRepository.findById(Mockito.anyString())).thenReturn(Optional.empty());
	String clientId = ScreenBuilderData.getClientOnBoardingDetails().getClientId();
	Throwable exception = assertThrows(ResourceNotFoundException.class, () -> {
	    screenBuilderService.createModule(ScreenBuilderData.getCreateModuleAndSubmoduleModel());
	});
	assertEquals(ErrorMessages.CLIENT_DETAILS_NOT_FOUND + clientId, exception.getMessage());

    }

    @Test
    @DisplayName("test updateModuleTest with success response")
    public void updateModuleTest() {
	when(moduleRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ScreenBuilderData.getModule()));
	when(moduleRepository.findByNameIgnoreCaseAndClientIdAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(Optional.of(ScreenBuilderData.getModuleDataForUpdeteModule()));
	SuccessResponse response = screenBuilderService.updateModule(ScreenBuilderData.getUpdateModuleRequest(),
		"moduleId", ScreenBuilderData.getTokenPayLoadDetails());
	assertEquals("Module Name" + Constants.MODULE_UPDATED, response.getMessage());
    }

    @Test
    @DisplayName("test deleteModuleTest with success response")
    public void deleteModuleTest() {
	when(moduleRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ScreenBuilderData.getModule()));
	when(subModuleRepository.findAllByModuleId(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodulesList());
	// when(roleOnboardingRepository.saveAll(Mockito.any())).thenReturn(ChartsData.getRoleOnboardingList());
	SuccessResponse response = screenBuilderService.deleteModule("moduleId",
		ScreenBuilderData.getTokenPayLoadDetails());
	assertEquals("name" + Constants.MODULE_DELETED, response.getMessage());
    }

    @Test
    @DisplayName("test fetchAllModulesTest with success response")
    public void fetchAllModulesTest() {
	when(moduleRepository.findByClientIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(ScreenBuilderData.getListOfModules());
	when(clientOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getClientOnBoardingDetails()));
	FetchAllModulesResponse response = screenBuilderService.fetchAllModules("clientId");
	assertEquals("name", response.getModules().get(0).getName());
    }

    @Test
    @DisplayName("test deleteModuleTest with success response")
    public void deleteSubModuleTest() {
	when(moduleRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ScreenBuilderData.getModule()));
	when(subModuleRepository.findByModuleIdAndIdAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getSubmodules());
	when(subModuleRepository.findByModuleIdAndStatusAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getListSubmodules());

//		when(subModuleRepository.save(Mockito.any())).thenReturn(subModules);
	SuccessResponse response = screenBuilderService.deleteSubModule("moduleId", "submoduleId",
		ScreenBuilderData.getTokenPayLoadDetails());
	assertEquals("name" + Constants.SUBMODULE_DELETED_SUCCESSFULLY, response.getMessage());
    }

    @Test
    @DisplayName("test deleteModuleTest with success response")
    public void deleteSubModuleAnotherTest() {
	when(moduleRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ScreenBuilderData.getModule()));
	when(subModuleRepository.findByModuleIdAndIdAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getSubmodules());
	when(subModuleRepository.findByModuleIdAndStatusAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getListSubmodules());
	SuccessResponse response = screenBuilderService.deleteSubModule("moduleId", "submoduleId",
		ScreenBuilderData.getTokenPayLoadDetails());
	assertEquals("name" + Constants.SUBMODULE_DELETED_SUCCESSFULLY, response.getMessage());
    }

    @Test
    @DisplayName("test fetchAllModAndSubModTest with success response")
    public void fetchAllModAndSubModTest() {
	when(mongoTemplate.find(Mockito.any(Query.class), Mockito.any()))
		.thenReturn(ScreenBuilderData.getListOfModulesObjects());
	when(clientOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getClientOnBoardingDetails()));
	when(userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(Mockito.anyString(),
		Mockito.anyString(), Mockito.any(), Mockito.anyBoolean()))
			.thenReturn(Optional.of(ScreenBuilderData.getUsersData()));
	when(subModuleRepository.findByIdInAndStatusAndDeleted(Mockito.any(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getSubmodulesOjects());
	when(moduleRepository.findAllWithIdsAndStatusAndDeleted(Mockito.anyList(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getListOfModuleData());

	when(reportConfigurationsRepository.findByModuleIdAndStatusAndDeletedAndRolesIn(Mockito.any(), Mockito.any(),
		Mockito.anyBoolean(), Mockito.any())).thenReturn(ScreenBuilderData.giveListReportConfigurations());
	when(moduleColorsMasterRepository.count()).thenReturn(1l);
	FetchAllModAndSubModResponse response = screenBuilderService
		.fetchAllModAndSubMod(ScreenBuilderData.getFetchAllModAndSubModModel());
	FetchAllModAndSubModResponse response1 = screenBuilderService
		.fetchAllModAndSubMod(ScreenBuilderData.getFetchAllModAndSubModModelData());

	FetchAllModAndSubModResponse response3 = screenBuilderService
		.fetchAllModAndSubMod(ScreenBuilderData.getFetchAllModAndSubModModelDataToDateNull());
	FetchAllModAndSubModResponse response4 = screenBuilderService
		.fetchAllModAndSubMod(ScreenBuilderData.getFetchAllModAndSubModModelDataWithFromDateNull());

	assertEquals("613a080fb75b44660a46a79b", response1.getModules().get(0).getId());
	assertEquals("613a080fb75b44660a46a79b", response.getModules().get(0).getId());
	assertEquals("613a080fb75b44660a46a79b", response3.getModules().get(0).getId());

	assertEquals("613a080fb75b44660a46a79b", response4.getModules().get(0).getId());

    }

    @Test
    @DisplayName("test getClientDetails with success response")
    public void getClientDetailsTest() {
	when(clientOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getClientOnBoardingDetails()));
	ClientOnboardingDetails clientDetails = screenBuilderService.getClientDetails("clientId");
	assertEquals("clientId", clientDetails.getId());
    }

    @Test
    @DisplayName("test getSubModuleWithNull with success response")
    public void getSubModuleWithNullTest() {
	when(subModuleRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getSubmodules().get()));
	SubModules subModules = screenBuilderService.getSubModuleWithNull("subModuleId");

	assertEquals(2, subModules.getRoles().size());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test getSubModuleWithNull with Exception")
    public void getSubModuleWithNullTestException() {
	screenBuilderService.getSubModuleWithNull("subModuleId");
    }

    @Test
    @DisplayName("test getSubModuleWithNull with empty subModuleId")
    public void getSubModuleWithNullTestNull() {
	assertNull(screenBuilderService.getSubModuleWithNull(""));
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test getModuleException")
    public void getModuleException() {
	screenBuilderService.getModule("moduleId");
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test getScreenException")
    public void getScreenException() {
	screenBuilderService.getScreen("moduleId");
    }

    @Test
    @DisplayName("test getScreenResponse  with success response")
    public void getScreenResponse() {
	when(screenRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getScreen()));
	Screen screen = screenBuilderService.getScreen("screenId");
	assertEquals("clientId", screen.getClientId());
    }

    @Test
    @DisplayName("test saveFeatureTemplate with success response")
    public void saveFeatureTemplateTest() {
	when(clientOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getClientOnBoardingDetails()));
	when(featureTemplateRepository.save(Mockito.any())).thenReturn(ScreenBuilderData.getFeatureTemplate());
	FeatureTemplate featureTemplate = screenBuilderService
		.saveFeatureTemplate(ScreenBuilderData.getFeatureTemplateModel());
	assertEquals("test-id", featureTemplate.getId());
	assertEquals("name", featureTemplate.getName());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test deleteModuleTest with Exception")
    public void deleteSubModuleTestException() {

	screenBuilderService.deleteSubModule("moduleId", "subModuleId", ScreenBuilderData.getTokenPayLoadDetails());
    }

    @Test
    @DisplayName("test deleteFeatureTemplateTest with success response")
    public void deleteFeatureTemplateTest() {
	when(featureTemplateRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ScreenBuilderData.getFeatureTemplate()));
	SuccessResponse featureTemplate = screenBuilderService
		.deleteFeatureTemplate(ScreenBuilderData.getDeleteFeatureTemplateModel());
	assertEquals(Constants.FEATURE_TEMPLATE_DELETED_SUCCESSFULLY, featureTemplate.getMessage());
    }

    @Test
    @DisplayName("test fetchAllModulesForDashboard with success response")
    public void fetchAllModulesForDashboardTest() {
	when(userOnboardingRepository.findByIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(),
		Mockito.anyBoolean())).thenReturn(Optional.of(ChartsData.getUsers2()));
	when(moduleRepository.findAllWithIdsAndStatusAndDeleted(Mockito.any(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getListOfModules());
	when(subModuleRepository.findByModuleIdInAndStatusAndDeleted(Mockito.any(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getSubmodulesList());
	when(reportConfigurationsRepository.findByModuleInAndStatusAndDeletedAndRolesIn(Mockito.any(), Mockito.any(),
		Mockito.anyBoolean(), Mockito.any())).thenReturn(ChartsData.listOfgetReportConfigurations());
	when(chartDetailsRepository.findByReportIdInAndStatusAndDeleted(Mockito.any(), Mockito.any(),
		Mockito.anyBoolean())).thenReturn(ChartsData.listOfChartDetails());

	UserModulesResponse response = screenBuilderService
		.fetchAllModulesForDashboard(ScreenBuilderData.getFetchAllModulesByUesrModel());

	assertEquals("IdB", response.getCharts().get(0).getId());

    }

    @Test
    @DisplayName("test fetchAllModulesForDashboard with success response")
    public void fetchAllModulesForDashboardWithClientTest() {
	when(moduleRepository.findByClientIdAndStatusAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getModuleContent());
	when(subModuleRepository.findByModuleIdInAndStatusAndDeleted(Mockito.any(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getSubmodulesList());
	when(reportConfigurationsRepository.findByModuleInAndStatusAndDeleted(Mockito.any(), Mockito.any(),
		Mockito.anyBoolean())).thenReturn(ChartsData.listOfgetReportConfigurations());

	UserModulesResponse response1 = screenBuilderService
		.fetchAllModulesForDashboard(ScreenBuilderData.getFetchAllModulesByClientModel());

	assertEquals("name", response1.getModules().get(0).getName());

    }

    @Test
    @DisplayName("test getReportsListTest with success response")
    public void getReportsListTest() {
	when(reportConfigurationsRepository.findByModuleIdAndStatusAndDeletedAndRolesIn(Mockito.any(), Mockito.any(),
		Mockito.anyBoolean(), Mockito.anyList())).thenReturn(ChartsData.listOfgetReportConfigurations());
	when(userOnboardingRepository.findByIdAndStatusAndDeleted(Mockito.anyString(), Mockito.any(),
		Mockito.anyBoolean())).thenReturn(Optional.of(ChartsData.getUsers()));
	when(moduleRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ScreenBuilderData.giveModule()));
	ModuleReportResponse response1 = screenBuilderService
		.getReportsList(ChartsData.getFetchReportChartsByModuleIdModel());

	assertEquals("Firoj", response1.getReports().get(0).getName());
    }

    @Test
    @DisplayName("test createSubModuleAlreadyCreatedTestException")
    public void createSubModuleWithExceptionTest() {
	when(clientOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getClientOnBoardingDetails()));
	when(moduleRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ScreenBuilderData.getModule()));
	when(subModuleRepository.findByModuleIdAndNameIgnoreCaseAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getSubmodule());
	Throwable exception = assertThrows(ResourceNotFoundException.class, () -> {
	    screenBuilderService.createSubModule(ScreenBuilderData.getCreateSubModuleModel());
	});
	assertEquals(ScreenBuilderData.getCreateSubModuleModel().getRequest().getName()
		+ Constants.SUB_MODULE_ALREADY_CREATED, exception.getMessage());

    }

    @Test
    @DisplayName("testing date format related exception")
    public void fetchAllModAndSubModDateFormatExceptionTest() {

	Throwable response = assertThrows(BadRequestException.class, () -> {
	    screenBuilderService
		    .fetchAllModAndSubMod(ScreenBuilderData.getFetchAllModAndSubModModelDataToDateInFormat());
	});
	assertEquals("Please provide date dd-mm-yyyy format", response.getMessage());
    }

    @Test
    @DisplayName("testing user not found exception")
    public void fetchAllModAndSubModUserNotFoundExceptionTest() {

	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    screenBuilderService.fetchAllModAndSubMod(ScreenBuilderData.getFetchAllModAndSubModModel());
	});
	assertEquals(ErrorMessages.USER_NOT_FOUND, response.getMessage());
    }

    @Test
    @DisplayName("testing Module already created exception")
    public void updateModuleModuleAlreadyCreatedExceptionTest() {
	when(moduleRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ScreenBuilderData.getModule()));
	when(moduleRepository.findByNameIgnoreCaseAndClientIdAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(Optional.of(ScreenBuilderData.getModuleDataForUnmatchedClient()));
	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    screenBuilderService.updateModule(ScreenBuilderData.getUpdateModuleRequest(), "moduleId",
		    ScreenBuilderData.getTokenPayLoadDetails());
	});
	assertEquals(ScreenBuilderData.getUpdateModuleRequest().getName() + Constants.MODULE_ALREADY_CREATED,
		response.getMessage());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("testing deleteFeatureTemplateModuleAlreadyCreatedException")
    public void deleteFeatureTemplateModuleAlreadyCreatedExceptionTest() {

	screenBuilderService.deleteFeatureTemplate(ScreenBuilderData.getDeleteFeatureTemplateModel());

    }

    @Test
    @DisplayName("testing saveFeatureTemplateModuleAlreadyCreatedException")
    public void saveFeatureTemplateWithExceptionTest() {
	when(clientOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getClientOnBoardingDetails()));
	when(featureTemplateRepository.findByDeletedAndNameIgnoreCase(Mockito.anyBoolean(), Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getFeatureTemplateForName()));
	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    screenBuilderService.saveFeatureTemplate(ScreenBuilderData.getFeatureTemplateModel());

	});
	assertEquals(ScreenBuilderData.getFeatureTemplateModel().getRequest().getName()
		+ Constants.FEATURE_TEMPLATE_ALREADY_EXIST, response.getMessage());

    }

    @Test
    @DisplayName("testing sub Module already created Exception")
    public void createSubModuleExceptionTest() {
	when(moduleRepository.findByIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.of(ScreenBuilderData.getModule()));
	when(subModuleRepository.findByModuleIdAndNameIgnoreCaseAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getSubmodules());

	when(clientOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getClientOnBoardingDetails()));

	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    screenBuilderService.createSubModule(ScreenBuilderData.getCreateSubModuleModel());

	});
	assertEquals(ScreenBuilderData.getCreateSubModuleModel().getRequest().getName()
		+ Constants.SUB_MODULE_ALREADY_CREATED, response.getMessage());
    }

    @Test
    @DisplayName("testing sub Module already created Exception")
    public void fetchAllModulesForDashboardExceptionTest() {
	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    screenBuilderService.getReportsList(ChartsData.getFetchReportChartsByModuleIdModel());

	});
	assertEquals(ErrorMessages.USER_NOT_FOUND, response.getMessage());
    }

    @Test
    @DisplayName("testing sub Module already created Exception")
    public void createModuleExceptionTest() {
	when(moduleRepository.findByNameIgnoreCaseAndClientIdAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(Optional.of(ScreenBuilderData.giveModuleData()));

	when(clientOnboardingRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getClientOnBoardingDetailsObject()));

	Throwable response = assertThrows(ResourceNotFoundException.class, () -> {
	    screenBuilderService.createModule(ScreenBuilderData.getCreateModuleAndSubmoduleModelData());

	});
	assertEquals(ScreenBuilderData.getCreateModuleAndSubmoduleModelData().getRequest().getName()
		+ Constants.MODULE_ALREADY_CREATED, response.getMessage());
    }

}
