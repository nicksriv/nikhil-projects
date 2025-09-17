package com.wavelabs.sb.response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class SaveScreenResponse {

    private String message;
    private String id;

    public SaveScreenResponse(String id, String message) {
	this.id = id;
	this.message = message;
    }
    
    public SaveScreenResponse(){
	
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
