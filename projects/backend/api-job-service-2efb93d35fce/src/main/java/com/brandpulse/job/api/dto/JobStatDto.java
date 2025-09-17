package com.brandpulse.job.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JobStatDto {

  float totalMoneyEarned;
  Integer totalCompletedJobs;
  Integer totalInprogressJobs;
  Integer totalJobs;
  Integer totalCancelJobs;
  float amountPaid;
  float pendingAmount;
  Integer totalDisputes;
}
