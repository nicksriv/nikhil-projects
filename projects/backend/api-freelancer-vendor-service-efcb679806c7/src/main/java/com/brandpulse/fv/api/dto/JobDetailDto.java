/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.dto;

import com.brandpulse.fv.app.job.childDocument.Billing;
import com.brandpulse.fv.app.job.childDocument.JobTiming;
import com.brandpulse.fv.app.job.enums.ExperienceLevel;
import com.brandpulse.fv.app.job.enums.JobApplicationStatus;
import com.brandpulse.fv.app.job.enums.JobType;
import com.brandpulse.fv.app.job.enums.ProjectType;
import com.brandpulse.fv.common.childDocument.Address;
import java.time.Instant;
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
    private ClientDto client;

    private String jobTitle;
    private String jobShortDescription;
    private String jobDescription;

    private JobApplicationStatus jobApplicantStatus;
    private List<SkillDto> skill;
    private ArrayList<String> highlights;
    private ArrayList<String> deliverables;
    private ExperienceLevel experienceLevel;
    private JobType jobType;

    private ProjectType projectType;
    
    private ArrayList<String> modules = new ArrayList<>();
    

    private Address address;

    private JobTiming jobTiming;

    private Billing billing;

    
    private Instant createdAt;
}
