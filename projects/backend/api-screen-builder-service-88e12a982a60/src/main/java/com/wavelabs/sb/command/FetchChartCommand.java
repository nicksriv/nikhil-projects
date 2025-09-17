package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.ReportsRequestModel;
import com.wavelabs.sb.response.ModuleChartsResponse;
import com.wavelabs.sb.services.ChartService;

@Component
public class FetchChartCommand implements Command<ReportsRequestModel, ModuleChartsResponse> {
    @Autowired
    ChartService chartService;

    public ModuleChartsResponse execute(ReportsRequestModel model) {
	return chartService.fetchChart(model.getRequest());
    }

}
