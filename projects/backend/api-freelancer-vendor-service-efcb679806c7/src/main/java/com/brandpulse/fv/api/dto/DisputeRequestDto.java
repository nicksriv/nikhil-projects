/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.api.dto;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Suhail Tamboli
 */
@Getter
@Setter
@NoArgsConstructor
public class DisputeRequestDto {

    @NotBlank
    private String jobCandidateId;

    @NotBlank
    private String disputeCategoryId;

    @NotBlank
    private String disputeName;

    @NotBlank
    private String disputeTitle;

    @NotBlank
    private String disputeDescription;

}
