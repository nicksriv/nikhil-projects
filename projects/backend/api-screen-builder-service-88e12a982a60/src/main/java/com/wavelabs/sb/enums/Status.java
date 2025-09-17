package com.wavelabs.sb.enums;

public enum Status {
    ACTIVE("ACTIVE"), INACTIVE("INACTIVE"), DRAFT("DRAFT");

    private String status;

    Status(String status) {
	this.status = status;
    }

    public String getStatus() {
	return status;
    }

    public void setStatus(String status) {
	this.status = status;
    }

}
