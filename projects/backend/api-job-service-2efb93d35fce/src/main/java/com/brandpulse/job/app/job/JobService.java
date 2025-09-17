package com.brandpulse.job.app.job;

import com.brandpulse.job.api.dto.CommonDashboardStatsDto;
import com.brandpulse.job.api.dto.JobListDto;
import com.brandpulse.job.api.dto.JobRequestDto;
import com.brandpulse.job.api.dto.JobStatDto;
import com.brandpulse.job.api.dto.QADashboardStatsDto;
import com.brandpulse.job.api.dto.SkillCategoryDto;
import com.brandpulse.job.api.dto.SkillDto;
import com.brandpulse.job.api.dto.SkillRequestDto;
import com.brandpulse.job.app.freelancer.FreelancerRepository;
import com.brandpulse.job.app.job.enums.JobCandidateStatus;
import com.brandpulse.job.app.job.enums.JobStatus;
import com.brandpulse.job.app.job.enums.PublishStatus;
import com.brandpulse.job.app.jobCandidate.JobCandidate;
import com.brandpulse.job.app.jobCandidate.JobCandidateRepository;
import com.brandpulse.job.app.qualityAssurance.QualityAssurance;
import com.brandpulse.job.app.qualityAssurance.QualityAssuranceRepository;
import com.brandpulse.job.app.skill.Skill;
import com.brandpulse.job.app.skill.SkillCategory;
import com.brandpulse.job.app.skill.SkillCategoryRepository;
import com.brandpulse.job.app.skill.SkillRepository;
import com.brandpulse.job.app.skill.SkillService;
import com.brandpulse.job.app.vendor.VendorRepository;
import com.brandpulse.job.common.enums.UserType;
import com.brandpulse.job.common.service.LoggerService;
import com.brandpulse.job.common.validator.CommonValidator;
import com.brandpulse.job.exception.ErrorCodeConstant;
import com.brandpulse.job.exception.ServiceException;
import com.brandpulse.job.common.document.DisputeRepository;
import com.brandpulse.job.security.Token;
import com.brandpulse.job.util.ClassUtil;
import com.brandpulse.job.util.JsonUtil;
import com.brandpulse.job.util.SecurityUtil;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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

@Service
public class JobService {

    @Autowired
    QualityAssuranceRepository qualityAssuranceRepository;

    @Autowired
    SkillCategoryRepository skillCategoryRepository;

    @Autowired
    SkillRepository skillRepository;

    @Autowired
    DisputeRepository disputeRepository;

    @Autowired
    JobCandidateRepository jobCandidateRepository;

    @Autowired
    JobRepository jobRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private SkillService skillService;

    @Autowired
    private CommonValidator commonValidator;

    @Autowired
    VendorRepository vendorRepository;

    @Autowired
    FreelancerRepository freelancerRepository;

    @Autowired
    LoggerService loggerService;

    public Job getJobById(String jobId, Token token) {
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new ServiceException(ErrorCodeConstant.JJ001));
        if (token != null) {
            if (token.getUserTypeEnum().equals(UserType.CLIENT) && !job.getClientId().equals(token.getUserId())) {
                throw new ServiceException(ErrorCodeConstant.JC011);
            }
        }
        // QA checking of client assigned
        return job;
    }

    public List<JobCandidate> getJobCandidateByJobId(String jobId, Token token) {
        List<JobCandidate> jobCandidateList = jobCandidateRepository.findByJobId(jobId, token);
        return jobCandidateList;
    }

    public String generateJobRef(String jobTitle, String jobDescription) {
        String refNo = "J";
        if (jobTitle != null) {
            refNo += (jobTitle.substring(0, 1)).toUpperCase();
        }
        if (jobDescription != null) {
            refNo += (jobDescription.substring(0, 1)).toUpperCase();
        }

        refNo += SecurityUtil.generateOtp();

        return refNo;
    }

    public void validateJob(JobRequestDto jobRequestDto) {
        if (jobRequestDto.getClientId() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ001);
        }

        if (jobRequestDto.getClientId().isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.JJ001);
        }

        if (jobRequestDto.getJobTitle() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ001);
        }

        if (jobRequestDto.getJobTitle().isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.JJ001);
        }

        if (jobRequestDto.getJobShortDescription() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ002);
        }

        if (jobRequestDto.getJobShortDescription().isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.JJ002);
        }

        if (jobRequestDto.getJobDescription() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ003);
        }

        if (jobRequestDto.getJobDescription().isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.JJ003);
        }

        if (jobRequestDto.getPublishStatus().equals(PublishStatus.DRAFT)) {
            return;
        }

        if (jobRequestDto.getHighlights() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ004);
        }

        if (jobRequestDto.getHighlights().isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.JJ004);
        }

        if (jobRequestDto.getDeliverables() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ005);
        }

        if (jobRequestDto.getDeliverables().isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.JJ005);
        }

        if (jobRequestDto.getSkills() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ006);
        }

        if (jobRequestDto.getSkills().isEmpty()) {
            throw new ServiceException(ErrorCodeConstant.JJ006);
        }

        if (jobRequestDto.getExperienceLevel() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ007);
        }

        if (jobRequestDto.getJobType() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ008);
        }

        if (jobRequestDto.getProjectType() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ009);
        }

        if (jobRequestDto.getLocationGps() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ010);
        }

        if (jobRequestDto.getAddress() == null) {
            throw new ServiceException(ErrorCodeConstant.JC001);
        }

        commonValidator.isValidAddress(jobRequestDto.getAddress());
        commonValidator.isValidGPS(jobRequestDto.getLocationGps());

        if (jobRequestDto.getJobTiming() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ011);
        }

        if (jobRequestDto.getBilling() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ012);
        }

        if (jobRequestDto.getJobVisibility() == null) {
            throw new ServiceException(ErrorCodeConstant.JJ013);
        }
    }

    public Page<Job> getJobList(Pageable pageable, Token token, String clientId, String jobRefNo, String jobTitle,
            String jobType, String state, String jobStatus, String skills, String skillCategories, Instant from,
            Instant to) {
        Query query = new Query();
        if (token != null) {
            if (token.getUserType().equalsIgnoreCase(UserType.CLIENT.toString())) {
                query.addCriteria(Criteria.where("clientId").is(token.getUserId()));
            } else if (token.getUserType().equalsIgnoreCase(UserType.QUALITY_ASSURANCE.toString())) {
                Optional<QualityAssurance> qa = qualityAssuranceRepository.findById(token.getUserId());

                query.addCriteria(Criteria.where("clientId").in(qa.get().getClients()));
            } else if (clientId != null) {
                query.addCriteria(Criteria.where("clientId").is(clientId));
            }
        }

        if (jobRefNo != null) {
            query.addCriteria(Criteria.where("jobRefNo")
                    .regex(Pattern.compile(jobRefNo, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (jobTitle != null) {
            query.addCriteria(Criteria.where("jobTitle")
                    .regex(Pattern.compile(jobTitle, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (jobType != null) {
            query.addCriteria(Criteria.where("jobType")
                    .regex(Pattern.compile(jobType, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (state != null) {
            query.addCriteria(Criteria.where("address.state")
                    .regex(Pattern.compile(state, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }

        if (jobStatus != null) {
            query.addCriteria(Criteria.where("jobStatus")
                    .regex(Pattern.compile(jobStatus, Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
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

        if (skillCategories != null && !skillCategories.equals("")) {
            String[] skl = skillCategories.split(",");
            for (String a : skl) {
                query.addCriteria(Criteria.where("skillCategories").in(skillCategories));
            }
        }

        if (skills != null && !skills.equals("")) {
            String[] skl = skills.split(",");

            query.addCriteria(Criteria.where("skills").in(skl));
        }

        long count = mongoTemplate.count(query, Job.class);

        // get selected records
        if (pageable != null) {
            query.with(pageable);
        } else {
            pageable = Pageable.ofSize((int) count);
        }
        List<Job> result = mongoTemplate.find(query, Job.class);
        Page<Job> jobs = new PageImpl<>(result, pageable, count);
        return jobs;
    }

    public Page<JobListDto> getJobDtoList(Page<Job> jobPage) {

        Page<JobListDto> jobPageDtos;
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

        jobPageDtos = jobPage.map(job -> {
            JobListDto jld = ClassUtil.convert(job, JobListDto.class);

            List<String> ids = jobViceSkillIds.get(jld.getId());
            List<SkillDto> sl = skillDtos.stream().filter(s -> ids.contains(s.getId())).collect(Collectors.toList());
            jld.setSkills(sl);

            return jld;
        });

        return jobPageDtos;
    }

    public Job createUpdateJobDetails(String jobId, JobRequestDto jobRequestDto, Token token) {
        Job job = new Job();
        if (jobId != null) {
            job = getJobById(jobId, token);
        } else {
            job.setJobRefNo(generateJobRef(jobRequestDto.getJobTitle(), jobRequestDto.getJobShortDescription()));
            job.setPublishStatus(jobRequestDto.getPublishStatus());
        }

        if (token.getUserTypeEnum().equals(UserType.CLIENT)) {
            job.setClientId(token.getUserId());
        } else {
            job.setClientId(jobRequestDto.getClientId());
        }

        // if saving with draft and job publish status is not draft then save in draft
        // json
        // else directly update on object
        if ((!job.getPublishStatus().equals(PublishStatus.DRAFT))
                && (jobRequestDto.getPublishStatus().equals(PublishStatus.DRAFT))) {
            String dj = JsonUtil.toString(jobRequestDto);
            job.setJobDraftJson(dj);
            jobRepository.save(job);
            return job;
        }

        List<Skill> skills = skillService.getActiveSkillByIds(jobRequestDto.getSkills());
        List<String> skillIds = skills.stream().map(s -> s.getId()).collect(Collectors.toList());
        List<String> skillCategoryIds = skills.stream().map(s -> s.getSkillCategoryId()).distinct()
                .collect(Collectors.toList());

        job.setJobTitle(jobRequestDto.getJobTitle());
        job.setJobShortDescription(jobRequestDto.getJobShortDescription());
        job.setJobDescription(jobRequestDto.getJobDescription());

        job.setHighlights(jobRequestDto.getHighlights());
        job.setDeliverables(jobRequestDto.getDeliverables());

        job.setSkills((ArrayList<String>) skillIds);
        job.setSkillCategories((ArrayList<String>) skillCategoryIds);
        job.setExperienceLevel(jobRequestDto.getExperienceLevel());

        job.setJobType(jobRequestDto.getJobType());
        job.setProjectType(jobRequestDto.getProjectType());

        job.setAddress(jobRequestDto.getAddress());
        job.setLocationGps(jobRequestDto.getLocationGps());

        job.setJobTiming(jobRequestDto.getJobTiming());
        job.setBilling(jobRequestDto.getBilling());
        job.setJobVisibility(jobRequestDto.getJobVisibility());

        job.setJobDraftJson(null);
        job.setJobStatus(JobStatus.NEW);
        job.setJobStatusReason("");

        jobRepository.save(job);

        return job;
    }

    public void jobPublish(String jobId, Token token) {
        Job job = getJobById(jobId, token);

        // if in draft mode then publish without checking draft object
        if (job.getPublishStatus().equals(PublishStatus.DRAFT)) {
            JobRequestDto jrd = ClassUtil.convert(job, JobRequestDto.class);
            validateJob(jrd);
        } else {
            // if already in publish mode then publish with draft object
            if (job.getJobDraftJson() != null && !job.getJobDraftJson().isEmpty()) {
                Job draftJob = null;
                try {
                    draftJob = (Job) JsonUtil.toObject(job.getJobDraftJson(), Job.class);
                } catch (Exception ex) {
                    throw new ServiceException(ErrorCodeConstant.JJ013);
                }

                JobRequestDto jrd = ClassUtil.convert(draftJob, JobRequestDto.class);
                validateJob(jrd);
                job = createUpdateJobDetails(jobId, jrd, token);
            }
        }

        job.setPublishStatus(PublishStatus.PUBLISHED);
        job.setJobDraftJson(null);

        jobRepository.save(job);
    }

    public void discardDraftJob(String jobId, Token token) {
        Job job = getJobById(jobId, token);
        job.setJobDraftJson(null);
        jobRepository.save(job);
    }

    public void unPublishJob(String jobId, Token token) {
        Job job = getJobById(jobId, token);
        job.setPublishStatus(PublishStatus.UNPUBLISH);
        jobRepository.save(job);
    }

    public void mapModulesToJob(String jobId, List<String> modules, Token token) {
        Job job = getJobById(jobId, token);

        ArrayList<String> list = job.getModules();
        list.addAll(modules);
        job.setModules(list);
        jobRepository.save(job);
    }

    public void updateSkill(String jobId, SkillRequestDto skillRequestDto, Token token) {
        Job job = getJobById(jobId, token);
        List<String> jobSkillIds = job.getSkills();

        // remove logic
        jobSkillIds = jobSkillIds.stream()
                .filter(js -> !skillRequestDto.getSkillToRemove().contains(js))
                .collect(Collectors.toList());

        // add/update logic
        List<String> skillAddIds = skillRequestDto.getSkillToAdd();
        List<Skill> skills = skillService.getActiveSkillByIds(skillAddIds);

        if (skillAddIds.size() != skills.size()) {
            throw new ServiceException(ErrorCodeConstant.JC013); // change this
        }

        jobSkillIds.addAll(skillAddIds);

        job.setSkills((ArrayList<String>) jobSkillIds);
        jobRepository.save(job);
    }

    public void markJobComplete(String jobId, Token token) {

        Job job = getJobById(jobId, token);

        List<JobCandidate> jobCandidateList = getJobCandidateByJobId(jobId, token);

        for (JobCandidate jc : jobCandidateList) {
            if (!jc.getJobStatus().equals(JobCandidateStatus.CLOSED)) {
                throw new ServiceException(ErrorCodeConstant.JJ021);
            }
        }

        job.setJobStatus(JobStatus.COMPLETED);
        jobRepository.save(job);
    }

    public CommonDashboardStatsDto getAdminDashboardStats() {
        CommonDashboardStatsDto ads = new CommonDashboardStatsDto();
        Integer totalJobs = 0;
        Integer totalCompletedJobs = 0;
        Integer totalOngoingJobs = 0;
        Integer totalNewJobs = 0;
        float totalEarned = 0;
        float totalAmountPaid = 0;
        float totalPendingAmount = 0;
        Integer totalVendors = 0;
        Integer totalFreelancers = 0;
        Integer totalDisputes = 0;
        Integer totalQualityAssurances = 0;

        try {
            totalEarned = jobCandidateRepository.sumEarning();
        } catch (Exception e) {
        }

        try {
            totalAmountPaid = jobCandidateRepository.sumAmountPaid();
        } catch (Exception e) {
        }

        try {
            totalCompletedJobs = jobRepository.countCompletedJob();
        } catch (Exception e) {
        }

        try {
            totalOngoingJobs = jobRepository.countOngoingJob();
        } catch (Exception e) {
        }

        try {
            totalNewJobs = jobRepository.countNewJob();
        } catch (Exception e) {
        }

        try {
            totalVendors = vendorRepository.countTotalVendors();
        } catch (Exception e) {
        }

        try {
            totalFreelancers = freelancerRepository.countTotalFreelancers();
        } catch (Exception e) {
        }

        try {
            totalDisputes = disputeRepository.countTotalDisputes();
        } catch (Exception e) {
        }

        try {
            totalQualityAssurances = qualityAssuranceRepository.countTotalQualityAssurances();
        } catch (Exception e) {
        }

        if (totalCompletedJobs == null) {
            totalCompletedJobs = 0;
        }

        if (totalOngoingJobs == null) {
            totalOngoingJobs = 0;
        }

        if (totalNewJobs == null) {
            totalNewJobs = 0;
        }

        if (totalQualityAssurances == null) {
            totalQualityAssurances = 0;
        }

        totalJobs = totalCompletedJobs + totalOngoingJobs + totalNewJobs;
        totalPendingAmount = totalEarned - totalAmountPaid;

        ads.setTotalJobs(totalJobs);
        ads.setTotalCompletedJobs(totalCompletedJobs);
        ads.setTotalOngoingJobs(totalOngoingJobs);
        ads.setTotalNewJobs(totalNewJobs);
        ads.setTotalEarned(totalEarned);
        ads.setTotalAmountPaid(totalAmountPaid);
        ads.setTotalPendingAmount(totalPendingAmount);
        ads.setTotalVendors(totalVendors);
        ads.setTotalFreelancers(totalFreelancers);
        ads.setTotalDisputes(totalDisputes);
        ads.setTotalQualityAssurances(totalQualityAssurances);

        return ads;
    }

    public CommonDashboardStatsDto getClientDashboardStats(String clientId) {
        CommonDashboardStatsDto cds = new CommonDashboardStatsDto();
        Integer totalJobs = 0;
        Integer totalCompletedJobs = 0;
        Integer totalOngoingJobs = 0;
        Integer totalNewJobs = 0;
        Integer totalDisputes = 0;
        float totalEarned = 0;
        float totalAmountPaid = 0;
        float totalPendingAmount = 0;

        try {
            totalOngoingJobs = jobRepository.countOngoingJobForClient(clientId);
        } catch (Exception e) {
        }

        try {
            totalCompletedJobs = jobRepository.countCompletedJobForClient(clientId);
        } catch (Exception e) {
        }

        try {
            totalNewJobs = jobRepository.countNewJobForClient(clientId);
        } catch (Exception e) {
        }

        try {
            totalEarned = jobCandidateRepository.sumEarningForClient(clientId);
        } catch (Exception e) {

        }

        try {
            totalAmountPaid = jobCandidateRepository.sumAmountPaidForClient(clientId);
        } catch (Exception e) {
        }

        try {
            totalDisputes = disputeRepository.countTotalDisputesByClientId(clientId);
        } catch (Exception e) {
        }

        if (totalOngoingJobs == null) {
            totalOngoingJobs = 0;
        }

        if (totalCompletedJobs == null) {
            totalCompletedJobs = 0;
        }

        if (totalNewJobs == null) {
            totalNewJobs = 0;
        }
        totalPendingAmount = totalEarned - totalAmountPaid;
        totalJobs = totalNewJobs + totalOngoingJobs + totalCompletedJobs;

        cds.setTotalJobs(totalJobs);
        cds.setTotalNewJobs(totalNewJobs);
        cds.setTotalOngoingJobs(totalOngoingJobs);
        cds.setTotalCompletedJobs(totalCompletedJobs);
        cds.setTotalAmountPaid(totalAmountPaid);
        cds.setTotalEarned(totalEarned);
        cds.setTotalPendingAmount(totalPendingAmount);
        cds.setTotalDisputes(totalDisputes);
        return cds;
    }

    public QADashboardStatsDto getQualityAssuranceStats(String qualityAssuranceId) {
        QADashboardStatsDto qds = new QADashboardStatsDto();

        QualityAssurance qa = qualityAssuranceRepository.findById(qualityAssuranceId)
                .orElseThrow(() -> new ServiceException(ErrorCodeConstant.JQ001));

        Integer totalJobsAssigned = 0;
        Integer totalJobsApproved = 0;
        Integer totalJobsInprogress = 0;
        Integer totalClients = 0;

        try {
            totalJobsAssigned = jobRepository.countJobsAssignedByClientIdIn(qa.getClients());
        } catch (Exception e) {
        }

        try {
            totalJobsApproved = jobCandidateRepository.countJobsApprovedByClientIdIn(qa.getClients());
        } catch (Exception e) {
        }

        try {
            totalJobsInprogress = jobCandidateRepository.countJobsInprogressByClientIdIn(qa.getClients());
        } catch (Exception e) {
        }

        qds.setTotalJobsApproved(totalJobsApproved);
        qds.setTotalJobsAssigned(totalJobsAssigned);
        qds.setTotalJobsInprogress(totalJobsInprogress);
        qds.setTotalClients(qa.getClients().size());
        return qds;
    }

    public JobStatDto getjobStats(String userId, UserType userType) {
        JobStatDto js = new JobStatDto();
        float totalMoneyEarned = 0;
        float amountPaid = 0;
        float pendingAmount = 0;
        Integer totalCompletedJobs = 0;
        Integer totalInprogressJobs = 0;
        Integer totalJobs = 0;
        Integer totalCancelJobs = 0;
        Integer totaldisputes = 0;

        try {
            totalMoneyEarned = jobCandidateRepository.sumEarningByUserIdAndUserType(userId, userType);
        } catch (Exception e) {
        }

        try {
            amountPaid = jobCandidateRepository.sumAmountPaidByUserIdAndUserType(userId, userType);
        } catch (Exception e) {
        }

        try {
            totalCompletedJobs = jobCandidateRepository.countCompletetdJobByUserIdAndUserType(userId, userType);
        } catch (Exception e) {
        }

        try {
            totalInprogressJobs = jobCandidateRepository.countInprogressJobByUserIdAndUserType(userId, userType);
        } catch (Exception e) {
        }

        try {
            totalCancelJobs = jobCandidateRepository.countCancelJobByUserIdAndUserType(userId, userType);
        } catch (Exception e) {
        }

        try {
            totaldisputes = disputeRepository.countDisputesByUserIdAndUserType(userId, userType);
        } catch (Exception e) {
        }

        if (totalCompletedJobs == null) {
            totalCompletedJobs = 0;
        }

        if (totalInprogressJobs == null) {
            totalInprogressJobs = 0;
        }

        if (totalCancelJobs == null) {
            totalCancelJobs = 0;
        }

        if (totaldisputes == null) {
            totaldisputes = 0;
        }

        pendingAmount = (totalMoneyEarned - amountPaid);
        totalJobs = totalCompletedJobs + totalInprogressJobs;

        js.setTotalJobs(totalJobs);
        js.setTotalCompletedJobs(totalCompletedJobs);
        js.setTotalInprogressJobs(totalInprogressJobs);
        js.setTotalCancelJobs(totalCancelJobs);
        js.setTotalMoneyEarned(totalMoneyEarned);
        js.setAmountPaid(amountPaid);
        js.setPendingAmount(pendingAmount);
        js.setTotalDisputes(totaldisputes);

        return js;
    }

    public List<SkillCategoryDto> getSkillCategory() {

        List<SkillCategory> skillCategory = skillCategoryRepository.findAll();
        return ClassUtil.convertList(skillCategory, SkillCategoryDto.class);
    }

    public List<SkillDto> getSkills() {

        List<Skill> skills = skillRepository.findAll();
        return ClassUtil.convertList(skills, SkillDto.class);

    }
}
