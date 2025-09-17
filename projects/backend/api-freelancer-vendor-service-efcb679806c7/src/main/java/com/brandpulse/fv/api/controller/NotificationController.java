/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.controller;

import com.brandpulse.fv.api.dto.NotificationDto;
import com.brandpulse.fv.app.notification.Notification;
import com.brandpulse.fv.app.notification.NotificationService;
import com.brandpulse.fv.exception.ApiException;
import com.brandpulse.fv.security.AuthenticationService;
import com.brandpulse.fv.security.Token;
import com.brandpulse.fv.util.ClassUtil;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ts
 */
@RestController
@RequestMapping("api/v1/notifications")
public class NotificationController {
    
    @Autowired
    NotificationService notificationService;
    
    @Autowired
    AuthenticationService authenticationService;
    
    @GetMapping("")
    public List<NotificationDto> getNotification(){
        try {
            Token token = authenticationService.getFreelancerOrVendorOrVendorUserToken();
            List<Notification> notifications = notificationService.getNotifications(token);
            List<NotificationDto> notificationDto = ClassUtil.convertList(notifications, NotificationDto.class);

            return notificationDto;
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }
}
