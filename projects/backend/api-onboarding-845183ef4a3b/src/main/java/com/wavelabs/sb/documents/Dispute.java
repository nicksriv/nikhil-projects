package com.wavelabs.sb.documents;

import java.time.Instant;

import org.springframework.data.mongodb.core.mapping.Document;

import com.wavelabs.sb.enums.DisputeStatus;
import com.wavelabs.sb.enums.UserType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
