package com.wavelabs.sb.model;

import java.util.Hashtable;
import java.util.List;

import com.wavelabs.sb.response.AxisInfo;

public class ChartsDataModel {
    private String id;
    private String name;
    private String type;
    private AxisInfo xAxis;
    private AxisInfo yAxis;
    private List<String> filters;
    private boolean switchRowsAndColumns;
    private boolean showOnDesktop;
    private List<Hashtable<String, Object>> charts;
    private int priority;

    public List<Hashtable<String, Object>> getCharts() {
	return charts;
    }

    public void setCharts(List<Hashtable<String, Object>> charts) {
	this.charts = charts;
    }

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

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public int getPriority() {
	return priority;
    }

    public void setPriority(int priority) {
	this.priority = priority;
    }


}
