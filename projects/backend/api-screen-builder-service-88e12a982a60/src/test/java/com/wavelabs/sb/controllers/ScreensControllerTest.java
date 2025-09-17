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

import com.wavelabs.sb.command.CreateScreenCommand;
import com.wavelabs.sb.command.GetFormBuilderCommand;
import com.wavelabs.sb.command.UpdateScreenCommand;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.FetchFormResponse;
import com.wavelabs.sb.response.SaveScreenResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;

@RunWith(MockitoJUnitRunner.class)
public class ScreensControllerTest {

    @InjectMocks
    ScreensController screensController;
    
    @Mock
    CreateScreenCommand createScreenCommand;

    @Mock
    UpdateScreenCommand updateScreenCommand;

    @Mock
    GetFormBuilderCommand getFormBuilderCommand;
    
    @Mock
    AuthenticationService authenticationService;
    
    @Mock
    HttpServletRequest httpRequest;
    
    @Test
    @DisplayName("test createScreen with success response")
    public void createScreen() throws IOException {
	when(createScreenCommand.execute(Mockito.any()))
		.thenReturn(ScreenBuilderData.getSaveScreenResponse());
	ResponseEntity<SaveScreenResponse> response = screensController.createScreen("authorization",
		ScreenBuilderData.getCreateScreenRequest(), httpRequest);
	assertEquals("message", response.getBody().getMessage());
    }

    @Test
    @DisplayName("test updateScreen with success response")
    public void updateScreenTest() {
	when(updateScreenCommand.execute(Mockito.any()))
		.thenReturn(ScreenBuilderData.getSuccessResponse());
	ResponseEntity<SuccessResponse> response = screensController.updateScreen("authorization",
		ScreenBuilderData.getUpdateScreenRequest(), httpRequest);
	assertEquals("message", response.getBody().getMessage());
    }


    @Test
    @DisplayName("test getFormBuilder with success response")
    public void getFormBuilderTest() {
	when(getFormBuilderCommand.execute(Mockito.anyString())).thenReturn(ScreenBuilderData.getFormBuilder());
	ResponseEntity<FetchFormResponse> workFlowDetails = screensController.getFormById("authorization",
		"subModuleId");
	assertEquals(200, workFlowDetails.getStatusCodeValue());
    }

}
