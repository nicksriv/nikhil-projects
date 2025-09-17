package com.wavelabs.sb.response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class SuccessResponse {

    private String id;
    private String message;

    public SuccessResponse() {

    }

    public SuccessResponse(String id, String message) {
	this.id = id;
	this.message = message;
    }

    public SuccessResponse(String message) {
	this.message = message;
    }

    public String getMessage() {
	return message;
    }

    public void setMessage(String message) {
	this.message = message;
    }

    public static SuccessResponse newInstance(String message) {
	return new SuccessResponse(message);
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

}
