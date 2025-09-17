/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.ask;

import com.brandpulse.fv.common.childDocument.BaseDocument;
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
@Document("ask-us")
public class AskUs extends BaseDocument{
    
    @Id
    private String id;
    private String userId;
    private String userType;
    private String askTitle;
    private String askUsDescription;
    
    
}
