package com.wavelabs.sb.model;

import com.wavelabs.sb.request.SiteOnboardingRequest;

public class CreateSiteModel {

    private SiteOnboardingRequest siteOnboardingRequest;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public SiteOnboardingRequest getSiteOnboardingRequest() {
	return siteOnboardingRequest;
    }

    public void setSiteOnboardingRequest(SiteOnboardingRequest siteOnboardingRequest) {
	this.siteOnboardingRequest = siteOnboardingRequest;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
