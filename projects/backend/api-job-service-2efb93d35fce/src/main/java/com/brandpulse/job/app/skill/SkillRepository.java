/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.job.app.skill;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ts
 */
@Repository
public interface SkillRepository extends MongoRepository<Skill,String> {

    List<Skill> findByIdInAndIsActive(List<String> skillIds, boolean isActive);

    // List<Skill> findByIdIn(List<String> skillIds);

//    List<Skill> findByIdIn(List<String> s, boolean b);
    
    List<Skill> findSkillBySkillCategoryIdAndIsActive(String skillCategoryId, boolean b);
    
}
