package com.wavelabs.sb.response;


public class VendorCredentialEmailResponse {
    private String vendorId;
    private String sendTo;
    private String subject;
    private String template;
    
    public String getVendorId() {
        return vendorId;
    }
    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
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
    @Override
    public String toString() {
        return "VendorCredentialEmailResponse [vendorId=" + vendorId + ", sendTo=" + sendTo + ", subject=" + subject
                + ", template=" + template + "]";
    }

    
    
}
