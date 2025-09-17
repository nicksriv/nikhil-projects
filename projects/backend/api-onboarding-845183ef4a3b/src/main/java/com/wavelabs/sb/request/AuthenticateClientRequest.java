package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;

public class AuthenticateClientRequest {

	@NotBlank(message = "UserId is mandatory")
	private String clientId;
	@NotBlank(message = "Password is mandatory")
	private String password;

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
