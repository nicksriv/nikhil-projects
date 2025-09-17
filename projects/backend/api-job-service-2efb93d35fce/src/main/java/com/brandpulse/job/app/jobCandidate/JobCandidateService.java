/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.app.jobCandidate;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
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

import com.brandpulse.job.api.dto.CandidateJobApproveRequestDto;
import com.brandpulse.job.api.dto.CandidateJobRejectRequestDto;
import com.brandpulse.job.api.dto.CandidateJobRemarkDto;
import com.brandpulse.job.api.dto.CandidatePaymentRequestDto;
import com.brandpulse.job.api.dto.JobCandidateListDto;
import com.brandpulse.job.api.dto.JobCandidateNoteDto;
import com.brandpulse.job.api.dto.JobCandidateRecentWorkDto;
import com.brandpulse.job.app.freelancer.Freelancer;
import com.brandpulse.job.app.freelancer.FreelancerRepository;
import com.brandpulse.job.app.job.Job;
import com.brandpulse.job.app.job.enums.AmountStatus;
import com.brandpulse.job.app.job.enums.JobCandidateStatus;
import com.brandpulse.job.app.jobApplicant.JobApplicant;
import com.brandpulse.job.app.qualityAssurance.QualityAssurance;
import com.brandpulse.job.app.qualityAssurance.QualityAssuranceRepository;
import com.brandpulse.job.app.vendor.Vendor;
import com.brandpulse.job.app.vendor.VendorRepository;
import com.brandpulse.job.common.enums.UserType;
import com.brandpulse.job.exception.ErrorCodeConstant;
import com.brandpulse.job.exception.ServiceException;
import com.brandpulse.job.security.Token;
import com.brandpulse.job.util.ClassUtil;

/**
 *
 * @author Suhail Tamboli
 */
@Service
public class JobCandidateService {

    @Autowired
    QualityAssuranceRepository qualityAssuranceRepository;

    @Autowired
    private FreelancerRepository freelancerRepository;
    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    JobCandidateRepository jobCandidateRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public JobCandidate createJobCandidate(JobApplicant jobApplicant, Job job) {
        JobCandidate jobCandidate = new JobCandidate();

        jobCandidate.setClientId(job.getClientId());
        jobCandidate.setJobId(job.getId());
        jobCandidate.setJobTitle(job.getJobTitle());

        jobCandidate.setUserId(jobApplicant.getUserId());
        jobCandidate.setUserType(jobApplicant.getUserType());

        jobCandidate.setJobStatus(JobCandidateStatus.NEW);
        jobCandidate.setJobStatusRemark("");
        jobCandidate.setJobStatusAt(Instant.now());
        jobCandidate.setJobUserRemark("");

        // no need to set approver details now as it will be set after completion of
        // jobs
        jobCandidate.setJobRating(0F);
        jobCandidate.setJobRatingDescription("");

        jobCandidate.setTotalHoursWorked(0F);
        jobCandidate.setTotalEarned(0F);
        jobCandidate.setAmountPaid(0F);
        jobCandidate.setAmountStatus(AmountStatus.PENDING);
        jobCandidate.setPayerRemark("");

        jobCandidate.setNotes("");

        jobCandidateRepository.save(jobCandidate);

        return jobCandidate;
    }

    public Page<JobCandidateListDto> getJobCandidates(Token token, Pageable pageable, String jobId, JobCandidateStatus jobCandidateStatus) {
        // Using mongo template query builder
        Query query = new Query();

        if (token.getTypeOfUser() != null && token.getTypeOfUser().equalsIgnoreCase(UserType.CLIENT.toString())) {
            query.addCriteria(Criteria.where("clientId").is(token.getUserId()));
        } else if (token.getUserType().equalsIgnoreCase(UserType.QUALITY_ASSURANCE.toString())) {
            Optional<QualityAssurance> qa = qualityAssuranceRepository.findById(token.getUserId());
            query.addCriteria(Criteria.where("clientId").in(qa.get().getClients()));
        }

        if (jobId != null) {
            query.addCriteria(Criteria.where("jobId").is(jobId));
        }

        if (jobCandidateStatus != null) {
            query.addCriteria(Criteria.where("JobCandidateStatus").is(jobCandidateStatus));
        }

        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));

        long count = mongoTemplate.count(query, JobCandidate.class);

        // get selected records
        query.with(pageable);
        List<JobCandidate> result = mongoTemplate.find(query, JobCandidate.class);

        List<JobCandidateListDto> result2 = ClassUtil.convertList(result, JobCandidateListDto.class);
        result2 = setCandidateName(result2);

        Page<JobCandidateListDto> jobCandidates = new PageImpl<>(result2, pageable, count);

        return jobCandidates;
    }

    public List<JobCandidateListDto> setCandidateName(List<JobCandidateListDto> jobCandidateDtos) {
        List<String> freelancerIds = jobCandidateDtos.stream()
                .filter(ja -> ja.getUserType().equals(UserType.FREELANCER)).map(ja -> ja.getUserId())
                .collect(Collectors.toList());
        List<String> vendorIds = jobCandidateDtos.stream().filter(ja -> ja.getUserType().equals(UserType.VENDOR))
                .map(ja -> ja.getUserId()).collect(Collectors.toList());

        List<Freelancer> freelancers = freelancerRepository.findByIdIn(freelancerIds);
        List<Vendor> vendors = vendorRepository.findByIdIn(vendorIds);

        Integer fc = freelancers.size();
        Integer vc = vendors.size();

        jobCandidateDtos = jobCandidateDtos.stream().map(ja -> {

            if (ja.getUserType().equals(UserType.FREELANCER)) {
                for (int i = 0; i < fc; i++) {
                    if (freelancers.get(i).getId().equals(ja.getUserId())) {
                        ja.setCandidateName(freelancers.get(i).getName());
                    }
                }

            } else if (ja.getUserType().equals(UserType.VENDOR)) {
                for (int i = 0; i < vc; i++) {
                    if (vendors.get(i).getId().equals(ja.getUserId())) {
                        ja.setCandidateName(vendors.get(i).getVendorName());
                    }
                }
            }

            return ja;
        }).collect(Collectors.toList());

        return jobCandidateDtos;
    }

    public JobCandidate getJobCandidateById(String jobCandidateId, Token token) {
        JobCandidate jobCandidate = jobCandidateRepository.findById(jobCandidateId)
                .orElseThrow(() -> new ServiceException(ErrorCodeConstant.JC014));

        if (token.getUserTypeEnum().equals(UserType.CLIENT) && !jobCandidate.getClientId().equals(token.getUserId())) {
            throw new ServiceException(ErrorCodeConstant.JC011);
        }

        return jobCandidate;
    }

    public void updateCandidatePayment(String jobCandidateId, CandidatePaymentRequestDto candidatePaymentDto,
            Token token) {

        JobCandidate jobCandidate = getJobCandidateById(jobCandidateId, token);
        if (!(jobCandidate.getJobStatus() != null && jobCandidate.getJobStatus().equals(JobCandidateStatus.CLOSED))) {
            throw new ServiceException(ErrorCodeConstant.JCC003);
        }
        if (jobCandidate.getAmountStatus() != null && jobCandidate.getAmountStatus().equals(AmountStatus.PAID)) {
            throw new ServiceException(ErrorCodeConstant.JCC002);
        }

        jobCandidate.setTotalEarned(candidatePaymentDto.getTotalEarned());
        jobCandidate.setAmountPaid(candidatePaymentDto.getAmountPaid());
        jobCandidate.setPayerRemark(candidatePaymentDto.getPayerRemark());

        if (jobCandidate.getTotalEarned() < jobCandidate.getAmountPaid()) {
            throw new ServiceException(ErrorCodeConstant.JC015);
        }
        if (!jobCandidate.getTotalEarned().equals(jobCandidate.getAmountPaid())) {
            jobCandidate.setAmountStatus(AmountStatus.PENDING);
        }
        if (jobCandidate.getTotalEarned().equals(jobCandidate.getAmountPaid())) {
            jobCandidate.setAmountStatus(AmountStatus.PAID);
        }
        jobCandidateRepository.save(jobCandidate);
    }

    public void updatePayerRemark(String jobCandidateId, CandidateJobRemarkDto candidateJobRemarkDto, Token token) {
        JobCandidate jobCandidate = getJobCandidateById(jobCandidateId, token);
        if (!(jobCandidate.getJobStatus() != null && jobCandidate.getJobStatus().equals(JobCandidateStatus.CLOSED))) {
            throw new ServiceException(ErrorCodeConstant.JCC003);
        }
        jobCandidate.setPayerRemark(candidateJobRemarkDto.getPayerRemark());
        jobCandidateRepository.save(jobCandidate);
    }

    public void updateUserNotes(String jobCandidateId, JobCandidateNoteDto jobCandidateNoteDto, Token token) {
        JobCandidate jobCandidate = getJobCandidateById(jobCandidateId, token);

        if (jobCandidateNoteDto.getNotes() == null || jobCandidateNoteDto.getNotes().isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.JC019);
        }
        jobCandidate.setNotes(jobCandidateNoteDto.getNotes());
        jobCandidateRepository.save(jobCandidate);
    }

    public boolean validateCandidateJobsStatus(CandidateJobApproveRequestDto candidateJobApproveDto) {

        if (candidateJobApproveDto.getJobApproverRemark() == null
                || candidateJobApproveDto.getJobApproverRemark().isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.JC016);
        }

        if (candidateJobApproveDto.getJobRating() == null) {
            throw new ServiceException(ErrorCodeConstant.JC017);
        }

        if (candidateJobApproveDto.getJobRatingDescription() == null
                || candidateJobApproveDto.getJobRatingDescription().isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.JC018);
        }
        return true;

    }

    public void approveCandidateWork(String candidateJobId, CandidateJobApproveRequestDto candidateJobApproveDto,
            Token token) {

        validateCandidateJobsStatus(candidateJobApproveDto);

        JobCandidate jobCandidate = getJobCandidateById(candidateJobId, token);
        if (!(jobCandidate.getJobStatus() != null && jobCandidate.getJobStatus().equals(JobCandidateStatus.INREVIEW))) {
            throw new ServiceException(ErrorCodeConstant.JCC004);
        }

        jobCandidate.setJobApproverRemark(candidateJobApproveDto.getJobApproverRemark());
        jobCandidate.setJobApproverRemarkAt(Instant.now());
        jobCandidate.setJobRating(candidateJobApproveDto.getJobRating());
        jobCandidate.setJobRatingDescription(candidateJobApproveDto.getJobRatingDescription());
        jobCandidate.setTotalHoursWorked(candidateJobApproveDto.getTotalHoursWorked());
        jobCandidate.setJobStatus(JobCandidateStatus.CLOSED);
        jobCandidateRepository.save(jobCandidate);

    }

    public void rejectCandidateWork(String candidateJobId, CandidateJobRejectRequestDto candidateJobRejectDto,
            Token token) {

        JobCandidate jobCandidate = getJobCandidateById(candidateJobId, token);
        if (!(jobCandidate.getJobStatus() != null && jobCandidate.getJobStatus().equals(JobCandidateStatus.INREVIEW))) {
            throw new ServiceException(ErrorCodeConstant.JCC004);
        }

        if (candidateJobRejectDto.getJobStatusRemark() == null
                || candidateJobRejectDto.getJobStatusRemark().isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.JC020);
        }
        jobCandidate.setJobStatusRemark(candidateJobRejectDto.getJobStatusRemark());
        jobCandidate.setJobStatusAt(Instant.now());
        jobCandidate.setJobStatus(JobCandidateStatus.INPROGRESS);
        jobCandidateRepository.save(jobCandidate);

    }

    public List<JobCandidateRecentWorkDto> getRecentWork(String userId, String userType) {

        List<JobCandidate> jobCandidates = jobCandidateRepository.findFirst5ByUserIdAndUserTypeOrderByCreatedAtDesc(userId, userType);
        List<JobCandidateRecentWorkDto> jobCandidateRecentWorkDtos = ClassUtil.convertList(jobCandidates, JobCandidateRecentWorkDto.class);
        return jobCandidateRecentWorkDtos;
    }

}
