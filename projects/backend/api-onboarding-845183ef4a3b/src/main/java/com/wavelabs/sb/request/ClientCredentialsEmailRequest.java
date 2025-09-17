package com.wavelabs.sb.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class ClientCredentialsEmailRequest {

    private String clientId;
    @NotBlank(message = "Subject is mandatory")
    private String subject;
    @Pattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", message = "Invalid Email id")
    @Email
    private String sendTo;
    @NotBlank(message = "Email Template is mandatory")
    private String template;

    private String[] cc;
    private String[] bcc;

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getSendTo() {
	return sendTo;
    }

    public void setSendTo(String sendTo) {
	this.sendTo = sendTo;
    }

    public String getSubject() {
	return subject;
    }

    public void setSubject(String subject) {
	this.subject = subject;
    }

    public String getTemplate() {
	return template;
    }

    public void setTemplate(String template) {
	this.template = template;
    }

    public String[] getCc() {
	return cc;
    }

    public void setCc(String[] cc) {
	this.cc = cc;
    }

    public String[] getBcc() {
	return bcc;
    }

    public void setBcc(String[] bcc) {
	this.bcc = bcc;
    }

}
