package com.wavelabs.sb.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.SubModules;

public interface SubModuleRepository extends MongoRepository<SubModules, String> {

    List<SubModules> findAllByModuleId(String moduleId);

   Optional<SubModules> findByModuleIdAndId(String moduleId, String subModuleId);

    List<SubModules> findByModuleIdIn(List<String> listOfModuleIds);

    Optional<SubModules> findByModuleIdAndIdAndDeleted(String moduleId, String subModuleId, boolean deleted);

    Optional<SubModules> findByModuleIdAndNameAndDeleted(String moduleId, String name, boolean deleted);

    Optional<SubModules> findByModuleIdAndNameIgnoreCaseAndDeleted(String moduleId, String name, boolean b);

    List<SubModules> findByNameLike(String moduleName);

    @Query(value = "{ '_id' : {'$in' : ?0 } }")
    List<SubModules> findByIdIn(List<String> moduleIds);

    
}
