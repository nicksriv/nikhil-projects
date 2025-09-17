/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.notification;

import com.brandpulse.fv.common.enums.UserType;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ts
 */
@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    
    List<Notification> findByUserIdAndUserType(String userId, UserType userType);
}
