package com.wavelabs.sb.services;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.documents.Freelancer;
import com.wavelabs.sb.documents.FreelancerBankDetail;
import com.wavelabs.sb.documents.FreelancerWorkDetail;
import com.wavelabs.sb.documents.childDocuments.AssociatedSkill;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.FreelancerBankRepository;
import com.wavelabs.sb.repositories.FreelancerRepository;
import com.wavelabs.sb.repositories.FreelancerWorkRepository;
import com.wavelabs.sb.response.BankDetailDto;
import com.wavelabs.sb.response.FreelancerDetailResponse;
import com.wavelabs.sb.response.SkillCategoryDto;
import com.wavelabs.sb.response.WorkDetailDto;
import com.wavelabs.sb.utils.ClassUtil;

@Service
public class FreelancerService {

    @Autowired
    FreelancerRepository freelancerRepository;

    @Autowired
    FreelancerBankRepository freelancerBankRepository;

    @Autowired
    FreelancerWorkRepository freelancerWorkRepository;

    @Autowired
    SkillService skillService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Freelancer getFreelancerById(String freelancerId) {
        Freelancer freelancer = freelancerRepository.findById(freelancerId)
                .orElseThrow(() -> new BadRequestException("Freelancer id is not valid :" + freelancerId));

        return freelancer;
    }

    public Page<Freelancer> getFreelancerList(Pageable pageable, String id,String freelancerRefNo, String firstName, String lastName, String email, String mobile, String state, String status, Instant  from, Instant to, TokenPayLoadDetails tokenPayLoadDetails) {

        Query query = new Query();
        if (id != null) {
            query.addCriteria(Criteria.where("id"));
        }
        if (freelancerRefNo != null) {
            query.addCriteria(Criteria.where("freelancerRefNo").regex(Pattern.compile(freelancerRefNo, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if (firstName != null) {
            query.addCriteria(Criteria.where("firstName").regex(Pattern.compile(firstName, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (lastName != null) {
            query.addCriteria(Criteria.where("lastName").regex(Pattern.compile(lastName, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (email != null) {
            query.addCriteria(Criteria.where("email").regex(Pattern.compile(email, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (mobile != null) {
            query.addCriteria(Criteria.where("mobile").regex(Pattern.compile(mobile, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (state != null) {
            query.addCriteria(Criteria.where("address.state").regex(Pattern.compile(state, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }
        if (from != null) {
            query.addCriteria(Criteria.where("createdAt").gte(from));
        }

        if (to != null) {
            query.addCriteria(Criteria.where("createdAt").lt(to));
        }

        if (from != null && to != null) {
            query.addCriteria(
                    Criteria.where("")
                    .andOperator(
                        Criteria.where("createdAt").lt(to),
                        Criteria.where("createdAt").gte(from)
                    ));
        }

        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));

        long count = mongoTemplate.count(query, Freelancer.class);

        //get selected records
        if (pageable != null) {
            query.with(pageable);
        }
        List<Freelancer> result = mongoTemplate.find(query, Freelancer.class);
        Page<Freelancer> freelancer = new PageImpl<>(result, pageable, count);

        return freelancer;
    }

    public FreelancerDetailResponse getFreelancerDetails(String freelancerId, TokenPayLoadDetails tokenPayLoadDetails) {

        Freelancer freelancer = getFreelancerById(freelancerId);
        FreelancerDetailResponse freelancerDetailsDto = ClassUtil.convert(freelancer, FreelancerDetailResponse.class);

        List<FreelancerWorkDetail> freelancerWorkDetailList = freelancerWorkRepository.findByFreelancerId(freelancerId);

        if (authenticationService.isAdmin(tokenPayLoadDetails)) {
            Optional<FreelancerBankDetail> freelancerBankDetailO = freelancerBankRepository.findByFreelancerId(freelancerId);
            if (freelancerBankDetailO.isPresent()) {

                BankDetailDto freelancerBankDetailDto = ClassUtil.convert(freelancerBankDetailO.get(), BankDetailDto.class);
                freelancerDetailsDto.setBankDetail(freelancerBankDetailDto);
            }
        }
        if (freelancerWorkDetailList != null) {

            List<WorkDetailDto> freelancerWorkDetailListDto = ClassUtil.convertList(freelancerWorkDetailList, WorkDetailDto.class);
            freelancerDetailsDto.setWorkDetails(freelancerWorkDetailListDto);
        }

        //Getting Array list of skills
        List<AssociatedSkill> freelancerSkill = freelancer.getSkills();
        if (freelancerSkill != null) {

            List<SkillCategoryDto> skillCategoryDto = skillService.getSkillCategory(freelancerSkill);
            freelancerDetailsDto.setSkillCategory(skillCategoryDto);
        }

        return freelancerDetailsDto;
    }

    public void updateStatus(String freelancerId, Status status) {

        Freelancer freelancer = freelancerRepository.findById(freelancerId).orElse(null);

        freelancer.setStatus(status);
        freelancerRepository.save(freelancer);
    }

}
