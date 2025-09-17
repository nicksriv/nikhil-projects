package com.wavelabs.sb.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.QualityAssuranceCredentials;

public interface QualityAssuranceCredentialsRepository extends MongoRepository<QualityAssuranceCredentials , String> {

  QualityAssuranceCredentials getQualityAssuranceCredentialsById(String userId);

  Optional<QualityAssuranceCredentials> findById(String id);

  Optional<QualityAssuranceCredentials> findByQualityAssuranceId(String qualityAssuranceId);

  Optional<QualityAssuranceCredentials> findByQualityAssuranceName(String qualityAssuranceRefNo);
  
}
