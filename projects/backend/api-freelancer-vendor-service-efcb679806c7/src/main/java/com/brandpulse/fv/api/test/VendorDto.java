/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.test;

import com.brandpulse.fv.common.childDocument.Address;
import com.brandpulse.fv.common.childDocument.SpocPerson;
import com.brandpulse.fv.common.enums.UserType;
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
public class VendorDto {

    private String userName;
    private String password;
    private String vendorName;
    private Address address;
    private SpocPerson spocDetail;
    
}
