package com.wavelabs.sb.response;

import java.util.List;

public class FetchChartResponse {

    private String id;
    private String name;
    private String type;
    private AxisInfo xAxis;
    private AxisInfo yAxis;
    private int priority;
    private List<String> filters;
    private boolean switchRowsAndColumns;
    private boolean showOnDesktop;

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getType() {
	return type;
    }

    public void setType(String type) {
	this.type = type;
    }

    public AxisInfo getxAxis() {
	return xAxis;
    }

    public void setxAxis(AxisInfo xAxis) {
	this.xAxis = xAxis;
    }

    public AxisInfo getyAxis() {
	return yAxis;
    }

    public void setyAxis(AxisInfo yAxis) {
	this.yAxis = yAxis;
    }

    public List<String> getFilters() {
	return filters;
    }

    public void setFilters(List<String> filters) {
	this.filters = filters;
    }

    public boolean isSwitchRowsAndColumns() {
	return switchRowsAndColumns;
    }

    public void setSwitchRowsAndColumns(boolean switchRowsAndColumns) {
	this.switchRowsAndColumns = switchRowsAndColumns;
    }

    public boolean isShowOnDesktop() {
	return showOnDesktop;
    }

    public void setShowOnDesktop(boolean showOnDesktop) {
	this.showOnDesktop = showOnDesktop;
    }

    public int getPriority() {
	return priority;
    }

    public void setPriority(int priority) {
	this.priority = priority;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

}
