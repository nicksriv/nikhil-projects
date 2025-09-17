package com.wavelabs.sb.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.wavelabs.sb.documents.ThemeDetails;
import com.wavelabs.sb.enums.Status;

public interface ThemeDetailsRepository extends MongoRepository<ThemeDetails, String> {

    Optional<ThemeDetails> findByClientIdAndStatusAndDeleted(String clientId,Status active, boolean deleted);
    
}
