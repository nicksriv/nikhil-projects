package com.brandpulse.job.util;

import com.brandpulse.job.common.service.LoggerService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import javax.mail.internet.MimeMessage;

@Service
@RequestScope
public class CommunicationUtil {

    @Value("${sms.type}")
    private String smsType;

    @Value("${sms.url}")
    private String smsurl;

    @Value("${mail.type}")
    private String mailType;

    @Value("${mail.url}")
    private String mailurl;

    @Value("${mail.apikey}")
    private String mailApiKey;

    @Value("${spring.mail.from}")
    private String mailFrom;

    @Value("${spring.mail.from.name}")
    private String mailFromName;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private LoggerService loggerService;

    @Async
    public void sendSms(String phoneNumber, String message) {
        try {
            if (smsType.equalsIgnoreCase("rest")) {
                sendSmsRest(phoneNumber, message);
            }

        } catch (Exception ex) {
            loggerService.logApi("SMS sending error:: " + ex.getMessage());
        }
    }

    @Async
    public void sendMail(String to, String subject, String textBody, String htmlBody) {
        try {
            if (mailType.equalsIgnoreCase("smtp")) {
                sendMailSmtp(to, subject, textBody, htmlBody);
            } else if (mailType.equalsIgnoreCase("rest")) {
                sendMailRest(to, subject, textBody, htmlBody);
            }
        } catch (Exception ex) {
            loggerService.logApi("Mail sending error:: " + ex.getMessage());
        }
    }

    public void sendSmsRest(String phoneNumber, String message) {
        try {

            String url = smsurl.replace("{message}", message);
            url = url.replace("{phone}", phoneNumber);

            loggerService.logApi("sms: " + url);
            RestTemplate rt = new RestTemplate();
            String result = rt.getForObject(url, String.class);
            loggerService.logApi("sms success: " + result);
        } catch (Exception ex) {
            loggerService.logApi("sms error: " + ex.getMessage());
        }
    }

    public void sendMailSmtp(String to, String subject, String textBody, String htmlBody) {
        try {
            MimeMessage msg = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg);

            helper.setTo(to);
            helper.setFrom(mailFrom);

            helper.setSubject(subject);
            if (!textBody.isEmpty()) {
                helper.setText(textBody);
            }
            if (!htmlBody.isEmpty()) {
                helper.setText(htmlBody, true);
            }

            loggerService.logApi("mail smtp: [to=" + to + ", subject=" + subject + "]");
            javaMailSender.send(msg);
        } catch (Exception ex) {
            loggerService.logApi("mail error: " + ex.getMessage());
        }
    }

    public void sendMailRest(String to, String subject, String textBody, String htmlBody) {
        try {
            String body = htmlBody;
            if (!textBody.isEmpty()) {
                body = textBody;
            }
            body = body.replace('"', '\'').replace("\n", "").replace("\t", "");

            String url = mailurl;

            String requestJson = "{\"personalizations\":[{"
                    + "\"recipient\":\"" + to + "\"}],"
                    + "\"from\":{\"fromEmail\":\"" + mailFrom + "\",\"fromName\":\"" + mailFromName + "\"},"
                    + "\"subject\":\"" + subject + "\",\"content\":\"" + body + "\"}";

            loggerService.logApi("mail rest: " + requestJson);
            RestTemplate rt = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.add("api_key", mailApiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> request = new HttpEntity<>(requestJson, headers);
            String result = rt.postForObject(url, request, String.class);
            loggerService.logApi("mail success: " + result);

        } catch (Exception ex) {
            loggerService.logApi("mail error: " + ex.getMessage());
        }
    }

}
