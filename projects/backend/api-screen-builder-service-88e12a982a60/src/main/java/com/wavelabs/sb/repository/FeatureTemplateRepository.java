package com.wavelabs.sb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.wavelabs.sb.documents.FeatureTemplate;

@Repository
public interface FeatureTemplateRepository extends MongoRepository<FeatureTemplate, String> {

    Optional<FeatureTemplate> findByDeletedAndNameIgnoreCase(boolean deleted, String name);

    List<FeatureTemplate> findAllByDeleted(boolean deleted);

    Optional<FeatureTemplate> findByIdAndDeleted(String templateId, boolean deleted);

    Optional<FeatureTemplate> findByNameIgnoreCase(String name);

}
