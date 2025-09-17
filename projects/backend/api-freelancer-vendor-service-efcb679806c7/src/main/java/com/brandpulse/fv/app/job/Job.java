package com.brandpulse.fv.app.job;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

import com.brandpulse.fv.common.childDocument.ModifierDocument;
import com.brandpulse.fv.common.childDocument.GpsLocation;
import com.brandpulse.fv.common.childDocument.Address;

import com.brandpulse.fv.app.job.childDocument.Billing;
import com.brandpulse.fv.app.job.childDocument.JobTiming;
import com.brandpulse.fv.app.job.childDocument.JobVisibility;

import com.brandpulse.fv.app.job.enums.ExperienceLevel;
import com.brandpulse.fv.app.job.enums.JobStatus;
import com.brandpulse.fv.app.job.enums.JobType;
import com.brandpulse.fv.app.job.enums.ProjectType;
import com.brandpulse.fv.app.job.enums.PublishStatus;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
@NoArgsConstructor
@Document("job")
public class Job extends ModifierDocument  {

    @Id
    private String id;

    private String jobRefNo;
    
    
    private String clientId;

    private String jobTitle;
    private String jobShortDescription;
    private String jobDescription;

    private ArrayList<String> highlights;
    private ArrayList<String> deliverables;

    private ArrayList<String> skills;
    private ArrayList<String> skillCategories;

    
    @Enumerated(EnumType.STRING)
    private ExperienceLevel experienceLevel;
    
    
    @Enumerated(EnumType.STRING)
    private JobType jobType;
    
    
    @Enumerated(EnumType.STRING)
    private ProjectType projectType;

    private GpsLocation locationGps;

    private Address address;

    private JobTiming jobTiming;
    
    private Billing billing;

    private JobVisibility jobVisibility;

    private String totalJobCandidate;
    private String totalJobApplicant;

    private ArrayList<String> modules;
    private String jobDraftJson;

    
    @Enumerated(EnumType.STRING)
    private PublishStatus publishStatus;
    
    
    @Enumerated(EnumType.STRING)
    private JobStatus jobStatus;
    
    private String jobStatusReason;
}