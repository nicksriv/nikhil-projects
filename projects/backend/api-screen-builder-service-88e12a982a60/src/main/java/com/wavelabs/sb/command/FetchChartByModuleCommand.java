package com.wavelabs.sb.command;

import java.util.Hashtable;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.documents.ChartDetails;
import com.wavelabs.sb.mappers.ChartMapper;
import com.wavelabs.sb.model.FetchReportChartsByModuleIdModel;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.response.ListResponse;
import com.wavelabs.sb.response.ModuleChartsResponse;
import com.wavelabs.sb.services.ChartService;
import com.wavelabs.sb.services.ReportService;

@Component
public class FetchChartByModuleCommand
	implements Command<FetchReportChartsByModuleIdModel, ResponseEntity<ListResponse<ModuleChartsResponse>>> {

    @Autowired
    ChartService chartService;

    @Autowired
    ReportService reportService;

    public ResponseEntity<ListResponse<ModuleChartsResponse>> execute(FetchReportChartsByModuleIdModel model) {

	List<ChartDetails> fetchAllCharts = chartService.fecthModuleCharts(model);
	Hashtable<String, List<Hashtable<String, Object>>> fetchAllReports = chartService
		.fetchAllReports(fetchAllCharts);
	List<ColumnsResponse> reportColumns = reportService.fetchAllChartColumns(
		fetchAllCharts.stream().map(ChartDetails::getReportId).collect(Collectors.toList()));

	return ResponseEntity.status(HttpStatus.OK)
		.body(ChartMapper.fetchAllModuleChartsResponse(fetchAllCharts, fetchAllReports,reportColumns));
    }

}
