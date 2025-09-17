/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.exception;

import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 *
 * @author Suhail Tamboli
 */
@ControllerAdvice
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Object> handleApiException(ApiException ex, WebRequest request) {
        
        ErrorResponse response = new ErrorResponse(ex.getMessage(), ErrorCodeConstant.getErrorMessage(ex.getMessage()));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<Object> handleServiceException(ApiException ex, WebRequest request) {
        
        ErrorResponse response = new ErrorResponse(ex.getMessage(), ErrorCodeConstant.getErrorMessage(ex.getMessage()));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        
        ErrorResponse body = new ErrorResponse("FV400", "Please check errors in input");
        
        List<FieldError> fes = ex.getBindingResult().getFieldErrors();
        for(FieldError fe :  fes) {
            body.addSubError(fe.getField(), fe.getDefaultMessage());
            body.setMessage(fe.getDefaultMessage());
        } 
        
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }
    
}
