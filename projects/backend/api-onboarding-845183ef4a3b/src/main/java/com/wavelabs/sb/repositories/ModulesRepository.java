package com.wavelabs.sb.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.Modules;
public interface ModulesRepository extends MongoRepository<Modules, String> {

    @Query(value = "{ '_id' : {'$in' : ?0 } }")
    List<Modules> findAllWithIds(List<String> ids);
}
