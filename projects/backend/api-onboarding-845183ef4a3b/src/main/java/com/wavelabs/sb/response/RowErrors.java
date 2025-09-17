package com.wavelabs.sb.response;

public class RowErrors {

    private String columnName;
    private String errorMessage;

    public String getColumnName() {
	return columnName;
    }

    public void setColumnName(String columnName) {
	this.columnName = columnName;
    }

    public String getErrorMessage() {
	return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
	this.errorMessage = errorMessage;
    }

}
