package com.wavelabs.sb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.wavelabs.sb.documents.Module;
import com.wavelabs.sb.enums.Status;

@Repository
public interface ModuleRepository extends MongoRepository<Module, String> {

    @Query(value = "{ '_id' : {'$in' : ?0 } }")
    List<Module> findAllWithIds(List<String> ids);

    Optional<Module> findByName(String name);

    List<Module> findByClientId(String clientId);

    List<Module> findAllByClientId(String clientId, Pageable pageable);

    List<Module> findAllByClientId(String clientId);

    List<Module> findByClientIdAndDeleted(String clientId, boolean deleted);

    List<Module> findAllByClientIdAndDeleted(String clientId, boolean deleted, Pageable pageable);

    Optional<Module> findByNameAndClientIdAndDeleted(String name, String clientId, boolean deleted);

    Optional<Module> findByIdAndDeleted(String moduleId, boolean deleted );

    Optional<Module> findByNameIgnoreCaseAndClientIdAndDeleted(String name, String clientId, boolean b);
    
    @Query(value = "{ '_id' : {'$in' : ?0 },'status':?1,'deleted':?2 }")
    List<Module> findAllWithIdsAndStatusAndDeleted(List<String> ids,String status, boolean deleted);

    List<Module> findByClientIdAndStatusAndDeleted(String id, String string, boolean b);
    
    long countFindByClientIdAndStatusAndDeleted(String clientId, Status status,boolean deleted);
}
