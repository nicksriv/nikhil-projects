/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.skill;

import com.brandpulse.fv.api.dto.SkillCategoryDto;
import com.brandpulse.fv.api.dto.SkillDto;
import com.brandpulse.fv.common.childDocument.AssociatedSkill;
import com.brandpulse.fv.util.ClassUtil;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

/**
 *
 * @author ts
 */
@Service
public class SkillService {

    @Autowired
    SkillRepository skillRepository;

    @Autowired
    SkillCategoryRepository skillCategoryRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Skill> getActiveSkillByIds(List<String> skillIds) {

        List<Skill> skills = skillRepository.findByIdInAndIsActive(skillIds, true);
        return skills;
    }

    public List<SkillCategory> getActiveSkillCategoryByIds(List<String> skillCategoryIds) {

        List<SkillCategory> skillCategories = skillCategoryRepository.findByIdInAndIsActive(skillCategoryIds, true);
        return skillCategories;
    }

    public List<SkillDto> getActiveSkillByAssociatedSkill(List<AssociatedSkill> freelancerSkill) {
        List<String> skillIds = freelancerSkill.stream().map(as -> as.getId()).collect(Collectors.toList());

        List<Skill> skills = getActiveSkillByIds(skillIds);

        List<SkillDto> skillDto = ClassUtil.convertList(skills, SkillDto.class);

        for (int i = 0; i < skillDto.size(); i++) {

            for (int j = 0; j < freelancerSkill.size(); j++) {

                if (skillDto.get(i).getId().equals(freelancerSkill.get(j).getId())) {

                    SkillDto a = skillDto.get(i);
                    a.setExperience(freelancerSkill.get(j).getExperience());
                    skillDto.set(j, a);
                }
            }
        }

        return skillDto;
    }

    public List<SkillCategoryDto> getSkillCategory(List<AssociatedSkill> freelancerSkill) {

        // get all the skills
        List<String> skillIds = freelancerSkill.stream().map(as -> as.getId()).collect(Collectors.toList());
        List<Skill> skills = getActiveSkillByIds(skillIds);
        List<String> skillCatergoryIds = new ArrayList<>();

        for (int i = 0; i < skills.size(); i++) {
            if (skills.get(i).getSkillCategoryId() != null) {
                skillCatergoryIds.add(skills.get(i).getSkillCategoryId());
            }
        }

        List<SkillCategory> skillCategories = skillCategoryRepository.findByIdInAndIsActive(skillCatergoryIds, true);

        List<SkillCategoryDto> skillCategoryDtos = ClassUtil.convertList(skillCategories, SkillCategoryDto.class);
        List<SkillDto> skillDtos = ClassUtil.convertList(skills, SkillDto.class);

        //map experience
        for (SkillDto sd : skillDtos) {

            for (AssociatedSkill as : freelancerSkill) {
                if (as.getId().equals(sd.getId())) {
                    sd.setExperience(as.getExperience());
                }
            }
        }

        // add skills to category
        for (SkillCategoryDto scd : skillCategoryDtos) {
            for (SkillDto sd : skillDtos) {
                if (sd.getSkillCategoryId() != null && sd.getSkillCategoryId().equals(scd.getId())) {
                    scd.addSkill(sd);
                }
            }
        }

        return skillCategoryDtos;
    }

    public Page<Skill> getActiveSkill(Pageable pageable, String skill, String skillCategory) {
        
        Query query = new Query();
        if (skillCategory != null) {
            String[] ass = skillCategory.split(",");
            query.addCriteria(Criteria.where("skillCategories").in(ass));
        }

        //skills
        if (skill != null) {
            String[] ass = skill.split(",");
            query.addCriteria(Criteria.where("_id").in(ass));
        }

        long count = mongoTemplate.count(query, Skill.class);
        query.with(pageable);
        List<Skill> result = mongoTemplate.find(query, Skill.class);
        Page<Skill> skills = new PageImpl<>(result, pageable, count);

        return skills;
    }

    public Page<SkillCategory> getActiveSkillCategory(Pageable pageable, String skillsCategories) {
        
        Query query = new Query();

        if (skillsCategories != null) {
            String[] ass = skillsCategories.split(",");

            query.addCriteria(Criteria.where("_id").in(ass));

        }
        long count = mongoTemplate.count(query, SkillCategory.class);
        query.with(pageable);
        List<SkillCategory> result = mongoTemplate.find(query, SkillCategory.class);
        Page<SkillCategory> skillCategory = new PageImpl<>(result, pageable, count);

        return skillCategory;
    }

}
