package com.wavelabs.sb.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import javax.mail.internet.MimeMessage;

import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.mail.javamail.JavaMailSender;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.ClientDetailsDataBuilder;
import com.wavelabs.sb.model.EmailDataBuilder;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.repositories.ClientCredentialsRepository;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.UserCredentialsRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.response.ClientCredentialsEmailResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.UserCredentialsEmailResponse;

import freemarker.template.Configuration;
import freemarker.template.Template;

@RunWith(MockitoJUnitRunner.class)
public class EmailServiceTest {

    @InjectMocks
    EmailService emailService;

    @Mock
    private UserOnboardingRepository userOnboardingRepository;
    @Mock
    private ClientCredentialsRepository clientCredentialsRepository;

    @Mock
    private UserCredentialsRepository userCredentialsRepository;

    @Mock
    JavaMailSender javaMailSender;

    @Mock
    private MimeMessage message;

    @Mock
    AesEncryption aesEncryption;

    @Mock
    Configuration configuration;
    @Mock
    Template template;

    @Before
    public void setUp() {
	MockitoAnnotations.initMocks(this);
    }

    @Mock
    ClientOnboardingRepository clientOnboardingRepository;

    @Test
    @DisplayName("test sendUserCredentialsEmail")
    public void sendUserCredentialsEmail() {
	when(javaMailSender.createMimeMessage()).thenReturn(message);
	SuccessResponse response = emailService
		.sendUserCredentialsEmail(EmailDataBuilder.getUserCredentialEmailRequest());
	assertEquals(Constants.CREDENTIALS_SHARED_SUCCESSFULLY, response.getMessage());
    }

    @Test
    @DisplayName("test sendMail")
    public void sendMailTest() {
	assertThrows(NullPointerException.class, () -> {
	    emailService.sendMail("test@gmail.com", ClientDetailsDataBuilder.getClientsCredentials(), false);
	});

    }

    @Test
    @DisplayName("test sendUserMail")
    public void sendUserMailTest() {
	assertThrows(NullPointerException.class, () -> {
	    emailService.sendMail("test@gmail.com", UserDataBuilder.getUserCredential(), false);
	});

    }

    @Test
    @DisplayName("test shareUserCredentialsEmail")
    public void shareUserCredentialsEmail() {
	when(userOnboardingRepository.findById(Mockito.any())).thenReturn(EmailDataBuilder.getUsers());
	when(userCredentialsRepository.findByUserId(Mockito.any()))
		.thenReturn(Optional.of(UserDataBuilder.getUserCredential()));
	assertThrows(NullPointerException.class, () -> {
	    emailService.shareUserCredentialsEmail("id");
	});

    }

    @Test
    @DisplayName("test sendClientCredentialsEmail")
    public void sendClientCredentialsEmail() {
	when(javaMailSender.createMimeMessage()).thenReturn(message);
	SuccessResponse response = emailService
		.sendClientCredentialsEmail(EmailDataBuilder.getClientCredentialsEmailRequest());
	assertEquals(Constants.CREDENTIALS_SHARED_SUCCESSFULLY, response.getMessage());
    }

    @Test(expected = NullPointerException.class)
    @DisplayName("test getUserCredentialsEmailTemplate")
    public void getUserCredentialsEmailTemplateThrowsException() {
	when(userOnboardingRepository.findById(Mockito.any())).thenReturn(EmailDataBuilder.getUsers());
	UserCredentialsEmailResponse response = emailService.getUserCredentialsEmailTemplate("test-userId");
    }

    @Test
    @DisplayName("test getUserCredentialsEmailTemplate")
    public void getUserCredentialsEmailTemplate() {
	when(aesEncryption.decrypt(Mockito.any())).thenReturn("dfsdfsd");
	when(userOnboardingRepository.findById(Mockito.any())).thenReturn(EmailDataBuilder.getUsers());
	UserCredentialsEmailResponse response = emailService.getUserCredentialsEmailTemplate("test-userId");
	assertEquals("test-userId", response.getUserId());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test getUserCredentialsEmailTemplate")
    public void getUserCredentialsEmailTemplateResourceNotFoundException() {
	when(userOnboardingRepository.findById(Mockito.any())).thenReturn(EmailDataBuilder.getUserCredentialsNull());
	UserCredentialsEmailResponse response = emailService.getUserCredentialsEmailTemplate("test-userId");
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test getUserCredentialsEmailTemplate")
    public void getUserCredentialsEmailTemplateIsDeleted() {
	when(userOnboardingRepository.findById(Mockito.any())).thenReturn(EmailDataBuilder.getUserIsDeleted());
	UserCredentialsEmailResponse response = emailService.getUserCredentialsEmailTemplate("test-userId");
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test getClientCredentialsEmailTemplate")
    public void getClientCredentialsEmailTemplateResourceNotFoundException() {
	when(clientOnboardingRepository.findByClientId(Mockito.any()))
		.thenReturn(Optional.of(EmailDataBuilder.getClientOnBoardDetailsForException()));
	ClientCredentialsEmailResponse response = emailService.getClientCredentialsEmailTemplate("test-clientId");
    }

    @Test
    @DisplayName("test getClientCredentialsEmailTemplate")
    public void getClientCredentialsEmailTemplate() {
	when(aesEncryption.decrypt(Mockito.any())).thenReturn("dfsdfsd");
	when(clientOnboardingRepository.findByClientId(Mockito.any()))
		.thenReturn(Optional.of(EmailDataBuilder.getClientOnBoardDetails()));
	when(clientCredentialsRepository.findByClientId(Mockito.any()))
		.thenReturn(Optional.of(EmailDataBuilder.getClientCredentials()));
	ClientCredentialsEmailResponse response = emailService.getClientCredentialsEmailTemplate("test-clientId");
	assertEquals("test-clientId", response.getClientId());
    }

}
