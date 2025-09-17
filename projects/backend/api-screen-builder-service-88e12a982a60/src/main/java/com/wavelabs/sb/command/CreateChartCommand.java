package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.CreateChartModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ChartService;

@Component
public class CreateChartCommand implements Command<CreateChartModel, SuccessResponse> {

    @Autowired
    ChartService chartService;

    public SuccessResponse execute(CreateChartModel createChartModel) {
	return chartService.createChart(createChartModel);
    }

}
