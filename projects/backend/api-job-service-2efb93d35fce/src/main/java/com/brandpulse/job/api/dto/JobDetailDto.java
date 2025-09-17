/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.job.api.dto;

import com.brandpulse.job.app.job.childDocument.Billing;
import com.brandpulse.job.app.job.childDocument.JobTiming;
import com.brandpulse.job.app.job.childDocument.JobVisibility;
import com.brandpulse.job.app.job.enums.ExperienceLevel;
import com.brandpulse.job.app.job.enums.JobStatus;
import com.brandpulse.job.app.job.enums.JobType;
import com.brandpulse.job.app.job.enums.ProjectType;
import com.brandpulse.job.app.job.enums.PublishStatus;
import com.brandpulse.job.common.childDocument.Address;
import com.brandpulse.job.common.childDocument.GpsLocation;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author ts
 */
@Getter
@Setter
@NoArgsConstructor
public class JobDetailDto {
    
    private String id;

    private String jobRefNo;
    
    private String clientId;

    private String jobTitle;
    private String jobShortDescription;
    private String jobDescription;

    private List<String> highlights;
    private List<String> deliverables;

    private List<SkillCategoryDto> skillCategories;
    
    private ExperienceLevel experienceLevel;
    
    private JobType jobType;
    
    private ProjectType projectType;

    private GpsLocation locationGps;

    private Address address;

    private JobTiming jobTiming;
    
    private Billing billing;

    private JobVisibility jobVisibility;

    private String totalJobCandidate;
    private String totalJobApplicant;

    private List<String> modules = new ArrayList<>();
    private String jobDraftJson;

    private PublishStatus publishStatus;
    
    private JobStatus jobStatus;
    
    private String jobStatusReason;
    
}
