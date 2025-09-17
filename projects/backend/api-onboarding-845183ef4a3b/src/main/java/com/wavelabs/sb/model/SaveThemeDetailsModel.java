package com.wavelabs.sb.model;

import com.wavelabs.sb.request.ThemeRequest;

public class SaveThemeDetailsModel {

    private ThemeRequest themeRequest;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public ThemeRequest getThemeRequest() {
	return themeRequest;
    }

    public void setThemeRequest(ThemeRequest themeRequest) {
	this.themeRequest = themeRequest;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
