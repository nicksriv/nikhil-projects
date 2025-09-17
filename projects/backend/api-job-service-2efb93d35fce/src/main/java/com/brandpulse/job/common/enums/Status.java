package com.brandpulse.job.common.enums;

public enum Status {
    ACTIVE("ACTIVE"), INACTIVE("INACTIVE"), DRAFT("DRAFT");

    private String statusField;

    Status(String statusField) {
        this.statusField = statusField;
    }

    public String getstatusField() {
        return statusField;
    }
}
