package com.brandpulse.fv.api.controller;

import com.brandpulse.fv.api.dto.ClientDto;
import com.brandpulse.fv.api.dto.JobApplicantDetailDto;
import com.brandpulse.fv.api.dto.JobApplicantListDto;
import com.brandpulse.fv.api.dto.JobDetailDto;
import com.brandpulse.fv.api.dto.JobListDto;
import com.brandpulse.fv.api.dto.SkillDto;
import com.brandpulse.fv.app.client.Client;
import com.brandpulse.fv.app.client.ClientService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import com.brandpulse.fv.app.job.JobService;
import com.brandpulse.fv.app.job.Job;
import com.brandpulse.fv.app.job.JobApplicant;
import com.brandpulse.fv.app.job.enums.JobApplicationStatus;
import com.brandpulse.fv.app.job.enums.JobStatus;
import com.brandpulse.fv.app.skill.Skill;
import com.brandpulse.fv.app.skill.SkillService;
import com.brandpulse.fv.common.dto.CommonResponseDto;
import com.brandpulse.fv.exception.ApiException;
import com.brandpulse.fv.exception.ErrorCodeConstant;
import com.brandpulse.fv.exception.ServiceException;
import com.brandpulse.fv.security.AuthenticationService;
import com.brandpulse.fv.security.Token;
import com.brandpulse.fv.util.ClassUtil;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api/v1/jobs/")
public class JobController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    JobService jobService;

    @Autowired
    ClientService clientService;

    @Autowired
    SkillService skillService;

    @GetMapping("")
    public Page<JobListDto> getJobList(Pageable pageable,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) String skillCategories,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state) {

        try {
            Token token = authenticationService.getFreelancerOrVendorToken();

            List<String> appliedJobIds = jobService.getAppliedJobIds(token);
            Page<Job> jobPage = jobService.getJobList(pageable, token, search, skills, skillCategories, country, state, city, appliedJobIds);

            List<Job> jobs = jobPage.getContent();

            List<String> skillIds = new ArrayList<>();
            Map<String, ArrayList<String>> jobViceSkillIds = new HashMap<>();

            for (int i = 0; i < jobs.size(); i++) {
                Job j = jobs.get(i);

                if (j.getSkills() == null) {
                    jobViceSkillIds.put(j.getId(), new ArrayList<>());
                    continue;
                }

                skillIds.addAll(j.getSkills());
                jobViceSkillIds.put(j.getId(), j.getSkills());
            }

            List<Skill> skillList = skillService.getActiveSkillByIds(skillIds);
            List<SkillDto> skillDtos = ClassUtil.convertList(skillList, SkillDto.class);

            Page<JobListDto> jobPageDtos = jobPage.map(job -> {
                JobListDto jld = ClassUtil.convert(job, JobListDto.class);

                List<String> ids = jobViceSkillIds.get(jld.getId());
                List<SkillDto> sl = skillDtos.stream().filter(s -> ids.contains(s.getId())).collect(Collectors.toList());
                jld.setSkills(sl);

                return jld;
            });

            return jobPageDtos;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("{jobId}")
    public JobDetailDto getJobDetails(@PathVariable String jobId) {
        try {
            Token token = authenticationService.getFreelancerOrVendorToken();

            Job job = jobService.getJobById(jobId);

            // check if allowed to view
            jobService.isJobAllowedToView(job, token);

            JobDetailDto jobDetailDto = ClassUtil.convert(job, JobDetailDto.class);

            try {
                // set job applied status in dto by checking from job applicant table
                JobApplicant jobApplicant = jobService.getJobApplicantByJobId(jobId, token);
                jobDetailDto.setJobApplicantStatus(jobApplicant.getJobApplicationStatus());
            } catch (Exception ex) {
                // no need to set job application status
            }

            // set client details as well
            Client client = clientService.getClientDetails(job.getClientId());
            ClientDto clientDto = ClassUtil.convert(client, ClientDto.class);
            jobDetailDto.setClient(clientDto);

            // set skills
            List<Skill> skills = skillService.getActiveSkillByIds(job.getSkills());
            List<SkillDto> skillDto = ClassUtil.convertList(skills, SkillDto.class);
            jobDetailDto.setSkill(skillDto);

            return jobDetailDto;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("{jobId}/apply")
    public CommonResponseDto getJobApply(@PathVariable String jobId, @RequestParam("userNote") String userNote) {

        try {
            Token token = authenticationService.getFreelancerOrVendorToken();
            Job job = jobService.getJobById(jobId);
            if (job.getJobStatus().equals(JobStatus.COMPLETED)) {
                throw new ServiceException(ErrorCodeConstant.FVJ011);
            }
            jobService.applyJob(job, token, userNote);

            return new CommonResponseDto("Job applied successfully");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("{jobId}/unapply")
    public CommonResponseDto cancelAppliedJob(@PathVariable String jobId, @RequestParam("userNote") String userNote) {

        try {
            Token token = authenticationService.getFreelancerOrVendorToken();
            jobService.cancelAppliedJob(jobId, token, userNote);

            return new CommonResponseDto("Job unapplied successfully");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("{jobId}/similar-jobs")
    public List<JobListDto> getSimilarJobs(@PathVariable String jobId) {
        //convert from job to job list dto
        try {
            Token token = authenticationService.getFreelancerOrVendorToken();
            Job job = jobService.getJobById(jobId);
            List<Job> jobs = jobService.getSimilarJobs(job);
            List<JobListDto> jobListDto = ClassUtil.convertList(jobs, JobListDto.class);

            return jobListDto;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("{jobId}/other-opennings")
    public List<JobListDto> getOtherOpenning(@PathVariable String jobId) {

        //convert from job to job list dto
        try {
            Token token = authenticationService.getFreelancerOrVendorToken();
            Job job = jobService.getJobById(jobId);
            List<Job> jobs = jobService.getOtherOpenning(job);
            List<JobListDto> jobListDto = ClassUtil.convertList(jobs, JobListDto.class);

            return jobListDto;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("applied")
    public Page<JobApplicantListDto> getAppliedJobs(Pageable pageable, @RequestParam(name = "status", required = false) JobApplicationStatus jobApplicationStatus) {
        try {
            Pageable pageable2 = Pageable.unpaged();
            Token token = authenticationService.getFreelancerOrVendorToken();
            Page<JobApplicant> jobApplicants = jobService.getAppliedJobs(token, pageable2, jobApplicationStatus);
            Page<JobApplicantListDto> jobApplicantListDtos = jobService.setAppliedJobsOtherField(jobApplicants);

            return jobApplicantListDtos;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("applied/{jobApplicantId}")
    public JobApplicantDetailDto getAppliedJobDetails(@PathVariable String jobApplicantId) {
        try {
            Token token = authenticationService.getFreelancerOrVendorToken();
            JobApplicant jobApplicant = jobService.getJobApplicantById(jobApplicantId, token);

            Job job = jobService.getJobById(jobApplicant.getJobId());
            JobApplicantListDto jobApplicantListDto = ClassUtil.convert(jobApplicant, JobApplicantListDto.class);
            JobDetailDto jobDetailDto = ClassUtil.convert(job, JobDetailDto.class);

            // set job applied status in dto by checking from job applicant table
            jobDetailDto.setJobApplicantStatus(jobApplicant.getJobApplicationStatus());
            // set client details as well
            String clientId = job.getClientId();
            Client client = clientService.getClientDetails(clientId);
            ClientDto clientDto = ClassUtil.convert(client, ClientDto.class);
            jobDetailDto.setClient(clientDto);
            // set skills
            List<Skill> skills = skillService.getActiveSkillByIds(job.getSkills());
            List<SkillDto> skillDto = ClassUtil.convertList(skills, SkillDto.class);
            jobDetailDto.setSkill(skillDto);
            JobApplicantDetailDto jobApplicantDetailDto = new JobApplicantDetailDto();
            jobApplicantDetailDto.setJobDetail(jobDetailDto);
            jobApplicantDetailDto.setJobApplicant(jobApplicantListDto);

            return jobApplicantDetailDto;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }
}
