package com.wavelabs.sb.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.SiteOnboarding;

public interface SiteOnboardingRepository extends MongoRepository<SiteOnboarding, String> {
  
    List<SiteOnboarding> findBySiteIdIn(List<String> siteIds);
}
