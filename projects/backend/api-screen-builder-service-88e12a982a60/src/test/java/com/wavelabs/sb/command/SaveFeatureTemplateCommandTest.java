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
public class SaveFeatureTemplateCommandTest {

    @InjectMocks
    SaveFeatureTemplateCommand saveFeatureTemplateCommand;

    @Mock
    ScreenBuilderService screenBuilderService;

    @Test
    @DisplayName("test save feature template command")
    public void saveFeatureTemplate() {
	Mockito.when(screenBuilderService.saveFeatureTemplate(Mockito.any()))
	.thenReturn(ScreenBuilderData.getFeatureTemplate());
	SuccessResponse response = saveFeatureTemplateCommand.execute(ScreenBuilderData.getFeatureTemplateModel());
	assertEquals("test-id", response.getId());
    }

}
