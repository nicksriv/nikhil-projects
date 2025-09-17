package com.wavelabs.sb.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.enums.Status;

public interface RoleOnboardingRepository extends MongoRepository<RoleOnboardingDetails, String> {

    RoleOnboardingDetails findByClientIdAndDeletedAndRoleIgnoreCase(String clientId, boolean deleted, String role);

    RoleOnboardingDetails findByClientIdAndIdNotAndDeletedAndRoleIgnoreCase(String clientId, String id, boolean deleted,
	    String role);

    List<RoleOnboardingDetails> findByRoleInAndClientIdAndDeleted(List<String> roles, String clientId, boolean deleted);

    Optional<RoleOnboardingDetails> findByIdAndDeleted(String id, boolean deleted);

    List<RoleOnboardingDetails> findByIdInAndClientIdAndDeleted(List<String> roleIds, String clientId, boolean deleted);

    @Query(value = "{ 'role' : {$regex: /?0/ ,$options:'i'},deleted: false }")
    List<RoleOnboardingDetails> findByRoleLike(String role);
    
    Optional<RoleOnboardingDetails> findByClientIdAndRoleIgnoreCaseAndStatusAndDeleted(String clientId, String role,
	    Status active, boolean deleted);

    Optional<RoleOnboardingDetails> findByClientIdAndRoleIgnoreCaseAndDeleted(String clientObjectId,
	    String siteManagerRole, boolean b);

}
