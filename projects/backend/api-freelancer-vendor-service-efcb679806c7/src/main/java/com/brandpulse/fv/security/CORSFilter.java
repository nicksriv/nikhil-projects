/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.security;

import com.brandpulse.fv.common.service.LoggerService;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 *
 * @author Suhail Tamboli
 */
@Component
public class CORSFilter extends OncePerRequestFilter {

    @Autowired
    private LoggerService loggerService;

    @Value("${server.allowOrigin}")
    String referrer;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        List<String> referrers = Arrays.asList(referrer.split(","));
        String referrerForCors = "";
        String host = "";

        try {
            host = request.getHeader("referer");

            for (int i = 0; i < referrers.size(); i++) {
                if (host != null && host.contains(referrers.get(i))) {
                    referrerForCors = referrers.get(i);
                }
            }
        } catch (Exception ex) {
            loggerService.logApi(ex.getMessage());
        }

        if (!referrer.isEmpty() && referrer.equals("*")) {
            referrerForCors = referrer;
        }

        //TODO: comment this on production
        response.setHeader("Access-Control-Allow-Origin", referrerForCors);
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE, PATCH");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "*");

        // go to the next filter in the filter chain
        chain.doFilter(request, response);
    }

}
