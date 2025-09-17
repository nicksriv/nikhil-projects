package com.brandpulse.job.app.job;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends MongoRepository<Job, String> {
    
    @Override
    public Page<Job> findAll(Pageable pageable);
    
    Optional<Job> findById(String jobId);

    @Aggregation( pipeline =  {"{$match: {\n" +
    "        jobStatus: 'INPROGRESS'"+
    "    }}", 
    "{$group: {\n" +
    "        _id: null,\n" +
    "        count: {$sum:1} \n" +
    "    }}"})
Integer countOngoingJob();


@Aggregation( pipeline =  {"{$match: {\n" +
    "        jobStatus: 'COMPLETED'"+
    "    }}", 
    "{$group: {\n" +
    "        _id: null,\n" +
    "        count: {$sum:1} \n" +
    "    }}"})
Integer countCompletedJob();

@Aggregation( pipeline =  {"{$match: {\n" +
    "        jobStatus: 'NEW'"+
    "    }}", 
    "{$group: {\n" +
    "        _id: null,\n" +
    "        count: {$sum:1} \n" +
    "    }}"})
Integer countNewJob();

@Aggregation( pipeline =  {"{$match: {\n" +
    "      clientId: ?0,\n" +
    "        jobStatus: 'INPROGRESS'"+
    "    }}", 
    "{$group: {\n" +
    "        _id: null,\n" +
    "        count: {$sum:1} \n" +
    "    }}"})
Integer countOngoingJobForClient(String cliendId);


@Aggregation( pipeline =  {"{$match: {\n" +
    "         clientId: ?0,\n" + 
    "        jobStatus: 'COMPLETED'"+
    "    }}", 
    "{$group: {\n" +
    "        _id: null,\n" +
    "        count: {$sum:1} \n" +
    "    }}"})

Integer countCompletedJobForClient(String cliendId);

@Aggregation( pipeline =  {"{$match: {\n" +
    "         clientId: ?0,\n" +
    "        jobStatus: 'NEW'"+
    "    }}", 
    "{$group: {\n" +
    "        _id: null,\n" +
    "        count: {$sum:1} \n" +
    "    }}"})

Integer countNewJobForClient(String cliendId);

@Aggregation( pipeline =  {"{$match: {\n" +
    "         clientId: ?0,\n" +
    "    }}", 
    "{$group: {\n" +
    "        _id: null,\n" +
    "        count: {$sum:1} \n" +
    "    }}"})
public Integer countJobsAssignedByClientId(String clientId);

@Aggregation( pipeline =  {"{$match: {\n" +
    "         clientId: {$in :?0}\n" +
    "    }}", 
    "{$group: {\n" +
    "        _id: null,\n" +
    "        count: {$sum:1} \n" +
    "    }}"})
public Integer countJobsAssignedByClientIdIn(ArrayList<String> clientId);



}
