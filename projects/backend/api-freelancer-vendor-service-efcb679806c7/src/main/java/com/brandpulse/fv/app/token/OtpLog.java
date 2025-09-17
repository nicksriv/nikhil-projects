/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.app.token;

import com.brandpulse.fv.common.childDocument.BaseDocument;
import com.brandpulse.fv.common.enums.OTPType;
import java.time.Instant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Suhail Tamboli
 */
@Getter
@Setter
@NoArgsConstructor
@Document("otp-log")
public class OtpLog extends BaseDocument {
    
    
    @Id
    private String id;
    private String freelancerId;
    
    private String userName;
    private OTPType otpType;
    private String otp;
    private Instant expiringAt;
    private boolean isUsed = false;
    
}
