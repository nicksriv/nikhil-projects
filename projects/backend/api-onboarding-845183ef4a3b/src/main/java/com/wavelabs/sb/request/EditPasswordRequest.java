package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;

public class EditPasswordRequest {
    @NotBlank(message = "New Password cannot be empty")
    private String newPassword;

    public String getNewPassword() {
	return newPassword;
    }

    public void setNewPassword(String newPassword) {
	this.newPassword = newPassword;
    }


}
