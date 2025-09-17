package com.wavelabs.sb.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.StoreLocations;

public interface StoreRepository extends MongoRepository<StoreLocations, String> {

	List<StoreLocations> findByClientId(String clientId);

	@Query("{'storeId': {$in : ?0}}")
	List<StoreLocations> findAllByStoreId(List<String> storeId);

	@Query(value = "{'storeId' : {$in : ?0}, 'clientId' : ?1}")
	List<StoreLocations> getStoreId(List<String> locations, String clientId);

	Optional<StoreLocations> findByStoreIdAndClientId(String locationId,String clientId);

}
