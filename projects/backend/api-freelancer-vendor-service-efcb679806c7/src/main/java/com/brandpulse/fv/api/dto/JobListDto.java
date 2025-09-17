/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.api.dto;

import com.brandpulse.fv.app.job.childDocument.Billing;
import com.brandpulse.fv.app.job.childDocument.JobTiming;
import com.brandpulse.fv.app.job.enums.JobStatus;
import com.brandpulse.fv.app.job.enums.JobType;
import com.brandpulse.fv.app.job.enums.ProjectType;
import java.time.Instant;
import java.util.List;
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
public class JobListDto {
    
    private String id;
    
    private String jobRefNo;
    
    private String jobTitle;
    private String jobShortDescription;
    
    
    private List<SkillDto> skills;
    
    
    private JobType jobType;
    private ProjectType projectType;
    
    
    private JobTiming jobTiming;
    
    private Billing billing;
    
    private JobStatus jobStatus;
    
    private Instant createdAt;
}
