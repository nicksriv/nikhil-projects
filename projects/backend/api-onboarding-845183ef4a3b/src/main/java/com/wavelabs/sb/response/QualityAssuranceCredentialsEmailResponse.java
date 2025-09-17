package com.wavelabs.sb.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QualityAssuranceCredentialsEmailResponse {
  private String qualityAssuranceId;
  private String sendTo;
  private String subject;
  private String template;
}
