/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author TS
 */
public class CommonUtil {

    private CommonUtil() {
    }

    public static String getRemoteAddr(HttpServletRequest request) {
        String ip = "";
        try {
            ip = request.getHeader("X-Forwarded-For");
            if (ip == null) {
                ip = "";
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        if (ip.equalsIgnoreCase("")) {
            ip = request.getRemoteAddr();
        }

        return ip;
    }

    public static String toBase64(String input) {
        return Base64.getEncoder().encodeToString(input.getBytes());
    }

    public static String toBase64(byte[] input) {
        return Base64.getEncoder().encodeToString(input);
    }

    public static String fromBase64(String input) {
        return new String(Base64.getDecoder().decode(input));
    }

    public static String getCurrentDateString() {
        DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();
        return dateFormat.format(date);
    }
}
