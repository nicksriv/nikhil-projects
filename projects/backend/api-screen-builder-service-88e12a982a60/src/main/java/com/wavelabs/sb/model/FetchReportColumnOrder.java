package com.wavelabs.sb.model;

public enum FetchReportColumnOrder {
    
      REPORT_NAME("name"),STATUS("status");

	private String value;

	private FetchReportColumnOrder(String value) {
		this.value = value;
	    }

	public String getValue() {
		return value;
	}

}
