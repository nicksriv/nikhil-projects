/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.app.freelancer;

import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Suhail Tamboli
 */
@Repository
public interface FreelancerRepository extends MongoRepository<Freelancer, String> {
    

    List<Freelancer> findByIdIn(List<String> ids);

    @Aggregation( pipeline =  {"{$match: {\n" +
          "    }}", 
          "{$group: {\n" +
          "        _id: null,\n" +
          "        count: {$sum:1} \n" +
          "        }\n" +
          "    }}"})
    Integer countTotalFreelancers();
}
