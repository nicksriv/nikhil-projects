package com.wavelabs.sb.documents;

import java.time.Instant;

import com.wavelabs.sb.enums.Status;

public class BaseDocument {

    private Instant createdAt;
    private Instant modifiedAt;
    private Status status;
    private boolean deleted;

    public boolean isDeleted() {
	return deleted;
    }

    public void setDeleted(boolean deleted) {
	this.deleted = deleted;
    }

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
