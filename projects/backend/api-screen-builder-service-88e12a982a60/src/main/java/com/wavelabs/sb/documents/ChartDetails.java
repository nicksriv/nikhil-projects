package com.wavelabs.sb.documents;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chart-details")
public class ChartDetails extends BaseDocument {
    @Id
    private String id;
    private String reportId;
    private String name;
    private String type;
    private String xAxis;
    private String yAxis;
    private List<String> filters;
    private boolean desktop;
    private boolean rowColumn;
    private String createdBy;
    private String modifiedBy;
    private String clientId;
    private int priority;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getReportId() {
	return reportId;
    }

    public void setReportId(String reportId) {
	this.reportId = reportId;
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

    public String getxAxis() {
	return xAxis;
    }

    public void setxAxis(String xAxis) {
	this.xAxis = xAxis;
    }

    public String getyAxis() {
	return yAxis;
    }

    public void setyAxis(String yAxis) {
	this.yAxis = yAxis;
    }

    public List<String> getFilters() {
	return filters;
    }

    public void setFilters(List<String> filters) {
	this.filters = filters;
    }

    public boolean isDesktop() {
	return desktop;
    }

    public void setDesktop(boolean desktop) {
	this.desktop = desktop;
    }

    public boolean isRowColumn() {
	return rowColumn;
    }

    public void setRowColumn(boolean rowColumn) {
	this.rowColumn = rowColumn;
    }

    public String getCreatedBy() {
	return createdBy;
    }

    public void setCreatedBy(String createdBy) {
	this.createdBy = createdBy;
    }

    public String getModifiedBy() {
	return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
	this.modifiedBy = modifiedBy;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }


    public int getPriority() {
	return priority;
    }

    public void setPriority(int priority) {
	this.priority = priority;
    }


}
