/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.dto;

import java.util.ArrayList;
import java.util.List;
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
public class FaqCategoryDto {
    
    private String id;
    private String faqcategoryName;
    
   private List<FaqDto> faqs = new ArrayList<>();

   public void addFaq(FaqDto fd) {
       faqs.add(fd);
   }
    
    
}
