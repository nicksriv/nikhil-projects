package com.wavelabs.sb.command;

import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.enums.request.FetchReportConfigurationsRequest;
import com.wavelabs.sb.mappers.ReportMapper;
import com.wavelabs.sb.model.ReportConfigurationModel;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class FetchAllReportConfigurationsCommand implements Command<FetchReportConfigurationsRequest, ResponseEntity<PaginationResponse<ReportConfigurationModel>>> {

    @Autowired
    ReportService reportService;

    @Override
    public ResponseEntity<PaginationResponse<ReportConfigurationModel>> execute(FetchReportConfigurationsRequest fetchReportConfigurationsRequest) {
        PaginationResponse<ReportConfigurations> fetchAll=reportService.fetchAll(fetchReportConfigurationsRequest);
        return ResponseEntity.ok(ReportMapper.toFetchResponse(fetchAll));
    }

}
