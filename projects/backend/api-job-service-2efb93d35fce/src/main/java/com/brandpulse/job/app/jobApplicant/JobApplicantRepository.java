/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.brandpulse.job.app.jobApplicant;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author dell
 */
public interface JobApplicantRepository extends MongoRepository<JobApplicant, String>{
    
    @Override
    public Page<JobApplicant> findAll(Pageable pageable);
    
    Optional<JobApplicant> findById(String jobId);
    
}
