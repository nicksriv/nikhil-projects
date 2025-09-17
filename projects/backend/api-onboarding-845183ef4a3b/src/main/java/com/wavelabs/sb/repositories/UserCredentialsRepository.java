package com.wavelabs.sb.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.UserCredentials;

public interface UserCredentialsRepository extends MongoRepository<UserCredentials, String> {

    boolean existsByUserId(String userId);

    Optional<UserCredentials> findByUserId(String userId);

}
