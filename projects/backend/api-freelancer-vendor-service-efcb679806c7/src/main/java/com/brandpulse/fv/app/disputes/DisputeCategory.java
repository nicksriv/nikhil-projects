/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.disputes;

import com.brandpulse.fv.app.disputes.enums.DisputeResolver;
import com.brandpulse.fv.common.childDocument.BaseDocument;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 *
 * @author ts
 */
@Getter
@Setter
@NoArgsConstructor
@Document("disputes-categories")
public class DisputeCategory extends BaseDocument {
    
    private String id;
    private String disputeCategoryName;
        
    @Field("disputeResolver")
    @Enumerated(EnumType.STRING)
    private DisputeResolver disputeResolver;
    
}
