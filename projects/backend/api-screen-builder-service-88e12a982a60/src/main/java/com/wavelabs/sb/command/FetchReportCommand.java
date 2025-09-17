package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.request.ReportsRequest;
import com.wavelabs.sb.response.FetchReportResponse;
import com.wavelabs.sb.services.ReportService;

@Component
public class FetchReportCommand implements Command<ReportsRequest, ResponseEntity<FetchReportResponse>> {
    @Autowired
    ReportService reportService;

    public ResponseEntity<FetchReportResponse> execute(ReportsRequest request) {
	return ResponseEntity.status(HttpStatus.OK).body(reportService.fetchReport(request));
    }

}
