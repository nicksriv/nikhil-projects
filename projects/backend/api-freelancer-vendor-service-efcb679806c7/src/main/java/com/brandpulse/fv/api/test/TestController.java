/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.test;


import com.brandpulse.fv.app.client.ClientService;
import com.brandpulse.fv.app.faq.Faq;
import com.brandpulse.fv.app.faq.FaqCategories;
import com.brandpulse.fv.app.job.JobApplicant;
import com.brandpulse.fv.app.job.JobService;
import com.brandpulse.fv.app.job.enums.JobApplicationStatus;
import com.brandpulse.fv.app.notification.Notification;
import com.brandpulse.fv.exception.ApiException;
import com.brandpulse.fv.security.AuthenticationService;
import com.brandpulse.fv.security.Token;
import com.brandpulse.fv.common.dto.CommonResponseDto;
import com.brandpulse.fv.common.validator.CommonValidator;
import com.brandpulse.fv.exception.ErrorCodeConstant;
import com.brandpulse.fv.exception.ServiceException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ts
 */
@RestController
@RequestMapping("test/api/v1/")
public class TestController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    ClientService clientService;

    @Autowired
    JobService jobService;

    @Autowired
    TestService testService;
    
    @Autowired
    CommonValidator commonValidator;

    @PostMapping("jobs")
    public CommonResponseDto createJob(@RequestBody JobRequestDto jrd) {
        try {
            Token token = authenticationService.getToken();
            clientService.isClientExists(jrd.getClientId());

            testService.createJob(jrd, token);
            return new CommonResponseDto("Created");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("jobs/{jobApplicantId}/approved")
    public CommonResponseDto createJob(@PathVariable String jobApplicantId) {
        try {
            Token token = authenticationService.getToken();
            JobApplicant jobApplicant = jobService.getJobApplicantById(jobApplicantId, token);

            if (jobApplicant.getJobApplicationStatus() != JobApplicationStatus.NEW) {
                throw new ServiceException(ErrorCodeConstant.FVJ004);
            }

            testService.createWork(jobApplicant, token);
            return new CommonResponseDto("Approved");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("skillCategories")
    public CommonResponseDto createSkillCategory(@RequestBody SkillCategoryRequestDto scrt) {

        try {
            Token token = authenticationService.getToken();

            testService.createSkillCategory(scrt, token);
            return new CommonResponseDto("Created SkillCategory");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("skill")
    public CommonResponseDto createSkill(@RequestBody SkillRequestDto srt) {

        try {
            Token token = authenticationService.getToken();

            testService.createSkill(srt, token);
            return new CommonResponseDto("Created Skill");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("categories")
    public CommonResponseDto createdDisputCategories(@RequestBody CategoriesDto cd) {
        try {
            Token token = authenticationService.getToken();
            testService.createCategories(cd);
            return new CommonResponseDto("Created Categories");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("vendor")
    public CommonResponseDto createVendor(@RequestBody VendorDto cvd) {
        try {
            commonValidator.isValidAddress(cvd.getAddress());
            testService.createVendor(cvd);
            return new CommonResponseDto("Created vendor");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("notification")
    public CommonResponseDto createNotification(@RequestBody Notification cvd) {
        try {
            Token token = authenticationService.getToken();
            testService.createNotification(cvd, token);
            return new CommonResponseDto("Created notification");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("faq-category")
    public CommonResponseDto createFaqCategory(@RequestBody FaqCategories fc) {
        try {
            testService.createFaqCategory(fc);
            return new CommonResponseDto("Created faq category");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("faq-category")
    public List<FaqCategories> getFaqCategory() {
        try {
            return testService.getFaqCategory();

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("faq")
    public CommonResponseDto createFaq(@RequestBody Faq f) {
        try {
            testService.createFaq(f);
            return new CommonResponseDto("Created faq");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

}
