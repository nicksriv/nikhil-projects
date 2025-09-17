/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.exception;

/**
 *
 * @author Suhail Tamboli
 */
public class ApiException extends RuntimeException {
    
    public ApiException(String exception){
        super(exception);
    }
}
