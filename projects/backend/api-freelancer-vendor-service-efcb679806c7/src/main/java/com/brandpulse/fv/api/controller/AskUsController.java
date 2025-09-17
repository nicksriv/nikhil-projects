/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.controller;

import com.brandpulse.fv.api.dto.AskUsDto;
import com.brandpulse.fv.app.ask.AskUsService;
import com.brandpulse.fv.common.dto.CommonResponseDto;
import com.brandpulse.fv.exception.ApiException;
import com.brandpulse.fv.security.AuthenticationService;
import com.brandpulse.fv.security.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ts
 */
@RestController
@RequestMapping("api/v1/ask/")
public class AskUsController {

    @Autowired
    AuthenticationService authenticationService;
    
    @Autowired
    AskUsService askUsService;

    @PostMapping("askUs")
    public CommonResponseDto listAsk(@RequestBody AskUsDto aud) {
        try {
            Token token = authenticationService.getFreelancerOrVendorToken();
            askUsService.askUsList(aud, token);
            
            return new CommonResponseDto("Your response has been recorded");
        } catch (Exception e) {
            throw new ApiException(e.getMessage());
        }

    }
}
