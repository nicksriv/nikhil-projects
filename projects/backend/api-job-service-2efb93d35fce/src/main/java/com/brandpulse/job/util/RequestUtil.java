/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.util;

import java.net.InetAddress;
import java.net.UnknownHostException;
import javax.servlet.http.HttpServletRequest;
import org.springframework.util.StringUtils;
import com.blueconic.browscap.Capabilities;
import com.blueconic.browscap.UserAgentParser;
import com.blueconic.browscap.UserAgentService;

/**
 *
 * @author Suhail Tamboli
 */
public class RequestUtil {

    private RequestUtil() {
    }

    static String localHostIPV4 = "127.0.0.1";
    static String localHostIPV6 = "0:0:0:0:0:0:0:1";

    public static String getBrowser(HttpServletRequest request) {
        String browser = request.getHeader("User-Agent");
        try {
            UserAgentParser userAgentParser = new UserAgentService().loadParser();
            Capabilities parse = userAgentParser.parse(browser);
            return parse.getBrowser();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return null;
    }

    public static String getClientIp(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }

        if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }

        if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
            if (localHostIPV4.equals(ipAddress) || localHostIPV6.equals(ipAddress)) {
                try {
                    InetAddress inetAddress = InetAddress.getLocalHost();
                    ipAddress = inetAddress.getHostAddress();
                } catch (UnknownHostException exception) {
                    exception.printStackTrace();
                }
            }
        }

        if (!StringUtils.isEmpty(ipAddress) && ipAddress.length() > 15 && ipAddress.indexOf(",") >= -1) {
            ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
        }

        return ipAddress;
    }
}
