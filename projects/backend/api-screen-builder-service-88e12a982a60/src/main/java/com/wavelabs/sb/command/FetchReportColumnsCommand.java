package com.wavelabs.sb.command;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.FetchReportColumnsModel;
import com.wavelabs.sb.response.ColumnsResponse;
import com.wavelabs.sb.services.ReportService;

@Component
public class FetchReportColumnsCommand implements Command<FetchReportColumnsModel, ResponseEntity<List<ColumnsResponse>>> {

    @Autowired
    ReportService reportService;

    public ResponseEntity<List<ColumnsResponse>> execute(FetchReportColumnsModel model) {
	return ResponseEntity.status(HttpStatus.OK).body(reportService.fetchReportColumns(model));
    }

}
