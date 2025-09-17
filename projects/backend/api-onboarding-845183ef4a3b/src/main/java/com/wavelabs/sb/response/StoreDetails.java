package com.wavelabs.sb.response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class StoreDetails {

	private String storeId;
	private String address;
	private String storeManagerId;
	private String storeManagerName;
	private String storeManagerMobile;

	public String getStoreId() {
		return storeId;
	}

	public void setStoreId(String storeId) {
		this.storeId = storeId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getStoreManagerId() {
		return storeManagerId;
	}

	public void setStoreManagerId(String storeManagerId) {
		this.storeManagerId = storeManagerId;
	}

	public String getStoreManagerName() {
		return storeManagerName;
	}

	public void setStoreManagerName(String storeManagerName) {
		this.storeManagerName = storeManagerName;
	}

	public String getStoreManagerMobile() {
		return storeManagerMobile;
	}

	public void setStoreManagerMobile(String storeManagerMobile) {
		this.storeManagerMobile = storeManagerMobile;
	}

}
