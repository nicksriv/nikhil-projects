/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.notification;

import com.brandpulse.fv.common.enums.UserType;
import com.brandpulse.fv.security.Token;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ts
 */
@Service
public class NotificationService {
    
    @Autowired
    NotificationRepository notificationRepository;

    public List<Notification> getNotifications(Token token) {
        if (token.getUserTypeEnum().equals(UserType.VENDOR_USER)) {
            return notificationRepository.findByUserIdAndUserType(token.getUserSubId(), token.getUserTypeEnum());
        }else {
            return notificationRepository.findByUserIdAndUserType(token.getUserId(), token.getUserTypeEnum());
        }
    }
    
}
