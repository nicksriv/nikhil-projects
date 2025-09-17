package com.wavelabs.sb.response;

import java.util.List;

public class FetchRecordsResponse {

    private List<FetchAllSubmodResponse> data;
    private int total;

    public List<FetchAllSubmodResponse> getData() {
	return data;
    }

    public void setData(List<FetchAllSubmodResponse> data) {
	this.data = data;
    }

    public int getTotal() {
	return total;
    }

    public void setTotal(int total) {
	this.total = total;
    }

}
