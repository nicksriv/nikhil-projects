package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;

public class AuthenticateUserRequest {

	@NotBlank(message = "UserId is mandatory")
	private String userId;
	@NotBlank(message = "Password is mandatory")
	private String password;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
