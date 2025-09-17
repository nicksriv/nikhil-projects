/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.wavelabs.sb.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.SkillCategory;

/**
 *
 * @author ts
 */
public interface SkillCategoryRepository extends MongoRepository<SkillCategory, String> {

    List<SkillCategory> findByIdInAndIsActive(List<String> skillCategoryIds, boolean isActive);
    Optional<SkillCategory> findByIdAndIsActive(String skillCategoryId, boolean isActive);

}
