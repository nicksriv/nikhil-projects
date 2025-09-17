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
public class JobCandidateListDto {
    
    private String id;
    
    private String jobId;
    private String jobTitle;
    private String candidateName;
    
    private JobCandidateStatus jobStatus;
    private String jobStatusRemark;
    private String userId;
    private UserType userType;
    
    private Float jobRating;
    
    private Float totalHoursWorked;
    private Float totalEarned;
    private Float amountPaid;
    
    private AmountStatus amountStatus;
    
    
    private Instant createdAt;
    
}
