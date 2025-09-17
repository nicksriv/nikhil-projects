package com.wavelabs.sb.response;

import java.time.Instant;

import com.wavelabs.sb.enums.DisputeStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DisputeDetailResponse {
  private String id;
  private String disputeCategoryId;
  private String disputeCategoryName;
  private String disputeRefNo;
  private String disputeTitle;
  private String disputeDescription;
  private String clientName;
  private String mobile;
  private String email;
  private String raisedBy;
  private Instant raisedAt;
  private DisputeStatus disputeStatus;
  private String closedRemark;
}
