package com.wavelabs.sb.response;

import java.util.List;

public class PaginationResponse<T> {

    private String message;
    private List<T> configurations;
    private long total;

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

    public List<T> getConfigurations() {
        return configurations;
    }

    public void setConfigurations(List<T> configurations) {
        this.configurations = configurations;
    }
}
