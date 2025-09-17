package com.wavelabs.sb.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class DataBaseDownException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public DataBaseDownException(String message) {
		super(message);
	}

	public DataBaseDownException(String message, Throwable cause) {
		super(message, cause);
	}

}
