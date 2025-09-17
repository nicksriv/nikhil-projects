/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.app.token;

import com.brandpulse.fv.common.enums.OTPType;
import com.brandpulse.fv.exception.ErrorCodeConstant;
import com.brandpulse.fv.exception.ServiceException;
import com.brandpulse.fv.util.EnviromentUtil;
import com.brandpulse.fv.util.SecurityUtil;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Suhail Tamboli
 */
@Service
public class TokenService {

    @Autowired
    OtpLogRepository otpLogRepository;

    @Autowired
    private EnviromentUtil enviromentUtil;

    public String generateOtp(String freelancerId, String userName, OTPType otpType) {
        int number = 60 * 15;
        Instant last15Minutes = Instant.now().minusSeconds(number);
        int count = otpLogRepository.countByUserNameAndIsUsedAndCreatedAtGreaterThan(userName, false, last15Minutes);

        if (count > 3 && enviromentUtil.isProduction()) {
            throw new ServiceException(ErrorCodeConstant.FV0003);
        }

        String otp = SecurityUtil.generateOtp();

        if (!enviromentUtil.isProduction()) {
            otp = "111111";
        }
        Instant expiringAt = Instant.now().plusSeconds(number);

        OtpLog otpLog = new OtpLog();
        otpLog.setFreelancerId(freelancerId);
        otpLog.setUserName(userName);
        otpLog.setOtpType(otpType);
        otpLog.setOtp(otp);
        otpLog.setExpiringAt(expiringAt);

        otpLogRepository.save(otpLog);

        return otp;
    }

    public boolean verifyOtp(String userName, String otp) {

        Instant currentTime = Instant.now();
        Optional<OtpLog> otpLogO = otpLogRepository.findFirstByUserNameAndOtpOrderByCreatedAtDesc(userName, otp);

        if (!otpLogO.isPresent()) {
            return false;
        }

        OtpLog otpLog = otpLogO.get();

        if (otpLog.isUsed() || currentTime.isAfter(otpLog.getExpiringAt())) {
            return false;
        }

        otpLog.setUsed(true);
        otpLogRepository.save(otpLog);

        return true;
    }

    public List<String> verifyMobileAndEmailOtp(String mobile, String email, String mobileOTP, String emailOTP) {

        Instant currentTime = Instant.now();
        Optional<OtpLog> otpLogMobileO = otpLogRepository.findFirstByUserNameAndOtpOrderByCreatedAtDesc(mobile, mobileOTP);
        Optional<OtpLog> otpLogEmailO = otpLogRepository.findFirstByUserNameAndOtpOrderByCreatedAtDesc(email, emailOTP);

        if (!otpLogMobileO.isPresent()) {
            throw new ServiceException(ErrorCodeConstant.FV0007);
        }

        if (!otpLogEmailO.isPresent()) {
            throw new ServiceException(ErrorCodeConstant.FV0008);
        }

        OtpLog otpLogMobile = otpLogMobileO.get();
        OtpLog otpLogEmail = otpLogEmailO.get();

        if (otpLogMobile.isUsed() || currentTime.isAfter(otpLogMobile.getExpiringAt())) {
            throw new ServiceException(ErrorCodeConstant.FV0007);
        }

        if (otpLogEmail.isUsed() || currentTime.isAfter(otpLogEmail.getExpiringAt())) {
            throw new ServiceException(ErrorCodeConstant.FV0008);
        }

        otpLogMobile.setUsed(true);
        otpLogEmail.setUsed(true);
        otpLogRepository.saveAll(Arrays.asList(otpLogMobile, otpLogEmail));

        List<String> ids = new ArrayList<>();
        ids.add(otpLogMobile.getId());
        ids.add(otpLogEmail.getId());

        return ids;
    }

    public boolean verifyIds(String mobile, String email, String mobileVerifyId, String emailVerifyId) {

        Optional<OtpLog> otpLogMobileO = otpLogRepository.findById(mobileVerifyId);
        Optional<OtpLog> otpLogEmailO = otpLogRepository.findById(emailVerifyId);

        if (!otpLogMobileO.isPresent()) {
            throw new ServiceException(ErrorCodeConstant.FV0009);
        }

        if (!otpLogEmailO.isPresent()) {
            throw new ServiceException(ErrorCodeConstant.FV0010);
        }

        OtpLog otpLogMobile = otpLogMobileO.get();
        OtpLog otpLogEmail = otpLogEmailO.get();

        if (!(otpLogMobile.isUsed() || otpLogMobile.getUserName().equals(mobile))) {
            throw new ServiceException(ErrorCodeConstant.FV0009);
        }

        if (!(otpLogEmail.isUsed() || otpLogEmail.getUserName().equals(email))) {
            throw new ServiceException(ErrorCodeConstant.FV0010);
        }

        return true;
    }

}
