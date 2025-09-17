package com.wavelabs.sb.response;

import com.wavelabs.sb.documents.childDocuments.Address;
import com.wavelabs.sb.enums.Status;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FreelancerListResponse {

    private String id;
    private String freelancerRefNo;
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private Address address;
    private Status status;

    private float freelancerRating;

}
