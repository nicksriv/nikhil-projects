/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.dto;

import com.brandpulse.fv.common.enums.UserType;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author ts
 */
@Getter
@Setter
@NoArgsConstructor
public class LoginVendorOrVendorUserRequestDto {
    
    @NotBlank
    private String userName;
    @NotBlank
    private String password;
    @NotBlank
    private UserType userType;
    
    
    
    private float lat;
    private float lng;
    
    
    
    private String notificationId;
    private String appVersion;

}
