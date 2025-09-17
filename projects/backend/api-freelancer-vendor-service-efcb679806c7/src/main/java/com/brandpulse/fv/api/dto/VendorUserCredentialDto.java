/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.dto;

import java.time.Instant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author dell
 */
@Getter
@Setter
@NoArgsConstructor
public class VendorUserCredentialDto {
    
    private String vendorUserId;
    private String userName;
    private Instant joiningDate;
    private String password;
    
}
