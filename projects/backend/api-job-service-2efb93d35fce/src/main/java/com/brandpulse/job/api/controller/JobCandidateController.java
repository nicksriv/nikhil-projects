/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.job.api.controller;

import com.brandpulse.job.api.dto.CandidateJobApproveRequestDto;
import com.brandpulse.job.api.dto.CandidateJobRejectRequestDto;
import com.brandpulse.job.api.dto.CandidateJobRemarkDto;
import com.brandpulse.job.api.dto.CandidatePaymentRequestDto;
import com.brandpulse.job.api.dto.JobCandidateDetailDto;
import com.brandpulse.job.api.dto.JobCandidateListDto;
import com.brandpulse.job.api.dto.JobCandidateNoteDto;
import com.brandpulse.job.api.dto.JobCandidateRecentWorkDto;
import com.brandpulse.job.app.job.Job;
import com.brandpulse.job.app.job.JobService;
import com.brandpulse.job.app.job.enums.JobCandidateStatus;
import com.brandpulse.job.app.jobCandidate.JobCandidate;
import com.brandpulse.job.app.jobCandidate.JobCandidateService;
import com.brandpulse.job.common.dto.CommonResponseDto;
import com.brandpulse.job.exception.ApiException;
import com.brandpulse.job.security.AuthenticationService;
import com.brandpulse.job.security.Token;
import com.brandpulse.job.util.ClassUtil;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ts
 */
@RestController
@RequestMapping("api/v1/jobs/{jobId}/candidates")
public class JobCandidateController {

    @Autowired
    JobCandidateService jobCandidateService;

    @Autowired
    JobService jobService;

    @Autowired
    AuthenticationService authenticationService;

    @GetMapping("")
    public Page<JobCandidateListDto> getJobCandidates(
            @PathVariable String jobId,
            Pageable pageable, @RequestParam(name = "status", required = false) JobCandidateStatus jcs) {
        try {
            Token token = authenticationService.getClientOrAdminOrQualityAssuranceToken();

            Page<JobCandidateListDto> jobCandidates = jobCandidateService.getJobCandidates(token, pageable, jobId, jcs);

            return jobCandidates;
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }

    }

    @GetMapping("{jobCandidateId}")
    public JobCandidateDetailDto getCandidateDetails(@PathVariable String jobCandidateId) {

        try {
            Token token = authenticationService.getClientOrAdminOrQualityAssuranceToken();

            JobCandidate jobCandidate = jobCandidateService.getJobCandidateById(jobCandidateId, token);
            Job job = jobService.getJobById(jobCandidate.getJobId(), token);
            JobCandidateDetailDto jobCandidateDetailsDto = ClassUtil.convert(jobCandidate, JobCandidateDetailDto.class);
            jobCandidateDetailsDto.setModules(job.getModules());
            return jobCandidateDetailsDto;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("{jobCandidateId}/payment")
    public CommonResponseDto updateCandidatePayment(@PathVariable String jobCandidateId, @RequestBody CandidatePaymentRequestDto candidatePaymentRequestDto) {

        try {
            Token token = authenticationService.getClientOrAdminToken();

            jobCandidateService.updateCandidatePayment(jobCandidateId, candidatePaymentRequestDto, token);
            return new CommonResponseDto("Amount updated successfully");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("{jobCandidateId}/remark")
    public CommonResponseDto updatePayerRemark(@PathVariable String jobCandidateId, @RequestBody CandidateJobRemarkDto candidateJobRemarkDto) {
        try {
            Token token = authenticationService.getClientOrAdminToken();

            jobCandidateService.updatePayerRemark(jobCandidateId, candidateJobRemarkDto, token);
            return new CommonResponseDto("Candidate remark is updated");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("{jobCandidateId}/note")
    public CommonResponseDto updateUserNotes(@PathVariable String jobCandidateId, @RequestBody JobCandidateNoteDto jobCandidateNoteDto) {

        try {
            Token token = authenticationService.getClientOrAdminOrQualityAssuranceToken();

            jobCandidateService.updateUserNotes(jobCandidateId, jobCandidateNoteDto, token);
            return new CommonResponseDto("Candidate notes is updated");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("{candidateJobId}/approve-work")
    public CommonResponseDto approveWork(@PathVariable String candidateJobId, @RequestBody CandidateJobApproveRequestDto candidateJobApproveRequestDto) {

        try {
            Token token = authenticationService.getClientOrAdminOrQualityAssuranceToken();
            jobCandidateService.approveCandidateWork(candidateJobId, candidateJobApproveRequestDto, token);
            return new CommonResponseDto("Candidate job approved");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("{candidateJobId}/reject")
    public CommonResponseDto rejectWork(@PathVariable String candidateJobId, @RequestBody CandidateJobRejectRequestDto candidateJobRejectRequestDto) {

        try {
            Token token = authenticationService.getClientOrAdminOrQualityAssuranceToken();
            jobCandidateService.rejectCandidateWork(candidateJobId, candidateJobRejectRequestDto, token);
            return new CommonResponseDto("Candidate job rejected");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("recent-work")
    public List<JobCandidateRecentWorkDto> getRecentWork(@RequestParam String userId, @RequestParam String userType) {

        try {
            authenticationService.getClientOrAdminOrQualityAssuranceToken();
            return jobCandidateService.getRecentWork(userId, userType);
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

}
