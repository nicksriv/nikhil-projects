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
import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.response.ModuleChartsResponse;
import com.wavelabs.sb.services.ChartService;

@RunWith(MockitoJUnitRunner.class)

public class FetchChartCommandTest {

	@InjectMocks
	FetchChartCommand fetchChartCommand;

	@Mock
	ChartService chartService;

	@Test
	@DisplayName("test fetchChartCommandTest success response")
	public void fetchChartCommandTest() {
		Mockito.when(chartService.fetchChart(Mockito.any())).thenReturn(ChartsData.getModuleChartsResponse());
		ModuleChartsResponse response = fetchChartCommand.execute(ReportsDataBuilder.giveReportsRequestModel());

		assertEquals("Shyam", response.getName());
	}
}
