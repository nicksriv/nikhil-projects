/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.job.app.vendor;

import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ts
 */
@Repository
public interface VendorRepository extends MongoRepository<Vendor, String>{

 
    List<Vendor> findByIdIn(List<String> ids);

    @Aggregation( pipeline =  {"{$match: {\n" +
          "    }}", 
          "{$group: {\n" +
          "        _id: null,\n" +
          "        count: {$sum:1} \n" +
          "        }\n" +
          "    }}"})
    Integer countTotalVendors();
}
