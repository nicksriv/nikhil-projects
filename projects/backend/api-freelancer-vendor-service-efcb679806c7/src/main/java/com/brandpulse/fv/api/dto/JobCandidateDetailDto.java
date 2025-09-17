/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.api.dto;

import com.brandpulse.fv.app.job.enums.AmountStatus;
import com.brandpulse.fv.app.job.enums.JobCandidateStatus;
import java.time.Instant;
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
    
    private String jobId;
    private String jobTitle;
    
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
    
    
    private String payerRemark;
    private String notes;
    
    
    private JobDetailDto jobDetails; 
    
    private Instant createdAt;
}
