package com.wavelabs.sb.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.FORBIDDEN)
public class AuthTokenMissingException extends UnauthorizedException {

	public AuthTokenMissingException(String errMsg) {
		super(errMsg);
	}
	
	public AuthTokenMissingException(String message, Throwable cause) {
        super(message, cause);
    }
}

