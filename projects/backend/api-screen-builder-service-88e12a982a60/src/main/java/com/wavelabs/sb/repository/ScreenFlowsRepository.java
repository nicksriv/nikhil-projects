package com.wavelabs.sb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.ScreenFlows;

public interface ScreenFlowsRepository extends MongoRepository<ScreenFlows, String> {


    @Query("{subModuleId: ?0 }")
    List<ScreenFlows> findBysubModuleId(String subModuleId);

    @Query("{subModuleId: ?0 }")
    List<ScreenFlows> findAllBysubModuleId(String subModuleId);

    @Query("{workflowId: ?0 }")
    Optional<ScreenFlows> findAllByworkflowId(String workflowId);

    @Query(value = "{ '_id' : {'$in' : ?0 } }")
    List<ScreenFlows> findAllByIds(List<String> workflowIds);

    Optional<ScreenFlows> findByScreenIdAndDeleted(String screenId, boolean deleted);

}
