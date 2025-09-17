package com.wavelabs.sb.command;

import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.documents.ReportColumns;
import com.wavelabs.sb.mappers.ReportMapper;
import com.wavelabs.sb.model.FetchReportColumnsModel;
import com.wavelabs.sb.model.ReportsRequestModel;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.services.DynamicReportsGenrationService;
import com.wavelabs.sb.services.ReportService;

@Component
public class ViewReportCommand implements Command<ReportsRequestModel, List<LinkedHashMap<String, Object>>> {

    @Autowired
    private DynamicReportsGenrationService dynamicReportGenrationService;

    @Autowired
    ReportService reportService;

    @Override
    public List<LinkedHashMap<String, Object>> execute(ReportsRequestModel model) {
	List<Hashtable<String, Object>> data = dynamicReportGenrationService.fetchReport(model.getRequest());
	ReportColumns reportColumns = reportService.getReportColumns(model.getRequest().getId());
	FetchReportColumnsModel request = new FetchReportColumnsModel();
	request.setReportId(model.getRequest().getId());
	List<ColumnsResponse> columns = reportService.getReportColumns(reportColumns,
		reportService.fetchReportColumns(request));
	return ReportMapper.getReport(data, reportColumns, columns);
    }

}
