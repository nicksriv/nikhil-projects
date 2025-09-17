/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.api.dto;

import com.brandpulse.fv.common.childDocument.Address;
import com.brandpulse.fv.common.childDocument.SpocPerson;
import javax.validation.constraints.NotBlank;
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
public class VendorBasicProfileRequestDto {
    
    
    
    private Address address;
    
    private float experienceInYear;
    private String workHighlights;
    
    private SpocPerson spocDetails;
    
}
