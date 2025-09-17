package com.wavelabs.sb.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.StatesMaster;

public interface StatesMasterRepository extends MongoRepository<StatesMaster, String> {

    
    List<StatesMaster> findByStateAndStatus(String state, String status);

}
