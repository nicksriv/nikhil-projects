package com.wavelabs.sb.request;

import javax.validation.constraints.NotBlank;

public class ChangePasswordRequest {

    @NotBlank(message = "Current Password cannot be empty")
    private String currentPassword;

    @NotBlank(message = "New Password cannot be empty")
    private String newPassword;

    public String getNewPassword() {
	return newPassword;
    }

    public void setNewPassword(String newPassword) {
	this.newPassword = newPassword;
    }

    public String getCurrentPassword() {
	return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
	this.currentPassword = currentPassword;
    }

}
