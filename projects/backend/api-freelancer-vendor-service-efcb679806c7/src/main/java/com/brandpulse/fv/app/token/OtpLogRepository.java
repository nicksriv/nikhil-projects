/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.app.token;

import java.time.Instant;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Suhail Tamboli
 */
@Repository
public interface OtpLogRepository extends MongoRepository<OtpLog, String> {
    
    Optional<OtpLog> findFirstByUserNameAndOtpOrderByCreatedAtDesc(String mobile, String otp);
    
    Optional<OtpLog> findByUserNameAndOtp(String mobile, String otp);
    
    Optional<OtpLog> findFirstByUserNameOrderByCreatedAtDesc(String mobile);
    
    int countByUserNameAndIsUsedAndCreatedAtGreaterThan(String mobile, boolean isUsed, Instant createdAt);
}
