/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.wavelabs.sb.utils;


import java.util.Base64;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author TS
 */
public class CommonUtil {
    
    public static String getRemoteAddr(HttpServletRequest request){
        String ip = "";
        try{
            ip = request.getHeader("X-Forwarded-For");
            if(ip == null){
                ip = "";
            }
        }catch(Exception ex){}
        
        if(ip.equalsIgnoreCase("")){
            ip = request.getRemoteAddr();
        }
        
        return ip;
    }
    
    public static String toBase64(String input){
        return Base64.getEncoder().encodeToString(input.getBytes());
    }
    
    public static String toBase64(byte[] input){
        return Base64.getEncoder().encodeToString(input);
    }
    
    public static String fromBase64(String input){
        return new String(Base64.getDecoder().decode(input));
    }
}
