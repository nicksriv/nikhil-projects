package com.wavelabs.sb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.enums.Status;

public interface SubModuleRepository extends MongoRepository<SubModules, String> {

    List<SubModules> findAllByModuleId(String moduleId);

   Optional<SubModules> findByModuleIdAndId(String moduleId, String subModuleId);

    List<SubModules> findByModuleIdIn(List<String> listOfModuleIds);

    Optional<SubModules> findByModuleIdAndIdAndDeleted(String moduleId, String subModuleId, boolean deleted);

    Optional<SubModules> findByModuleIdAndNameAndDeleted(String moduleId, String name, boolean deleted);

    Optional<SubModules> findByModuleIdAndNameIgnoreCaseAndDeleted(String moduleId, String name, boolean deleted);

    List<SubModules> findByModuleIdAndStatusAndDeleted(String moduleId, String staus, boolean deleted);

    Optional<SubModules> findByIdAndDeleted(String subModuleId, boolean deleted);

    @Query(value = "{'_id' : {$in : ?0}, 'moduleId' : ?1}")
    List<SubModules> findByIdInAndModuleId(List<String> submoduleIds,String id);

    @Query(value = "{'_id' : {$in : ?0}}")
    List<SubModules> findByIdIn(List<String> submoduleIds);
    
    @Query(value = "{'_id' : {$in : ?0}, 'moduleId' : ?1, 'status' : ?2}")
    List<SubModules> findByIdInAndModuleIdAndStatus(List<String> submoduleIds,String id, String status);

    @Query(value = "{'_id' : {$in : ?0}, 'status' : ?1, 'deleted' : ?2}")
    List<SubModules> findByIdInAndStatusAndDeleted(List<String> moduleIdsList, String status, boolean deleted);

    List<SubModules> findByModuleIdInAndStatusAndDeleted(List<String> moduleIdsList, String string, boolean b);

    long countFindByModuleIdAndStatusAndDeleted(String moduleId, Status active, boolean b);
    
}
