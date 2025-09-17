/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.notification;

import com.brandpulse.fv.common.childDocument.BaseDocument;
import com.brandpulse.fv.common.enums.UserType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author ts
 */
@Getter
@Setter
@NoArgsConstructor
@Document("notification")
public class Notification extends BaseDocument {
    private String id;
    private String userId;
    
    private UserType userType;
    private String notificationTitle;
    private  String notificationDescription;
    
}
