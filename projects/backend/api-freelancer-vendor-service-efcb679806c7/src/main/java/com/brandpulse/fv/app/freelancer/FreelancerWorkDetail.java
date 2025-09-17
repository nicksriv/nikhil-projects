/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.freelancer;

import com.brandpulse.fv.common.childDocument.BaseDocument;
import java.util.Date;
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
@Document("freelancer-work-details")
public class FreelancerWorkDetail extends BaseDocument {
    
    @Id
    private String id;
    
    private String freelancerId;
    
    
    private String company;
    private String designation;
    private String workDescription;
    
    
    private Date startDate;
    private Date endDate;
    
}
