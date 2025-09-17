package com.wavelabs.sb.request;

import java.util.List;

import com.wavelabs.sb.enums.Status;

public class ScreenFieldsRequest {

    private String hint;
    private String componentId;
    private boolean isFiltered;
    private boolean isVisibleOnTable;
    private Status status;
    private String type;
    private List<String> values;

    public String getHint() {
	return hint;
    }

    public void setHint(String hint) {
	this.hint = hint;
    }

    public String getComponentId() {
	return componentId;
    }

    public void setComponentId(String componentId) {
	this.componentId = componentId;
    }

    public boolean isFiltered() {
	return isFiltered;
    }

    public void setFiltered(boolean isFiltered) {
	this.isFiltered = isFiltered;
    }

    public boolean isVisibleOnTable() {
	return isVisibleOnTable;
    }

    public void setVisibleOnTable(boolean isVisibleOnTable) {
	this.isVisibleOnTable = isVisibleOnTable;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

    public String getType() {
	return type;
    }

    public void setType(String type) {
	this.type = type;
    }

    public List<String> getValues() {
	return values;
    }

    public void setValues(List<String> values) {
	this.values = values;
    }

}
