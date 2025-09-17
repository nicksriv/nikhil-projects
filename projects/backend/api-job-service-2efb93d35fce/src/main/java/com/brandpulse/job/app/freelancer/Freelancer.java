/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.app.freelancer;

import com.brandpulse.job.common.childDocument.Address;
import com.brandpulse.job.common.childDocument.AssociatedSkill;
import com.brandpulse.job.common.childDocument.GpsLocation;
import com.brandpulse.job.common.childDocument.ModifierDocument;
import com.brandpulse.job.common.enums.Gender;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Suhail Tamboli
 */
@Getter
@Setter
@NoArgsConstructor
@Document("freelancers")
public class Freelancer extends ModifierDocument {

    @Id
    private String id;

    private String freelancerRefNo;
    private String firstName;
    private String middleName;
    private String lastName;

    private String profileImage;

    private String email;
    private String mobile;
    private Gender gender;
    private boolean isEmailVerified;
    private boolean isMobileVerified;
    
    
    private GpsLocation gpsLocation;
    private Address address;
    
    
    private int profileCompletionPercentage;
    private boolean isProfileCompleted;
    private String education;

    private List<AssociatedSkill> skills;
    private float experienceInYear;
    private String resumeUrl;

    private String panNumber;
    private String adhaarNumber;


    private String notificationId;
    private String appVersion;
    private float freelancerRating;

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
    
    public String getName() {
        String name = "";
        
        if(firstName != null) {
            name = firstName;
        }
        
        if(lastName != null) {
            name += " " + lastName;
        }
        
        return name;
    }
}
