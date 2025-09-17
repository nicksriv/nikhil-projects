/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.test;

import com.brandpulse.fv.app.disputes.DisputeCategory;
import com.brandpulse.fv.app.disputes.DisputeCategoryRepository;
import com.brandpulse.fv.app.disputes.enums.DisputeResolver;
import com.brandpulse.fv.app.faq.Faq;
import com.brandpulse.fv.app.faq.FaqCategories;
import com.brandpulse.fv.app.faq.FaqCategoriesRepository;
import com.brandpulse.fv.app.faq.FaqRepository;
import com.brandpulse.fv.app.job.Job;
import com.brandpulse.fv.app.job.JobApplicant;
import com.brandpulse.fv.app.job.JobApplicantRepository;
import com.brandpulse.fv.app.job.JobCandidate;
import com.brandpulse.fv.app.job.JobCandidateRepository;
import com.brandpulse.fv.app.job.JobRepository;
import com.brandpulse.fv.app.job.childDocument.Billing;
import com.brandpulse.fv.app.job.childDocument.JobVisibility;
import com.brandpulse.fv.app.job.enums.AmountStatus;
import com.brandpulse.fv.app.job.enums.BillingType;
import com.brandpulse.fv.app.job.enums.JobApplicationStatus;
import com.brandpulse.fv.app.job.enums.JobCandidateStatus;
import com.brandpulse.fv.app.job.enums.JobStatus;
import com.brandpulse.fv.app.job.enums.JobVisibilityType;
import com.brandpulse.fv.app.job.enums.PublishStatus;
import com.brandpulse.fv.app.notification.Notification;
import com.brandpulse.fv.app.notification.NotificationRepository;
import com.brandpulse.fv.app.skill.Skill;
import com.brandpulse.fv.app.skill.SkillCategory;
import com.brandpulse.fv.app.skill.SkillCategoryRepository;
import com.brandpulse.fv.app.skill.SkillRepository;
import com.brandpulse.fv.app.skill.SkillService;
import com.brandpulse.fv.app.vendor.Vendor;
import com.brandpulse.fv.app.vendor.VendorCredential;
import com.brandpulse.fv.app.vendor.VendorCredentialRepository;
import com.brandpulse.fv.app.vendor.VendorRepository;
import com.brandpulse.fv.app.vendor.VendorService;
import com.brandpulse.fv.app.vendor.VendorUser;
import com.brandpulse.fv.common.enums.Status;
import com.brandpulse.fv.exception.ErrorCodeConstant;
import com.brandpulse.fv.exception.ServiceException;
import com.brandpulse.fv.security.Token;
import com.brandpulse.fv.util.AesEncryptionUtil;
import com.brandpulse.fv.util.ClassUtil;
import com.brandpulse.fv.util.SecurityUtil;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ts
 */
@Service
public class TestService {

    @Autowired
    JobRepository jobRepository;

    @Autowired
    JobApplicantRepository jobApplicantRepository;

    @Autowired
    JobCandidateRepository jobCandidateRepository;

    @Autowired
    SkillService skillService;

    @Autowired
    SkillCategoryRepository skillCategoryRepository;

    @Autowired
    SkillRepository skillRepository;

    @Autowired
    DisputeCategoryRepository disputeCategoryRepository;

    @Autowired
    VendorService vendorService;

    @Autowired
    VendorRepository vendorRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    VendorCredentialRepository vendorCredentialRepository;

    @Autowired
    AesEncryptionUtil aesEncryptionUtil;

    @Autowired
    FaqCategoriesRepository faqCategoriesRepository;

    @Autowired
    FaqRepository faqRepository;

    public void createJob(JobRequestDto jobRequestDto, Token token) {

        List<Skill> skills = skillService.getActiveSkillByIds(jobRequestDto.getSkills());
        ArrayList<String> skillCategories = new ArrayList<>();
        for (int i = 0; i < skills.size(); i++) {
//            skillCategories.addAll(skills.get(i).getSkillCategories());
            skillCategories.add(skills.get(i).getSkillCategoryId());
        }

        JobVisibility jobVisibility = new JobVisibility();
        jobVisibility.setVisibilityType(JobVisibilityType.WORLDWIDE);
        jobVisibility.setVisibilityValue(new ArrayList<>());
        jobVisibility.setVisibleToFreelancer(true);
        jobVisibility.setVisibleToVendor(true);

        Billing billing = new Billing();
        billing.setNumber(Integer.parseInt(SecurityUtil.generateOtp()));
        billing.setType(BillingType.FIXED);

        Job job = ClassUtil.convert(jobRequestDto, Job.class);
        job.setJobRefNo("JT" + SecurityUtil.generateOtp());
        job.setSkillCategories(skillCategories);
        job.setTotalJobApplicant("0");
        job.setTotalJobCandidate("0");
        job.setPublishStatus(PublishStatus.PUBLISHED);
        job.setJobStatus(JobStatus.NEW);
        job.setJobStatusReason("");
        job.setJobDraftJson("{}");
        job.setJobVisibility(jobVisibility);
        jobRepository.save(job);

    }

    public void createWork(JobApplicant jobApplicant, Token token) {

        JobCandidate job = new JobCandidate();
        job.setJobId(jobApplicant.getJobId());
        job.setJobTitle(jobApplicant.getJobTitle());
        job.setClientId(jobApplicant.getClientId());
        job.setUserId(jobApplicant.getUserId());
        job.setUserSubId("");
        job.setUserType(jobApplicant.getUserType());
        job.setJobStatus(JobCandidateStatus.NEW);
        job.setJobStatusRemark("");
        job.setJobStatusAt(Instant.now());
        job.setJobApproverUser(jobApplicant.getUserId());
        job.setJobApproverUserType(jobApplicant.getUserType());
        job.setJobApproverRemark("");
        job.setJobApproverRemarkAt(Instant.now());
        job.setJobRating(0F);
        job.setJobRatingDescription("");
        job.setTotalHoursWorked(0F);
        job.setTotalEarned(0F);
        job.setAmountPaid(0F);
        job.setAmountStatus(AmountStatus.PENDING);
        job.setPayerRemark("");
        job.setNotes("NA");

        job = jobCandidateRepository.save(job);

        jobApplicant.setJobApplicationStatus(JobApplicationStatus.APPROVED);
        jobApplicant.setJobCandidateId(job.getId());
        jobApplicantRepository.save(jobApplicant);

    }

    public void createSkillCategory(SkillCategoryRequestDto skillCategoryRequestDto, Token token) {
        if (skillCategoryRequestDto.getParentSkillcategoryId() != null) {
            skillCategoryRepository.findFirstByIdAndIsActive(skillCategoryRequestDto.getParentSkillcategoryId(), true).orElseThrow(() -> new ServiceException(ErrorCodeConstant.FVF001));
        }

        SkillCategory skillCategory = ClassUtil.convert(skillCategoryRequestDto, SkillCategory.class);
        skillCategory.setActive(true);
        skillCategoryRepository.save(skillCategory);
    }

    public void createSkill(SkillRequestDto skillRequestDto, Token token) {
        List<SkillCategory> skillCategories = skillService.getActiveSkillCategoryByIds(skillRequestDto.getSkillCategories());
        if (skillCategories.size() != skillRequestDto.getSkillCategories().size()) {
            throw new ServiceException(ErrorCodeConstant.FVF001);
        }

        Skill skill = ClassUtil.convert(skillRequestDto, Skill.class);
        skill.setActive(true);
        skillRepository.save(skill);
    }

    public void createCategories(CategoriesDto categoriesDto) {
        DisputeCategory disputeCategory = ClassUtil.convert(categoriesDto, DisputeCategory.class);

        disputeCategory.setDisputeResolver(DisputeResolver.CLIENT);
        disputeCategoryRepository.save(disputeCategory);
    }

    public void createVendor(VendorDto vendorDto) {
        Vendor vendor = ClassUtil.convert(vendorDto, Vendor.class);
        vendor.setVendorRefNo("V" + SecurityUtil.generateOtp());
        vendor.setStatus(Status.ACTIVE);

        vendorRepository.save(vendor);

        VendorCredential vendorCredential = new VendorCredential();
        vendorCredential.setVendorId(vendor.getId());
        vendorCredential.setUserName(vendor.getVendorRefNo());
        vendorCredential.setPassword(aesEncryptionUtil.encrypt(vendorDto.getPassword()));

        vendorCredentialRepository.save(vendorCredential);
    }

    public void createNotification(Notification notification, Token token) {
        notification.setUserId(token.getUserId());
        notification.setUserType(token.getUserTypeEnum());
        notificationRepository.save(notification);
    }

    public void createFaqCategory(FaqCategories fc) {
        faqCategoriesRepository.save(fc);
    }

    public List<FaqCategories> getFaqCategory() {
        return faqCategoriesRepository.findAll();
    }

    public void createFaq(Faq f) {
        faqRepository.save(f);
    }
}
