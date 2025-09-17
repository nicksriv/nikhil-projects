package com.wavelabs.sb.response;

import java.util.List;

public class ColumnsAndFiltersResponse {

    private List<FiltersResponse> filters;
    private List<ColumnsResponse> columns;

    public List<FiltersResponse> getFilters() {
	return filters;
    }

    public void setFilters(List<FiltersResponse> filters) {
	this.filters = filters;
    }

    public List<ColumnsResponse> getColumns() {
	return columns;
    }

    public void setColumns(List<ColumnsResponse> columns) {
	this.columns = columns;
    }

}
