/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.wavelabs.sb.response;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

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
    
    
    @NotBlank(message = "BankName is mandatory")
    @Pattern(message = "BankName  should contain alpha numeric only ", regexp = "^[a-zA-Z0-9\\s]*$")
    @Size(min = 2, message = "Bank name must be more than 2 characters")
    private String bankName;
    
    @NotBlank(message = "AccountHolderName is mandatory")
    @Pattern(message = "AccountHolderName  should contain alpha numeric only ", regexp = "^[a-zA-Z0-9\\s]*$")
    @Size(min = 2, message = "AccountHolderName must be more than 2 characters")
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
