package com.wavelabs.sb.command;

import org.junit.Test;


import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.services.ScreenBuilderService;

@RunWith(MockitoJUnitRunner.class)
public class AddSubmodulesCommandTest {

	@InjectMocks
	AddSubModuleCommand addSubmodulesCommand;

	@Mock
	ScreenBuilderService screenBuilderService;

	@Test
	@DisplayName("test addSubmodules success response")
	public void addSubmodulesCommandTest() {
		Mockito.when(screenBuilderService.createSubModule(Mockito.any())).thenReturn(ScreenBuilderData.getSuccessResponse());
		addSubmodulesCommand.execute(ScreenBuilderData.getCreateSubModuleModel());

	}

}
