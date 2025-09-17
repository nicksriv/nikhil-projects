package com.wavelabs.sb.response;

import java.time.Instant;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class VendorCredentialResponse {

    private String vendorId;
    private String userName;
    private Instant createdAt; 
    private String password;
    public String getVendorId() {
        return vendorId;
    }
    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public Instant getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public VendorCredentialResponse(String vendorId, String userName, Instant createdAt, String password) {
        this.vendorId = vendorId;
        this.userName = userName;
        this.createdAt = createdAt;
        this.password = password;
    }
    @Override
    public String toString() {
        return "VendorCredentialResponse [vendorId=" + vendorId + ", userName=" + userName + ", createdAt=" + createdAt
                + ", password=" + password + "]";
    }


    
}
