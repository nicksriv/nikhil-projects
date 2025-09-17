package com.wavelabs.sb.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.AuthenticationAuditingDetails;
import com.wavelabs.sb.enums.Status;

public interface AuthenticationRepository extends MongoRepository<AuthenticationAuditingDetails, String> {

    List<AuthenticationAuditingDetails> findByUserNameAndStatus(String userId, Status active);

    Optional<AuthenticationAuditingDetails> findByToken(String token);

    Optional<AuthenticationAuditingDetails> findByTokenAndStatus(String jwt, String status);

    @Query("{ 'userName' : ?0 }")
    Page<AuthenticationAuditingDetails> findRecentToken(String userName, Pageable pageable);

    boolean existsByTokenAndStatus(String token, Status active);

}
