package com.wavelabs.sb.repositories;

import com.wavelabs.sb.documents.FreelancerBankDetail;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface FreelancerBankRepository  extends MongoRepository<FreelancerBankDetail, String> {

    Optional<FreelancerBankDetail> findByFreelancerId(String freelancerId);

}
