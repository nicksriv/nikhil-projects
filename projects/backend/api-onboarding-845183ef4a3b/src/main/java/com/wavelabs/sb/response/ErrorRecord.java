package com.wavelabs.sb.response;

import java.util.List;

public class ErrorRecord {

    private int rowId;
    private List<RowErrors> rowErrors;
    private String message;

    public ErrorRecord() {
    }

    public ErrorRecord(int rowId, String message) {
	this.rowId = rowId;
	this.message = message;
    }
    
    public ErrorRecord(int rowId, List<RowErrors> rowErrors) {
   	this.rowId = rowId;
   	this.rowErrors = rowErrors;
       }

    public int getRowId() {
	return rowId;
    }

    public void setRowId(int rowId) {
	this.rowId = rowId;
    }

    public String getMessage() {
	return message;
    }

    public void setMessage(String message) {
	this.message = message;
    }

    public List<RowErrors> getRowErrors() {
	return rowErrors;
    }

    public void setRowErrors(List<RowErrors> rowErrors) {
	this.rowErrors = rowErrors;
    }

}
