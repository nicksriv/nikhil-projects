/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.api.dto;

import com.brandpulse.fv.app.job.enums.JobApplicationStatus;
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
    private String jobRefNo;
    private String jobTitle;
    
    private String userNote;
    private String jobCandidateId;
    
    private JobApplicationStatus jobApplicationStatus;
    private Instant jobApplicationAt;
    private String jobAplicationStatusReason;
    
    private Instant createdAt;
    
}
