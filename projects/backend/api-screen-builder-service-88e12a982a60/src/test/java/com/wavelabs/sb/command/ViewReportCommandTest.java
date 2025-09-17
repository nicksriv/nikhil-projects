package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.LinkedHashMap;
import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.model.ReportsDataBuilder;
import com.wavelabs.sb.services.DynamicReportsGenrationService;
import com.wavelabs.sb.services.ReportService;



@RunWith(MockitoJUnitRunner.class)
public class ViewReportCommandTest {
	
	
	@InjectMocks
	ViewReportCommand viewReportCommand;
	
	@Mock
	DynamicReportsGenrationService dynamicReportGenrationService;
	
	@Mock
	ReportService reportService;
	
	@Test
	@DisplayName("test viewReportCommandTest success response")
	public void viewReportCommandTest() {
		Mockito.when(dynamicReportGenrationService.fetchReport(Mockito.any()))
				.thenReturn(ReportsDataBuilder.getFetchReportsHashtable());
		List<LinkedHashMap<String, Object>> response = viewReportCommand.execute(ReportsDataBuilder.giveReportsRequestModel());
		assertEquals("value1", response.get(0).get("a"));
	}

}
