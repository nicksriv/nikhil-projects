package com.wavelabs.sb.repositories;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.Status;

public interface UserOnboardingRepository extends MongoRepository<Users, String> {

    Optional<Users> findByUserIdAndClientId(String userId, String clientId);

    List<Users> findByUserIdInAndClientIdAndStatusAndDeleted(List<String> userIds, String clientId, Status active,
	    boolean deleted);

    Optional<Users> findByUserIdAndClientIdAndStatusAndDeleted(String userId, String clientId, Status active,
	    boolean deleted);

    Optional<Users> findByUserId(String userId);

    List<Users> findByUserIdIn(List<String> userIds);

    Optional<Users> findByUserIdAndDeleted(String userId, boolean deleted);

    boolean existsByUserIdAndIdNotAndDeleted(String empId, String userId, boolean deleted);

    Optional<Users> findByClientIdAndDeleted(String clientId, boolean deleted);

    boolean existsByPersonnelPhoneNumberAndClientIdAndDeleted(String contactNumber, String clientId, boolean deleted);

    Optional<Users> findByPersonnelPhoneNumberAndClientIdAndDeleted(String contactNumber, String clientId,
	    boolean deleted);

    Optional<Users> findByIdAndClientIdAndDeleted(String userId, String clientId, boolean deleted);

    List<Users> findByStatusAndClientIdAndDeleted(String status, String clientId, boolean deleted);

    Optional<Users> findByUserIdAndClientIdAndDeleted(String employeeId, String clientId, boolean deleted);

    List<Users> findAllByClientIdAndDeleted(String clientId, boolean b);

    @Query("{'roles.id' : ?0, 'deleted' : ?1}")
    List<Users> userCountWithRole(String id, boolean isDeleted);

    List<Users> findByIdIn(List<String> managers);

    List<Users> findByUserIdInAndClientId(List<String> managers, String clientId);

    Optional<Users> findByUserIdAndStatusAndDeleted(String userId, Status active, boolean b);

    Optional<Users> findByUserIdAndClientIdAndDeletedAndStatus(String userId, String clientId, boolean b,
	    Status active);

    boolean existsByUserIdAndDeleted(String employeeId, boolean b);

    boolean existsByPersonnelPhoneNumberAndClientIdAndDeletedAndIdNot(String phone, String clientId, boolean b,
	    String id);

    List<Users> findByReportingManagerIdAndDeleted(String userId, boolean b);

    Optional<Users> findByClientIdAndStatusAndDeleted(String clientId, Status active, boolean b);

    @Query("{'clientId' : ?0,'status':?1, 'deleted' : ?2, 'roles.$id':{$in : ?3}}")
    List<Users> findByClientIdAndStatusAndDeletedAndRolesIn(String clientId, Status active, boolean b,
	    List<ObjectId> rolesIds);

    List<Users> findByReportingManagerIdInAndDeletedAndIdNot(List<String> ids, boolean b,String id);
}
