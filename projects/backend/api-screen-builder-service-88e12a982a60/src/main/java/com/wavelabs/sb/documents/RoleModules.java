package com.wavelabs.sb.documents;

import com.wavelabs.sb.enums.Status;

public class RoleModules {

    private String id;
    private String name;
    private Status status;
    private boolean deleted;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status2) {
	this.status = status2;
    }

    public boolean isDeleted() {
	return deleted;
    }

    public void setDeleted(boolean deleted) {
	this.deleted = deleted;
    }

}
