/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.wavelabs.sb.response;

import com.wavelabs.sb.documents.VendorCredential;
import com.wavelabs.sb.documents.childDocuments.Address;
import com.wavelabs.sb.documents.childDocuments.GpsLocation;
import com.wavelabs.sb.documents.childDocuments.SpocPerson;
import com.wavelabs.sb.enums.Status;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;

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
public class VendorDetailResponse {

    private String id;

    private String vendorRefNo;
    
    private String vendorName;
    private Date companyIncorporatedAt;
    private String companyLogo;
    
    private GpsLocation gpsLocation;
    private Address address;

    private List<SkillCategoryDto> skillCategory = new ArrayList<>();
    private float experienceInYear;
    private String workHighlights;
    private String portfolioUrl;
    
    private SpocPerson spocDetail;

    private int profileCompletionPercentage;
    private boolean isProfileCompleted;
    
    private Status status; 
    private BankDetailDto bankDetail;
    
    private String appVersion;
    private float vendorRating;
    
    private Instant lastLoginAt;
    
    @DBRef
    private VendorCredential vendorCredential;
}
