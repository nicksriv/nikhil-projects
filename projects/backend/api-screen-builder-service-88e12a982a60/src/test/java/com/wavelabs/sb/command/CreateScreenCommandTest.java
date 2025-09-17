package com.wavelabs.sb.command;

import org.junit.Test;

import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.services.ScreenService;

@RunWith(MockitoJUnitRunner.class)
public class CreateScreenCommandTest {

    @InjectMocks
    CreateScreenCommand createScreenCommand;

    @Mock
    ScreenService screenService;

    @Test
    @DisplayName("test create screen success response")
    public void saveScreen() {
	Mockito.when(screenService.saveScreen(Mockito.any()))
	.thenReturn(ScreenBuilderData.getSaveScreenResponse());
	createScreenCommand.execute(ScreenBuilderData.getCreateScreenModel());
    }

}
