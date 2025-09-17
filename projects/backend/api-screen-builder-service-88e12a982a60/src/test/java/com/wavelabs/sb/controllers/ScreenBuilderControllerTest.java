package com.wavelabs.sb.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.command.CreateFormCommand;
import com.wavelabs.sb.command.DeleteFormCommand;
import com.wavelabs.sb.command.FetchAllFormsCommand;
import com.wavelabs.sb.command.FetchFromByIdCommand;
import com.wavelabs.sb.command.UpdateFormCommand;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.FormsResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.FormDataService;

@RunWith(MockitoJUnitRunner.class)
public class ScreenBuilderControllerTest {

    @InjectMocks
    ScreenBuilderController screenBuilderController;


    @Mock
    CreateFormCommand createFormCommand;

    @Mock
    FormDataService formDataService;

    @Mock
    DeleteFormCommand deleteFormCommand;

    @Mock
    UpdateFormCommand updateFormCommand;

    @Mock
    FetchAllFormsCommand fetchAllFormsCommand;

    @Mock
    FetchFromByIdCommand fetchFromByIdCommand;
    
    @Mock
    HttpServletRequest httpServletRequest;
    
    @Mock
    AuthenticationService authenticationService;

    /*
     * @Test
     * 
     * @DisplayName("test getRoles with success response") public void
     * getRolesTest() {
     * when(roleService.getRolesByClientId(Mockito.anyString())).thenReturn(
     * ScreenBuilderData.getRoleRes());
     * screenBuilderController.getRoles("Authorization", "clientId"); }
     */

    @Test
    @DisplayName("test saveFormDataByModule")
    public void saveFormDataByModule() {
	when(createFormCommand.execute(Mockito.any()))
		.thenReturn(ScreenBuilderData.getSuccessResponse());
	Map<String, Object> request = new HashMap<String, Object>();
	request.put("one", "one");
	request.put("two", "two");
	request.put("three", "three");
	ResponseEntity<SuccessResponse> responseEntity = screenBuilderController.saveFormDataByModule("Authorization",
		"moduleId", "workflowId",request, httpServletRequest);
	assertEquals("id", responseEntity.getBody().getId());
	assertEquals("message", responseEntity.getBody().getMessage());
    }

    @Test
    @DisplayName("test fetchAllForms")
    public void fetchAllFormsTest() {
	when(fetchAllFormsCommand.execute(Mockito.any()))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ScreenBuilderData.getFormsResponse()));
	Map<String, Object> request = new HashMap<String, Object>();
	request.put("one", "one");
	request.put("two", "two");
	request.put("three", "three");
	ResponseEntity<FormsResponse> responseEntity = screenBuilderController.fetchAllForms("Authorization",
		"moduleId", ScreenBuilderData.getFetchFormsRequest(),httpServletRequest);
	assertEquals(10L, responseEntity.getBody().getTotal());
    }

    @Test
    @DisplayName("test fetchAllFormsBySubModule")
    public void fetchAllFormsBySubModuleTest() {
	when(fetchAllFormsCommand.execute(Mockito.any()))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ScreenBuilderData.getFormsResponse()));
	Map<String, Object> request = new HashMap<String, Object>();
	request.put("one", "one");
	request.put("two", "two");
	request.put("three", "three");
	ResponseEntity<FormsResponse> responseEntity = screenBuilderController.fetchAllFormsBySubModule("Authorization",
		"moduleId", "subModuleId","mappedById", ScreenBuilderData.getFetchFormsRequest(),httpServletRequest);
	assertEquals(10L, responseEntity.getBody().getTotal());
    }

    @Test
    @DisplayName("test deleteFormDataByModule")
    public void deleteFormDataByModuleTest() {
	when(deleteFormCommand.execute(Mockito.any()))
		.thenReturn(ScreenBuilderData.getSuccessResponse());
	ResponseEntity<SuccessResponse> responseEntity = screenBuilderController.deleteFormDataByModule("Authorization",
		"moduleId", "formId", httpServletRequest);
	assertEquals("id", responseEntity.getBody().getId());
	assertEquals("message", responseEntity.getBody().getMessage());
    }

    @Test
    @DisplayName("test updateFormDataByModule")
    public void updateFormDataByModuleTest() {
	when(updateFormCommand.execute(Mockito.any()))
		.thenReturn(ScreenBuilderData.getSuccessResponse());
	Map<String, Object> form = new HashMap<String, Object>();
	form.put("one", "one");
	form.put("two", "two");
	form.put("three", "three");
	ResponseEntity<SuccessResponse> responseEntity = screenBuilderController.updateFormDataByModule("Authorization",
		"moduleId", form, "workflowId", "formId", httpServletRequest);
	assertEquals("id", responseEntity.getBody().getId());
	assertEquals("message", responseEntity.getBody().getMessage());
    }

    @Test
    @DisplayName("test saveFormDataByModuleAndSubModule")
    public void saveFormDataByModuleAndSubModuleTest() {
	when(createFormCommand.execute(Mockito.any()))
		.thenReturn(ScreenBuilderData.getSuccessResponse());
	Map<String, Object> form = new HashMap<String, Object>();
	form.put("one", "one");
	form.put("two", "two");
	form.put("three", "three");
	ResponseEntity<SuccessResponse> responseEntity = screenBuilderController.saveFormDataByModuleAndSubModule(
		"Authorization", "moduleId", "subModuleId", "workflowId", "jobId", form, httpServletRequest);
	assertEquals("id", responseEntity.getBody().getId());
	assertEquals("message", responseEntity.getBody().getMessage());
    }

    @Test
    @DisplayName("test fetchFromById")
    public void fetchFromByIdModuleTest() {
	when(fetchFromByIdCommand.execute(Mockito.any()))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ScreenBuilderData.getMapOfStringObject()));
	Map<String, Object> form = new HashMap<String, Object>();
	form.put("one", "one");
	form.put("two", "two");
	form.put("three", "three");
	ResponseEntity<Map<String, Object>> responseEntity = screenBuilderController.fetchFormById("Authorization",
		"moduleId", "formId");
	assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    @DisplayName("test fetchFromByIdModuleSubModule")
    public void fetchFromByIdModuleSubModuleTest() {
	when(fetchFromByIdCommand.execute(Mockito.any()))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ScreenBuilderData.getMapOfStringObject()));
	Map<String, Object> form = new HashMap<String, Object>();
	form.put("one", "one");
	form.put("two", "two");
	form.put("three", "three");
	ResponseEntity<Map<String, Object>> responseEntity = screenBuilderController.fetchFormById("Authorization",
		"moduleId", "subModuleId", "formId","mappedById",httpServletRequest);
	assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    @DisplayName("test updateFormDataByModuleAndSubModule")
    public void updateFormDataByModuleAndSubModuleTest() {
	when(updateFormCommand.execute(Mockito.any()))
		.thenReturn(ScreenBuilderData.getSuccessResponse());
	Map<String, Object> form = new HashMap<String, Object>();
	form.put("one", "one");
	form.put("two", "two");
	form.put("three", "three");
	ResponseEntity<SuccessResponse> responseEntity = screenBuilderController.updateFormDataByModuleAndSubModule(
		"Authorization", "moduleId", "subModuleId", "workflowId", form, "formId", "mappedById",httpServletRequest);
	assertEquals("id", responseEntity.getBody().getId());
	assertEquals("message", responseEntity.getBody().getMessage());
    }

    @Test
    @DisplayName("test deleteFormDataByModule")
    public void deleteFormDataByModuleAndSubModuleTest() {
	when(deleteFormCommand.execute(Mockito.any()))
		.thenReturn(ScreenBuilderData.getSuccessResponse());
	ResponseEntity<SuccessResponse> responseEntity = screenBuilderController.deleteFormDataByModuleAndSubModule(
		"Authorization", "moduleId", "subModuleId", "formId", httpServletRequest);
	assertEquals("id", responseEntity.getBody().getId());
	assertEquals("message", responseEntity.getBody().getMessage());
    }
}
