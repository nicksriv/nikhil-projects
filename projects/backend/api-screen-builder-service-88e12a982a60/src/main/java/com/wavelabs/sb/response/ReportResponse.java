package com.wavelabs.sb.response;

import java.util.List;

public class ReportResponse {

    private String name;
    private String id;
    private String icon;
    private List<String> filters;

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getIcon() {
	return icon;
    }

    public void setIcon(String icon) {
	this.icon = icon;
    }

    public List<String> getFilters() {
	return filters;
    }

    public void setFilters(List<String> filters) {
	this.filters = filters;
    }

}
