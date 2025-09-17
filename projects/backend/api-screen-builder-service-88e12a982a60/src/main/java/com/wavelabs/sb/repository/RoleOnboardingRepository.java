package com.wavelabs.sb.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.RoleOnboardingDetails;

public interface RoleOnboardingRepository extends MongoRepository<RoleOnboardingDetails, String> {

    List<RoleOnboardingDetails> findAllByIdIn(List<String> roleIds);

}
