package com.wavelabs.sb.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.wavelabs.sb.documents.ModuleColorsMaster;

@Repository
public interface ModuleColorsMasterRepository extends MongoRepository<ModuleColorsMaster, String> {

    Optional<ModuleColorsMaster> findByOrder(long order);
    
  


}
