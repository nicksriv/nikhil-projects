/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.test;

import com.brandpulse.fv.app.job.childDocument.Billing;
import com.brandpulse.fv.app.job.childDocument.JobTiming;
import com.brandpulse.fv.app.job.enums.ExperienceLevel;
import com.brandpulse.fv.app.job.enums.JobType;
import com.brandpulse.fv.app.job.enums.ProjectType;
import com.brandpulse.fv.common.childDocument.Address;
import com.brandpulse.fv.common.childDocument.GpsLocation;
import java.util.ArrayList;
import javax.validation.constraints.NotNull;

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
public class JobRequestDto {
    
    @NotNull
    private String clientId;
    
    @NotNull
    private String jobTitle;
    
    @NotNull
    private String jobShortDescription;
    
    @NotNull
    private String jobDescription;

    @NotNull
    private ArrayList<String> highlights;
    
    @NotNull
    private ArrayList<String> deliverables;
    
    @NotNull
    private ArrayList<String> skills;

    
    @NotNull
    private ExperienceLevel experienceLevel;
    
    
    @NotNull
    private JobType jobType;
    
    
    @NotNull
    private ProjectType projectType;

    @NotNull
    private GpsLocation locationGps;
    
    @NotNull
    private Address address;
    
    @NotNull
    private JobTiming jobTiming;

    @NotNull
    private ArrayList<String> modules;
    
    private Billing billing;
}
