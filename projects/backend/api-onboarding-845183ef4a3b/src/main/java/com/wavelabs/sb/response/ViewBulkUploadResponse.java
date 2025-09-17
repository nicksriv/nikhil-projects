package com.wavelabs.sb.response;

import java.util.List;

public class ViewBulkUploadResponse {

    private String message;
    private List<ErrorRecord> errors;
    private long successRecordsCount;
    private long failedRecordsCount;
    private long totalRecordsCount;

    public String getMessage() {
	return message;
    }

    public void setMessage(String message) {
	this.message = message;
    }

    public List<ErrorRecord> getErrors() {
	return errors;
    }

    public void setErrors(List<ErrorRecord> errors) {
	this.errors = errors;
    }

    public long getSuccessRecordsCount() {
	return successRecordsCount;
    }

    public void setSuccessRecordsCount(long successRecordsCount) {
	this.successRecordsCount = successRecordsCount;
    }

    public long getFailedRecordsCount() {
	return failedRecordsCount;
    }

    public void setFailedRecordsCount(long failedRecordsCount) {
	this.failedRecordsCount = failedRecordsCount;
    }

    public long getTotalRecordsCount() {
	return totalRecordsCount;
    }

    public void setTotalRecordsCount(long totalRecordsCount) {
	this.totalRecordsCount = totalRecordsCount;
    }

}
