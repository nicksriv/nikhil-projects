package com.wavelabs.sb.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.DisputeCategory;
import com.wavelabs.sb.enums.UserType;

public interface DisputeCategoryRespository extends MongoRepository<DisputeCategory , String> {
  
  List<DisputeCategory> findByDisputeResolver(UserType disputeResolver);
}
