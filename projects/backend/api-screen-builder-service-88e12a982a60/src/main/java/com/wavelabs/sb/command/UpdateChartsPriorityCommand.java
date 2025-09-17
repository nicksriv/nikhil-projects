package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.ChartsPriorityRequestModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ChartService;

@Component 
public class UpdateChartsPriorityCommand
	implements Command<ChartsPriorityRequestModel, ResponseEntity<SuccessResponse>> {

    @Autowired
    ChartService chartService;
    
    public ResponseEntity<SuccessResponse> execute(ChartsPriorityRequestModel model) {
	return ResponseEntity.status(HttpStatus.OK).body(chartService.updateChartPriority(model));
    }

}
