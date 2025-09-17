package com.wavelabs.sb.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import com.wavelabs.sb.documents.ClientsCredentials;

public interface ClientCredentialsRepository extends MongoRepository<ClientsCredentials, String> {
    @Query("{clientId: ?0 }")
    Optional<ClientsCredentials> findByClientId(String id);
    
    boolean existsByClientId(String clientId);
}
