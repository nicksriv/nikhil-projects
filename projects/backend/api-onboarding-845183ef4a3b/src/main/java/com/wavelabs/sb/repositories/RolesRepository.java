package com.wavelabs.sb.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.Roles;

public interface RolesRepository extends MongoRepository<Roles, String> {

	List<Roles> findByClientId(String clientId);

	Optional<Roles> findByRoleAndClientId(String role, String clientId);

}
