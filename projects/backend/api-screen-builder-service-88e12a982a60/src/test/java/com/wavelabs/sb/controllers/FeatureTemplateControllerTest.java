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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.command.FetchAllFeatureTemplatesCommand;
import com.wavelabs.sb.command.GetFeatureTemplateByIdCommand;
import com.wavelabs.sb.command.SaveFeatureTemplateCommand;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.FeatureTemplateInfo;
import com.wavelabs.sb.response.FeatureTemplateResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.ScreenBuilderService;

@RunWith(MockitoJUnitRunner.class)
public class FeatureTemplateControllerTest {

    @InjectMocks
    FeatureTemplateController futureTemplateControllerTest;

    @Mock
    ScreenBuilderService screenBuilderService;

    @Mock
    SaveFeatureTemplateCommand saveFeatureTemplateCommand;

    @Mock
    FetchAllFeatureTemplatesCommand fetchAllFeatureTemplatesCommand;

    @Mock
    GetFeatureTemplateByIdCommand getFeatureTemplateByIdCommand;
    
    @Mock
    AuthenticationService authenticationService;
    
    @Mock
    HttpServletRequest httpServletRequest;
    
    @Test
    @DisplayName("test fetchAllFeatureTemplateDetails with success response")
    public void fetchAllFeatureTemplateDetailsTest() {
	when(fetchAllFeatureTemplatesCommand.execute(null))
		.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ScreenBuilderData.getFeatureTemplateResponse()));
	ResponseEntity<FeatureTemplateResponse> responseEntity = futureTemplateControllerTest
		.fetchAllFeatureTemplateDetails("authorization");
	assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    @DisplayName("test getFutureTemplateDetails with success response")
    public void getFeatureTemplateDetailsTest() {
	when(getFeatureTemplateByIdCommand.execute(Mockito.anyString()))
	.thenReturn(ResponseEntity.status(HttpStatus.OK).body(ScreenBuilderData.getFeatureTemplateRequest()));
	ResponseEntity<FeatureTemplateInfo> futureTemplateDetails = futureTemplateControllerTest
		.getFeatureTemplateDetails("authorization", "templateId");
	assertEquals(200, futureTemplateDetails.getStatusCodeValue());
    }

    @Test
    @DisplayName("test saveFeatureTemplate with success response")
    public void saveFeatureTemplate() throws IOException {
	when(saveFeatureTemplateCommand.execute(Mockito.any()))
	.thenReturn(ScreenBuilderData.getSuccessResponse());
	ResponseEntity<SuccessResponse> responseEntity = futureTemplateControllerTest
		.saveFeatureTemplate("authorization", ScreenBuilderData.getSaveFeatureTemplateRequest(), httpServletRequest);

	assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

}
