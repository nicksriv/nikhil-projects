/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.job.api.dto;

import com.brandpulse.job.app.job.childDocument.Billing;
import com.brandpulse.job.app.job.childDocument.JobTiming;
import com.brandpulse.job.app.job.childDocument.JobVisibility;
import com.brandpulse.job.app.job.enums.ExperienceLevel;
import com.brandpulse.job.app.job.enums.JobType;
import com.brandpulse.job.app.job.enums.ProjectType;
import com.brandpulse.job.app.job.enums.PublishStatus;
import com.brandpulse.job.common.childDocument.Address;
import com.brandpulse.job.common.childDocument.GpsLocation;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author dell
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobRequestDto {
    
    private String clientId;
    
    private String jobTitle;
    private String jobShortDescription;
    private String jobDescription;
    
    
    private ArrayList<String> highlights;
    private ArrayList<String> deliverables;
    
    
    private ArrayList<String> skills;
    private ExperienceLevel experienceLevel;
    
    private JobType jobType;
    private ProjectType projectType;
    
    private GpsLocation locationGps;
    private Address address;
    
    private JobTiming jobTiming;
    private Billing billing;
    private JobVisibility jobVisibility;
    private PublishStatus publishStatus;

}
