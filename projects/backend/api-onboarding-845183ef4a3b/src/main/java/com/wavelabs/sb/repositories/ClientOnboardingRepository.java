package com.wavelabs.sb.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.wavelabs.sb.enums.Status;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.ClientOnboardingDetails;

public interface ClientOnboardingRepository extends MongoRepository<ClientOnboardingDetails, String> {

    //@Query("{clientName: ?0 }")
    Optional<ClientOnboardingDetails> findByClientNameIgnoreCaseAndDeleted(String clientName,boolean deleted);

    @Query("{clientId: ?0 }")
    Optional<ClientOnboardingDetails> findByClientId(String clientId);

    @Aggregation(pipeline = { "{$group: { _id: '', total: {$max: $_id }}}" })
    public String max();

    @Query(value = "{ 'email' : ?0 ,'deleted':false}", fields = "{ 'email' : 1 }")
    List<String> findByEmailId(String email);

    List<ClientOnboardingDetails> findByIdNot(String id);

    Optional<ClientOnboardingDetails> findByClientIdAndStatusAndDeleted(String userId, Status active, boolean b);
    
    Optional<ClientOnboardingDetails> findByClientIdAndDeleted(String clientId, boolean b);

    Optional<ClientOnboardingDetails> findByClientNameIgnoreCaseAndDeletedAndIdNot(String clientName, boolean b,
	    String clientId);

    Optional<ClientOnboardingDetails> findByEmailIgnoreCaseAndDeletedAndIdNot(String email, boolean b, String clientId);

    List<ClientOnboardingDetails> findByIdIn(ArrayList<String> clients);

}
