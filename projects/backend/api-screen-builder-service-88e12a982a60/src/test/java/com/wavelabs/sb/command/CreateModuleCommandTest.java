package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;


import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ScreenBuilderService;

@RunWith(MockitoJUnitRunner.class)
public class CreateModuleCommandTest {

    @InjectMocks
    CreateModuleCommand ceateModuleCommand;
    
    

    @Mock
    ScreenBuilderService screenBuilderService;

    @Test
    @DisplayName("test fetchAllSubmodules success response")
    public void createModuleCommandTest() {
	Mockito.when(screenBuilderService.createModule(Mockito.any()))
		.thenReturn(ScreenBuilderData.getSuccessResponse());
	SuccessResponse responseEntity = ceateModuleCommand
		.execute(ScreenBuilderData.getCreateModuleAndSubmoduleModel());
	assertEquals("id", responseEntity.getId());
	assertEquals("message", responseEntity.getMessage());
    }
}
