package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wavelabs.sb.enums.Status;

public class UpdateRoleRequest {

    @JsonIgnore
    private String Id;
    @NotBlank(message = "Role is mandatory")
    @Pattern(message = "Name should contain alphabets only ", regexp = "^[a-zA-Z\\s]*$")
    private String name;
    @Pattern(message = "Description should contain alphabets only ", regexp = "^[a-zA-Z\\s]*$")
    private String description;

    private Status status;

    public String getId() {
	return Id;
    }

    public void setId(String id) {
	Id = id;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getDescription() {
	return description;
    }

    public void setDescription(String description) {
	this.description = description;
    }

    public Status getStatus() {
	return status;
    }

    public void setStatus(Status status) {
	this.status = status;
    }

}
