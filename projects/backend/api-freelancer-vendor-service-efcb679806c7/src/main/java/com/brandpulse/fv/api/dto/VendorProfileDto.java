/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.dto;

import com.brandpulse.fv.common.childDocument.Address;
import com.brandpulse.fv.common.childDocument.GpsLocation;
import com.brandpulse.fv.common.childDocument.SpocPerson;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
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
public class VendorProfileDto {

    private String id;

    private String vendorRefNo;
    private String vendorName;
    private Date companyIncorporatedAt;
    private String companyLogo;
    
    private GpsLocation locationGps;
    private Address address;

    private List<SkillCategoryDto> skillCategory = new ArrayList<>();
    private float experienceInYear;
    private String workHighlights;
    private String portfolioUrl;
    
    private SpocPerson spocDetail;

    private int profileCompletionPercentage;
    private boolean isProfileCompleted;
    

    private BankDetailDto bankDetail;
    
    private String appVersion;
    private float vendorRating;
    
    private Instant lastLoginAt;

}
