package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.ReportColumnRequestModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ReportService;

@Component
public class SaveReportColumnsCommand implements Command<ReportColumnRequestModel, ResponseEntity<SuccessResponse>> {

    @Autowired
    ReportService reportService;

    public ResponseEntity<SuccessResponse> execute(ReportColumnRequestModel model) {
	return ResponseEntity.status(HttpStatus.OK).body(reportService.saveReportColumns(model));
    }

}
