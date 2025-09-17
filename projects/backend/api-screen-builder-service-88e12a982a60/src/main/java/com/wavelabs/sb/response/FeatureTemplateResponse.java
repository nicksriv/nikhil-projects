package com.wavelabs.sb.response;

import java.util.List;

public class FeatureTemplateResponse {

	private List<FeatureTemplateInfo> data;
	private long total;

	public List<FeatureTemplateInfo> getData() {
		return data;
	}

	public void setData(List<FeatureTemplateInfo> data) {
		this.data = data;
	}

	public long getTotal() {
	    return total;
	}

	public void setTotal(long total) {
	    this.total = total;
	}

}
