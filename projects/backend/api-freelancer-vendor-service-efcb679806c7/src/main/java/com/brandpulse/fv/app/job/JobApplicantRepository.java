/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.job;

import com.brandpulse.fv.common.enums.UserType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ts
 */
@Repository
public interface JobApplicantRepository extends MongoRepository<JobApplicant, String> {
    
    Optional<JobApplicant> findByJobIdAndUserIdAndUserType(String jobId, String userId, UserType user);
    Optional<JobApplicant> findByJobId(String jobId);
    

    public List<JobApplicant> findByUserId(String freelancerId);

    

}
