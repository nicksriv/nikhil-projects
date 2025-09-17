package com.wavelabs.sb.response;

import java.util.List;

public class UserDashboardResponse {

    private LoginInfo login;
    private ReportingOrTeamInfo reporting;
    private List<ModulesInfo> modules;
    private List<ChartInfo> charts;

    public LoginInfo getLogin() {
	return login;
    }

    public void setLogin(LoginInfo login) {
	this.login = login;
    }

    public ReportingOrTeamInfo getReporting() {
	return reporting;
    }

    public void setReporting(ReportingOrTeamInfo reporting) {
	this.reporting = reporting;
    }

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
