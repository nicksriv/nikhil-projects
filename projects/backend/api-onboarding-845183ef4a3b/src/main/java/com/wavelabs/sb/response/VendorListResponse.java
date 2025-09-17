package com.wavelabs.sb.response;

import java.time.Instant;
import java.util.List;

import com.wavelabs.sb.documents.childDocuments.Address;

import com.wavelabs.sb.enums.Status;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class VendorListResponse{
    private String id;
    private String vendorName;
    private String vendorRefNo;
    private Address address;
    private Status status;
   private List<SkillDto> skills;
    private Instant createdAt;
   
}
    

