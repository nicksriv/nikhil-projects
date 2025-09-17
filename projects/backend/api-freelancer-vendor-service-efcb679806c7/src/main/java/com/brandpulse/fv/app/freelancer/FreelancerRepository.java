/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.app.freelancer;

import com.brandpulse.fv.common.childDocument.AssociatedSkill;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Suhail Tamboli
 */
@Repository
public interface FreelancerRepository extends MongoRepository<Freelancer, String> {
    
    Optional<Freelancer> findByMobile(String mobile);
    Optional<Freelancer> findByFreelancerRefNo(String freelancerRefNo);
    List<Freelancer> findBySkills(ArrayList<AssociatedSkill> skills);

    Optional<Freelancer> findByAdhaarNumberAndPanNumber(String adhaarNumber, String panNumber);
    
    boolean existsByEmail(String email);
    boolean existsByMobile(String mobile);
}
