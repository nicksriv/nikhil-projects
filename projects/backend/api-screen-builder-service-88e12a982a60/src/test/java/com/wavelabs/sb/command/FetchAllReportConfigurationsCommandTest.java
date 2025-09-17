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

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.model.ReportConfigurationModel;
import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.services.ReportService;

@RunWith(MockitoJUnitRunner.class)
public class FetchAllReportConfigurationsCommandTest {
	
	@Mock
	ReportService reportService;
	
	@InjectMocks
	FetchAllReportConfigurationsCommand fetchAllReportConfigurationsCommand;
	
	@Test
	@DisplayName("test fetchAllReportCommandCommandTest success response")
	public void fetchAllReportCommandCommandTest() {
		Mockito.when(reportService.fetchAll(Mockito.any())).thenReturn(ReportsDataBuilder.getpaginationnResponse());
		ResponseEntity<PaginationResponse<ReportConfigurationModel>> response = fetchAllReportConfigurationsCommand
				.execute(ReportsDataBuilder.getFetchReportConfiguration());
		assertEquals(Constants.RECORDS_FETCHED_SUCCESSFULLY, response.getBody().getMessage());
	}

}
