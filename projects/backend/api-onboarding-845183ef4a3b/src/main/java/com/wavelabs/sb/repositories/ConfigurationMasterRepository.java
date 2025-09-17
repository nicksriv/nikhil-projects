package com.wavelabs.sb.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.ConfigurationMaster;

public interface ConfigurationMasterRepository extends MongoRepository<ConfigurationMaster, String> {

}
