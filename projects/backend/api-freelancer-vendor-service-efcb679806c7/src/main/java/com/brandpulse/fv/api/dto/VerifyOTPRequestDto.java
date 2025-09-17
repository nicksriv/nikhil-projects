/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.api.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Suhail Tamboli
 */
@NoArgsConstructor
@Getter
@Setter
public class VerifyOTPRequestDto {
    
    @NotBlank
    @Pattern(message = "Please provide valid mobile", regexp = "^[0-9]+\\d{1,14}$")
    private String mobile;
    
    @NotBlank
    @Pattern(message = "Please provide valid otp", regexp = "^[0-9]{6}$")
    private String otp;
    
    
    
    private float lat;
    private float lng;
    
    
    
    private String notificationId;
    private String appVersion;
    
}
