/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.dto;

import com.brandpulse.fv.common.childDocument.Address;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
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
public class VendorUserRequestDto {

    @NotNull
    private String firstName;
    
    @NotNull
    private String middleName;
    
    @NotNull
    private String lastName;
    
    @NotNull
    private String email;
    
    @NotBlank
    @Pattern(message = "Please provide valid mobile", regexp = "^[0-9]+\\d{1,14}$")
    private String mobile;
    
    @NotNull
    private Address address;

}
