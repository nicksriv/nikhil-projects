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
public class FreelancerKYCDto {
    
    @NotBlank
    @Pattern(message = "Please provide valid Adhaar Number", regexp = "^[2-9]{1}[0-9]{11}$")
    private String adhaarNumber;
    
    @NotBlank
    @Pattern(message = "Please provide valid PanNumber", regexp = "[A-Z]{5}[0-9]{4}[A-Z]{1}")
    private String panNumber;

       
}
