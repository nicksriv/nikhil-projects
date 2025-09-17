package com.brandpulse.job.api.controller;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.integration.IntegrationProperties.RSocket.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brandpulse.job.api.dto.JobListDto;
import com.brandpulse.job.app.job.Job;
import com.brandpulse.job.app.job.JobService;
import com.brandpulse.job.exception.ApiException;


@RestController
@RequestMapping("/api/v1/public/jobs/")

public class PublicController {

  
    @Autowired
    JobService jobService;

    @GetMapping("")
    public Page<JobListDto> getJobList(Pageable pageable,
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

            Page<Job> jobs = jobService.getJobList(pageable , null,null, jobRefNo, jobTitle, jobType, state, jobStatus, skills, skillCategories, from, to);
            return jobService.getJobDtoList(jobs);
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }
}

