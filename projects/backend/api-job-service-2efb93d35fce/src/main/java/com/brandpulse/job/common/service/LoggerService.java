/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.common.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

/**
 *
 * @author TS
 */
@Log4j2
@Service
public class LoggerService {
    
    
    
    public void info(String msg){
        this.log.info(msg);
    }
    
    public void error(String msg){
        this.log.error(msg);
    }
    
    public void logApi(String msg){
        this.log.debug(msg);
    }
    
    
}
