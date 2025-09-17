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
public class UpdateScreenCommandTest {

    @InjectMocks
    UpdateScreenCommand updateScreenCommand;

    @Mock
    ScreenService screenService;

    @Test
    @DisplayName("test update screen success response")
    public void updateScreen() {
	Mockito.when(screenService.updateScreen(Mockito.any()))
	.thenReturn(ScreenBuilderData.getSuccessResponse());
	updateScreenCommand.execute(ScreenBuilderData.getUpdateScreenModel());
    }

}
