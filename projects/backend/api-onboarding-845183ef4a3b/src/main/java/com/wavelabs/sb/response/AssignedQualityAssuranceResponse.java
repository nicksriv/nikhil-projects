package com.wavelabs.sb.response;

import com.wavelabs.sb.enums.QualityControllerStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AssignedQualityAssuranceResponse {

  private String name;
  private String email;
  private String mobile;
  private QualityControllerStatus qualityControllerStatus;
  
}
