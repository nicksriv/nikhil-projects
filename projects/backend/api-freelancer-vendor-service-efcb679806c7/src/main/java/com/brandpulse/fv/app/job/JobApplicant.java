/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.job;

import com.brandpulse.fv.app.job.enums.JobApplicationStatus;
import com.brandpulse.fv.common.childDocument.BaseDocument;
import com.brandpulse.fv.common.enums.UserType;
import java.time.Instant;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author ts
 */
@Getter
@Setter
@NoArgsConstructor
@Document("job-applicants")
public class JobApplicant extends BaseDocument{
    
    @Id
    private String id; 
    
    private String jobId;
    private String jobCandidateId;
    private String clientId;
    private String jobTitle;
    
    @Enumerated(EnumType.STRING)
    private UserType userType;
    private String userId;
    private String userNote;
    
    @Enumerated(EnumType.STRING)
    private JobApplicationStatus jobApplicationStatus;
    private Instant jobApplicationAt;
    private String jobAplicationStatusReason;
    
    
    private String actionTakenByUser;
    
    @Enumerated(EnumType.STRING)
    private UserType actionTakenByUserType;
    
}
