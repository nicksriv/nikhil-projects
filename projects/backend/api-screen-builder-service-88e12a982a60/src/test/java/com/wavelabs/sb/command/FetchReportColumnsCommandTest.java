package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.services.ReportService;

@RunWith(MockitoJUnitRunner.class)
public class FetchReportColumnsCommandTest {
	@Mock
	ReportService reportService;
	
	@InjectMocks
	FetchReportColumnsCommand fetchReportColumnsCommand;
	
	@Test
	@DisplayName("test fetchReportColumnsCommandTest success response")
	public void fetchReportColumnsCommandTest() {
		Mockito.when(reportService.fetchReportColumns(Mockito.any()))
				.thenReturn(ReportsDataBuilder.getColumnsResponse());
		ResponseEntity<List<ColumnsResponse>> response = fetchReportColumnsCommand
				.execute(ReportsDataBuilder.getFetchReportColumnsModelData());
		assertEquals("ComponentId", response.getBody().get(0).getComponentId());
	}
	
}
