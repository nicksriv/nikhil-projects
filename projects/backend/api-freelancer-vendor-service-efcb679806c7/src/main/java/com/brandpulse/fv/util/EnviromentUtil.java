/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.util;

import com.brandpulse.fv.common.enums.Environment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 *
 * @author Suhail Tamboli
 */
@Component
public class EnviromentUtil {

    @Value("${app.environment}")
    private String environment;

    public boolean isProduction() {
        return Environment.PRODUCTION.toString().equals(environment);
    }
    
}
