package com.wavelabs.sb.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.wavelabs.sb.documents.Bank;

public interface BankRepository extends MongoRepository<Bank, String> {

    @Query("{'status': ?0 }")
    List<Bank> findAllByStatus(String status);

}
