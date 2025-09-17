package com.wavelabs.sb.documents;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.wavelabs.sb.documents.childDocuments.Address;
import com.wavelabs.sb.documents.childDocuments.GpsLocation;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Document("VendorUser")
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
    
    

