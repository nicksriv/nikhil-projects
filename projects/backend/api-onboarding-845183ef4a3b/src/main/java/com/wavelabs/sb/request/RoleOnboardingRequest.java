package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.wavelabs.sb.utils.OptionalPattern;

public class RoleOnboardingRequest {

    @NotBlank(message = "Client id is mandatory")
    private String clientId;
    @NotBlank(message = "Role is mandatory")
    @Pattern(message = "Name should contain alphabets only ", regexp = "^[a-zA-Z\\s]*$")
    private String Name;
    @Pattern(message = "Description should contain alphabets only ", regexp = "^[a-zA-Z\\s]*$")
    private String description;
    @NotBlank(message = "Status is mandatory")
    @OptionalPattern(message = "Provide status ACTIVE|INACTIVE", regexp = "ACTIVE|INACTIVE")
    private String status;

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public String getName() {
	return Name;
    }

    public void setName(String name) {
	Name = name;
    }

    public String getDescription() {
	return description;
    }

    public void setDescription(String description) {
	this.description = description;
    }

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

  

}
