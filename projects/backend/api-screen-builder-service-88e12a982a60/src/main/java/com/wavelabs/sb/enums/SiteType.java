package com.wavelabs.sb.enums;

public enum SiteType {
    RETAILERS("Retailers"), WHOLESALE("Wholesale"), WAREHOUSE("Warehouse");

    private String type;

    SiteType(String type) {
	this.type = type;
    }

    public String getType() {
	return type;
    }

    public void setType(String type) {
	this.type = type;
    }

}
