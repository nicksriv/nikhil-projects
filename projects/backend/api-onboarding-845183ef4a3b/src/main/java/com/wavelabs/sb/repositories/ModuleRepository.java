package com.wavelabs.sb.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.Module;
public interface ModuleRepository extends MongoRepository<Module, String> {

    
    @Query("{'roles.id' : ?0 }")
    List<Module> findAllByRoleId(String roleId);

    List<Module> findByNameLike(String moduleName);

    @Query(value = "{ '_id' : {'$in' : ?0 } }")
    List<Module> findByIdIn(List<String> moduleIds);
}
