/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.api.controller;

import com.brandpulse.fv.api.dto.BankDetailDto;
import com.brandpulse.fv.api.dto.FreelancerBasicProfileRequestDto;
import com.brandpulse.fv.api.dto.FreelancerKYCDto;
import com.brandpulse.fv.security.Token;
import org.springframework.security.core.context.SecurityContextHolder;
import com.brandpulse.fv.api.dto.FreelancerProfileDto;
import com.brandpulse.fv.api.dto.SkillRequestDto;
import com.brandpulse.fv.api.dto.WorkDetailDto;
import com.brandpulse.fv.app.freelancer.FreelancerService;
import com.brandpulse.fv.app.job.JobService;
import com.brandpulse.fv.common.dto.CommonResponseDto;
import com.brandpulse.fv.common.validator.CommonValidator;
import com.brandpulse.fv.exception.ApiException;
import com.brandpulse.fv.security.AuthenticationService;
import com.brandpulse.fv.util.FileServiceUtil;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Suhail Tamboli
 */
@RestController
@RequestMapping("api/v1/freelancer/")
public class FreelancerController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    FreelancerService freelancerService;

    @Autowired
    CommonValidator commonValidator;

    @Autowired
    FileServiceUtil fileServiceUtil;

    @Autowired
    JobService jobService;

    @GetMapping
    public String testJWT() {
        // example of getting username of loggedin user
        String userName = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // example of getting token body
        Token token = (Token) SecurityContextHolder.getContext().getAuthentication().getDetails();

        return "ok" + userName + token.getUserId();
    }

    /**
     * Steps: get userid in query param for now later will shift to token get
     * freelancer basis reference number from service parse freelancer object to
     * response dto send
     *
     *
     */
    @GetMapping("profile")
    private FreelancerProfileDto getProfile() {
        try {
            String freelancerId = authenticationService.getFreelancerId();
            return freelancerService.getProfile(freelancerId);

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("profile/basic-details")
    private CommonResponseDto updateBasicProfileDetails(@Valid @RequestBody FreelancerBasicProfileRequestDto fbprd) {
        try {
            String freelancerId = authenticationService.getFreelancerId();
            commonValidator.isValidAddress(fbprd.getAddress());
            freelancerService.updateBasicProfileDetails(freelancerId, fbprd);
            return new CommonResponseDto("Basic details updated");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("profile/kyc")
    private CommonResponseDto updateKYC(@Valid @RequestBody FreelancerKYCDto fkycd) {
        try {
            String freelancerId = authenticationService.getFreelancerId();
            freelancerService.updateKyc(freelancerId, fkycd);
            return new CommonResponseDto("KYC details updated");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("profile/skills")
    private CommonResponseDto updateSkills(@RequestBody SkillRequestDto srd) {
        try {
            String freelancerId = authenticationService.getFreelancerId();
            freelancerService.updateSkill(freelancerId, srd);
            return new CommonResponseDto("Skills updated");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("profile/bank-details")
    private CommonResponseDto updateBankDetails(@Valid @RequestBody BankDetailDto fbdd) {
        try {
            String freelancerId = authenticationService.getFreelancerId();
            freelancerService.updateBank(freelancerId, fbdd);
            return new CommonResponseDto("Bank details updated");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("profile/work-details")
    private CommonResponseDto addWorkDetails(@Valid @RequestBody WorkDetailDto wdd) {
        try {
            String freelancerId = authenticationService.getFreelancerId();
            commonValidator.isValidWork(wdd);
            freelancerService.addWork(freelancerId, wdd);
            return new CommonResponseDto("Work details added successfully");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("profile/work-details/{workId}")
    private CommonResponseDto updateWorkDetails(@PathVariable String workId, @Valid @RequestBody WorkDetailDto wdd) {
        try {
            String freelancerId = authenticationService.getFreelancerId();
            commonValidator.isValidWork(wdd);
            freelancerService.updateWork(freelancerId, workId, wdd);
            return new CommonResponseDto("Work details updated successfully");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @DeleteMapping("profile/work-details/{workId}")
    private CommonResponseDto deleteWorkDetails(@PathVariable String workId) {
        try {
            String freelancerId = authenticationService.getFreelancerId();
            freelancerService.deleteWork(freelancerId, workId);
            return new CommonResponseDto("Work deleted");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("profile/image")
    private CommonResponseDto uploadProfilePicture(@RequestParam("image") MultipartFile profileImage) {
        try {
            Token token = authenticationService.getFreelancerToken();

            commonValidator.isValidImage(profileImage);
            String fileUrl = fileServiceUtil.uploadFreelancerProfileImage(profileImage, token.getUserRef());
            freelancerService.updateImage(token.getUserId(), fileUrl);
            return new CommonResponseDto("Profile Picture Updated ");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("profile/resume")
    private CommonResponseDto uploadResume(@RequestParam("resume") MultipartFile resumeFile) {
        try {
            Token token = authenticationService.getFreelancerToken();

            commonValidator.isValidDoc(resumeFile);
            String fileUrl = fileServiceUtil.uploadFreelancerResume(resumeFile, token.getUserRef());
            freelancerService.updateResume(token.getUserId(), fileUrl);
            return new CommonResponseDto("Resume Updated");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }

    }
}
