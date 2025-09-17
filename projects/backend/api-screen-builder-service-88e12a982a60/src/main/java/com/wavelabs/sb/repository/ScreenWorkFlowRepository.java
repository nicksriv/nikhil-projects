package com.wavelabs.sb.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.ScreenWorkFlow;
import com.wavelabs.sb.enums.Status;

public interface ScreenWorkFlowRepository extends MongoRepository<ScreenWorkFlow, String> {

    Optional<ScreenWorkFlow> findByModuleId(String moduleId);

    Optional<ScreenWorkFlow> findByModuleIdAndSubModuleId(String moduleId, String subModuleId);

    Optional<ScreenWorkFlow> findByModuleIdAndSubModuleIdAndDeleted(String parentModuleId, String submoduleId,
	    boolean deleted);

    Optional<ScreenWorkFlow> findBySubModuleIdAndDeleted(String submoduleId, boolean deleted);

    boolean existsBySubModuleIdAndMappedByAndStatusAndDeleted(String submoduleId, String mappedById, Status active,
	    boolean b);

    Optional<ScreenWorkFlow> findByIdAndStatus(String workflowId, Status active);

}
