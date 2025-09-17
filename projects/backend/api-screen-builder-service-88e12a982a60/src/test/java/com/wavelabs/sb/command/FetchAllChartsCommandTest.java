package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.model.ChartsData;
import com.wavelabs.sb.model.ChartsDataModel;
import com.wavelabs.sb.response.ListResponse;
import com.wavelabs.sb.services.ChartService;
import com.wavelabs.sb.services.ReportService;

@RunWith(MockitoJUnitRunner.class)
public class FetchAllChartsCommandTest {

	@Mock
	ChartService chartService;

	@InjectMocks
	FetchAllChartsCommand fetchAllChartsCommand;
	
	@Mock
	ReportService reportService;

	@Test
	@DisplayName("test fetchallChartsCommandTest success response")
	public void fetchallChartsCommandTest() {
		Mockito.when(chartService.fetchAllCharts(Mockito.anyString()))
				.thenReturn(ChartsData.ChartResponseChartDetails());
		
		ResponseEntity<ListResponse<ChartsDataModel>> response = fetchAllChartsCommand.execute(ChartsData.getFetchAllChartsModel());

		assertEquals("Records fetched successfully", response.getBody().getMessage());
	}
}
