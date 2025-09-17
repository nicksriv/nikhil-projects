package com.wavelabs.sb.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.wavelabs.sb.enums.Status;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateUserResponse {

	private String id;
	private String message;
	private Status status;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

}
