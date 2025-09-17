/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.skill;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ts
 */
@Repository
public interface SkillCategoryRepository extends MongoRepository<SkillCategory, String> {

    List<SkillCategory> findByIdInAndIsActive(List<String> skillCategoryIds, boolean isActive);
    Optional<SkillCategory> findFirstByIdAndIsActive(String skillCategoryId, boolean isActive);

}
