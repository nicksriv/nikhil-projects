package com.wavelabs.sb.controllers;

import static org.junit.Assert.assertEquals;

import static org.mockito.Mockito.when;

import java.util.Optional;

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

import com.wavelabs.sb.command.CreateChartCommand;
import com.wavelabs.sb.command.FetchAllChartsCommand;
import com.wavelabs.sb.command.FetchChartByModuleCommand;
import com.wavelabs.sb.command.FetchChartCommand;
import com.wavelabs.sb.command.UpdateChartCommand;
import com.wavelabs.sb.model.ChartsData;
import com.wavelabs.sb.model.ChartsDataModel;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.ListResponse;
import com.wavelabs.sb.response.ModuleChartsResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;

@RunWith(MockitoJUnitRunner.class)
public class ChartsControllerTest {

	@Mock
	AuthenticationService authenticationService;

	@Mock
	CreateChartCommand createChartCommand;

	@InjectMocks
	ChartsController chartsController;

	@Mock
	HttpServletRequest httpServletRequest;

	@Mock
	UpdateChartCommand updateChartCommand;

	@Mock
	FetchAllChartsCommand fetchAllChartsCommand;

	@Mock
	FetchChartCommand fetchChartCommand;
	
	@Mock
    FetchChartByModuleCommand fetchChartByModuleCommand;

	@Test
	@DisplayName("test createChartTest with success response")
	public void createChartTest() {

		when(createChartCommand.execute(Mockito.any())).thenReturn(ScreenBuilderData.getSuccessResponse());

		ResponseEntity<SuccessResponse> response = chartsController.createChart("Authorization",
				ChartsData.getCreateChartRequest(), httpServletRequest);
		assertEquals("message", response.getBody().getMessage());

	}
 
	@Test
	@DisplayName("test editChartTest with success response")
	public void editChartTest() {
		when(updateChartCommand.execute(Mockito.any())).thenReturn(ScreenBuilderData.getSuccessResponse());// ChartsData.getUpdateChartRequest()
		ResponseEntity<SuccessResponse> response = chartsController.editChart("Authorization",
				ChartsData.getUpdateChartRequest(), "718Y", httpServletRequest);
		assertEquals("message", response.getBody().getMessage());

	}

	@Test
	@DisplayName("test editChartTest with success response")
	public  void fetchAllChartsTest() {
		when(fetchAllChartsCommand.execute(Mockito.any())).thenReturn(ResponseEntity.status(HttpStatus.OK).body(ChartsData.getDataOfChatResponse()));
		ResponseEntity<ListResponse<ChartsDataModel>> response = chartsController.fetchAllCharts("Authorization",
		"718Y",httpServletRequest);
		assertEquals("message", response.getBody().getMessage());
	} 
	
	
	@Test
	@DisplayName("test editChartTest with success response")
	public  void getChartDetailsTest() {
		when(fetchChartCommand.execute(Mockito.any())).thenReturn(ChartsData.getModuleChartsResponse());
		ResponseEntity<ModuleChartsResponse> response = chartsController.getChartDetails("Authorization",
		"IdB",Optional.of("12-01-2021"),Optional.of("29-02-2021"),Optional.of("Java t point"),httpServletRequest);
		assertEquals("Shyam", response.getBody().getName());
	}
	@Test
	@DisplayName("test getModuleChartsTest with success response")
	public  void getModuleChartsTest() {
		when(fetchChartByModuleCommand.execute(Mockito.any())).thenReturn(ResponseEntity.status(HttpStatus.OK).body(ChartsData.getChartResponse()));
		ResponseEntity<ListResponse<ModuleChartsResponse>> response = chartsController.getModuleCharts("Authorization",
		"718Y",httpServletRequest);
		assertEquals("message", response.getBody().getMessage());
	}
	
	
	
	

}
