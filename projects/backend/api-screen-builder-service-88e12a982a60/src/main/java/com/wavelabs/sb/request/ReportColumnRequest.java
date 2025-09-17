package com.wavelabs.sb.request;

import java.util.List;

import javax.validation.constraints.NotNull;

public class ReportColumnRequest {

    @NotNull(message = "Columns are mandatory")
    private List<String> columns;

    public List<String> getColumns() {
	return columns;
    }

    public void setColumns(List<String> columns) {
	this.columns = columns;
    }

}
