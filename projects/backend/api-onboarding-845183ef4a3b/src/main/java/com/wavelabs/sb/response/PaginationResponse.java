package com.wavelabs.sb.response;

import java.util.List;

public class PaginationResponse<T> {

    private String message;
    private List<T> data;
    private Long size;

    public Long getSize() {
	return size;
    }

    public void setSize(Long size) {
	this.size = size;
    }

    public String getMessage() {
	return message;
    }

    public void setMessage(String message) {
	this.message = message;
    }

    public List<T> getData() {
	return data;
    }

    public void setData(List<T> data) {
	this.data = data;
    }

}
