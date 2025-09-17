package com.wavelabs.sb.request;

import com.wavelabs.sb.model.TokenPayLoadDetails;

public class UpdatePasswordRequest {

    private ChangePasswordRequest changePasswordRequest;

    private TokenPayLoadDetails payLoadDetails;

    public ChangePasswordRequest getChangePasswordRequest() {
	return changePasswordRequest;
    }

    public void setChangePasswordRequest(ChangePasswordRequest changePasswordRequest) {
	this.changePasswordRequest = changePasswordRequest;
    }

    public TokenPayLoadDetails getPayLoadDetails() {
	return payLoadDetails;
    }

    public void setPayLoadDetails(TokenPayLoadDetails payLoadDetails) {
	this.payLoadDetails = payLoadDetails;
    }

}
