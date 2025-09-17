package com.wavelabs.sb.request;

import java.util.Collections;
import java.util.List;

public class ReportsRequest {

	private String id;
	private String from;
	private String to;
	private List<String> sites;
	private List<String> userIds;
	private String chartId;

	public String getChartId() {
		return chartId;
	}

	public void setChartId(String chartId) {
		this.chartId = chartId;
	}

	public List<String> getUserIds() {
		return userIds;
	}

	public void setUserIds(List<String> userIds) {
		this.userIds = userIds;
	}

	public ReportsRequest() {
		sites = Collections.emptyList();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public List<String> getSites() {
		return sites;
	}

	public void setSites(List<String> sites) {
		this.sites = sites;
	}

}
