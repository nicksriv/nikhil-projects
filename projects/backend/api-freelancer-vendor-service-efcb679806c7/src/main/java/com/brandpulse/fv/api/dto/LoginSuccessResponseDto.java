/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.api.dto;

import java.time.Instant;
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
public class LoginSuccessResponseDto {
    
    private String token;
    
    // user details
    private String firstName;
    private String middleName;
    private String lastName;
    
    private String profileImage;
    
    
    private int profileCompletionPercentage;
    private boolean isProfileCompleted;
    
    
    private Instant lastLoginAt;
    
    private float freelancerRating;
    private float vendorRating;
    private float vendorUserRating;
}
