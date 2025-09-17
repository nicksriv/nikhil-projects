/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.job.app.jobApplicant;

import com.brandpulse.job.api.dto.JobApplicantListDto;
import com.brandpulse.job.app.job.enums.JobApplicationStatus;
import com.brandpulse.job.common.enums.UserType;
import com.brandpulse.job.exception.ErrorCodeConstant;
import com.brandpulse.job.exception.ServiceException;
import com.brandpulse.job.app.freelancer.Freelancer;
import com.brandpulse.job.app.freelancer.FreelancerRepository;
import com.brandpulse.job.security.Token;
import com.brandpulse.job.util.ClassUtil;
import com.brandpulse.job.app.vendor.Vendor;
import com.brandpulse.job.app.vendor.VendorRepository;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

/**
 *
 * @author dell
 */
@Service
public class JobApplicantService {

    @Autowired
    JobApplicantRepository jobApplicantRepository;

    @Autowired
    VendorRepository vendorRepository;

    @Autowired
    FreelancerRepository freelancerRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Page<JobApplicantListDto> getApplicantJobList(Pageable pageable, Token token, String jobId, String userType, String jobApplicationStatus, String jobApplicationAt, Instant from, Instant to) {

        Query query = new Query();

        if (token.getUserTypeEnum().equals(UserType.CLIENT)) {
            query.addCriteria(Criteria.where("clientId").is(token.getUserId()));
        }

        if (jobId != null) {
            query.addCriteria(Criteria.where("jobId").is(jobId));
        }

        if (userType != null) {
            query.addCriteria(Criteria.where("userType").regex(Pattern.compile(userType, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (jobApplicationStatus != null) {
            query.addCriteria(Criteria.where("jobApplicationStatus").regex(Pattern.compile(jobApplicationStatus, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (jobApplicationAt != null) {
            query.addCriteria(Criteria.where("jobApplicationAt").regex(Pattern.compile(jobApplicationAt, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (from != null && to == null) {
            query.addCriteria(Criteria.where("createdAt").gte(from));
        }

        if (to != null && from == null) {
            query.addCriteria(Criteria.where("createdAt").lt(to));
        }

        if (from != null && to != null) {
            query.addCriteria(
                    Criteria.where("")
                            .andOperator(
                                    Criteria.where("createdAt").lt(to),
                                    Criteria.where("createdAt").gte(from)));
        }

        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));

        long count = mongoTemplate.count(query, JobApplicant.class);

        //get selected records
        if (pageable != null) {
            query.with(pageable);
        }

        List<JobApplicant> result = mongoTemplate.find(query, JobApplicant.class);
        List<JobApplicantListDto> result2 = ClassUtil.convertList(result, JobApplicantListDto.class);
        result2 = setApplicantName(result2);
        Page<JobApplicantListDto> jobApplicant = new PageImpl<>(result2, pageable, count);

        return jobApplicant;
    }

    public List<JobApplicantListDto> setApplicantName(List<JobApplicantListDto> jobApplicantDtos) {
        List<String> freelancerIds = jobApplicantDtos.stream().filter(ja -> ja.getUserType().equals(UserType.FREELANCER)).map(ja -> ja.getUserId()).collect(Collectors.toList());
        List<String> vendorIds = jobApplicantDtos.stream().filter(ja -> ja.getUserType().equals(UserType.VENDOR)).map(ja -> ja.getUserId()).collect(Collectors.toList());

        List<Freelancer> freelancers = freelancerRepository.findByIdIn(freelancerIds);
        List<Vendor> vendors = vendorRepository.findByIdIn(vendorIds);

        Integer fc = freelancers.size();
        Integer vc = vendors.size();

        jobApplicantDtos = jobApplicantDtos.stream().map(ja -> {

            if (ja.getUserType().equals(UserType.FREELANCER)) {
                for (int i = 0; i < fc; i++) {
                    if (freelancers.get(i).getId().equals(ja.getUserId())) {
                        ja.setApplicantName(freelancers.get(i).getName());
                    }
                }

            } else if (ja.getUserType().equals(UserType.VENDOR)) {
                for (int i = 0; i < vc; i++) {
                    if (vendors.get(i).getId().equals(ja.getUserId())) {
                        ja.setApplicantName(vendors.get(i).getVendorName());
                    }
                }
            }

            return ja;
        }).collect(Collectors.toList());

        return jobApplicantDtos;
    }

    public JobApplicant getJobApplicantById(String jobId, Token token) {
        JobApplicant jobApplicant = jobApplicantRepository.findById(jobId).orElseThrow(() -> new ServiceException(ErrorCodeConstant.JJ001));

        if (token.getUserTypeEnum().equals(UserType.CLIENT) && !jobApplicant.getClientId().equals(token.getUserId())) {
            throw new ServiceException(ErrorCodeConstant.JC011);
        }

        return jobApplicant;
    }

    public void approveApplicantJob(JobApplicant jobApplicant, String notes) {
        if (!jobApplicant.getJobApplicationStatus().equals(JobApplicationStatus.NEW)) {
            throw new ServiceException(ErrorCodeConstant.JA002);
        }

        jobApplicant.setJobApplicationStatus(JobApplicationStatus.APPROVED);
        jobApplicant.setJobAplicationStatusReason(notes);
        jobApplicantRepository.save(jobApplicant);
    }

    public void rejectApplicantJob(String jobApplicantId, String notes, Token token) {
        JobApplicant jobApplicant = getJobApplicantById(jobApplicantId, token);
        if (!jobApplicant.getJobApplicationStatus().equals(JobApplicationStatus.NEW)) {
            throw new ServiceException(ErrorCodeConstant.JA002);
        }

        jobApplicant.setJobApplicationStatus(JobApplicationStatus.REJECTED);
        jobApplicant.setJobAplicationStatusReason(notes);

        jobApplicantRepository.save(jobApplicant);
    }
}
