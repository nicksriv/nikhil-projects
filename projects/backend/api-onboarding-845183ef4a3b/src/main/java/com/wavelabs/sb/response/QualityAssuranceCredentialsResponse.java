package com.wavelabs.sb.response;

import java.time.Instant;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QualityAssuranceCredentialsResponse {
  
  private String id;
	private String qualityAssuranceId;
	private String qualityAssuranceName;
	private String password;
	private Instant joiningDate;
}
