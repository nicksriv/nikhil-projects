package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class AdminDetails {

	@NotBlank(message = "Firstname is mandatory")
	private String firstName;
	private String middleName;
	@NotBlank(message = "Lastname is mandatory")
	private String lastName;
	@NotBlank(message="Mobile number is mandatory")
	@Pattern(message = "Provide valid mobile number", regexp="^[1-9][0-9]{9}$")
	private String mobile;
	@NotBlank(message = "Email should not be empty")
	@Pattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$", message = "Invalid Email id")
	private String email;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
