package com.wavelabs.sb.response;

import java.util.List;

public class UserStatisticsResponse {

    private List<UserStatisticsChart> charts;
    private String clientId;
    private String clientName;
    private String id;

    public List<UserStatisticsChart> getCharts() {
	return charts;
    }

    public void setCharts(List<UserStatisticsChart> charts) {
	this.charts = charts;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getClientName() {
	return clientName;
    }

    public void setClientName(String clientName) {
	this.clientName = clientName;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

}
