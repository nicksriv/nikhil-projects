package com.wavelabs.sb.command;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.model.UpdateReportModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ReportService;

@Component
public class UpdateReportCommand implements Command<UpdateReportModel, ResponseEntity<SuccessResponse>> {

    @Autowired
    ReportService reportService;

    public ResponseEntity<SuccessResponse> execute(UpdateReportModel request) {
	checkFilters(request.getRequest().getFilter());
	return ResponseEntity.status(HttpStatus.OK).body(reportService.updateReport(request));
    }

    private void checkFilters(List<String> filters) {
	if (filters != null && !filters.isEmpty()) {
	    filters.forEach(filter -> {
		if (!Constants.REPORT_FILTERS_ARRAY.contains(filter)) {
		    throw new BadRequestException(ErrorMessages.PLEASE_PROIVED_REPORT_FILTERS
			    + String.join(",", Constants.REPORT_FILTERS_ARRAY));
		}
	    });
	}

    }
}
