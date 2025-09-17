/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.api.dto;

import java.util.List;

import com.brandpulse.job.app.job.childDocument.Billing;
import com.brandpulse.job.app.job.childDocument.JobTiming;
import com.brandpulse.job.app.job.enums.JobStatus;
import com.brandpulse.job.app.job.enums.JobType;
import com.brandpulse.job.app.job.enums.ProjectType;
import com.brandpulse.job.common.childDocument.Address;

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
    
    private Address address;
    
    private JobStatus jobStatus;
    
    private List<SkillDto> skills;
    
    
    private JobType jobType;
    private ProjectType projectType;
    
    
    private JobTiming jobTiming;
    
    private Billing billing;

}
