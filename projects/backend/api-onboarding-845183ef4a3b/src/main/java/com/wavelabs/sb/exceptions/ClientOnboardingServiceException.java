package com.wavelabs.sb.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class ClientOnboardingServiceException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ClientOnboardingServiceException(final String msg) {
	super(msg);
    }
}
