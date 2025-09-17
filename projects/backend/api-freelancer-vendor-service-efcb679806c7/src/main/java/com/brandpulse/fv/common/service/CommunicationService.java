package com.brandpulse.fv.common.service;

import com.brandpulse.fv.util.CommunicationUtil;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author TS
 */
@Service
public class CommunicationService {

    @Autowired
    CommunicationUtil communicationUtil;

    @Autowired
    private LoggerService loggerService;

    @Value("${sms.flowId.otp}")
    private String smsFlowId;

    public void sendMobileOTP(String mobile, String otp) {

        Map<String, String> map = new HashMap<>();
        map.put("minutes", "15");
        map.put("otp", otp);
        String flowId = smsFlowId;
        String message = "Dear customer, use this One Time Password {{OTP}} to log in to your account. This OTP will be valid for the next 15 mins.";
        //sms
        loggerService.info("otp sms");
        message = message.replace("{{otp}}", otp);
        communicationUtil.sendSms(mobile, flowId, map, message);

        loggerService.info("otp sms sent");
    }

    public void sendEmailOTP(String email, String otp) {

        String smsText = "Use this One Time Password {{OTP}} to log in to your account. This OTP will be valid for the next 15 mins.";

        loggerService.info("otp email");
        smsText = smsText.replace("{{otp}}", otp);

        String subject = "BrandPulse : OTP";
        String htmlBody = "Dear customer,<br/>"
                + "<br/>"
                + "" + smsText + "<br/>"
                + "<br/>"
                + "<br/>"
                + "Regards,<br/>"
                + "BrandPulse Team";
        communicationUtil.sendMail(email, subject, "", htmlBody);

        loggerService.info("otp email sent");
    }

}
