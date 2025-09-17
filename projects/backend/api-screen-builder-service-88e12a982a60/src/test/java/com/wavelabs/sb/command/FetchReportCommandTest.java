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
import com.wavelabs.sb.response.FetchReportResponse;
import com.wavelabs.sb.services.ReportService;

@RunWith(MockitoJUnitRunner.class)
public class FetchReportCommandTest {

	@InjectMocks
	FetchReportCommand fetchReportCommand;
	
	@Mock
	ReportService reportService;
	
	@Test
	@DisplayName("test fetchReportCommandCommandTest success response")
	public void fetchReportCommandCommandTest() {
		Mockito.when(reportService.fetchReport(Mockito.any())).thenReturn(ReportsDataBuilder.getFetchChatResponses());
		ResponseEntity<FetchReportResponse> response = fetchReportCommand
				.execute(ReportsDataBuilder.giveReportRequest());
		assertEquals("Junaid", response.getBody().getName());
	}
}
