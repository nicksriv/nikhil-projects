package com.wavelabs.sb.command;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.ReportColumns;
import com.wavelabs.sb.mappers.ReportMapper;
import com.wavelabs.sb.model.FetchReportColumnsModel;
import com.wavelabs.sb.model.ReportsRequestModel;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.services.DynamicReportsGenrationService;
import com.wavelabs.sb.services.ExcelService;
import com.wavelabs.sb.services.ReportService;

@Component
public class DownloadReportCommand implements Command<ReportsRequestModel, ResponseEntity<Resource>> {

    @Autowired
    DynamicReportsGenrationService reportsGenrationService;

    @Autowired
    ReportService reportService;

    @Override
    public ResponseEntity<Resource> execute(ReportsRequestModel request) {
	List<Hashtable<String, Object>> data = reportsGenrationService.fetchReport(request.getRequest());
	FetchReportColumnsModel model = new FetchReportColumnsModel();
	model.setReportId(request.getRequest().getId());
	model.setDetails(request.getDetails());
	List<ColumnsResponse> columnHeader = reportService.fetchReportColumns(model);
	List<LinkedHashMap<String, Object>> dataList = new ArrayList<>();
	if (model.getDetails() != null && Constants.USER.equalsIgnoreCase(model.getDetails().getTypeOfUser())
		&& !Constants.ADMIN.equalsIgnoreCase(model.getDetails().getUserRole())) {
	    ReportColumns reportColumns = reportService.getReportColumns(request.getRequest().getId());
	    List<ColumnsResponse> columns = reportService.getReportColumns(reportColumns, columnHeader);
	    dataList = ReportMapper.getReport(data, reportColumns, columns);
	}else {
	    dataList = ReportMapper.getReport(data, null, columnHeader);
	}
	String reportName = reportService.getReportName(request.getRequest().getId());
	reportName = reportName != null ? reportName + ".xls" : "Report.xls";
	InputStreamResource file = new InputStreamResource(ExcelService.getReport(columnHeader, dataList));
	return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + reportName)
		.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
    }

}
