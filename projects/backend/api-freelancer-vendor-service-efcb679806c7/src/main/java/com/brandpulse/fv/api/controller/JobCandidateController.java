/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.controller;

import com.brandpulse.fv.api.dto.ClientDto;
import com.brandpulse.fv.api.dto.JobCandidateDetailDto;
import com.brandpulse.fv.api.dto.JobCandidateListDto;
import com.brandpulse.fv.api.dto.JobDetailDto;
import com.brandpulse.fv.api.dto.SubmitWorkRequestDto;
import com.brandpulse.fv.app.client.Client;
import com.brandpulse.fv.app.client.ClientService;
import com.brandpulse.fv.app.job.Job;
import com.brandpulse.fv.app.job.JobCandidate;
import com.brandpulse.fv.app.job.JobCandidateDashboardStat;
import com.brandpulse.fv.app.job.JobCandidateStatMonthWise;
import com.brandpulse.fv.app.job.JobEarningStatMonthWise;
import com.brandpulse.fv.app.job.JobService;
import com.brandpulse.fv.app.job.enums.JobCandidateStatus;
import com.brandpulse.fv.app.skill.Skill;
import com.brandpulse.fv.app.skill.SkillService;
import com.brandpulse.fv.common.dto.CommonResponseDto;
import com.brandpulse.fv.exception.ApiException;
import com.brandpulse.fv.security.AuthenticationService;
import com.brandpulse.fv.security.Token;
import com.brandpulse.fv.util.ClassUtil;
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
@RequestMapping("api/v1/jobs/candidates")
public class JobCandidateController {

    @Autowired
    JobService jobService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    ClientService clientService;

    @Autowired
    SkillService skillService;

    @GetMapping("")
    public Page<JobCandidateListDto> getJobCandidates(Pageable pageable, @RequestParam(name = "status", required = false) JobCandidateStatus jcs) {
        try {
            Pageable pageable2 = Pageable.unpaged();
            Token token = authenticationService.getFreelancerOrVendorOrVendorUserToken();
            Page<JobCandidate> jobCandidates = jobService.getJobCandidates(token, pageable2, jcs);
            Page<JobCandidateListDto> jobCandidateListDtos = jobService.setCandidateJobsOtherField(jobCandidates);
            return jobCandidateListDtos;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }

    }

    @GetMapping("stats")
    public List<JobCandidateStatMonthWise> jobStats(@RequestParam String year) {
        try {
            Token token = authenticationService.getToken();
            return jobService.jobStats(year, token);

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("earnings/stats")
    public List<JobEarningStatMonthWise> jobEarningStats(@RequestParam String year) {
        try {
            Token token = authenticationService.getFreelancerOrVendorToken();
            return jobService.jobEarningStats(year, token);

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("{jobCandidateId}")
    public JobCandidateDetailDto getCandidateDetails(@PathVariable String jobCandidateId) {
        try {

            Token token = authenticationService.getFreelancerOrVendorOrVendorUserToken();
            JobCandidate jobCandidate = jobService.getJobCandidateById(jobCandidateId, token);

            Job job = jobService.getJobById(jobCandidate.getJobId());
            JobDetailDto jobDetailDto = ClassUtil.convert(job, JobDetailDto.class);

            // set client details as well
            String clientId = job.getClientId();
            Client client = clientService.getClientDetails(clientId);
            ClientDto clientDto = ClassUtil.convert(client, ClientDto.class);
            jobDetailDto.setClient(clientDto);

            // set skills
            List<Skill> skills = skillService.getActiveSkillByIds(job.getSkills());
            //ClassUtil.convertList(skills, SkillDto.class);

            JobCandidateDetailDto jobCandidateDetailDto = ClassUtil.convert(jobCandidate, JobCandidateDetailDto.class);
            jobCandidateDetailDto.setJobDetails(jobDetailDto);

            return jobCandidateDetailDto;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }

    }

    @PostMapping("{jobCandidateId}/start-work")
    public CommonResponseDto startWork(@PathVariable String jobCandidateId, @RequestBody SubmitWorkRequestDto submitWorkRequestDto) {
        try {
            Token token = authenticationService.getToken();
            jobService.startWork(jobCandidateId, submitWorkRequestDto.getJobUserRemark(), token);

            return new CommonResponseDto("work started");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("{jobCandidateId}/submit-work")
    public CommonResponseDto submitWork(@PathVariable String jobCandidateId, @RequestBody SubmitWorkRequestDto submitWorkRequestDto) {
        try {
            Token token = authenticationService.getToken();
            jobService.submitWork(jobCandidateId, submitWorkRequestDto.getJobUserRemark(), token);
            return new CommonResponseDto("work submitted");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("dashboard/stats")
    public JobCandidateDashboardStat jobDashboardStats() {
        try {
            Token token = authenticationService.getToken();
            return jobService.jobDashboardStats(token);

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("{jobCandidateId}/assign")
    private CommonResponseDto assignWork(@PathVariable String jobCandidateId, @RequestParam String vendorUserId) {
        try {
            Token token = authenticationService.getVendorToken();

            jobService.assignJob(vendorUserId, jobCandidateId, token);
            return new CommonResponseDto("Assigned successfully");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }

    }
}
