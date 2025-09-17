package com.wavelabs.sb.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.ScreenWorkFlow;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.SaveWorkflowModel;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.repository.ClientOnboardingRepository;
import com.wavelabs.sb.repository.ModuleRepository;
import com.wavelabs.sb.repository.RoleOnboardingRepository;
import com.wavelabs.sb.repository.ScreenFieldsRepository;
import com.wavelabs.sb.repository.ScreenFlowsRepository;
import com.wavelabs.sb.repository.ScreenRepository;
import com.wavelabs.sb.repository.ScreenWorkFlowRepository;
import com.wavelabs.sb.repository.SubModuleRepository;
import com.wavelabs.sb.response.DynamicWorkFlowDetailsResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.WorkFlowDetailsResponse;

@RunWith(MockitoJUnitRunner.class)
public class WorkFlowServiceTest {

    @Mock
    ScreenWorkFlowRepository screenWorkFlowRepository;

    @Mock
    ScreenFlowsRepository screenFlowsRepository;

    @Mock
    SubModuleRepository subModuleRepository;

    @Mock
    ScreenRepository screenRepository;

    @InjectMocks
    WorkflowService workFlowService;

    @Mock
    ScreenBuilderService screenBuilderService;

    @Mock
    ClientOnboardingRepository clientOnboardingRepository;

    @Mock
    RoleOnboardingRepository roleOnboardingRepository;

    @Mock
    ModuleRepository moduleRepository;

    @Mock
    ScreenFieldsRepository screenFieldsRepository;

    @Test
    @DisplayName("test fetchWorkFlowDetails with success response")
    public void fetchWorkFlowDetailsTest() {
	Mockito.when(screenWorkFlowRepository.findById(Mockito.anyString()))
		.thenReturn(Optional.of(ScreenBuilderData.getScreenWorkFlow()));
	WorkFlowDetailsResponse fetchWorkFlowDetails = workFlowService.fetchWorkFlowDetails("workflowId");
	assertEquals("clientId", fetchWorkFlowDetails.getClientId());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test fetchWorkFlowDetails with exception")
    public void fetchWorkFlowDetailsTest_throwsException() {
	WorkFlowDetailsResponse fetchWorkFlowDetails = workFlowService.fetchWorkFlowDetails("workflowId");
	assertEquals("614c0fb50f940143baadcca1", fetchWorkFlowDetails.getClientId());
    }

    @Test
    @DisplayName("test saveWorkflow with success response")
    public void saveWorkflowTest() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(screenBuilderService.getClientDetails(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getClientOnBoardingDetails());
	when(screenBuilderService.getScreen(Mockito.anyString())).thenReturn(ScreenBuilderData.getScreen());
	when(screenFlowsRepository.findAllByIds(Mockito.any())).thenReturn(ScreenBuilderData.getListOfWorkkFlows());
	when(screenWorkFlowRepository.findById(Mockito.any()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getScreenWorkFlow()));
	when(screenWorkFlowRepository.save(Mockito.any())).thenReturn(ScreenBuilderData.getScreenWorkFlow());
	when(roleOnboardingRepository.findAllByIdIn(Mockito.any())).thenReturn(ScreenBuilderData.getRoleDetails());
	when(screenBuilderService.getSubModuleWithNull(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	when(subModuleRepository.findByModuleIdAndStatusAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getSubmodulesOjects());
	SuccessResponse response = workFlowService.saveWorkflow(ScreenBuilderData.getSaveWorkflowModel());
	assertEquals(Constants.WORK_FLOW_SAVED, response.getMessage());
    }

    @Test
    @DisplayName("test saveWorkflow with success response")
    public void saveWorkflowTest2() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(screenBuilderService.getSubModuleWithNull(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	when(screenBuilderService.getClientDetails(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getClientOnBoardingDetails());
	when(screenBuilderService.getScreen(Mockito.anyString())).thenReturn(ScreenBuilderData.getScreen());
	when(screenFlowsRepository.findAllByIds(Mockito.any())).thenReturn(ScreenBuilderData.getListOfWorkkFlows());
	when(screenWorkFlowRepository.findById(Mockito.any()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getScreenWorkFlow()));
	when(screenWorkFlowRepository.save(Mockito.any())).thenReturn(ScreenBuilderData.getScreenWorkFlow());
	when(roleOnboardingRepository.findAllByIdIn(Mockito.any())).thenReturn(ScreenBuilderData.getRoleDetails());
	when(subModuleRepository.findByModuleIdAndStatusAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getSubmodulesOjects());
	SaveWorkflowModel request = ScreenBuilderData.getSaveWorkflowModel();
	request.getRequest().setStatus(Status.INACTIVE);
	SuccessResponse response = workFlowService.saveWorkflow(request);
	assertEquals(Constants.WORK_FLOW_SAVED, response.getMessage());
    }

    @Test
    @DisplayName("test saveWorkflowWithRoleUpdateTest with success response")
    public void updateWorkflowWithRoleUpdateTest() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(screenBuilderService.getClientDetails(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getClientOnBoardingDetails());
	when(screenBuilderService.getScreen(Mockito.anyString())).thenReturn(ScreenBuilderData.getScreen());
	when(screenFlowsRepository.findAllByIds(Mockito.any())).thenReturn(ScreenBuilderData.getListOfWorkkFlows());
	when(screenWorkFlowRepository.findById(Mockito.any()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getScreenWorkFlow()));
	ScreenWorkFlow workflow = ScreenBuilderData.getScreenWorkFlow();
	workflow.setRoles(null);
	workflow.setId("workflowId");
	when(screenWorkFlowRepository.findById(Mockito.any())).thenReturn(Optional.ofNullable(workflow));
	when(screenWorkFlowRepository.save(Mockito.any())).thenReturn(ScreenBuilderData.getScreenWorkFlow());
	when(roleOnboardingRepository.findAllByIdIn(Mockito.any())).thenReturn(ScreenBuilderData.getRoleDetails());
	when(screenBuilderService.getSubModuleWithNull(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	when(subModuleRepository.findByModuleIdAndStatusAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getSubmodulesOjects());
	SaveWorkflowModel request = ScreenBuilderData.getSaveWorkflowModel();
	request.getRequest().setId("workflowId");
	List<String> roleIds = new ArrayList<>();
	roleIds.add("roleId");
	roleIds.add("roleId2");
	request.getRequest().setRoleIds(roleIds);
	SuccessResponse response = workFlowService.saveWorkflow(request);
	assertEquals(Constants.WORK_FLOW_SAVED, response.getMessage());
    }

    @Test
    @DisplayName("test saveWorkflowWithRoleUpdateTest with success response")
    public void updateWorkflowWithRoleUpdateTest3() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(screenBuilderService.getClientDetails(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getClientOnBoardingDetails());
	when(screenBuilderService.getScreen(Mockito.anyString())).thenReturn(ScreenBuilderData.getScreen());
	when(screenFlowsRepository.findAllByIds(Mockito.any())).thenReturn(ScreenBuilderData.getListOfWorkkFlows());
	when(screenWorkFlowRepository.findById(Mockito.any()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getScreenWorkFlow()));
	ScreenWorkFlow workflow = ScreenBuilderData.getScreenWorkFlow();
	workflow.setId("workflowId");
	workflow.getRoles().get(0).setId("roleId2");
	when(screenWorkFlowRepository.findById(Mockito.any())).thenReturn(Optional.ofNullable(workflow));
	when(screenWorkFlowRepository.save(Mockito.any())).thenReturn(ScreenBuilderData.getScreenWorkFlow());
	when(roleOnboardingRepository.findAllByIdIn(Mockito.any())).thenReturn(ScreenBuilderData.getRoleDetails());
	when(screenBuilderService.getSubModuleWithNull(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	when(subModuleRepository.findByModuleIdAndStatusAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getSubmodulesOjects());
	SaveWorkflowModel request = ScreenBuilderData.getSaveWorkflowModel();
	request.getRequest().setId("workflowId");
	List<String> roleIds = new ArrayList<>();
	roleIds.add("roleId");
	request.getRequest().setRoleIds(roleIds);
	SuccessResponse response = workFlowService.saveWorkflow(request);
	assertEquals(Constants.WORK_FLOW_SAVED, response.getMessage());
    }

    @Test
    @DisplayName("test updateWorkflowWithRoleUpdateTest2 with success response")
    public void updateWorkflowWithRoleUpdateTest2() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(screenBuilderService.getClientDetails(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getClientOnBoardingDetails());
	when(screenBuilderService.getScreen(Mockito.anyString())).thenReturn(ScreenBuilderData.getScreen());
	when(screenFlowsRepository.findAllByIds(Mockito.any())).thenReturn(ScreenBuilderData.getListOfWorkkFlows());
	when(screenWorkFlowRepository.findById(Mockito.any()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getScreenWorkFlow()));
	when(screenWorkFlowRepository.findById(Mockito.any()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getScreenWorkFlow()));
	when(screenWorkFlowRepository.save(Mockito.any())).thenReturn(ScreenBuilderData.getScreenWorkFlow());

	when(screenBuilderService.getSubModuleWithNull(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodules().get());
	when(subModuleRepository.findByModuleIdAndStatusAndDeleted(Mockito.anyString(), Mockito.anyString(),
		Mockito.anyBoolean())).thenReturn(ScreenBuilderData.getSubmodulesOjects());
	SaveWorkflowModel request = ScreenBuilderData.getSaveWorkflowModel();
	request.getRequest().setId("workflowId");
	request.getRequest().setRoleIds(null);
	SuccessResponse response = workFlowService.saveWorkflow(request);
	assertEquals(Constants.WORK_FLOW_SAVED, response.getMessage());
    }

    @Test
    @DisplayName("test saveWorkflow with create request")
    public void saveWorkflowWithCreateRequestTest() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(screenBuilderService.getClientDetails(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getClientOnBoardingDetails());
	when(screenBuilderService.getScreen(Mockito.anyString())).thenReturn(ScreenBuilderData.getScreen());
	when(screenFlowsRepository.findAllByIds(Mockito.any())).thenReturn(ScreenBuilderData.getListOfWorkkFlows());

	when(screenWorkFlowRepository.save(Mockito.any())).thenReturn(ScreenBuilderData.getScreenWorkFlow());
	when(roleOnboardingRepository.findAllByIdIn(Mockito.any())).thenReturn(ScreenBuilderData.getRoleDetails());
	SaveWorkflowModel request = ScreenBuilderData.getSaveWorkflowModel();
	request.getRequest().setId(null);
	SuccessResponse response = workFlowService.saveWorkflow(request);
	assertEquals(Constants.WORK_FLOW_SAVED, response.getMessage());
    }

    @Test
    @DisplayName("test saveWorkflow with create request")
    public void saveWorkflowWithCreateRequestTest2() {
	when(screenBuilderService.getModule(Mockito.anyString())).thenReturn(ScreenBuilderData.getModule());
	when(screenBuilderService.getClientDetails(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getClientOnBoardingDetails());
	when(screenWorkFlowRepository.save(Mockito.any())).thenReturn(ScreenBuilderData.getScreenWorkFlow());
	when(roleOnboardingRepository.findAllByIdIn(Mockito.any())).thenReturn(ScreenBuilderData.getRoleDetails());
	SaveWorkflowModel request = ScreenBuilderData.getSaveWorkflowModel();
	request.getRequest().setId(null);
	request.getRequest().setRoleIds(null);
	request.getRequest().setWorkflows(null);
	request.getRequest().setStatus(Status.INACTIVE);
	SuccessResponse response = workFlowService.saveWorkflow(request);
	assertEquals(Constants.WORK_FLOW_SAVED, response.getMessage());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test saveWorkflow with success response")
    public void saveWorkflowTestException() {
//	SaveWorkflowRequest request = ScreenBuilderData.getSaveWorkflowRequest();
	SuccessResponse response = workFlowService.saveWorkflow(ScreenBuilderData.getSaveWorkflowModel());
	assertEquals(Constants.WORK_FLOW_SAVED, response.getMessage());
    }

    @Test
    @DisplayName("test fetchDynamicWorkFlowDetails with success response")
    public void fetchDynamicWorkFlowDetailsTest() {

	when(screenWorkFlowRepository.findByModuleIdAndSubModuleId(Mockito.anyString(), Mockito.anyString()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getScreenWorkFlow()));

	DynamicWorkFlowDetailsResponse response = workFlowService.fetchDynamicWorkFlowDetails("moduleId",
		"subModuleId");

	assertEquals("screenName", response.getFirstScreenName());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test fetchDynamicWorkFlowDetails with Exception")
    public void fetchDynamicWorkFlowDetailsTest2() {
	workFlowService.fetchDynamicWorkFlowDetails("moduleId", "subModuleId");
    }

    @Test
    @DisplayName("test cloneModuleWorkflow with success response")
    public void cloneModuleWorkflowTest() {

	when(screenWorkFlowRepository.findBySubModuleIdAndDeleted(Mockito.anyString(), Mockito.anyBoolean()))
		.thenReturn(Optional.ofNullable(ScreenBuilderData.getScreenWorkFlow()));
	when(screenRepository.findAllByIdIn(Mockito.any())).thenReturn(ScreenBuilderData.getScreens());
	when(subModuleRepository.save(Mockito.any())).thenReturn(ScreenBuilderData.getSubmodules().get());

	SuccessResponse response = workFlowService.cloneModuleWorkflow(ScreenBuilderData.getCloneModulesModel());

	assertEquals(Constants.WORKFLOW_CLONED_SUCCESSFULLY, response.getMessage());

    }

}
