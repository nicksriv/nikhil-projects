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
public class UpdateChartCommandTest {

	@Mock
	ChartService chartService;
	
	@InjectMocks
	UpdateChartCommand updateChartCommand;
	
	@Test
	@DisplayName("test updateChartCommandTest success response")
	public void updateChartCommandTest() {
		Mockito.when(chartService.updateChart(Mockito.any())).thenReturn(ScreenBuilderData.getSuccessResponse());
		SuccessResponse response = updateChartCommand.execute(ChartsData.getUpdateChartModel());

		assertEquals("message", response.getMessage());
	}
}
