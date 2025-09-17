/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.controller;

import com.brandpulse.fv.api.dto.DisputeCategoryDto;
import com.brandpulse.fv.api.dto.DisputeDto;
import com.brandpulse.fv.api.dto.DisputeRequestDto;
import com.brandpulse.fv.app.disputes.Dispute;
import com.brandpulse.fv.app.disputes.DisputeCategory;
import com.brandpulse.fv.app.disputes.DisputeService;
import com.brandpulse.fv.app.job.JobCandidate;
import com.brandpulse.fv.app.job.JobService;
import com.brandpulse.fv.common.dto.CommonResponseDto;
import com.brandpulse.fv.exception.ApiException;
import com.brandpulse.fv.security.AuthenticationService;
import com.brandpulse.fv.security.Token;
import com.brandpulse.fv.util.ClassUtil;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ts
 */
@RestController
@RequestMapping("api/v1/disputes")
public class DisputeController {

    @Autowired
    DisputeService disputeService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    JobService jobService;

    @GetMapping("")
    public List<DisputeDto> getDisputes() {
        try {
            Token token = authenticationService.getFreelancerOrVendorToken();
            List<Dispute> disputes = disputeService.getDisputes(token);
            List<DisputeDto> disputeDtos = ClassUtil.convertList(disputes, DisputeDto.class);
            return disputeDtos;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("categories")
    public List<DisputeCategoryDto> getListCategories() {
        try {
            authenticationService.getFreelancerOrVendorToken();
            List<DisputeCategory> disputeCategories = disputeService.getCategories();
            List<DisputeCategoryDto> disputeDtos = ClassUtil.convertList(disputeCategories, DisputeCategoryDto.class);
            return disputeDtos;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("")
    public CommonResponseDto createDisputes(@Validated @RequestBody DisputeRequestDto disputeRequestDto) {
        try {
            Token token = authenticationService.getFreelancerOrVendorToken();

            //check job
            JobCandidate jobCandidate = jobService.getJobCandidateById(disputeRequestDto.getJobCandidateId(), token);

            // check category
            disputeService.getCategoryById(disputeRequestDto.getDisputeCategoryId());

            disputeService.createDispute(disputeRequestDto, jobCandidate, token);

            return new CommonResponseDto("disputes created");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }
}
