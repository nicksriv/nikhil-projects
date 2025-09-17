/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.ask;

import com.brandpulse.fv.api.dto.AskUsDto;
import com.brandpulse.fv.security.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ts
 */
@Service
public class AskUsService {
    
    @Autowired
    AskUsRepository askUsRepository;

    public void askUsList(AskUsDto askUsDto,Token token) {
        AskUs askUs = new AskUs();
        
        askUs.setAskTitle(askUsDto.getAskTitle());
        askUs.setAskUsDescription(askUsDto.getAskUsDescription());
        askUs.setUserId(token.getUserId());
        askUs.setUserType(token.getUserType());
       
        askUsRepository.save(askUs);
        
    }
    
}
