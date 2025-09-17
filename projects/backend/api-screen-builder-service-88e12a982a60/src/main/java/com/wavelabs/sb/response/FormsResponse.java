package com.wavelabs.sb.response;

import java.util.List;
import java.util.Map;

public class FormsResponse {

    private List<Map<String, Object>> records;
    private long total;
    private String message;

    public FormsResponse(long total, List<Map<String, Object>> records, String message) {
	this.records = records;
	this.total = total;
	this.message = message;
    }

    public List<Map<String, Object>> getRecords() {
	return records;
    }

    public void setRecords(List<Map<String, Object>> records) {
	this.records = records;
    }

    public long getTotal() {
	return total;
    }

    public void setTotal(long total) {
	this.total = total;
    }

    public String getMessage() {
	return message;
    }

    public void setMessage(String message) {
	this.message = message;
    }

}
