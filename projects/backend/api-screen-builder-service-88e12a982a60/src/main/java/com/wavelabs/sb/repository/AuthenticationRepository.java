package com.wavelabs.sb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.AuthenticationAuditingDetails;
import com.wavelabs.sb.enums.Status;

public interface AuthenticationRepository extends MongoRepository<AuthenticationAuditingDetails, String> {

    List<AuthenticationAuditingDetails> findByUserNameAndStatus(String userId, Status active);

    Optional<AuthenticationAuditingDetails> findByToken(String token);

    Optional<AuthenticationAuditingDetails> findByTokenAndStatus(String jwt,String status);
}
