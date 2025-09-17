package com.brandpulse.job.app.qualityAssurance;

import java.time.Instant;
import java.util.ArrayList;

import org.springframework.data.mongodb.core.mapping.Document;

import com.brandpulse.job.app.job.enums.QualityControllerStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Document("quality-assurance")
public class QualityAssurance {

    private String id;
    private String qualityAssuranceRefNo;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String mobile;
    private ArrayList<String> clients;
    private QualityControllerStatus qualityControllerStatus;
    private Instant modifiedAt;
    private Instant createdAt;

  
}
