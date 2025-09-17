package com.brandpulse.job.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommonDashboardStatsDto {
  
  Integer totalJobs;
  Integer totalCompletedJobs;
  Integer totalOngoingJobs;
  Integer totalNewJobs;
  Float totalEarned;
  Float totalAmountPaid;
  Float totalPendingAmount;
  Integer totalVendors;
  Integer totalFreelancers;
  Integer totalDisputes;
  Integer totalQualityAssurances;
}
