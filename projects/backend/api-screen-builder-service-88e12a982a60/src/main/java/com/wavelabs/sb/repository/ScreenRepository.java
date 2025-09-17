package com.wavelabs.sb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.Screen;

public interface ScreenRepository extends MongoRepository<Screen, String> {

    @Query("{screenId: ?0 }")
    Optional<Screen> findById(Screen screenId);

    @Query("{clientId: ?0 }")
    List<Screen> findByClientId(String clientId);

    List<Screen> findAllByIdIn(List<String> screenIds);

    /*
     * @Query("{subModuleId: ?0 }") List<Screen> findBySubModuleId(String
     * subModuleId);
     */

}
