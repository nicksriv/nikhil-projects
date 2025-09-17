package com.wavelabs.sb.response;

import java.util.List;

public class UserModulesResponse {

    private List<ModulesInfo> modules;
    private List<ChartInfo> charts;

    public List<ModulesInfo> getModules() {
	return modules;
    }

    public void setModules(List<ModulesInfo> modules) {
	this.modules = modules;
    }

    public List<ChartInfo> getCharts() {
	return charts;
    }

    public void setCharts(List<ChartInfo> charts) {
	this.charts = charts;
    }

}
