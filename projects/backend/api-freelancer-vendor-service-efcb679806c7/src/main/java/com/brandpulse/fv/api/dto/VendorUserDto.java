/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.dto;

import com.brandpulse.fv.common.childDocument.Address;
import com.brandpulse.fv.common.enums.Status;
import java.time.Instant;
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
public class VendorUserDto {

    private String id;
    private String vendorUserRefNo;
    
    private String firstName;
    private String middleName;
    private String lastName;
    private String profileImage;
    
    private String email;
    private String mobile;
    private Address address;
    private Status status;
    
    private String appVersion;
    private float vendorUserRating;
    
    
    private Instant lastLoginAt;
}
