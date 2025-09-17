/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.job.api.dto;

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
public class CandidateJobApproveRequestDto {
    
    private String jobApproverRemark;
    private Float jobRating;
    private String jobRatingDescription;
    private Float totalHoursWorked;
    
}
