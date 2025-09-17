package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.UpdateChartModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ChartService;

@Component
public class UpdateChartCommand implements Command<UpdateChartModel, SuccessResponse>{

    @Autowired
    ChartService chartService;

    public SuccessResponse execute(UpdateChartModel updateChartModel) {
	return chartService.updateChart(updateChartModel);
    }
}
