/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.exception;

/**
 *
 * @author Suhail Tamboli
 */
public class AuthException  extends RuntimeException {
    
    public AuthException(String exception){
        super(exception);
    }
    
    
    public AuthException(){
        super("Authentication failed");
    }
}
