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
public interface SkillCategoryRepository extends MongoRepository<SkillCategory, String> {

     List<SkillCategory> findByIdInAndIsActive(List<String> skillCategoryIds, boolean isActive);

           
}
