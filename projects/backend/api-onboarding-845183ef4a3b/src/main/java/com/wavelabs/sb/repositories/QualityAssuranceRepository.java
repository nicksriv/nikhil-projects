package com.wavelabs.sb.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.QualityAssurance;
import com.wavelabs.sb.enums.QualityControllerStatus;
import com.wavelabs.sb.enums.Status;

public interface QualityAssuranceRepository extends MongoRepository<QualityAssurance , String> {

  Optional<QualityAssurance> findById(String qualityAssuranceId);

  Optional<QualityAssurance> findByQualityAssuranceRefNo(String qualityAssuranceRefNo);

  Optional<QualityAssurance> findByIdAndQualityControllerStatus(String userId, QualityControllerStatus qualityControllerStatus);

  List<QualityAssurance> findByClientsIn(String userId);

}
