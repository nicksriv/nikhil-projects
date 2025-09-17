package com.wavelabs.sb.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

import com.wavelabs.sb.command.AddSubModuleCommand;
import com.wavelabs.sb.command.CreateModuleCommand;
import com.wavelabs.sb.command.DeleteSubModCommand;
import com.wavelabs.sb.command.FetchAllModAndSubModCommand;
import com.wavelabs.sb.command.FetchAllSubModCommand;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.FetchAllModAndSubModResponse;
import com.wavelabs.sb.response.FetchAllModulesResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.ScreenBuilderService;


@RunWith(MockitoJUnitRunner.class)
public class ModuleAndSubModuleControllerTest {
    
    @InjectMocks
    ModuleAndSubModuleController moduleAndSubModuleController;

    @Mock
    FetchAllSubModCommand fetchAllSubModCmd;

    @Mock
    AddSubModuleCommand addSubModuleCommand;

    @Mock
    ScreenBuilderService screenBuilderService;

    @Mock
    CreateModuleCommand createModuleCommand;
    
    @Mock
    DeleteSubModCommand deleteSubModCommand;

    @Mock
    AuthenticationService authenticationService;
    
    @Mock
    HttpServletRequest httpServletRequest;
    
    @Mock
    FetchAllModAndSubModCommand fetchAllModAndSubModCommand;
    
    @Test
    @DisplayName("test createSubModules success response")
    public void createSubModulesTest() {
	Mockito.when(addSubModuleCommand.execute(Mockito.any())).thenReturn(new SuccessResponse(""));
	moduleAndSubModuleController.createSubModules(ScreenBuilderData.getAddSubmoduleRequest(), "moduleId",
		"Authorization", httpServletRequest);
    }

    @Test
    @DisplayName("test fetchAllSubModules success response")
    public void fetchAllSubModulesTest() {
	Mockito.when(fetchAllSubModCmd.execute(Mockito.any())).thenReturn(ScreenBuilderData.getSubmodulesList());
	moduleAndSubModuleController.fetchAllSubModules("moduleId", "Authorization");
    }

    @Test
    @DisplayName("test updateSubModules with success response")
    public void updateSubmodulesTest() throws IOException {
	when(screenBuilderService.updateSubModules(Mockito.any(), Mockito.anyString(), Mockito.any()))
		.thenReturn(ScreenBuilderData.getSuccessResponse());
	moduleAndSubModuleController.updateSubModules("subModuleId", ScreenBuilderData.getUpdateSubmoduleRequest(),
		"authorization", httpServletRequest);

    }
    

    @Test
    @DisplayName("test createModuleTest with success response")
    public void createModuleTest() {
	when(createModuleCommand.execute(Mockito.any()))
		.thenReturn(ScreenBuilderData.getSuccessResponse());
	ResponseEntity<SuccessResponse> responseEntity = moduleAndSubModuleController
		.createModule(ScreenBuilderData.getCreateModuleRequest(), "authorization", httpServletRequest);
	assertEquals("message", responseEntity.getBody().getMessage());
    }

    @Test
    @DisplayName("test updateModuleTest with success response")
    public void updateModuleTest() {
	when(screenBuilderService.updateModule(Mockito.any(), Mockito.anyString(), Mockito.any()))
		.thenReturn(ScreenBuilderData.getSuccessResponse());
	ResponseEntity<SuccessResponse> responseEntity = moduleAndSubModuleController.updateModule("moduleId",
		ScreenBuilderData.getUpdateModuleRequest(), "authorization", httpServletRequest);
	assertEquals("message", responseEntity.getBody().getMessage());
    }

    @Test
    @DisplayName("test createModuleTest with success response")
    public void deleteModuleTest() {
	when(screenBuilderService.deleteModule(Mockito.anyString(), Mockito.any())).thenReturn(ScreenBuilderData.getSuccessResponse());
	ResponseEntity<SuccessResponse> responseEntity = moduleAndSubModuleController.deleteModule("moduleId",
		"authorization", httpServletRequest);
	assertEquals("message", responseEntity.getBody().getMessage());
    }


    @Test
    @DisplayName("test fetchAllModuleTest with success response")
    public void fetchAllModuleTest() {
	when(screenBuilderService.fetchAllModules(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.fetchAllModulesResponse());
	ResponseEntity<FetchAllModulesResponse> responseEntity = moduleAndSubModuleController.fetchAllModules("clientId",
		"authorization");
	assertEquals("module", responseEntity.getBody().getModules().get(0).getName());
    }

    
    @Test
    @DisplayName("test saveModule")
    public void saveModule() {
	when(screenBuilderService.saveModules(Mockito.any(), Mockito.any()))
		.thenReturn(ScreenBuilderData.getSuccessResponse());
	List<String> modules = Stream.of("Module1", "Module2", "Module3").collect(Collectors.toList());
	ResponseEntity<SuccessResponse> entity = moduleAndSubModuleController.saveModule("Authorization", modules,
		httpServletRequest);
	assertEquals("id", entity.getBody().getId());
	assertEquals("message", entity.getBody().getMessage());
    }
    
    @Test
    @DisplayName("test fetchAllModAndSubmod")
    public void fetchAllModAndSubmod() {
	when(fetchAllModAndSubModCommand.execute(Mockito.any()))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ScreenBuilderData.getFetchAllModAndSubModResponse()));
	ResponseEntity<FetchAllModAndSubModResponse> responseEntity = moduleAndSubModuleController
		.fetchAllModAndSubmod("clientId", "Authorization",httpServletRequest, ScreenBuilderData.getFetchAllModAndSubModRequest());
	assertEquals(1, responseEntity.getBody().getModules().size());
	assertEquals(10L, responseEntity.getBody().getSize());
    }

    /*
     * @Test
     * 
     * @DisplayName("test deleteSubModules with success response") public void
     * deleteSubModules() { when(deleteSubModCommand.execute(Mockito.any()))
     * .thenReturn("Deleted Successfully"); String deleteSubModules =
     * moduleAndSubModuleController.deleteSubModules("subModuleId", "authorization",
     * httpServletRequest); assertEquals("Deleted Successfully", deleteSubModules);
     * }
     * 
     * 
     * @Test
     * 
     * @DisplayName("test deleteSubModules with success response") public void
     * deleteSubModulesTest() { when(deleteSubModCommand.execute(Mockito.any()))
     * .thenReturn("Deleted Successfully"); String deleteSubModules =
     * moduleAndSubModuleController.deleteSubModules("subModuleId", "authorization",
     * httpServletRequest); assertEquals("Deleted Successfully", deleteSubModules);
     * }
     */
    @Test
    @DisplayName("test deleteSubModules with success response")
    public void deleteSubModulesTest2() {
	when(screenBuilderService.deleteSubModule(Mockito.anyString(), Mockito.anyString(), Mockito.any()))
	.thenReturn(ScreenBuilderData.getSuccessResponse());
	ResponseEntity<SuccessResponse> responseEntity = moduleAndSubModuleController.deleteSubModules("moduleId",
		"subModuleId", "authorization", httpServletRequest);
	assertEquals("id", responseEntity.getBody().getId());
	assertEquals("message", responseEntity.getBody().getMessage());
    }
}
