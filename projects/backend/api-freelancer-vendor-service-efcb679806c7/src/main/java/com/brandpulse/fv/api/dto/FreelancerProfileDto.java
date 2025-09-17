/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.dto;

import com.brandpulse.fv.common.childDocument.Address;
import com.brandpulse.fv.common.childDocument.GpsLocation;
import com.brandpulse.fv.common.enums.Gender;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author ts
 */
@Getter
@Setter
@NoArgsConstructor
public class FreelancerProfileDto {

    private String id;

    private String freelancerRefNo;
    private String firstName;
    private String middleName;
    private String lastName;

    private String email;
    private String mobile;
    private Gender gender;
    private String profileImage;

    private GpsLocation gpsLocation;
    private Address address;

    private int profileCompletionPercentage;
    private boolean isProfileCompleted;
    private String education;

    private List<SkillCategoryDto> skillCategory = new ArrayList<>();
    private float experienceInYear;
    private String resumeUrl;

    private String panNumber;
    private String adhaarNumber;

    private String appVersion;
    private float freelancerRating;

    private Instant lastLoginAt;

    private BankDetailDto bankDetail;
    private List<WorkDetailDto> workDetail = new ArrayList<>();

}
