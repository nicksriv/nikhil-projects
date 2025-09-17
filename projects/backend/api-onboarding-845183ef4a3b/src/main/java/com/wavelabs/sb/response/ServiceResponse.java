package com.wavelabs.sb.response;

public class ServiceResponse {

    private String message;
    private int statusCode;

    public ServiceResponse(int statusCode, String message) {
	this.message = message;
	this.statusCode = statusCode;
    }

    public String getMessage() {
	return message;
    }

    public void setMessage(String message) {
	this.message = message;
    }

    public int getStatusCode() {
	return statusCode;
    }

    public void setStatusCode(int statusCode) {
	this.statusCode = statusCode;
    }

}
