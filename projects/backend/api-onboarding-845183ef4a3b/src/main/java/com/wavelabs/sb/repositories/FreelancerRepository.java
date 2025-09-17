/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.wavelabs.sb.repositories;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.wavelabs.sb.documents.Freelancer;
import com.wavelabs.sb.documents.childDocuments.AssociatedSkill;

/**
 *
 * @author Suhail Tamboli
 */
public interface FreelancerRepository extends MongoRepository<Freelancer, String> {

	Optional<Freelancer> findByMobile(String mobile);

	Optional<Freelancer> findByFreelancerRefNo(String freelancerRefNo);

	List<Freelancer> findBySkills(ArrayList<AssociatedSkill> skills);

	Optional<Freelancer> findByAdhaarNumberAndPanNumber(String AdhaarNumber, String panNumber);

	boolean existsByEmail(String email);

	boolean existsByMobile(String mobile);
}
