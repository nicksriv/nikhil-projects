package com.brandpulse.fv.app.job;

import com.brandpulse.fv.api.dto.JobApplicantListDto;
import com.brandpulse.fv.api.dto.JobCandidateListDto;
import com.brandpulse.fv.app.job.enums.JobApplicationStatus;
import com.brandpulse.fv.app.job.enums.JobCandidateStatus;
import com.brandpulse.fv.app.job.enums.JobStatus;
import com.brandpulse.fv.app.vendor.VendorService;
import com.brandpulse.fv.common.enums.UserType;
import com.brandpulse.fv.exception.ErrorCodeConstant;
import com.brandpulse.fv.exception.ServiceException;
import com.brandpulse.fv.security.Token;
import com.brandpulse.fv.util.ClassUtil;
import java.time.Instant;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

@Service
public class JobService {

    @Autowired
    JobRepository jobRepository;

    @Autowired
    JobApplicantRepository jobApplicantRepository;

    @Autowired
    JobCandidateRepository jobCandidateRepository;

    @Autowired
    VendorService vendorService;

    @Autowired
    private MongoTemplate mongoTemplate;

    public boolean isJobAllowedToView(Job job, Token token) {

        if (token.getUserTypeEnum().equals(UserType.FREELANCER) && !job.getJobVisibility().isVisibleToFreelancer()) {
            throw new SecurityException(ErrorCodeConstant.FVJ005);
        }
        if (token.getUserTypeEnum().equals(UserType.VENDOR) && !job.getJobVisibility().isVisibleToVendor()) {
            throw new SecurityException(ErrorCodeConstant.FVJ005);
        }

        return true;
    }

    public Page<Job> getJobList(Pageable pageable, Token token, String search, String skills, String skillCategories, String country, String state, String city, List<String> appliedJobIds) {

        // Using mongo template query builder
        Query query = new Query();

        // don't show applied jobs
        if (appliedJobIds != null) {
            query.addCriteria(Criteria.where("id").nin(appliedJobIds));
        }
        query.addCriteria(Criteria.where("jobStatus").in(JobStatus.NEW));

        // apply all filter
        if (search != null) {
            query.addCriteria(Criteria.where("jobTitle").regex(Pattern.compile(search, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

//        skill category
        if (skillCategories != null) {
            List<String> ass = Arrays.asList(skillCategories.split(","));
            query.addCriteria(Criteria.where("skillCategories").in(ass));
        }

        //skills
        if (skills != null) {
            List<String> ass = Arrays.asList(skills.split(","));
            query.addCriteria(Criteria.where("skills").in(ass));
        }

        //location wise filter
        // country state city
        if (country != null) {
            query.addCriteria(Criteria.where("address.country").regex(Pattern.compile(country, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if (state != null) {
            query.addCriteria(Criteria.where("address.state").regex(Pattern.compile(state, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if (city != null) {
            query.addCriteria(Criteria.where("address.city").regex(Pattern.compile(city, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (token.getUserTypeEnum().equals(UserType.VENDOR)) {
            query.addCriteria(Criteria.where("jobVisibility.isVisibleToVendor").is(true));
        }

        if (token.getUserTypeEnum().equals(UserType.FREELANCER)) {
            query.addCriteria(Criteria.where("jobVisibility.isVisibleToFreelancer").is(true));
        }

        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));

        //gps based search
        //get count of records in db
        long count = mongoTemplate.count(query, Job.class);

        //get selected records
        query.with(pageable);
        List<Job> result = mongoTemplate.find(query, Job.class);
        Page<Job> jobs = new PageImpl<>(result, pageable, count);

        return jobs;
    }

    public Job getJobById(String jobId) {
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVJ001));
        return job;
    }

    public List<Job> getJobByIdIn(List<String> jobIds) {
        List<Job> jobs = jobRepository.findByIdIn(jobIds);
        if (jobs.isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.FVJ001);
        }
        return jobs;
    }

    public Job getJobByJobRefNo(String jobRefNo) {
        Job job = jobRepository.findByJobRefNo(jobRefNo).orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVJ001));
        return job;
    }

    public Job checkIfExist(String jobId) {
        Job jobApplicant = jobRepository.findById(jobId).orElseThrow(() -> new ServiceException(ErrorCodeConstant.FV0001));
        return jobApplicant;
    }

    public void applyJob(Job job, Token token, String userNote) {
        Optional<JobApplicant> jobApplicantO = jobApplicantRepository.findByJobIdAndUserIdAndUserType(job.getId(), token.getUserId(), token.getUserTypeEnum());
        if (jobApplicantO.isPresent()) {
            throw new SecurityException(ErrorCodeConstant.FVJ003);
        }

        JobApplicant jobApplicant = new JobApplicant();
        jobApplicant.setJobId(job.getId());
        jobApplicant.setClientId(job.getClientId());
        jobApplicant.setJobTitle(job.getJobTitle());
        jobApplicant.setUserType(token.getUserTypeEnum());
        jobApplicant.setUserId(token.getUserId());
        jobApplicant.setUserNote(userNote);
        jobApplicant.setJobApplicationStatus(JobApplicationStatus.NEW);
        jobApplicant.setJobApplicationAt(Instant.now());

        jobApplicantRepository.save(jobApplicant);
    }

    public void cancelAppliedJob(String jobId, Token token, String userNotes) {
        Optional<JobApplicant> jobApplicantO = jobApplicantRepository.findByJobIdAndUserIdAndUserType(jobId, token.getUserId(), token.getUserTypeEnum());
        if (!jobApplicantO.isPresent()) {
            throw new SecurityException(ErrorCodeConstant.FVJ001);
        }

        JobApplicant jobApplicant = jobApplicantO.get();

        if (jobApplicant.getJobApplicationStatus() != JobApplicationStatus.NEW) {
            throw new SecurityException(ErrorCodeConstant.FVJ009);
        }

        jobApplicant.setJobApplicationStatus(JobApplicationStatus.CANCELLED);
        jobApplicant.setJobAplicationStatusReason(userNotes);
        jobApplicant.setActionTakenByUser(token.getUserId());
        jobApplicant.setActionTakenByUserType(token.getUserTypeEnum());

        jobApplicantRepository.save(jobApplicant);
    }

    public List<Job> getSimilarJobs(Job job) {
        Query query = new Query();
        query.addCriteria(Criteria.where("skills").in(job.getSkills()));
        // add visibility query & default filter which should be here
        query.limit(10);
        List<Job> jobs = mongoTemplate.find(query, Job.class);

        return jobs;

    }

    public List<Job> getOtherOpenning(Job job) {

        Query query = new Query();
        query.addCriteria(Criteria.where("clientId").in(job.getClientId()));
        // add visibility query & default filter which should be here
        query.limit(10);
        List<Job> jobs = mongoTemplate.find(query, Job.class);

        return jobs;
    }

    public JobApplicant getJobApplicantByJobId(String jobId, Token token) {
        JobApplicant jobApplicant = jobApplicantRepository.findByJobIdAndUserIdAndUserType(jobId, token.getUserId(), token.getUserTypeEnum()).orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVJ004));
        return jobApplicant;
    }

    public JobApplicant getJobApplicantById(String jobApplicantId, Token token) {
        JobApplicant jobApplicant = jobApplicantRepository.findById(jobApplicantId).orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVJ004));

        if (!token.getUserId().equals(jobApplicant.getUserId()) && !token.getUserType().equals(jobApplicant.getUserType())) {
            throw new ServiceException(ErrorCodeConstant.FVJ004);
        }

        return jobApplicant;
    }

    public List<String> getAppliedJobIds(Token token) {

        // Using mongo template query builder
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(token.getUserId()));
        query.addCriteria(Criteria.where("userType").is(token.getUserTypeEnum()));
        query.fields().include("jobId");

        List<JobApplicant> result = mongoTemplate.find(query, JobApplicant.class);
        return result.stream().map(j -> j.getJobId()).collect(Collectors.toList());
    }

    public Page<JobApplicant> getAppliedJobs(Token token, Pageable pageable, JobApplicationStatus jobApplicationStatus) {

        // Using mongo template query builder
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(token.getUserId()));
        query.addCriteria(Criteria.where("userType").is(token.getUserTypeEnum()));

        if (jobApplicationStatus != null) {
            if (jobApplicationStatus.equals(JobApplicationStatus.CANCELLED) || jobApplicationStatus.equals(JobApplicationStatus.REJECTED)) {
                query.addCriteria(Criteria.where("jobApplicationStatus").in(Arrays.asList(JobApplicationStatus.CANCELLED, JobApplicationStatus.REJECTED)));
            } else {
                query.addCriteria(Criteria.where("jobApplicationStatus").is(jobApplicationStatus));
            }
        }

        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));

        long count = mongoTemplate.count(query, JobApplicant.class);

        query.with(pageable);
        List<JobApplicant> result = mongoTemplate.find(query, JobApplicant.class);
        Page<JobApplicant> jobApplicants = new PageImpl<>(result, pageable, count);
        return jobApplicants;
    }

    public Page<JobApplicantListDto> setAppliedJobsOtherField(Page<JobApplicant> jobApplicants) {

        List<String> jobIds = jobApplicants.stream().map(j -> j.getJobId()).collect(Collectors.toList());
        List<Job> jobs = getJobByIdIn(jobIds);

        // set map so it will be easy to find and set value in dto
        Map<String, Job> jobMaps = new HashMap<>();
        for (int i = 0; i < jobs.size(); i++) {
            jobMaps.put(jobs.get(i).getId(), jobs.get(i));
        }
        Page<JobApplicantListDto> jobApplicantListDtos = jobApplicants.map(ja -> {
            JobApplicantListDto jad = ClassUtil.convert(ja, JobApplicantListDto.class);
            Job j = jobMaps.get(jad.getJobId());
            if (j != null) {
                jad.setJobRefNo(j.getJobRefNo());
            }

            return jad;
        });

        return jobApplicantListDtos;
    }

    public Page<JobCandidate> getJobCandidates(Token token, Pageable pageable, JobCandidateStatus jobCandidateStatus) {
        // Using mongo template query builder
        Query query = new Query();
        if (token.getUserTypeEnum().equals(UserType.VENDOR_USER)) {
            query.addCriteria(Criteria.where("userSubId").is(token.getUserSubId()));
            query.addCriteria(Criteria.where("userType").is(UserType.VENDOR));
        } else {
            query.addCriteria(Criteria.where("userId").is(token.getUserId()));
            query.addCriteria(Criteria.where("userType").is(token.getUserTypeEnum()));
        }

        if (jobCandidateStatus != null) {
            query.addCriteria(Criteria.where("JobCandidateStatus").is(jobCandidateStatus));
        }

        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));

        long count = mongoTemplate.count(query, JobCandidate.class);

        query.with(pageable);
        List<JobCandidate> result = mongoTemplate.find(query, JobCandidate.class);
        Page<JobCandidate> jobCandidates = new PageImpl<>(result, pageable, count);
        return jobCandidates;
    }

    public Page<JobCandidateListDto> setCandidateJobsOtherField(Page<JobCandidate> jobCandidates) {

        List<String> jobIds = jobCandidates.stream().map(j -> j.getJobId()).collect(Collectors.toList());
        List<Job> jobs = getJobByIdIn(jobIds);

        // set map so it will be easy to find and set value in dto
        Map<String, Job> jobMaps = new HashMap<>();
        for (int i = 0; i < jobs.size(); i++) {
            jobMaps.put(jobs.get(i).getId(), jobs.get(i));
        }
        //set value in dto
        Page<JobCandidateListDto> jobCandidateListDtos = jobCandidates.map(ja -> {
            JobCandidateListDto jcd = ClassUtil.convert(ja, JobCandidateListDto.class);
            Job j = jobMaps.get(jcd.getJobId());
            if (j != null) {
                jcd.setJobRefNo(j.getJobRefNo());
            }

            return jcd;
        });

        return jobCandidateListDtos;
    }

    public JobCandidate getJobCandidateById(String jobCandidateId, Token token) {
        JobCandidate jobCandidate = jobCandidateRepository.findById(jobCandidateId).orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVJ006));

        if (!(token.getUserId().equals(jobCandidate.getUserId()) && token.getUserTypeEnum().equals(jobCandidate.getUserType()))
                && !(token.getUserSubId().equals(jobCandidate.getUserSubId()) && jobCandidate.getUserType().equals(UserType.VENDOR) && token.getUserTypeEnum().equals(UserType.VENDOR_USER))) {
            throw new ServiceException(ErrorCodeConstant.FVJ006);
        }

        return jobCandidate;
    }

    public void startWork(String jobCandidateId, String notes, Token token) {
        JobCandidate jobCandidate = this.getJobCandidateById(jobCandidateId, token);

        if (jobCandidate.getJobStatus() != JobCandidateStatus.NEW) {
            throw new ServiceException(ErrorCodeConstant.FVJ007);
        }

        jobCandidate.setJobStatus(JobCandidateStatus.INPROGRESS);
        jobCandidate.setJobUserRemark(notes);

        jobCandidateRepository.save(jobCandidate);
    }

    public void submitWork(String jobCandidateId, String notes, Token token) {
        JobCandidate jobCandidate = this.getJobCandidateById(jobCandidateId, token);

        if (jobCandidate.getJobStatus() != JobCandidateStatus.INPROGRESS) {
            throw new ServiceException(ErrorCodeConstant.FVJ008);
        }

        jobCandidate.setJobStatus(JobCandidateStatus.INREVIEW);
        jobCandidate.setJobUserRemark(notes);

        jobCandidateRepository.save(jobCandidate);
    }

    public List<JobCandidateStatMonthWise> jobStats(String year, Token token) {
        List<JobCandidateStatMonthWise> jobCandidateStatMonthWises;
        if (token.getUserTypeEnum().equals(UserType.VENDOR_USER)) {
            jobCandidateStatMonthWises = jobCandidateRepository.countJobByMonthAndFilterByYearForVendorUser(token.getUserSubId(), UserType.VENDOR, Integer.parseInt(year));
        } else {
            jobCandidateStatMonthWises = jobCandidateRepository.countJobByMonthAndFilterByYear(token.getUserId(), token.getUserTypeEnum(), Integer.parseInt(year));
        }
        return jobCandidateStatMonthWises;
    }

    public List<JobEarningStatMonthWise> jobEarningStats(String year, Token token) {

        List<JobEarningStatMonthWise> jobEarningStatMonthWises = jobCandidateRepository.sumEarningByMonth(token.getUserId(), token.getUserTypeEnum(), Integer.parseInt(year));
        return jobEarningStatMonthWises;
    }

    public JobCandidateDashboardStat jobDashboardStats(Token token) {
        JobCandidateDashboardStat jcds = new JobCandidateDashboardStat();
        Integer totalHoursWorked = 0;
        float totalMoneyEarned = 0;
        Integer totalProjectWorked = 0;
        float lastProjectEarning = 0;

        if (token.getUserTypeEnum().equals(UserType.VENDOR) || token.getUserTypeEnum().equals(UserType.FREELANCER)) {
            Optional<JobCandidate> jO = jobCandidateRepository.findFirstByUserIdAndUserTypeAndJobStatusOrderByCreatedAtDesc(token.getUserId(), token.getUserTypeEnum(), JobCandidateStatus.CLOSED);
            if (jO.isPresent()) {
                lastProjectEarning = jO.get().getTotalEarned();
            }

            try {
                totalMoneyEarned = jobCandidateRepository.sumEarningByUserIdAndUserType(token.getUserId(), token.getUserTypeEnum());
            } catch (Exception e) {
                e.printStackTrace();
            }

            totalHoursWorked = jobCandidateRepository.sumHoursByUserIdAndUserType(token.getUserId(), token.getUserTypeEnum());
            totalProjectWorked = jobCandidateRepository.countByUserIdAndUserType(token.getUserId(), token.getUserTypeEnum());
        }
        if (token.getUserTypeEnum().equals(UserType.VENDOR_USER)) {
            totalHoursWorked = jobCandidateRepository.sumHoursByUserSubIdAndUserType(token.getUserSubId(), UserType.VENDOR);
            totalProjectWorked = jobCandidateRepository.countByUserSubIdAndUserType(token.getUserSubId(), UserType.VENDOR);
        }

        if (totalHoursWorked == null) {
            totalHoursWorked = 0;
        }
        if (totalProjectWorked == null) {
            totalProjectWorked = 0;
        }
        if (token.getUserType().equals(UserType.VENDOR_USER)) {
            totalMoneyEarned = 0;
            lastProjectEarning = 0;
        }

        jcds.setTotalHoursWorked(totalHoursWorked);
        jcds.setTotalMoneyEarned(totalMoneyEarned);
        jcds.setTotalProjectWorked(totalProjectWorked);
        jcds.setLastProjectEarning(lastProjectEarning);
        return jcds;
    }

    public void assignJob(String vendorUserId, String jobCandidateId, Token token) {
        vendorService.getVendorUserById(vendorUserId, token);
        JobCandidate jobCandidate = getJobCandidateById(jobCandidateId, token);
        jobCandidate.setUserSubId(vendorUserId);
        jobCandidateRepository.save(jobCandidate);
    }
}
