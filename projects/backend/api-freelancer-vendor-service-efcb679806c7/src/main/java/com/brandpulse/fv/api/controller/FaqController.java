/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.controller;

import com.brandpulse.fv.api.dto.FaqCategoryDto;
import com.brandpulse.fv.app.faq.FaqService;
import com.brandpulse.fv.exception.ApiException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ts
 */
@RestController
@RequestMapping("api/v1/faqs")
public class FaqController {

    @Autowired
    FaqService faqService;

    @GetMapping("")
    public List<FaqCategoryDto> getListFaqCategoryWise() {
        try {
            
            return faqService.getFaqs();
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

}
