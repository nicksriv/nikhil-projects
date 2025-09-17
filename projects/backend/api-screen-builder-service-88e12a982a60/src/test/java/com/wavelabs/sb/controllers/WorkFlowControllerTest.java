package com.wavelabs.sb.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.mockito.Mockito.when;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.command.GetWorkFlowDetailsCommand;
import com.wavelabs.sb.command.SaveWorkflowCommand;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.DynamicWorkFlowDetailsResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.WorkFlowDetailsResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.WorkflowService;

@RunWith(MockitoJUnitRunner.class)
public class WorkFlowControllerTest {

    @InjectMocks
    WorkFlowController workFlowController;

    @Mock
    SaveWorkflowCommand saveWorkflowCommand;

    @Mock
    GetWorkFlowDetailsCommand getWorkFlowDetailsCommand;
    
    @Mock
    WorkflowService workflowService;
    
    @Mock
    AuthenticationService authenticationService;
    
    @Mock
    HttpServletRequest httpRequest;

    @Test
    @DisplayName("test saveWorkflows with success response")
    public void saveWorkflows() throws IOException {
	when(saveWorkflowCommand.execute(Mockito.any()))
		.thenReturn(ScreenBuilderData.getSuccessResponse());
	ResponseEntity<SuccessResponse> response = workFlowController.saveWorkflows("authorization",
		ScreenBuilderData.getSaveWorkflowRequest(), httpRequest);
	assertEquals("message", response.getBody().getMessage());
    }

    @Test
    @DisplayName("test getWorkFlowDetails with success response")
    public void getWorkFlowDetailsTest() {
	when(getWorkFlowDetailsCommand.execute(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getWorkFlowDetailsResponse());
	ResponseEntity<WorkFlowDetailsResponse> workFlowDetails = workFlowController.getWorkFlowDetails("authorization",
		"workflowId");
	assertEquals(200, workFlowDetails.getStatusCodeValue());
    }

    @Test
    @DisplayName("test getWorkFlowDetailsByModule with success response")
    public void getWorkFlowDetailsByModule() {
	when(workflowService.fetchDynamicWorkFlowDetails(Mockito.anyString(), Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getDynamicWorkFlowDetailsResponse());
	ResponseEntity<DynamicWorkFlowDetailsResponse> responseEntity = workFlowController
		.getWorkFlowDetailsByModule("authorization", "moduleId");
	assertEquals("testScreenName", responseEntity.getBody().getFirstScreenName());
    }
    
    @Test
    @DisplayName("test getWorkFlowDetailsByModuleSubModule with success response")
    public void getWorkFlowDetailsByModuleSubModule() {
	when(workflowService.fetchDynamicWorkFlowDetails(Mockito.anyString(), Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getDynamicWorkFlowDetailsResponse());
	ResponseEntity<DynamicWorkFlowDetailsResponse> responseEntity = workFlowController
		.getWorkFlowDetailsByModuleSubModule("authorization", "moduleId", "subModuleId");
	assertEquals("testScreenName", responseEntity.getBody().getFirstScreenName());
    }
    
}
