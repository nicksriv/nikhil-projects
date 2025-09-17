package com.wavelabs.sb.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.Dispute;

public interface DisputeRespository extends MongoRepository<Dispute , String> {
  
}
