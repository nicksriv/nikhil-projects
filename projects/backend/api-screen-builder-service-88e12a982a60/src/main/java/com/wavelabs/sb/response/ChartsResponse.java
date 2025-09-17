package com.wavelabs.sb.response;

import java.util.Hashtable;
import java.util.List;

import com.wavelabs.sb.documents.ChartDetails;

public class ChartsResponse {

	private String message;
	private List<ChartDetails> data;
	private List<Hashtable<String, Object>> charts;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<ChartDetails> getData() {
		return data;
	}

	public void setData(List<ChartDetails> data) {
		this.data = data;
	}

	public List<Hashtable<String, Object>> getCharts() {
		return charts;
	}

	public void setCharts(List<Hashtable<String, Object>> charts) {
		this.charts = charts;
	}

}
