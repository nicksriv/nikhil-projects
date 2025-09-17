package com.wavelabs.sb.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.AdminCredentials;

public interface AdminCredentialsRepository extends MongoRepository<AdminCredentials, String> {

    Optional<AdminCredentials> findByAdminId(String adminId);

}
