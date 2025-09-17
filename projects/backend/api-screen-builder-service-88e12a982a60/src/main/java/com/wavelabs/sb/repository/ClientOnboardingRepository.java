package com.wavelabs.sb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.enums.Status;

public interface ClientOnboardingRepository extends MongoRepository<ClientOnboardingDetails, String> {
    
    @Query("{clientName: ?0 }")
    Optional<ClientOnboardingDetails> findByClientName(String clientName);

    @Query("{clientId: ?0 }")
    Optional<ClientOnboardingDetails> findByClientId(String clientId);

    @Aggregation(pipeline = { "{$group: { _id: '', total: {$max: $_id }}}" })
    public String max();

    @Query(value = "{ 'email' : ?0 }", fields = "{ 'email' : 1 }")

    List<String> findByEmailId(String email);
    
    List<ClientOnboardingDetails> findByIdNot(String id);
    
    Optional<ClientOnboardingDetails> findByClientIdAndStatusAndDeleted(String userId, Status active, boolean b);

    Optional<ClientOnboardingDetails> findByIdAndStatusAndDeleted(String id, Status active, boolean b);
}
