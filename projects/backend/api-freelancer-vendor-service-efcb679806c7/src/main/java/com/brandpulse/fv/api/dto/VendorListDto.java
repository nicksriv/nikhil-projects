/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.dto;

import com.brandpulse.fv.common.childDocument.Address;
import com.brandpulse.fv.common.childDocument.SpocPerson;
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
public class VendorListDto {

    private String id;
    private String vendorRefNo;
    private String vendorName;
    private Address address;
    private SpocPerson spocDetail;
    private String status;

}
