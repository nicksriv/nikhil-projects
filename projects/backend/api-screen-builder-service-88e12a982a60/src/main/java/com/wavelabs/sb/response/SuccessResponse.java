package com.wavelabs.sb.response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class SuccessResponse {

    private String message;
    private String id;

    public SuccessResponse(String message) {
	this.message = message;
    }

    public SuccessResponse(String id, String message) {
	this.message = message;
	this.id = id;
    }

    public SuccessResponse() {
    }

    public String getMessage() {
	return message;
    }

    public void setMessage(String message) {
	this.message = message;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }
}
