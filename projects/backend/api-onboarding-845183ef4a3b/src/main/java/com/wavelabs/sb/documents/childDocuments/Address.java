/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.wavelabs.sb.documents.childDocuments;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.wavelabs.sb.utils.OptionalPattern;

/**
 *
 * @author Suhail Tamboli
 */
@Getter
@Setter
@NoArgsConstructor
public class Address {
    
    private String location;
    @Pattern(message = "City should contain alphabets only", regexp = "^[a-zA-Z\\s]*$")
    private String city;
    
    @Pattern(message = "State should contain alphabets only", regexp = "^[a-zA-Z\\s]*$")
    private String state;
    
    @NotBlank(message = "Country is mandatory")
    private String country;

    
    @OptionalPattern(message = "pinCode must be of length 6 / cannot be started with Zero", regexp = "^[1-9]{1}[0-9]{5}$")
    private String pinCode;
}
