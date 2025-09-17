/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.job;


import com.brandpulse.fv.app.job.enums.AmountStatus;
import com.brandpulse.fv.app.job.enums.JobCandidateStatus;
import com.brandpulse.fv.common.enums.UserType;
import com.brandpulse.fv.common.childDocument.BaseDocument;
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
@Document("job-candidate")
public class JobCandidate extends BaseDocument {
    
    @Id
    private String id;
    
    private String jobId;
    private String jobTitle;
    private String clientId;
    
    
    private String userId;
    private String userSubId;
    
    @Enumerated(EnumType.STRING)
    private UserType userType;
    
    
    
    @Enumerated(EnumType.STRING)
    private JobCandidateStatus jobStatus;
    private String jobStatusRemark;
    private Instant jobStatusAt;
    private String jobUserRemark;
    
    
    private String jobApproverUser;
    @Enumerated(EnumType.STRING)
    private UserType jobApproverUserType;
    
    private String jobApproverRemark;
    private Instant jobApproverRemarkAt;
    
    
    private Float jobRating;
    private String jobRatingDescription;
    
    
    private Float totalHoursWorked;
    private Float totalEarned;
    private Float amountPaid;
    
    @Enumerated(EnumType.STRING)
    private AmountStatus amountStatus;
    
    private String payerRemark;
    private String notes;
    
    
}
