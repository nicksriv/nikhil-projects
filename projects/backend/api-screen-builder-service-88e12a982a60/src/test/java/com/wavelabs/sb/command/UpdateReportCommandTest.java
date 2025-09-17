package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.Test;

import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.ChartsData;
import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ReportService;

@RunWith(MockitoJUnitRunner.class)

public class UpdateReportCommandTest {

	@InjectMocks
	UpdateReportCommand updateReportCommand;

	@Mock
	ReportService reportService;

	@Test
	@DisplayName("test updateReportCommandTest success response")
	public void updateReportCommandTest() {
		Mockito.when(reportService.updateReport(Mockito.any())).thenReturn(ScreenBuilderData.getSuccessResponse());
		ResponseEntity<SuccessResponse> response = updateReportCommand
				.execute(ReportsDataBuilder.getUpdateReportModel());
		assertEquals("message", response.getBody().getMessage());

	}

	@Test
	@DisplayName("test updateReportCommand Exception Test")
	public void updateReportCommandExceptionTest() {
		Throwable response = assertThrows(BadRequestException.class, () -> {
			updateReportCommand.execute(ReportsDataBuilder.updateReportRequestData());
		});
		assertEquals(ErrorMessages.PLEASE_PROIVED_REPORT_FILTERS + String.join(",", Constants.REPORT_FILTERS_ARRAY),
				response.getMessage());

	}
}
