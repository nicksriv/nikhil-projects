package com.wavelabs.sb.model;

import com.wavelabs.sb.request.LocationRequest;

public class UserLocationsUpdateModel {

    private LocationRequest locationRequest;
    private String userId;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocationRequest getLocationRequest() {
	return locationRequest;
    }

    public void setLocationRequest(LocationRequest locationRequest) {
	this.locationRequest = locationRequest;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
