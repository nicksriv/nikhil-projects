package com.wavelabs.sb.model;

public enum ColumnOrder {
    CLIENT_ID("clientId"), STORE_NAME("shopname"), HEAD_OFFICE_NAME("headOfficeName"), DATE_OF_JOINING("createdAt"),
    CLIENT_NAME("clientName"), STATE("state"), CITY("city"), AREA("area"), STATUS("status"), RESOURCE_COUNT("");

    private String value;

    private ColumnOrder(String value) {
	this.value = value;
    }

    public String getValue() {
	return value;
    }

}
