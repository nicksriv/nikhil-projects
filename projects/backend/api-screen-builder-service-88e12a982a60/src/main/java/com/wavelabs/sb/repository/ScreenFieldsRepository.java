package com.wavelabs.sb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.ScreenFields;
import com.wavelabs.sb.enums.Status;

public interface ScreenFieldsRepository extends MongoRepository<ScreenFields, String> {

    List<ScreenFields> findAllByScreenId(String string);

    List<ScreenFields> findAllByModuleIdAndSubModuleIdAndDeleted(String moduleId, String submoduleId, boolean deleted);

    List<ScreenFields> findAllByModuleIdAndDeleted(String moduleId, boolean deleted);

    @Query(value = "{ 'moduleId' : ?0, 'subModuleId' : {'$in' : ?1}, 'deleted':?2 }")
    List<ScreenFields> findByModuleIdAndSubModuleIdInAndDeleted(String moduleId, List<String> submoduleIds,
	    boolean deleted);

    @Query(value = "{ 'componentId' : {'$in' : ?0 },'moduleId':?1 }")
    List<ScreenFields> findByComponentIdInAndModuleId(List<String> componentIds,String moduleId);
    
    @Query(value = "{ 'screenId' : {'$in' : ?0 },'status':?1,'deleted':?2 }")
    List<ScreenFields> findByScreenIdInAndStatusAndDeleted(List<String> screenIds, Status active, boolean b);

    List<ScreenFields> findAllByComponentId(String componentId);

    Optional<ScreenFields> findFirstByComponentId(String first);

    List<ScreenFields> findByComponentIdIn(List<String> dynamicIds);

}
