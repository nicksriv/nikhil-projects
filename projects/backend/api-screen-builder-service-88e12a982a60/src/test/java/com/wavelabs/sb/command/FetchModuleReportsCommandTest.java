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
import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.response.ModuleReportResponse;
import com.wavelabs.sb.services.ScreenBuilderService;

@RunWith(MockitoJUnitRunner.class)
public class FetchModuleReportsCommandTest {

	@Mock
	ScreenBuilderService screenBuilderService;

	@InjectMocks
	FetchModuleReportsCommand fetchModuleReportsCommand;
	
	@Test
	@DisplayName("test fetchModuleReportsCommandTest success response")
	public void fetchModuleReportsCommandTest() {
		Mockito.when(screenBuilderService.getReportsList(Mockito.any()))
				.thenReturn(ReportsDataBuilder.getModuleReportResponse());
		ResponseEntity<ModuleReportResponse> response = fetchModuleReportsCommand
				.execute(ChartsData.getFetchReportChartsByModuleIdModel());
		assertEquals("Star Icon", response.getBody().getReports().get(0).getIcon());
	}
}
