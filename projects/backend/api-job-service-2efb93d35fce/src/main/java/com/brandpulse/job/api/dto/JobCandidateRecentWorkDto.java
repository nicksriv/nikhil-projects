/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.job.api.dto;

import com.brandpulse.job.app.job.enums.JobCandidateStatus;
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
public class JobCandidateRecentWorkDto {

    private Float jobRating;
    private String jobTitle;
    private JobCandidateStatus jobStatus;

}
