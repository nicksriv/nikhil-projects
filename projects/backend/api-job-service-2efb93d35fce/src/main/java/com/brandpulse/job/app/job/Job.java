package com.brandpulse.job.app.job;

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
import com.brandpulse.job.common.childDocument.ModifierDocument;
import java.util.ArrayList;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

    private ArrayList<String> modules = new ArrayList<>();
    private String jobDraftJson;

    
    @Enumerated(EnumType.STRING)
    private PublishStatus publishStatus;
    
    
    @Enumerated(EnumType.STRING)
    private JobStatus jobStatus;
    
    private String jobStatusReason;
    
}