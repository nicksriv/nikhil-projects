package com.brandpulse.job.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QADashboardStatsDto {
  
  Integer totalJobsAssigned;
  Integer totalJobsApproved;
  Integer totalJobsInprogress;
  Integer totalClients;
}
