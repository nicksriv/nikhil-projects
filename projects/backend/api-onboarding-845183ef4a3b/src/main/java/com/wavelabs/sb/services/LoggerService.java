package com.wavelabs.sb.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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
