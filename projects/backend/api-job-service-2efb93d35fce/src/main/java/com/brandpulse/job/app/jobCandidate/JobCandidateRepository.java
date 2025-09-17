/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.job.app.jobCandidate;

import com.brandpulse.job.security.Token;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.brandpulse.job.common.enums.UserType;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ts
 */
@Repository
public interface JobCandidateRepository extends MongoRepository<JobCandidate, String> {

    List<JobCandidate> findByJobId(String jobId, Token token);
    
     //@Query("SELECT jobTitle, jobStatus, jobRating FROM Job-Candidate ORDER BY createdAT DESC LIMIT 5")
    List<JobCandidate> findFirst5ByUserIdAndUserTypeOrderByCreatedAtDesc(String userId, String userType);


    @Aggregation( pipeline = {"{$match: {\n" +
                                "    }}", 
                                "{$group: {\n" +
                                "        _id: null,\n" +
                                "        amount: {\n" +
                                "        $sum: '$totalEarned'\n" +
                                "        }\n" +
                                "    }}"})
    
    
   float sumEarning();
   
    @Aggregation( pipeline = {"{$match: {\n" +
                                "    }}", 
                                "{$group: {\n" +
                                "        _id: null,\n" +
                                "        paid: {\n" +
                                "        $sum: '$amountPaid'\n" +
                                "        }\n" +
                                "    }}"})
    
    float sumAmountPaid();

    @Aggregation( pipeline = {"{$match: {\n" +
                                "   clientId: ?0,\n" +
                                "    }}", 
                                "{$group: {\n" +
                                "        _id: null,\n" +
                                "        amount: {\n" +
                                "        $sum: '$totalEarned'\n" +
                                "        }\n" +
                                "    }}"})
    
    
   float sumEarningForClient(String clientId);
   
    @Aggregation( pipeline = {"{$match: {\n" +
                                "   clientId: ?0,\n" +
                                "    }}", 
                                "{$group: {\n" +
                                "        _id: null,\n" +
                                "        paid: {\n" +
                                "        $sum: '$amountPaid'\n" +
                                "        }\n" +
                                "    }}"})
    
    float sumAmountPaidForClient(String clientId);



    @Aggregation( pipeline =  {"{$match: {\n" +
    "         clientId: {$in :?0}\n" +
    "        jobStatus: 'CLOSED'"+
    "    }}", 
    "{$group: {\n" +
    "        _id: null,\n" +
    "        count: {$sum:1} \n" +
    "        }\n" +
    "    }}"})
    Integer countJobsApprovedByClientIdIn(List<String> clientId);


    @Aggregation( pipeline =  {"{$match: {\n" +
    "         clientId: {$in :?0}\n" +
    "        jobStatus: 'INPROGRESS'"+
    "    }}", 
    "{$group: {\n" +
    "        _id: null,\n" +
    "        count: {$sum:1} \n" +
    "        }\n" +
    "    }}"})
    Integer countJobsInprogressByClientIdIn(List<String> clientId);

    @Aggregation( pipeline =  {"{$match: {\n" +
    "        userId: ?0,\n" +
    "        userType: ?1\n" +
    "        jobStatus: 'INPROGRESS'"+
    "    }}", 
    "{$group: {\n" +
    "        _id: null,\n" +
    "        count: {$sum:1} \n" +
    "        }\n" +
    "    }}"})
Integer countInprogressJobByUserIdAndUserType(String userId, UserType userType);


@Aggregation( pipeline =  {"{$match: {\n" +
    "        userId: ?0,\n" +
    "        userType: ?1\n" +
    "        jobStatus: 'CLOSED'"+
    "    }}", 
    "{$group: {\n" +
    "        _id: null,\n" +
    "        count: {$sum:1} \n" +
    "        }\n" +
    "    }}"})

Integer countCompletetdJobByUserIdAndUserType(String userId, UserType userType);

@Aggregation( pipeline =  {"{$match: {\n" +
    "        userId: ?0,\n" +
    "        userType: ?1\n" +
    "        jobStatus: 'CANCEL'"+
    "    }}", 
    "{$group: {\n" +
    "        _id: null,\n" +
    "        count: {$sum:1} \n" +
    "        }\n" +
    "    }}"})

Integer countCancelJobByUserIdAndUserType(String userId, UserType userType);

@Aggregation( pipeline = {"{$match: {\n" +
                        "        userId: ?0,\n" +
                        "        userType: ?1\n" +
                        "    }}", 
                        "{$group: {\n" +
                        "        _id: null,\n" +
                        "        amount: {\n" +
                        "        $sum: '$totalEarned'\n" +
                        "        }\n" +
                        "    }}"})


float sumEarningByUserIdAndUserType(String userId, UserType userType);

@Aggregation( pipeline = {"{$match: {\n" +
                        "        userId: ?0,\n" +
                        "        userType: ?1\n" +
                        "    }}", 
                        "{$group: {\n" +
                        "        _id: null,\n" +
                        "        paid: {\n" +
                        "        $sum: '$amountPaid'\n" +
                        "        }\n" +
                        "    }}"})

float sumAmountPaidByUserIdAndUserType(String userId, UserType userTypee);


}
