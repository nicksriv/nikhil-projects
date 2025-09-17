package com.wavelabs.sb.services;

import java.io.IOException;
import java.io.StringWriter;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.EmailTemplates;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ClientsCredentials;
import com.wavelabs.sb.documents.QualityAssurance;
import com.wavelabs.sb.documents.QualityAssuranceCredentials;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.documents.Vendor;
import com.wavelabs.sb.documents.VendorCredential;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.ClientCredentialsRepository;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.QualityAssuranceCredentialsRepository;
import com.wavelabs.sb.repositories.QualityAssuranceRepository;
import com.wavelabs.sb.repositories.UserCredentialsRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.repositories.VendorCredentialRepository;
import com.wavelabs.sb.repositories.VendorRepository;
import com.wavelabs.sb.request.ClientCredentialsEmailRequest;
import com.wavelabs.sb.request.QualityAssuranceCredentialsEmailRequest;
import com.wavelabs.sb.request.UserCredentialsEmailRequest;
import com.wavelabs.sb.request.VendorCredentialsEmailRequest;
import com.wavelabs.sb.response.ClientCredentialsEmailResponse;
import com.wavelabs.sb.response.QualityAssuranceCredentialsEmailResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.UserCredentialsEmailResponse;
import com.wavelabs.sb.response.VendorCredentialEmailResponse;

import freemarker.template.Configuration;
import freemarker.template.TemplateException;

@Service
public class EmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    final Configuration configuration;

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    VendorCredentialRepository vendorCredentialRepository;

    @Autowired
    VendorRepository vendorRepository;

    @Autowired
    ClientCredentialsRepository clientCredentialsRepository;

    @Autowired
    ClientOnboardingRepository clientOnboardingRepository;

    @Autowired
    UserOnboardingRepository userOnboardingRepository;

    @Autowired
    UserCredentialsRepository userCredentialsRepository;

    @Autowired
    AesEncryption aesEncryption;

    @Autowired
    QualityAssuranceCredentialsRepository qualityAssuranceCredentialsRepository;

    @Autowired
    QualityAssuranceRepository qualityAssuranceRepository;

    public EmailService(Configuration configuration, JavaMailSender javaMailSender) {
        this.configuration = configuration;
        this.javaMailSender = javaMailSender;
    }

    // Client Credentials
    public void sendMail(String toEmail, ClientsCredentials credentials, boolean useShareCredentialsTemplate) {

        try {
            LOGGER.info("send Mail Client Credentials method started");
            credentials.setPassword(aesEncryption.decrypt(credentials.getPassword()));
            String emailContent = getEmailContent(credentials, useShareCredentialsTemplate);
            deliverEmail(toEmail, emailContent, useShareCredentialsTemplate);
        } catch (TemplateException | IOException e) {
            LOGGER.info("send Mail : Bad Request Excepion - Email Template not found");
            throw new BadRequestException(Constants.EMAIL_TEMPLATE_NOT_FOUND);
        } catch (MessagingException | MailException e) {
            LOGGER.info("send Mail : Bad Request Exception - SMTP configuration Failed");
            throw new BadRequestException(Constants.CANNOT_SEND_EMAIL);
        }
        LOGGER.info("send Mail Client Credentials method ended");
    }

    private void deliverEmail(String toEmail, String emailContent, boolean useShareCredentialsTemplate)
            throws MessagingException, MailException {
        LOGGER.info("deliver Email with boolean param method Started");
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setTo(toEmail);
        helper.setFrom(Constants.FROM_EMAIL);
        String subject = (useShareCredentialsTemplate) ? Constants.SHARE_CREDENTIALS_SUBJECT
                : Constants.PASSWORD_CHANGED_SUBJECT;
        helper.setSubject(subject);
        helper.setText(emailContent, true);
        javaMailSender.send(mimeMessage);
        LOGGER.info("deliver Email with boolean param method ended");
    }

    public void deliverEmail(String toEmail, String emailContent, String subject, String[] cc, String[] bcc)
            throws MessagingException, MailException {
        LOGGER.info("deliver Email with subject, cc, bcc started");
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setTo(toEmail);
        helper.setFrom(Constants.FROM_EMAIL);
        if (cc != null && cc.length > 0) {
            helper.setCc(cc);
        }
        if (bcc != null && bcc.length > 0) {
            helper.setBcc(bcc);
        }
        helper.setSubject(subject);
        helper.setText(emailContent, true);
        javaMailSender.send(mimeMessage);
        LOGGER.info("deliver Email with subject, cc, bcc ended");
    }

    private String getEmailContent(ClientsCredentials clientsCredentials, boolean useShareCredentialsTemplate)
            throws TemplateException, IOException {
        LOGGER.info("get Email Content method started");
        StringWriter stringWriter = new StringWriter();
        Map<String, Object> model = new HashMap<>();
        model.put("credentials", clientsCredentials);
        configuration.setClassForTemplateLoading(this.getClass(), Constants.EMAIL_TEMPLATES_PATH);
        String emailTemplatePath = (useShareCredentialsTemplate) ? Constants.SHARE_CLIENT_CREDENTIALS_FILE_NAME
                : Constants.CHANGE_CLIENT_PASSWORD_FILE_NAME;

        configuration.getTemplate(emailTemplatePath).process(model, stringWriter);

        LOGGER.info("get Email Content method ended");
        return stringWriter.getBuffer().toString();
    }

    public SuccessResponse shareClientCredentialsEmail(String clientId) {
        LOGGER.info("share Client Credentials method started");
        Optional<ClientOnboardingDetails> checkEmail = clientOnboardingRepository.findByClientId(clientId);
        Optional<ClientsCredentials> clientCredentails = clientCredentialsRepository.findByClientId(clientId);
        if (checkEmail.isPresent() && !checkEmail.get().isDeleted() && clientCredentails.isPresent()) {
            // Sharing credentials To email
            sendMail(checkEmail.get().getEmail(), clientCredentails.get(), true);
        } else {
            LOGGER.info("share Client Credentials : Resource Not Found Exception");
            throw new ResourceNotFoundException(clientId + " " + Constants.ACTIVE_CLIENT_NOT_FOUND);
        }
        SuccessResponse response = new SuccessResponse();
        response.setId(clientId);
        response.setMessage(Constants.CREDENTIALS_SHARED_SUCCESSFULLY);
        LOGGER.info("share Client Credentials method ended");
        return response;
    }

    // User Credentials
    public void sendMail(String toEmail, UserCredentials credentials, boolean useShareCredentialsTemplate) {
        LOGGER.info("send Mail user Credentials method ended");
        try {
            String emailContent = getEmailContent(credentials, useShareCredentialsTemplate);
            if (toEmail != null && !toEmail.isEmpty()) {
                deliverEmail(toEmail, emailContent, useShareCredentialsTemplate);
            } else {
                LOGGER.info("send Mail user Credentials : Resource Not Found Exception - No Personla EMail Found");
                throw new ResourceNotFoundException(Constants.NO_PERSONAL_EMAIL_FOUND + credentials.getUserId());
            }
        } catch (TemplateException | IOException e) {
            LOGGER.info("send Mail user Credentials : Bad Request Exception - Email Template Not Found");
            throw new BadRequestException(Constants.EMAIL_TEMPLATE_NOT_FOUND);
        } catch (MessagingException | MailException e) {
            LOGGER.info("send Mail user Credentials : Bad Request Exception - SMTP Configuration failed");
            throw new BadRequestException(Constants.CANNOT_SEND_EMAIL);
        }
        LOGGER.info("send Mail user Credentials method ended");
    }

    private String getEmailContent(UserCredentials userCredentials, boolean useShareCredentialsTemplate)
            throws TemplateException, IOException {
        LOGGER.info("get Email Content : started");
        StringWriter stringWriter = new StringWriter();
        Map<String, Object> model = new HashMap<>();
        model.put("credentials", userCredentials);
        configuration.setClassForTemplateLoading(this.getClass(), Constants.EMAIL_TEMPLATES_PATH);
        // deciding which template to use based on boolean flag
        String emailTemplatePath = (useShareCredentialsTemplate) ? Constants.SHARE_USER_CREDENTIALS_FILE_NAME
                : Constants.CHANGE_USER_PASSWORD_FILE_NAME;

        configuration.getTemplate(emailTemplatePath).process(model, stringWriter);
        LOGGER.info("get Email Content : ended");
        return stringWriter.getBuffer().toString();
    }

    public SuccessResponse shareUserCredentialsEmail(String userId) {
        LOGGER.info("share User Credentials Email : started");
        Optional<Users> checkEmail = userOnboardingRepository.findById(userId);
        Optional<UserCredentials> userCredentials = userCredentialsRepository.findByUserId(userId);
        if (checkEmail.isPresent() && !checkEmail.get().isDeleted() && userCredentials.isPresent()) {
            // Sharing credentials To email
            sendMail(checkEmail.get().getPersonnelEmail(), userCredentials.get(), true);
        } else {
            LOGGER.info("share User Credentials Email : Resource Not Found Exception");
            throw new ResourceNotFoundException(userId + " " + Constants.ACTIVE_USER_NOT_FOUND);
        }
        SuccessResponse response = new SuccessResponse();
        response.setId(userId);
        response.setMessage(Constants.CREDENTIALS_SHARED_SUCCESSFULLY);
        LOGGER.info("share User Credentials Email : ended");
        return response;
    }

    public ClientCredentialsEmailResponse getClientCredentialsEmailTemplate(String clientId) {
        LOGGER.info("get Client Credentials Email Template : started");
        Optional<ClientOnboardingDetails> checkEmail = clientOnboardingRepository.findByClientId(clientId);
        if (!checkEmail.isPresent() || checkEmail.get().isDeleted()) {
            LOGGER.info("get Client Credentials Email Template : Resource Not Found Exception");
            throw new ResourceNotFoundException(clientId + " " + Constants.ACTIVE_USER_NOT_FOUND);
        }
        Optional<ClientsCredentials> clientCredentails = clientCredentialsRepository.findByClientId(clientId);
        if (!clientCredentails.isPresent()) {
            LOGGER.info("get Client Credentials Email Template : Resource Not Found Exception");
            throw new ResourceNotFoundException(clientId + " " + Constants.ACTIVE_USER_NOT_FOUND);
        }
        ClientsCredentials clientsCredentials = clientCredentails.get();
        ClientCredentialsEmailResponse clientCredentialsEmailResponse = new ClientCredentialsEmailResponse();
        clientCredentialsEmailResponse.setSubject(EmailTemplates.SUBJECT_CLIENT_ONBOARDING_CREDENTIALS);
        clientCredentialsEmailResponse.setClientId(clientId);
        clientCredentialsEmailResponse.setSendTo(checkEmail.get().getEmail());
        clientCredentialsEmailResponse.setTemplate(getEmailTemplate(EmailTemplates.SHARE_CLIENT_CREDENTIALS_TEMPLATE,
                clientsCredentials.getClientId(), clientsCredentials.getClientId(), clientsCredentials.getPassword(),
                getDate(clientsCredentials.getCreatedAt())));
        LOGGER.info("get Client Credentials Email Template : ended");
        return clientCredentialsEmailResponse;
    }

    public SuccessResponse sendClientCredentialsEmail(ClientCredentialsEmailRequest reuest) {

        LOGGER.info("send Client Credentials Email : started");
        try {
            deliverEmail(reuest.getSendTo(), reuest.getTemplate(), reuest.getSubject(), reuest.getCc(),
                    reuest.getBcc());
        } catch (MessagingException | MailException e) {
            LOGGER.info("send Client Credentials Email : Bad Request Exception - SMTP Config failed");
            throw new BadRequestException(Constants.CANNOT_SEND_EMAIL);
        }
        SuccessResponse response = new SuccessResponse();
        response.setId(reuest.getClientId());
        response.setMessage(Constants.CREDENTIALS_SHARED_SUCCESSFULLY);
        LOGGER.info("send Client Credentials Email : ended");
        return response;
    }

    private String getEmailTemplate(String template, String clientId, String clientName, String password, String date) {
        LOGGER.info("get Email Template : started");
        template = template.replace("${credentials.clientId}", clientId);
        template = template.replace("${credentials.clientName}", clientName);
        template = template.replace("${credentials.password}", aesEncryption.decrypt(password));
        template = template.replace("${credentials.createdAt}", date);
        LOGGER.info("get Email Template : ended");
        return template;
    }

    private String getVendorEmailTemplate(String template, String vendorId, String vendorRefNo, String password,
            String date) {
        LOGGER.info("get Email Template : started");
        template = template.replace("${credentials.vendorId}", vendorId);
        template = template.replace("${credentials.vendorName}", vendorRefNo);
        template = template.replace("${credentials.password}", aesEncryption.decrypt(password));
        template = template.replace("${credentials.createdAt}", date);
        LOGGER.info("get Email Template : ended");
        return template;
    }

    public String getDate(Instant createdAt) {
        LOGGER.info("get Date : begin");
        try {
            OffsetDateTime odt = createdAt.atOffset(ZoneOffset.UTC);
            DateTimeFormatter format = DateTimeFormatter.ofPattern("dd MMM uuuu");
            LOGGER.info("get Date : end");
            return odt.format(format);
        } catch (Exception exception) {
            LOGGER.info("Error while converting date:: {}", exception.getMessage());
        }
        LOGGER.info("get Date : end with empty");
        return "";
    }

    public SuccessResponse sendUserCredentialsEmail(UserCredentialsEmailRequest reuest) {

        LOGGER.info("send User Credentials Email Request: begin");
        try {
            deliverEmail(reuest.getSendTo(), reuest.getTemplate(), reuest.getSubject(), reuest.getCc(),
                    reuest.getBcc());
        } catch (MessagingException | MailException e) {
            LOGGER.info("send User Credentials Email Request: Bad Request Exception - SMTP Config Failed");
            throw new BadRequestException(Constants.CANNOT_SEND_EMAIL);
        }
        SuccessResponse response = new SuccessResponse();
        response.setId(reuest.getUserId());
        response.setMessage(Constants.CREDENTIALS_SHARED_SUCCESSFULLY);
        LOGGER.info("send User Credentials Email Request: end");
        return response;
    }

    public String getUserEmailTemplate(String template, String userId, String userName, String password, String date) {
        LOGGER.info("get User Email Template : begin");
        template = template.replace("${credentials.userId}", userId);
        template = template.replace("${credentials.name}", userName);
        template = template.replace("${credentials.password}", aesEncryption.decrypt(password));
        template = template.replace("${credentials.createdAt}", date);
        LOGGER.info("get User Email Template : end");
        return template;
    }

    public UserCredentialsEmailResponse getUserCredentialsEmailTemplate(String userId) {
        LOGGER.info("get User Credentials Email Template : begin");
        LOGGER.info("get User Credentials Email Template : end");
        Optional<Users> checkEmail = userOnboardingRepository.findById(userId);
        if (!checkEmail.isPresent() || checkEmail.get().isDeleted()) {
            LOGGER.info("get User Credentials Email Template : Resource Not Found - Active user not found");
            throw new ResourceNotFoundException(userId + " " + Constants.ACTIVE_USER_NOT_FOUND);
        }
        if (checkEmail.get().getUserCredentials() == null) {
            LOGGER.info("get User Credentials Email Template : Resource Not found - User Credentials not found");
            throw new ResourceNotFoundException(Constants.USER_CREDENTIALS_NOT_FOUND);
        }
        UserCredentials usersCredentials = checkEmail.get().getUserCredentials();
        UserCredentialsEmailResponse userCredentialsEmailResponse = new UserCredentialsEmailResponse();
        userCredentialsEmailResponse.setSubject(EmailTemplates.SUBJECT_USER_ONBOARDING_CREDENTIALS);
        userCredentialsEmailResponse.setUserId(userId);
        userCredentialsEmailResponse.setSendTo(checkEmail.get().getPersonnelEmail());
        userCredentialsEmailResponse.setTemplate(getUserEmailTemplate(EmailTemplates.SHARE_USER_CREDENTIALS_TEMPLATE,
                checkEmail.get().getUserId(), checkEmail.get().getUserId(), usersCredentials.getPassword(),
                getDate(usersCredentials.getCreatedAt())));
        LOGGER.info("get User Credentials Email Template : end");
        return userCredentialsEmailResponse;
    }

    // vendor email
    public void sendMail(String toEmail, VendorCredential credentials, boolean useShareCredentialsTemplate) {

        try {
            LOGGER.info("send Mail Client Credentials method started");
            credentials.setPassword(aesEncryption.decrypt(credentials.getPassword()));
            String emailContent = getEmailContent(credentials, useShareCredentialsTemplate);
            deliverEmail(toEmail, emailContent, useShareCredentialsTemplate);
        } catch (TemplateException | IOException e) {
            LOGGER.info("send Mail : Bad Request Excepion - Email Template not found");
            throw new BadRequestException(Constants.EMAIL_TEMPLATE_NOT_FOUND);
        } catch (MessagingException | MailException e) {
            LOGGER.info("send Mail : Bad Request Exception - SMTP configuration Failed");
            throw new BadRequestException(Constants.CANNOT_SEND_EMAIL);
        }
        LOGGER.info("send Mail Client Credentials method ended");
    }

    // QualtityAssurance Credentials
    public void sendMail(String toEmail, QualityAssuranceCredentials credentials, boolean useShareCredentialsTemplate) {

        try {
            LOGGER.info("send Mail Quality Assurance Credentials method started");
            credentials.setPassword(aesEncryption.decrypt(credentials.getPassword()));
            String emailContent = getEmailContent(credentials, useShareCredentialsTemplate);
            deliverEmail(toEmail, emailContent, useShareCredentialsTemplate);
        } catch (TemplateException | IOException e) {
            LOGGER.info("send Mail : Bad Request Excepion - Email Template not found");
            throw new BadRequestException(Constants.EMAIL_TEMPLATE_NOT_FOUND);
        } catch (MessagingException | MailException e) {
            LOGGER.info("send Mail : Bad Request Exception - SMTP configuration Failed");
            throw new BadRequestException(Constants.CANNOT_SEND_EMAIL);
        }
        LOGGER.info("send Mail Client Credentials method ended");
    }

    private String getEmailContent(VendorCredential vendorCredentials, boolean useShareCredentialsTemplate)
            throws TemplateException, IOException {
        LOGGER.info("get Email Content method started");
        StringWriter stringWriter = new StringWriter();
        Map<String, Object> model = new HashMap<>();
        model.put("credentials", vendorCredentials);
        configuration.setClassForTemplateLoading(this.getClass(), Constants.EMAIL_TEMPLATES_PATH);
        String emailTemplatePath = (useShareCredentialsTemplate) ? Constants.SHARE_VENDOR_CREDENTIALS_FILE_NAME
                : Constants.CHANGE_VENDOR_PASSWORD_FILE_NAME;

        configuration.getTemplate(emailTemplatePath).process(model, stringWriter);

        LOGGER.info("get Email Content method ended");
        return stringWriter.getBuffer().toString();
    }

    private String getEmailContent(QualityAssuranceCredentials credentials,
            boolean useShareCredentialsTemplate)
            throws TemplateException, IOException {
        LOGGER.info("get Email Content method started");
        StringWriter stringWriter = new StringWriter();
        Map<String, Object> model = new HashMap<>();
        model.put("credentials", credentials);
        configuration.setClassForTemplateLoading(this.getClass(), Constants.EMAIL_TEMPLATES_PATH);
        String emailTemplatePath = (useShareCredentialsTemplate) ? Constants.SHARE_CLIENT_CREDENTIALS_FILE_NAME
                : Constants.CHANGE_CLIENT_PASSWORD_FILE_NAME;

        configuration.getTemplate(emailTemplatePath).process(model, stringWriter);

        LOGGER.info("get Email Content method ended");
        return stringWriter.getBuffer().toString();
    }


    public SuccessResponse shareVendorCredentialsEmail(VendorCredentialsEmailRequest reuest ) {
        LOGGER.info("send Vendor Credentials Email Request: begin");
        try {

            deliverEmail(reuest.getSendTo(), reuest.getTemplate(), reuest.getSubject(), reuest.getCc(),
                    reuest.getBcc());
        } catch (MessagingException | MailException e) {
            LOGGER.info("send Vendor Credentials Email Request: Bad Request Exception - SMTP Config Failed");
            throw new BadRequestException(Constants.CANNOT_SEND_EMAIL);
        }
        SuccessResponse response = new SuccessResponse();
        response.setId(reuest.getvendorId());
        response.setMessage(Constants.CREDENTIALS_SHARED_SUCCESSFULLY);
        LOGGER.info("send Vendor Credentials Email Request: end");
        return response;
    }

    //vendor respnse email template
    public VendorCredentialEmailResponse getVendorCredentialsEmailTemplate(String vendorId) {
        LOGGER.info("get Vendor Credentials Email Template : started");
        Optional<Vendor> vendorO = vendorRepository.findById(vendorId);
        if (!vendorO.isPresent()) {
            LOGGER.info("get Vendor Credentials Email Template : Resource Not Found Exception");
            throw new ResourceNotFoundException(vendorId + " " + Constants.ACTIVE_USER_NOT_FOUND);
        }
        Optional<VendorCredential> vendorCredentails = vendorCredentialRepository.findByVendorId(vendorId);
        if (!vendorCredentails.isPresent()) {
            LOGGER.info("get vendor Credentials Email Template : Resource Not Found Exception");
            throw new ResourceNotFoundException(vendorId + " " + Constants.ACTIVE_USER_NOT_FOUND);
        }

        Vendor vendor = vendorO.get();
        VendorCredential vendorCredential = vendorCredentails.get();
        VendorCredentialEmailResponse vendorCredentialsEmailResponse = new VendorCredentialEmailResponse();
        vendorCredentialsEmailResponse.setSubject(EmailTemplates.SUBJECT_VENDOR_ONBOARDING_CREDENTIALS);
        vendorCredentialsEmailResponse.setVendorId(vendorId);
        vendorCredentialsEmailResponse.setSendTo(vendor.getSpocDetail().getEmail());
        vendorCredentialsEmailResponse
                .setTemplate(getVendorEmailTemplate(EmailTemplates.SHARE_VENDOR_CREDENTIALS_TEMPLATE,
                        vendor.getId(), vendor.getVendorRefNo(), vendorCredential.getPassword(),
                        getDate(vendorCredential.getCreatedAt())));
        LOGGER.info("get Vendor Credentials Email Template : ended");
        return vendorCredentialsEmailResponse;
    }

    public SuccessResponse shareQualityAssuranceCredentialsEmail(String qualityAssuranceId,
            TokenPayLoadDetails tokenPayLoadDetails) {
        LOGGER.info("share Quality Assurance Credentials method started");
        Optional<QualityAssurance> checkEmail = qualityAssuranceRepository.findById(qualityAssuranceId);
        Optional<QualityAssuranceCredentials> Credentails = qualityAssuranceCredentialsRepository
                .findByQualityAssuranceId(qualityAssuranceId);
        if (checkEmail.isPresent() && Credentails.isPresent()) {
            // Sharing credentials To email
            sendMail(checkEmail.get().getEmail(), Credentails.get(), true);
        } else {
            LOGGER.info("share Quality Assurance Credentials : Resource Not Found Exception");
            throw new ResourceNotFoundException(qualityAssuranceId + " " + Constants.ACTIVE_CLIENT_NOT_FOUND);
        }
        SuccessResponse response = new SuccessResponse();
        response.setId(qualityAssuranceId);
        response.setMessage(Constants.CREDENTIALS_SHARED_SUCCESSFULLY);
        LOGGER.info("share Quality Assurance Credentials method ended");
        return response;
    }

    public QualityAssuranceCredentialsEmailResponse getQaCredentialsEmailTemplate(String qualityAssuranceId,
            TokenPayLoadDetails tokenPayLoadDetails) {
        LOGGER.info("get Quality Assurance Credentials Email Template : started");
        Optional<QualityAssurance> qaO = qualityAssuranceRepository.findById(qualityAssuranceId);
        if (!qaO.isPresent()) {
            LOGGER.info("get Quality Assurance Credentials Email Template : Resource Not Found Exception");
            throw new ResourceNotFoundException(qualityAssuranceId + " " + Constants.ACTIVE_USER_NOT_FOUND);
        }
        Optional<QualityAssuranceCredentials> credentails = qualityAssuranceCredentialsRepository
                .findByQualityAssuranceId(qualityAssuranceId);
        if (!credentails.isPresent()) {
            LOGGER.info("get Quality Assurance Credentials Email Template : Resource Not Found Exception");
            throw new ResourceNotFoundException(qualityAssuranceId + " " + Constants.ACTIVE_USER_NOT_FOUND);
        }
        QualityAssurance qa = qaO.get();
        QualityAssuranceCredentials credentials = credentails.get();
        QualityAssuranceCredentialsEmailResponse qualityAssuranceCredentialsEmailResponse = new QualityAssuranceCredentialsEmailResponse();
        qualityAssuranceCredentialsEmailResponse.setSubject(EmailTemplates.SUBJECT_QUALITY_ASSURANCE_CREDENTIALS);
        qualityAssuranceCredentialsEmailResponse.setQualityAssuranceId(qualityAssuranceId);
        qualityAssuranceCredentialsEmailResponse.setSendTo(qa.getEmail());
        qualityAssuranceCredentialsEmailResponse.setTemplate(getQualityAssuranceEmailTemplate(
                EmailTemplates.SHARE_QUALITY_ASSURANCE_CREDENTIALS_TEMPLATE,
                credentials.getQualityAssuranceId(), credentials.getQualityAssuranceName(), credentials.getPassword(),
                getDate(credentials.getCreatedAt())));
        LOGGER.info("get Quality Assurance Credentials Email Template : ended");
        return qualityAssuranceCredentialsEmailResponse;
    }

    public SuccessResponse sendQualityAssuranceCredentialsEmail(QualityAssuranceCredentialsEmailRequest reuest,
            TokenPayLoadDetails tokenPayLoadDetails) {

        LOGGER.info("send Quality Assurance Credentials Email : started");
        try {
            deliverEmail(reuest.getSendTo(), reuest.getTemplate(), reuest.getSubject(), reuest.getCc(),
                    reuest.getBcc());
        } catch (MessagingException | MailException e) {
            LOGGER.info("send Quality Assurance Credentials Email : Bad Request Exception - SMTP Config failed");
            throw new BadRequestException(Constants.CANNOT_SEND_EMAIL);
        }
        SuccessResponse response = new SuccessResponse();
        response.setId(reuest.getQualityAssuranceId());
        response.setMessage(Constants.CREDENTIALS_SHARED_SUCCESSFULLY);
        LOGGER.info("send Quality Assurance Credentials Email : ended");
        return response;
    }

    private String getQualityAssuranceEmailTemplate(String template, String qualityAssuranceId,
            String qualityAssuranceName, String password, String date) {
        LOGGER.info("get Email Template : started");
        template = template.replace("${credentials.qualityAssuranceId}", qualityAssuranceId);
        template = template.replace("${credentials.qualityAssuranceName}", qualityAssuranceName);
        template = template.replace("${credentials.password}", aesEncryption.decrypt(password));
        template = template.replace("${credentials.createdAt}", date);
        LOGGER.info("get Email Template : ended");
        return template;
    }
}
