package com.wavelabs.sb.response;

import com.wavelabs.sb.enums.Status;

public class ReportColumnsResponse {
    private String columnId;

    private String columnName;
    private String columnType;

    private String subModuleId;

    private Status status;

    public String getColumnId() {
	return columnId;
    }

    public void setColumnId(String columnId) {
	this.columnId = columnId;
    }

    public String getColumnName() {
	return columnName;
    }

    public void setColumnName(String columnName) {
	this.columnName = columnName;
    }

    public String getSubModuleId() {
	return subModuleId;
    }

    public void setSubModuleId(String subModuleId) {
	this.subModuleId = subModuleId;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

    public String getColumnType() {
	return columnType;
    }

    public void setColumnType(String columnType) {
	this.columnType = columnType;
    }

}
