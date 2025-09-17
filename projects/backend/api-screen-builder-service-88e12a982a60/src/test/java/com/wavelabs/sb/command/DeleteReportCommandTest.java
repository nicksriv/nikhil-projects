package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ReportService;

@RunWith(MockitoJUnitRunner.class)
public class DeleteReportCommandTest {
	
	@InjectMocks
	DeleteReportCommand deleteReportCommand;
	
	@Mock
	ReportService reportService;
	
	@Test
	@DisplayName("test deleteReportCommandCommandTest success response")
	public void deleteReportCommandCommandTest() {
		Mockito.when(reportService.deleteReport(Mockito.any())).thenReturn(ScreenBuilderData.getSuccessResponse());
		SuccessResponse response = deleteReportCommand.execute(ReportsDataBuilder.getDeleteReportModel());
		assertEquals("message", response.getMessage());
	}


}
