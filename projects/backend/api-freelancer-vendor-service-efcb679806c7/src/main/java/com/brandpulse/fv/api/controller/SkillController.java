/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.controller;

import com.brandpulse.fv.api.dto.SkillCategoriesDto;
import com.brandpulse.fv.api.dto.SkillDto;
import com.brandpulse.fv.app.skill.Skill;
import com.brandpulse.fv.app.skill.SkillCategory;
import com.brandpulse.fv.app.skill.SkillService;
import com.brandpulse.fv.exception.ApiException;
import com.brandpulse.fv.util.ClassUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ts
 */
@RestController
@RequestMapping("api/v1/skill")
public class SkillController {

    @Autowired
    SkillService skillService;

    @GetMapping("/skills")
    public Page<SkillDto> getSkills(Pageable pageable,
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) String skillsCategories) {
        
        try {
            
            Page<Skill> skills = skillService.getActiveSkill(pageable,skill,skillsCategories);
            Page<SkillDto> skillDtos = skills.map(s -> ClassUtil.convert(s, SkillDto.class));
            return skillDtos;
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("/skillsCategories")
    public Page<SkillCategoriesDto> getSkillCategories(Pageable pageable,
            @RequestParam(required = false) String skillsCategories) {
        
        try {
            Page<SkillCategory> skillCategory = skillService.getActiveSkillCategory(pageable,skillsCategories);
            Page<SkillCategoriesDto> skillDtos = skillCategory.map(sc -> ClassUtil.convert(sc, SkillCategoriesDto.class));
            return skillDtos;
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

}
