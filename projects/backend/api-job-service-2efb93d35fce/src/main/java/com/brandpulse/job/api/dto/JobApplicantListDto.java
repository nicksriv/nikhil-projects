/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.api.dto;

import com.brandpulse.job.app.job.enums.JobApplicationStatus;
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
public class JobApplicantListDto {
    
    private String id;
    
    private String jobId;
    private String jobTitle;
    private String applicantName;
    
    private String userId;
    private UserType userType;
    private String userNote;
    
    private JobApplicationStatus jobApplicationStatus;
    private Instant jobApplicationAt;
    private String jobAplicationStatusReason;
    
    private Instant createdAt;
    
}
