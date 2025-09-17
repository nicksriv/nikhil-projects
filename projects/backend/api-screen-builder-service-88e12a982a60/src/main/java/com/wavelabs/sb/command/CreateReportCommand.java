package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.CreateReportModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ReportService;

@Component
public class CreateReportCommand implements Command<CreateReportModel, ResponseEntity<SuccessResponse>> {

    @Autowired
    ReportService reportService;

    public ResponseEntity<SuccessResponse> execute(CreateReportModel request) {
	return ResponseEntity.status(HttpStatus.OK).body(reportService.createReport(request));
    }

}
