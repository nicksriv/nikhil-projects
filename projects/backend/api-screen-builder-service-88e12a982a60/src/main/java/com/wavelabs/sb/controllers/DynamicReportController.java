package com.wavelabs.sb.controllers;

import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.blueconic.browscap.Capabilities;
import com.blueconic.browscap.UserAgentParser;
import com.wavelabs.sb.services.DynamicReportsGenrationService;

import eu.bitwalker.useragentutils.UserAgent;

//@RestController
public class DynamicReportController {
	private final String LOCALHOST_IPV4 = "127.0.0.1";
	private final String LOCALHOST_IPV6 = "0:0:0:0:0:0:0:1";

	@Autowired
	private DynamicReportsGenrationService dynamicReportService;
	
	@Autowired
	private UserAgentParser userAgentParser;

	@GetMapping("/api/v1/reports")
	public ResponseEntity<String> genrateReport(HttpServletRequest request) {
		System.out.println("Client Address : " + request.getRemoteAddr());
		String header = request.getHeader("X-Real-IP");
		System.out.println("Address :" + getClientIp(request));

		String browser = request.getHeader("User-Agent");
		String ip = request.getHeader("True-Client-IP");
		System.out.println("IP addess : " + ip);
		System.out.println("Browser " + browser);

		try {
			long currentTimeMillis = System.currentTimeMillis();
			UserAgent parseUserAgentString = UserAgent.parseUserAgentString(browser);
//			final UserAgentParser parser = new UserAgentService().loadParser();
			Capabilities parse = userAgentParser.parse(browser);
			System.out.println("Browser : " + parseUserAgentString.getBrowser());
			System.out.println("Browser : " + parse.getBrowser());
			System.out.println("Time Taken to Parse the Browser in Secounds"
					+ ((System.currentTimeMillis() - currentTimeMillis) / 1000));
//			System.out.println("Browser Type : "+parse.getBrowserType());
//			System.out.println("Deice Type : "+parse.getDeviceType());
//			System.out.println("Platform : "+parse.getPlatform());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		dynamicReportService.fetchReport();
		return ResponseEntity.ok("Done");
	}

	public String getClientIp(HttpServletRequest request) {
		String ipAddress = request.getHeader("X-Forwarded-For");
		if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("Proxy-Client-IP");
		}

		if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("WL-Proxy-Client-IP");
		}

		if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getRemoteAddr();
			if (LOCALHOST_IPV4.equals(ipAddress) || LOCALHOST_IPV6.equals(ipAddress)) {
				try {
					InetAddress inetAddress = InetAddress.getLocalHost();
					ipAddress = inetAddress.getHostAddress();
				} catch (UnknownHostException e) {
					e.printStackTrace();
				}
			}
		}

		if (!StringUtils.isEmpty(ipAddress) && ipAddress.length() > 15 && ipAddress.indexOf(",") > 0) {
			ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
		}

		return ipAddress;
	}

}
