/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.api.dto;

import com.brandpulse.fv.app.disputes.enums.DisputeStatus;
import java.time.Instant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Suhail Tamboli
 */
@Getter
@Setter
@NoArgsConstructor
public class DisputeDto {
    
    private String id;
    private String disputeRefNo;
    private String jobCandidateId;
    private String jobTitle;
    
    
    private String disputeCategoryId;
   
    private String disputeTitle;
    private String disputeDescription;
    private DisputeStatus disputeStatus;
    
    
    private String closedRemark;
    private Instant closedAt;
    private Instant createdAt;
}
