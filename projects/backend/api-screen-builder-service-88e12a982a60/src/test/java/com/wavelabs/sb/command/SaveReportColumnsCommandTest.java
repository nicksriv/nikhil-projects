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

import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ReportService;

@RunWith(MockitoJUnitRunner.class)
public class SaveReportColumnsCommandTest {

	@Mock
	ReportService reportService;
	
	@InjectMocks
	SaveReportColumnsCommand saveReportColumnsCommand;
	
	@Test
	@DisplayName("test saveReportColumnsCommandTest success response")
	public void saveReportColumnsCommandTest() {
		Mockito.when(reportService.saveReportColumns(Mockito.any()))
				.thenReturn(ScreenBuilderData.getSuccessResponse());
		ResponseEntity<SuccessResponse> response = saveReportColumnsCommand
				.execute(ReportsDataBuilder.getAllColumnModel());
		assertEquals("message", response.getBody().getMessage());
	}
}
