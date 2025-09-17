package com.wavelabs.sb.response;

import java.time.Instant;

import com.wavelabs.sb.enums.DisputeStatus;
import com.wavelabs.sb.enums.UserType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DisputeListResponse {
	private String id;
  private String disputeRefNo;
	private String disputeTitle;
	private String clientId;
	private String clientName;
	private String userId;
	private String raisedBy;
	private Instant raisedAt;
	private DisputeStatus disputeStatus;
	private UserType userType;
	private String disputeCategoryId;
}
