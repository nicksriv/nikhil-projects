package com.wavelabs.sb.request;

import javax.validation.constraints.Pattern;

public class ReferralRequest {

	private String id;
	@Pattern(message = "Provide valid name", regexp = "^[a-zA-Z]*$")
	private String name;
	
	private String role;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	
	
}
