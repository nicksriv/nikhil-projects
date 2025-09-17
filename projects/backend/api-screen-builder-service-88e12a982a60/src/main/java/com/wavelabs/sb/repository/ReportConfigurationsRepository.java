package com.wavelabs.sb.repository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.wavelabs.sb.documents.ReportConfigurations;
import com.wavelabs.sb.enums.Status;

@Repository
public interface ReportConfigurationsRepository extends MongoRepository<ReportConfigurations, String> {

    ReportConfigurations findByClientIdAndDeletedAndNameIgnoreCase(String clientId, boolean b, String name);

    boolean existsByClientIdAndDeletedAndNameIgnoreCaseAndIdNot(String clientId, boolean b, String name, String id);

    @Query("{'module.$id' : {$in : ?0},'status':?1, 'deleted' : ?2, 'roles.$id':{$in : ?3}}")
    List<ReportConfigurations> findByModuleInAndStatusAndDeletedAndRolesIn(List<ObjectId> moduleIdsList, Status active,
	    boolean b, List<ObjectId> roleIds);

    @Query("{'module.$id' : {$in : ?0},'status':?1, 'deleted' : ?2, 'roles.$id':{$in : ?3}}")
    boolean existsByModuleInAndStatusAndDeletedAndRolesIn(List<ObjectId> moduleIdsList, Status active, boolean b,
	    List<ObjectId> roleIds);

    @Query("{'module.$id' : {$in : ?0},'status':?1, 'deleted' : ?2}")
    List<ReportConfigurations> findByModuleInAndStatusAndDeleted(List<ObjectId> moduleIdsList, Status active, boolean b);

    @Query("{'module.$id' : ?0,'status':?1, 'deleted' : ?2, 'roles.$id':{$in : ?3}}")
    List<ReportConfigurations> findByModuleIdAndStatusAndDeletedAndRolesIn(ObjectId moduleId, Status active, boolean b,
	    List<ObjectId> roleIds);
    
    @Query("{'module.$id' : ?0,'status':?1, 'deleted' : ?2, 'roles.$id':{$in : ?3}}")
    boolean existsByModuleIdAndStatusAndDeletedAndRolesIn(ObjectId moduleId, Status active, boolean b,
	    List<ObjectId> roleIds);

    Optional<ReportConfigurations> findByIdAndDeleted(String reportId, boolean b);

}
