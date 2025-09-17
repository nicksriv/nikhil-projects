package com.wavelabs.sb.documents;

import java.time.Instant;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "admin-credentials")
public class AdminCredentials {

    private String id;
    private String adminId;
    private String password;
    private Instant createdAt;
    private Instant modifiedAt;

    public Instant getCreatedAt() {
	return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
	this.createdAt = createdAt;
    }

    public Instant getModifiedAt() {
	return modifiedAt;
    }

    public void setModifiedAt(Instant modifiedAt) {
	this.modifiedAt = modifiedAt;
    }

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getAdminId() {
	return adminId;
    }

    public void setAdminId(String adminId) {
	this.adminId = adminId;
    }

    public String getPassword() {
	return password;
    }

    public void setPassword(String password) {
	this.password = password;
    }

}
