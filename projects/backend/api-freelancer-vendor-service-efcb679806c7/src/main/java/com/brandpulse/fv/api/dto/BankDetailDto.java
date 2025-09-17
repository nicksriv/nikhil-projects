/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.dto;

import javax.validation.constraints.NotBlank;
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
public class BankDetailDto {
    
    
    @NotBlank
    private String bankName;
    
    @NotBlank
    private String accountHolderName;
    
    @NotBlank
    @Pattern(message = "Please provide valid Account Number", regexp = "^[0-9]{9,18}$")
    private String accountNumber;
    
    @NotBlank
    @Pattern(message = "Please provide valid IFSC code", regexp = "^[A-Z]{4}0[A-Z0-9]{6}$")
    private String ifscCode;
    
    @NotBlank
    private String branch;
    
}
