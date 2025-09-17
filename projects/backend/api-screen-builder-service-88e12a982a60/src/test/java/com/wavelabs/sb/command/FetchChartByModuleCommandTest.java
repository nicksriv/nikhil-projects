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
import com.wavelabs.sb.response.ListResponse;
import com.wavelabs.sb.response.ModuleChartsResponse;
import com.wavelabs.sb.services.ChartService;
import com.wavelabs.sb.services.ReportService;

@RunWith(MockitoJUnitRunner.class)
public class FetchChartByModuleCommandTest {

    @Mock
    ChartService chartService;

    @InjectMocks
    FetchChartByModuleCommand fetchChartByModuleCommand;

    @Mock
    ReportService reportService;

    @Test
    @DisplayName("test fecthModuleChartsTest success response")
    public void fecthModuleChartsTest() {
	Mockito.when(chartService.fecthModuleCharts(Mockito.any())).thenReturn(ChartsData.listOfChartDetails());
	Mockito.when(chartService.fetchAllReports(Mockito.any())).thenReturn(ChartsData.giveFetchAllReports());

	ResponseEntity<ListResponse<ModuleChartsResponse>> response = fetchChartByModuleCommand
		.execute(ChartsData.getFetchReportChartsByModuleIdModel());
	assertEquals("Ram", response.getBody().getData().get(0).getName());
    }

}
