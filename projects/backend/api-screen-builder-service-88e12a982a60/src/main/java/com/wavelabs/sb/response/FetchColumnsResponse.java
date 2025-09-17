package com.wavelabs.sb.response;

import java.util.List;

public class FetchColumnsResponse {

    List<ReportColumnsResponse> columns;

    public List<ReportColumnsResponse> getColumns() {
	return columns;
    }

    public void setColumns(List<ReportColumnsResponse> columns) {
	this.columns = columns;
    }

}
