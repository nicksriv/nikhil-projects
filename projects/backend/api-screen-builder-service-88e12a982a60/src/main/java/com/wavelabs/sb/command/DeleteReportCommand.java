package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.DeleteReportModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ReportService;

@Component
public class DeleteReportCommand implements Command<DeleteReportModel, SuccessResponse> {

    @Autowired
    ReportService reportService;

    public SuccessResponse execute(DeleteReportModel model) {
	return reportService.deleteReport(model);
    }
}
