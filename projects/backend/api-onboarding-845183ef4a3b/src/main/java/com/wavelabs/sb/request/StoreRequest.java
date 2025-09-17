package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;

public class StoreRequest {

	@NotBlank(message = "StoreId is mandatory")
	private String storeId;

	@NotBlank(message = "AddressId is mandatory")
	private String address;

	@NotBlank(message = "ManagerEmployeeId is mandatory")
	private String managerEmployeeId;

	@NotBlank(message = "ManagerName id is mandatory")
	private String managerName;

	@NotBlank(message = "PhoneNumber id is mandatory")
	private String phoneNumber;

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

	public String getManagerEmployeeId() {
		return managerEmployeeId;
	}

	public void setManagerEmployeeId(String managerEmployeeId) {
		this.managerEmployeeId = managerEmployeeId;
	}

	public String getManagerName() {
		return managerName;
	}

	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

}
