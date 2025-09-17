/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.vendor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author dell
 */
@Getter
@Setter
@NoArgsConstructor
public class VendorCandidateDashboardStats {
    
    Integer totalJobs;
    Integer totalUsers;
    Integer totalCompletedJobs;
    Integer totalJobsInprogress;
    Integer activeUsers;
    Integer inActiveUsers;
    
}
