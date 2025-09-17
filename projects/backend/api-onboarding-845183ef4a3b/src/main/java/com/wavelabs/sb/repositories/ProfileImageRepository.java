package com.wavelabs.sb.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.ProfileImage;

public interface ProfileImageRepository extends MongoRepository<ProfileImage, String> {

}
