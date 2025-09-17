package com.brandpulse.job.exception;

import java.util.ArrayList;
import java.util.Date;
import lombok.Getter;

@Getter
public class ErrorResponse {
    
    private int error;
    private String code;
    private String message;
    private ArrayList<SubError> errors;
    private Date timestamp;

    public ErrorResponse(String code, String message) {
        super();
        
        this.error = 1;
        this.code = code;
        this.message = message;
        this.timestamp = new Date();
        this.errors = new ArrayList<>();
    }
    
    public void addSubError(String code, String message) {
        this.errors.add(new SubError(code, message));
    }
}

@Getter
class SubError {
    private String code;
    private String message;
    
    public SubError(String code, String message) {
        this.code = code;
        this.message = message;
    }
}