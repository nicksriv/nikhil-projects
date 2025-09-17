package com.wavelabs.sb.command;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.mappers.ChartMapper;
import com.wavelabs.sb.model.ChartsDataModel;
import com.wavelabs.sb.model.FetchAllChartsModel;
import com.wavelabs.sb.model.FetchReportColumnsModel;
import com.wavelabs.sb.response.ChartsResponse;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.response.ListResponse;
import com.wavelabs.sb.services.ChartService;
import com.wavelabs.sb.services.ReportService;

@Component
public class FetchAllChartsCommand
	implements Command<FetchAllChartsModel, ResponseEntity<ListResponse<ChartsDataModel>>> {

    @Autowired
    ChartService chartService;

    @Autowired
    ReportService reportService;

    @Override
    public ResponseEntity<ListResponse<ChartsDataModel>> execute(FetchAllChartsModel request) {
	ChartsResponse fetchAllCharts = chartService.fetchAllCharts(request.getReportId());
	FetchReportColumnsModel model = new FetchReportColumnsModel();
	model.setReportId(request.getReportId());
	List<ColumnsResponse> columns = reportService.fetchReportColumns(model);
	return ResponseEntity.ok(ChartMapper.fetchAllChartsResponse(fetchAllCharts, columns));
    }

}
