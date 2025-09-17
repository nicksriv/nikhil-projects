package com.wavelabs.sb.enums;

public enum FetchAllColumnOrder {

    ROLE_NAME("role");

    private String value;

    private FetchAllColumnOrder(String value) {
	this.value = value;
    }

    public String getValue() {
	return value;
    }

}
