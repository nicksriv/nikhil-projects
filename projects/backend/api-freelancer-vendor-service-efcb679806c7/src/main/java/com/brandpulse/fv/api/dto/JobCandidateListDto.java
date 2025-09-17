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
public class JobCandidateListDto {
    
    private String id;
    
    private String jobId;
    private String jobRefNo;
    private String jobTitle;
    
    private JobCandidateStatus jobStatus;
    private String jobStatusRemark;
    
    
    private Float jobRating;
    
    private Float totalHoursWorked;
    private Float totalEarned;
    private Float amountPaid;
    
    private AmountStatus amountStatus;
    
    
    private Instant createdAt;
    
}
