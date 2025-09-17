package com.wavelabs.sb.configurations;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class EmailConfig {

    @Value("${spring.mail.username}")
    private String username;

    @Value("${spring.mail.password}")
    private String password;

    @Value("${spring.mail.host}")
    private String host;

    @Value("${spring.mail.port}")
    private int port;

    @Value("${spring.mail.protocol}")
    private String protocol;

    @Value("${spring.mail.properties.mail.smtp.auth}")
    private String smtpAuth;

    @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
    private String enable;

    @Value("${spring.mail.properties.mail.smtp.starttls.required}")
    private String required;

    @Bean
    public JavaMailSender getJavaMailSender() {
	JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
	mailSender.setHost(host);
	mailSender.setPort(port);
	mailSender.setUsername(username);
	mailSender.setPassword(password);
	Properties props = mailSender.getJavaMailProperties();
	props.put("mail.transport.protocol", protocol);
	props.put("mail.smtp.auth", smtpAuth);
	props.put("mail.smtp.starttls.enable", enable);
	props.put("mail.smtp.starttls.required", required);
	props.put("mail.debug", "false");
	props.put("mail.smtp.timeout", 5000);
	props.put("mail.smtp.writetimeout", 5000);
	props.put("mail.smtp.connectiontimeout", 5000);

	return mailSender;
    }

}
