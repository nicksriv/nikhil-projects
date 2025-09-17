package com.wavelabs.sb.request;


import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import java.util.ArrayList;

import com.wavelabs.sb.documents.childDocuments.Address;
import com.wavelabs.sb.documents.childDocuments.AssociatedSkill;
import com.wavelabs.sb.documents.childDocuments.GpsLocation;
import com.wavelabs.sb.documents.childDocuments.SpocPerson;
import com.wavelabs.sb.response.BankDetailDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VendorDetailRequest {
    
     private String id;
     private String vendorRefNo;

     @NotBlank(message = "VendorName is mandatory")
    @Pattern(message = "VendorName  should contain alpha numeric only ", regexp = "^[a-zA-Z0-9\\s]*$")
    @Size(min = 2, message = "Vendor name must be more than 2 characters")
    private String vendorName;
    
    private Date companyIncorporatedAt;
    private String workHighlights;
    private Address address;
    private GpsLocation locationGps;
    private List<AssociatedSkill> skills = new ArrayList<>();
    private SpocPerson spocDetail;
     

    private BankDetailDto bankDetail;
    private String companyLogo;
    private String portfolioUrl;
    
}
