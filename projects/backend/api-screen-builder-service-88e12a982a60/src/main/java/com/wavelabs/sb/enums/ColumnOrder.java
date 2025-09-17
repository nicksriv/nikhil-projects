package com.wavelabs.sb.enums;

public enum ColumnOrder {
   MODULE_NAME("name"), STATUS("status");

    private String value;

    private ColumnOrder(String value) {
	this.value = value;
    }

    public String getValue() {
	return value;
    }

}
