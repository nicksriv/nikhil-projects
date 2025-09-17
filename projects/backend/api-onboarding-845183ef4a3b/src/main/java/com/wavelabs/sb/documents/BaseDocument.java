package com.wavelabs.sb.documents;

import java.time.Instant;

import com.wavelabs.sb.enums.Status;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

public class BaseDocument {

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant modifiedAt;
    
    private Status status;  

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

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

}
