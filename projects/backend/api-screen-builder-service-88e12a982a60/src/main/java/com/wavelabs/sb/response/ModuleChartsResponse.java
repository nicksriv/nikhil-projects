package com.wavelabs.sb.response;

import java.util.Hashtable;
import java.util.List;

public class ModuleChartsResponse extends FetchChartResponse {
	private List<Hashtable<String, Object>> charts;

	public List<Hashtable<String, Object>> getCharts() {
		return charts;
	}

	public void setCharts(List<Hashtable<String, Object>> charts) {
		this.charts = charts;
	}

}
