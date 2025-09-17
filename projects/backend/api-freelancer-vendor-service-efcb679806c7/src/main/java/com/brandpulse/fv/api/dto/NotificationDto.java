/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.api.dto;

import java.time.Instant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Suhail Tamboli
 */
@NoArgsConstructor
@Getter
@Setter
public class NotificationDto {
    
    private String id;
    private String notificationTitle;
    private  String notificationDescription;
    private Instant createdAt;
}
