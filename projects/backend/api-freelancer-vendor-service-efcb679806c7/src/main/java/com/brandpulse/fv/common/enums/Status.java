package com.brandpulse.fv.common.enums;

public enum Status {
    ACTIVE("ACTIVE"), INACTIVE("INACTIVE"), DRAFT("DRAFT");

    private final String statusField;

    private Status(String statusField) {
        this.statusField = statusField;
    }

    public String getStatusField() {
        return statusField;
    }
}
