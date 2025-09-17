package com.wavelabs.sb.model;

import com.wavelabs.sb.request.UserProfileUpdateRequest;

public class UserProfileUpdateModel {

    private UserProfileUpdateRequest userProfileUpdateRequest;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public UserProfileUpdateRequest getUserProfileUpdateRequest() {
	return userProfileUpdateRequest;
    }

    public void setUserProfileUpdateRequest(UserProfileUpdateRequest userProfileUpdateRequest) {
	this.userProfileUpdateRequest = userProfileUpdateRequest;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
