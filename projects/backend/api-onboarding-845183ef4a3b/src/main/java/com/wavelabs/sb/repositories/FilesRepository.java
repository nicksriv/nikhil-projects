package com.wavelabs.sb.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.Files;

public interface FilesRepository extends MongoRepository<Files, String> {

}
