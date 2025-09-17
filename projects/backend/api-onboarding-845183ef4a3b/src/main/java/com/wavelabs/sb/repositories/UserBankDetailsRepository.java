package com.wavelabs.sb.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.UserBankDetails;

public interface UserBankDetailsRepository extends MongoRepository<UserBankDetails, String> {

    

}