package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.model.ChartsData;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ChartService;

@RunWith(MockitoJUnitRunner.class)
public class CreateChartCommandTest {

	@InjectMocks
	CreateChartCommand createChartCommand;

	@Mock
	ChartService chartService;

	@Test
	@DisplayName("test addSubmodules success response")
	public void createChartCommandTest() {
		Mockito.when(chartService.createChart(Mockito.any())).thenReturn(ScreenBuilderData.getSuccessResponse());
		SuccessResponse response = createChartCommand.execute(ChartsData.getChartData());

		assertEquals("message", response.getMessage());
	}

}
