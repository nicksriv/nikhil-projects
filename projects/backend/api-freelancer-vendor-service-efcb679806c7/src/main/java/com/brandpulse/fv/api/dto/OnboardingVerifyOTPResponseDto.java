/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Suhail Tamboli
 */
@Getter
@Setter
@NoArgsConstructor
public class OnboardingVerifyOTPResponseDto {
    
    private String mobileVerifyId;
    private String emailVerifyId;
    
    public OnboardingVerifyOTPResponseDto(String mobileVerifyId, String emailVerifyId) {
        this.mobileVerifyId = mobileVerifyId;
        this.emailVerifyId = emailVerifyId;
    }

}
