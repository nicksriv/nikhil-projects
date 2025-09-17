package com.wavelabs.sb.model;

public enum SitesColumnOrder {
    SITE_ID("siteId"), SITE_NAME("name"), SITE_TYPE("type"), STATE("state"), CITY("city");

    private String value;

    private SitesColumnOrder(String value) {
	this.value = value;
    }

    public String getValue() {
	return value;
    }

}
