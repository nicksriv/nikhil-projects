/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.disputes;

import com.brandpulse.fv.app.disputes.enums.DisputeStatus;
import com.brandpulse.fv.common.childDocument.BaseDocument;
import com.brandpulse.fv.common.enums.UserType;
import java.time.Instant;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 *
 * @author ts
 */
@Getter
@Setter
@NoArgsConstructor
@Document("dispute")
public class Dispute extends BaseDocument {

    private String id;
    private String disputeRefNo;
    private String clientId;
    private String jobId;
    private String jobCandidateId;
    private String jobTitle;
    
    
    private String userId;
    private UserType userType;
    
    private String disputeCategoryId;
   
    private String disputeTitle;
    private String disputeDescription;
    
    
    private DisputeStatus disputeStatus;
    
    private String closedRemark;
    private Instant closedAt;
    
    
    private UserType closedByUserType;
    
    private String closedByuser;
    
}
