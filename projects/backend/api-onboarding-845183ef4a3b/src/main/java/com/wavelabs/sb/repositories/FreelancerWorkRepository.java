/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.wavelabs.sb.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.FreelancerWorkDetail;




public interface FreelancerWorkRepository extends MongoRepository<FreelancerWorkDetail, String> {
    
    List<FreelancerWorkDetail> findByFreelancerId(String freelancerId);
}
