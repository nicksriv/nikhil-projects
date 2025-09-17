/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.job.api.controller;

import com.brandpulse.job.api.dto.JobApplicantListDto;
import com.brandpulse.job.app.job.Job;
import com.brandpulse.job.app.jobApplicant.JobApplicant;
import com.brandpulse.job.app.jobApplicant.JobApplicantService;
import com.brandpulse.job.app.jobCandidate.JobCandidate;
import com.brandpulse.job.app.jobCandidate.JobCandidateService;
import com.brandpulse.job.app.job.JobService;
import com.brandpulse.job.common.dto.CommonResponseDto;
import com.brandpulse.job.exception.ApiException;
import com.brandpulse.job.security.AuthenticationService;
import com.brandpulse.job.security.Token;
import com.brandpulse.job.util.ClassUtil;
import java.time.Instant;
import java.time.OffsetDateTime;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author dell
 */
@RestController
@RequestMapping("api/v1/jobs/{jobId}/applicants")
public class JobApplicantController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    JobService jobService;

    @Autowired
    JobApplicantService jobApplicantService;

    @Autowired
    JobCandidateService jobCandidateService;

    @GetMapping("")
    public Page<JobApplicantListDto> getJobList(
            @PathVariable String jobId,
            Pageable pageable,
            @RequestParam(required = false) String userType,
            @RequestParam(required = false) String jobApplicationStatus,
            @RequestParam(required = false) String jobApplicationAt,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to) {

        try {
            Token token = authenticationService.getClientOrAdminToken();

            Page<JobApplicantListDto> jobApplicantPage = jobApplicantService.getApplicantJobList(pageable, token, jobId, userType, jobApplicationStatus, jobApplicationAt, from, to);

            return jobApplicantPage;
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("{jobApplicantId}")
    public JobApplicantListDto getApplicantJobDetails(@PathVariable String jobApplicantId) {

        try {
            Token token = authenticationService.getClientOrAdminToken();

            JobApplicant jobApplicant = jobApplicantService.getJobApplicantById(jobApplicantId, token);
            JobApplicantListDto jobApplicantListDto = ClassUtil.convert(jobApplicant, JobApplicantListDto.class);

            return jobApplicantListDto;
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @Transactional
    @PostMapping("{jobApplicantId}/approve")
    public CommonResponseDto approveApplicant(@PathVariable String jobApplicantId, @RequestParam(required = false) String notes) {
        try {
            Token token = authenticationService.getClientOrAdminToken();

            JobApplicant jobApplicant = jobApplicantService.getJobApplicantById(jobApplicantId, token);
            Job job = jobService.getJobById(jobApplicant.getJobId(), token);

            JobCandidate jobCandidate = jobCandidateService.createJobCandidate(jobApplicant, job);
            jobApplicant.setJobCandidateId(jobCandidate.getId());

            jobApplicantService.approveApplicantJob(jobApplicant, notes);
            return new CommonResponseDto("Applicant Job is approved");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("{jobApplicantId}/reject")
    public CommonResponseDto rejectApplicant(@PathVariable String jobApplicantId, @RequestParam String notes) {
        try {
            Token token = authenticationService.getClientOrAdminToken();

            jobApplicantService.rejectApplicantJob(jobApplicantId, notes, token);
            return new CommonResponseDto("Applicant Job is Rejected");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }
}
