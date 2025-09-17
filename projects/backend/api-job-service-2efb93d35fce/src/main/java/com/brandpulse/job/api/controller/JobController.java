/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.job.api.controller;

import com.brandpulse.job.api.dto.CommonDashboardStatsDto;
import com.brandpulse.job.api.dto.JobDetailDto;
import com.brandpulse.job.api.dto.JobListDto;
import com.brandpulse.job.api.dto.JobRequestDto;
import com.brandpulse.job.api.dto.JobStatDto;
import com.brandpulse.job.api.dto.MapModulesDto;
import com.brandpulse.job.api.dto.QADashboardStatsDto;
import com.brandpulse.job.api.dto.SkillCategoryDto;
import com.brandpulse.job.app.job.Job;
import com.brandpulse.job.app.job.JobExcelService;
import com.brandpulse.job.app.job.JobService;
import com.brandpulse.job.app.skill.SkillService;
import com.brandpulse.job.common.dto.CommonResponseDto;
import com.brandpulse.job.common.enums.UserType;
import com.brandpulse.job.common.service.LoggerService;
import com.brandpulse.job.exception.ApiException;
import com.brandpulse.job.exception.ErrorCodeConstant;
import com.brandpulse.job.security.AuthenticationService;
import com.brandpulse.job.security.Token;
import com.brandpulse.job.util.ClassUtil;
import com.brandpulse.job.util.CommonUtil;
import com.brandpulse.job.util.JsonUtil;
import java.time.Instant;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
 * @author dell
 */
@RestController
@RequestMapping("/api/v1/jobs")
public class JobController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    JobService jobService;

    @Autowired
    SkillService skillService;

    @Autowired
    JobExcelService jobExcelService;

    @Autowired
    LoggerService loggerService;

    @GetMapping("")
    public Page<JobListDto> getJobList(Pageable pageable,
            @RequestParam(required = false) String clientId,
            @RequestParam(required = false) String jobRefNo,
            @RequestParam(required = false) String jobTitle,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String jobStatus,
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) String skillCategories,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to) {

        try {
             Token token = authenticationService.getClientOrAdminOrQualityAssuranceToken();

            Page<Job> jobPage = jobService.getJobList(pageable,  token ,clientId, jobRefNo, jobTitle, jobType, state, jobStatus, skills, skillCategories, from, to);
            return jobService.getJobDtoList(jobPage);
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("excel/download")
    public ResponseEntity<byte[]> excelDownload(
            @RequestParam(required = false) String clientId,
            @RequestParam(required = false) String jobRefNo,
            @RequestParam(required = false) String jobTitle,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) String skillCategories,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to) {

        try {
             Token token = authenticationService.getClientOrAdminOrQualityAssuranceToken();

            Page<Job> jobPage = jobService.getJobList( null , token,clientId, jobRefNo, jobTitle, jobType, state, status, skills, skillCategories, from, to);
            Page<JobListDto> jobPageDtos = jobService.getJobDtoList(jobPage);

            byte[] contents = jobExcelService.getJobExcel(jobPageDtos);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
            headers.setContentDispositionFormData("Job Details", "job-details-" + CommonUtil.getCurrentDateString() + ".xlsx");
            ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);

            return response;
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("{jobId}")
    public JobDetailDto getJobDetails(@PathVariable String jobId) {

        try {
            Token token = authenticationService.getClientOrAdminOrQualityAssuranceToken();

            Job job = jobService.getJobById(jobId, token);

            if (authenticationService.isClient() && job.getClientId() != null && !job.getClientId().equals(token.getUserId())) {
                throw new ApiException(ErrorCodeConstant.JJ001);
            }

            JobDetailDto jobDetailDto = ClassUtil.convert(job, JobDetailDto.class);

            List<SkillCategoryDto> skillCategoryDto = skillService.getSkillCategoryBySkillIds(job.getSkills());
            jobDetailDto.setSkillCategories(skillCategoryDto);

            // draft json
            // set draft json skills
            if (job.getJobDraftJson() != null) {

                Job draftJob = (Job) JsonUtil.toObject(job.getJobDraftJson(), Job.class);
                JobDetailDto draftJobDetailDto = ClassUtil.convert(draftJob, JobDetailDto.class);
                List<SkillCategoryDto> draftSkillCategoryDto = skillService.getSkillCategoryBySkillIds(draftJob.getSkills());
                draftJobDetailDto.setSkillCategories(draftSkillCategoryDto);
                jobDetailDto.setJobDraftJson(JsonUtil.toString(draftJobDetailDto));
            }
            return jobDetailDto;
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("")
    public CommonResponseDto addJobDetails(@RequestBody JobRequestDto jobRequestDto) {
        try {
            Token token = authenticationService.getClientOrAdminToken();

            jobService.validateJob(jobRequestDto);
            jobService.createUpdateJobDetails(null, jobRequestDto, token);

            return new CommonResponseDto("Job added successfully");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("{jobId}")
    public CommonResponseDto updateJobDetails(@PathVariable String jobId, @RequestBody JobRequestDto jobRequestDto) {
        try {
            Token token = authenticationService.getClientOrAdminToken();

            jobService.validateJob(jobRequestDto);
            jobService.createUpdateJobDetails(jobId, jobRequestDto, token);

            return new CommonResponseDto("Job updated successfully");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("{jobId}/publish")
    public CommonResponseDto publishJob(@PathVariable String jobId) {
        try {
            Token token = authenticationService.getClientOrAdminToken();

            jobService.jobPublish(jobId, token);
            return new CommonResponseDto("Job published successfully");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("/{jobId}/discard/draft")
    public CommonResponseDto discardDraftJob(@PathVariable String jobId) {
        try {
            Token token = authenticationService.getClientOrAdminToken();

            jobService.discardDraftJob(jobId, token);
            return new CommonResponseDto("Job discarded successfully");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("/{jobId}/unpublish")
    public CommonResponseDto unpublishJob(@PathVariable String jobId) {
        try {
            Token token = authenticationService.getClientOrAdminToken();

            jobService.unPublishJob(jobId, token);
            return new CommonResponseDto("Job Unpublished");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("/{jobId}/map/modules")
    public CommonResponseDto mapModulesToJob(@PathVariable String jobId, @RequestBody MapModulesDto mapModulesDto) {
        try {
            Token token = authenticationService.getClientOrAdminToken();

            jobService.mapModulesToJob(jobId, mapModulesDto.getModules(), token);
            return new CommonResponseDto("Module added successfully");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("{jobId}/complete")
    public CommonResponseDto markJobComplete(@PathVariable String jobId) {
        try {
            Token token = authenticationService.getClientOrAdminToken();
            jobService.markJobComplete(jobId, token);
            return new CommonResponseDto("Job mark completed successfully");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("/dashboard/stats")
    public CommonDashboardStatsDto getAdminDashboardStatsDto() {
        try {
            Token token = authenticationService.getClientOrAdminToken();

            if (token.getUserType().toLowerCase().equals(UserType.ADMIN.toString().toLowerCase())) {
                return jobService.getAdminDashboardStats();
            }
            if (token.getUserType().toLowerCase().equals(UserType.CLIENT.toString().toLowerCase())) {
                return jobService.getClientDashboardStats(token.getUserId());
            }
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
        return null;
    }

    @GetMapping("stats")
    public JobStatDto getjobStats(@RequestParam String userId, @RequestParam UserType userType) {
        try {
            Token token = authenticationService.getClientOrAdminToken();

            return jobService.getjobStats(userId, userType);
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("qa-dashboard/stats")
    public QADashboardStatsDto getQualityAssuranceStats() {

        try {
            Token token = authenticationService.getQualityAssuranceToken();
            return jobService.getQualityAssuranceStats(token.getUserId());

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

}
