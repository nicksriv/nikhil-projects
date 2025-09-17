/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.vendor;

import com.brandpulse.fv.common.childDocument.Address;
import com.brandpulse.fv.common.childDocument.BaseDocument;
import com.brandpulse.fv.common.childDocument.GpsLocation;
import java.time.Instant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author ts
 */
@Getter
@Setter
@NoArgsConstructor
@Document("vendor-user")
public class VendorUser extends BaseDocument {

    @Id
    private String id;
    private String vendorId;
    private String vendorUserRefNo;
    
    private String firstName;
    private String middleName;
    private String lastName;
    private String profileImage;
    
    private String email;
    private String mobile;
    private Address address;

    private String notificationId;
    private String appVersion;
    private float vendorUserRating;
    private GpsLocation gpsLocation;
    
    // failed login attempt
    private Instant lastLoginAt;

    // last first failed try - after one failed try it will be same until 15min cross or success loggedin
    private Instant lastFailedLoginTryAt;
    private int lastFailedLoginTryCount;
}
