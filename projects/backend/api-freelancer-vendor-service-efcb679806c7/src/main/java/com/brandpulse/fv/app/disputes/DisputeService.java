/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.disputes;

import com.brandpulse.fv.api.dto.DisputeRequestDto;
import com.brandpulse.fv.app.disputes.enums.DisputeStatus;
import com.brandpulse.fv.app.job.JobCandidate;
import com.brandpulse.fv.exception.ErrorCodeConstant;
import com.brandpulse.fv.exception.ServiceException;
import com.brandpulse.fv.security.Token;
import com.brandpulse.fv.util.SecurityUtil;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ts
 */
@Service
public class DisputeService {

    @Autowired
    DisputeRepository disputeRepository;

    @Autowired
    DisputeCategoryRepository disputeCategoryRepository;

    public List<Dispute> getDisputes(Token token) {
       List<Dispute> disputes = disputeRepository.findByUserIdAndUserTypeOrderByCreatedAtDesc(token.getUserId(), token.getUserTypeEnum());
       return disputes;
    }

    public List<DisputeCategory> getCategories() {
        return disputeCategoryRepository.findAll();
    }

    public DisputeCategory getCategoryById(String id) {
        return disputeCategoryRepository.findById(id).orElseThrow(() -> new ServiceException(ErrorCodeConstant.FV0001));
    }

    public void createDispute(DisputeRequestDto disputeRequestDto, JobCandidate jobCandidate, Token token) {
        Dispute dispute = new Dispute();

        dispute.setUserId(token.getUserId());
        dispute.setUserType(token.getUserTypeEnum());

        dispute.setClientId(jobCandidate.getClientId());
        dispute.setJobId(jobCandidate.getJobId());
        dispute.setJobCandidateId(jobCandidate.getId());
        dispute.setJobTitle(jobCandidate.getJobTitle());

        dispute.setDisputeCategoryId(disputeRequestDto.getDisputeCategoryId());
        dispute.setDisputeTitle(disputeRequestDto.getDisputeTitle());
        dispute.setDisputeDescription(disputeRequestDto.getDisputeDescription());
        dispute.setDisputeStatus(DisputeStatus.NEW);

        dispute.setDisputeRefNo("DS" + SecurityUtil.generateOtp());

        disputeRepository.save(dispute);

    }
}
