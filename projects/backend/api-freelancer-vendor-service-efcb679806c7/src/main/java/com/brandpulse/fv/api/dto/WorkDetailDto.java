/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.dto;

import java.util.Date;
import javax.validation.constraints.NotBlank;
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
public class WorkDetailDto {
    
    private String id;
    
   @NotBlank
    private String company;
   
   
   @NotBlank
    private String designation;
   
   
   @NotBlank
    private String workDescription;
    
   
    private Date startDate;
   
    private Date endDate;
}
