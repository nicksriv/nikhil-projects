/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.faq;

import com.brandpulse.fv.api.dto.FaqCategoryDto;
import com.brandpulse.fv.api.dto.FaqDto;
import com.brandpulse.fv.util.ClassUtil;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ts
 */
@Service
public class FaqService {

    @Autowired
    FaqRepository faqRepository;

    @Autowired
    FaqCategoriesRepository faqCategoriesRepository;

    public List<FaqCategoryDto> getFaqs() {
        List<Faq> faq = faqRepository.findAll();
        List<FaqDto> faqDto = ClassUtil.convertList(faq, FaqDto.class);
        List<String> faqCatergoryIds = faq.stream().map(f -> f.getFaqcategoryId()).collect(Collectors.toList());

        List<FaqCategories> faqCategorieses = faqCategoriesRepository.findByIdIn(faqCatergoryIds);
        List<FaqCategoryDto> faqCategoryDto = ClassUtil.convertList(faqCategorieses, FaqCategoryDto.class);

        for (FaqCategoryDto fcd : faqCategoryDto) {
            for (FaqDto fd : faqDto) {
                if (fd.getFaqcategoryId() != null && fd.getFaqcategoryId().equals(fcd.getId())) {
                    fcd.addFaq(fd);
                }
            }
        }
        return faqCategoryDto;
    }

}
