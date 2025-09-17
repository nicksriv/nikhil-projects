/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.job.app.vendor;

import com.brandpulse.job.common.childDocument.Address;
import com.brandpulse.job.common.childDocument.AssociatedSkill;
import com.brandpulse.job.common.childDocument.BaseDocument;
import com.brandpulse.job.common.childDocument.GpsLocation;
import com.brandpulse.job.common.childDocument.SpocPerson;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author ts
 */
@Getter
@Setter
@NoArgsConstructor
@Document("vendor")
public class Vendor extends BaseDocument {

    private String id;
    private String vendorRefNo;
    private String vendorName;
    private Date companyIncorporatedAt;
    private String companyLogo;
    
    
    private GpsLocation locationGps;
    private Address address;

    private float experienceInYear;
    private List<AssociatedSkill> skills = new ArrayList<>();
    private String workHighlights;
    private String portfolioUrl;
    
    private SpocPerson spocDetail;

    private int profileCompletionPercentage;
    private boolean isProfileCompleted;

    
    private String notificationId;
    private String appVersion;
    private float vendorRating;
    private GpsLocation gpsLocation;

    // failed login attempt
    private Instant lastLoginAt;

    // last first failed try - after one failed try it will be same until 15min cross or success loggedin
    private Instant lastFailedLoginTryAt;
    private int lastFailedLoginTryCount;
    
    public List<AssociatedSkill> getSkills() {

        if (skills == null) {
            return new ArrayList<>();
        }

        return skills;
    }
}
