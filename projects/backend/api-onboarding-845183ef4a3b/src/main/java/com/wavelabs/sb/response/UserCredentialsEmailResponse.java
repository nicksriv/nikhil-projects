package com.wavelabs.sb.response;

public class UserCredentialsEmailResponse {

    private String userId;
    private String sendTo;
    private String subject;
    private String template;
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
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
