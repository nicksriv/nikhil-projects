/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.api.dto;

import com.brandpulse.job.app.job.enums.AmountStatus;
import com.brandpulse.job.app.job.enums.JobCandidateStatus;
import com.brandpulse.job.common.enums.UserType;
import java.time.Instant;
import java.util.ArrayList;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Suhail Tamboli
 */
@Getter
@Setter
@NoArgsConstructor
public class JobCandidateDetailDto {
    
    
    private String id;
    private String clientId;
    
    private String jobId;
    private String jobTitle;
    private String userId;
    private UserType userType;
    
    private JobCandidateStatus jobStatus;
    private String jobStatusRemark;
    private String jobUserRemark;
    
    private String jobApproverRemark;
    private Instant jobApproverRemarkAt;
    
    
    private Float jobRating;
    private String jobRatingDescription;
    
    private Float totalHoursWorked;
    private Float totalEarned;
    private Float amountPaid;
    private AmountStatus amountStatus;
    private ArrayList<String> modules = new ArrayList<>();
    
    
    private String payerRemark;
    
    
    private JobDetailDto jobDetails; 
    private String notes;
    
    private Instant createdAt;
}
