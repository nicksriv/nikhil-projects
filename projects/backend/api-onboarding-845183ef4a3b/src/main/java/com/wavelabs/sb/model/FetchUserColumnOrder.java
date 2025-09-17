package com.wavelabs.sb.model;

public enum FetchUserColumnOrder {

	REPORTING_MANAGER("reportingManagerName"), EMPLOYEE_NAME("firstname"), EMPLOYEE_ID("userId"), ROLE("role"), CITY("city"),
	STATUS("status"), RESOURCE_COUNT("");

	private String value;

	private FetchUserColumnOrder(String value) {
		this.value = value;
	    }

	public String getValue() {
		return value;
	}

}
