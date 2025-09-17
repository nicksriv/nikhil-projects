/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.common.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 *
 * @author TS
 */
@Service
public class LoggerService {
    
    Logger log = LoggerFactory.getLogger(this.getClass());
    
    public void info(String msg){
        this.log.info(msg);
    }
    
    public void logApi(String msg){
        this.log.debug(msg);
    }
    
    
}
