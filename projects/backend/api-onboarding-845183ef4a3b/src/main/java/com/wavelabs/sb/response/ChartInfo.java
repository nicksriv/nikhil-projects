package com.wavelabs.sb.response;

import java.util.List;

public class ChartInfo {
    private String type;
    private String id;
    private String name;
    private List<String> filters;

    public String getType() {
	return type;
    }

    public void setType(String type) {
	this.type = type;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public List<String> getFilters() {
	return filters;
    }

    public void setFilters(List<String> filters) {
	this.filters = filters;
    }

}
