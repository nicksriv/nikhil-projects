package com.wavelabs.sb.response;

public class ClientCredentialsEmailResponse {

    private String clientId;
    private String sendTo;
    private String subject;
    private String template;

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

}
