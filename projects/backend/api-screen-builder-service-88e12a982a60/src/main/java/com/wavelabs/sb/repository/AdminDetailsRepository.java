package com.wavelabs.sb.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.enums.Status;

public interface AdminDetailsRepository extends MongoRepository<AdminDetails, String> {

    AdminDetails findByMobile(String mobile);
    
    @Aggregation(pipeline = { "{$group: { _id: '', total: {$max: $_id }}}" })
    public String max();

    Optional<AdminDetails> findByAdminIdAndDeleted(String clientId, boolean deleted);

    Optional<AdminDetails> findByAdminIdAndStatusAndDeleted(String adminId, Status active, boolean b);

}
