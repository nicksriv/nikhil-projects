package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.FetchReportChartsByModuleIdModel;
import com.wavelabs.sb.response.ModuleReportResponse;
import com.wavelabs.sb.services.ScreenBuilderService;

@Component
public class FetchModuleReportsCommand
	implements Command<FetchReportChartsByModuleIdModel, ResponseEntity<ModuleReportResponse>> {

    @Autowired
    ScreenBuilderService screenBuilderService;
    
    public ResponseEntity<ModuleReportResponse> execute(FetchReportChartsByModuleIdModel model) {

	return ResponseEntity.status(HttpStatus.OK).body(screenBuilderService.getReportsList(model));
    }

}
