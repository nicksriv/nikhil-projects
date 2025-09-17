package com.wavelabs.sb.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.SiteOnboardingDetails;
import com.wavelabs.sb.enums.Status;

public interface SiteOnboardingRepository extends MongoRepository<SiteOnboardingDetails, String> {

    @Query("{siteId: ?0 }")
    Optional<SiteOnboardingDetails> findBySiteId(String siteId);
    
    Optional<SiteOnboardingDetails> findBySiteIdAndStatusAndDeleted(String siteId, Status active, boolean deleted);
    
    List<SiteOnboardingDetails> findBySiteIdInAndClientIdAndStatusAndDeleted(List<String> siteIds,String clientId, Status active, boolean deleted);
    
    List<SiteOnboardingDetails> findByClientIdInAndStatusAndDeleted(String clientId, Status active, boolean deleted);
    
    Optional<SiteOnboardingDetails> findBySiteIdAndClientIdAndDeleted(String siteId, String clientId, boolean deleted);

}
