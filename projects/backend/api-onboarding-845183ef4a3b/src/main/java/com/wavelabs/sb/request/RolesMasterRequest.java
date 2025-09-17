package com.wavelabs.sb.request;

import javax.validation.constraints.NotNull;

public class RolesMasterRequest {

	@NotNull(message = "role is required")
	private String roles;

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

}
