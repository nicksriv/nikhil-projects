package com.wavelabs.sb.model;

import com.wavelabs.sb.request.SiteOnboardingUpdateRequest;

public class UpdateSiteModel {

    private SiteOnboardingUpdateRequest siteOnboardingUpdateRequest;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public SiteOnboardingUpdateRequest getSiteOnboardingUpdateRequest() {
	return siteOnboardingUpdateRequest;
    }

    public void setSiteOnboardingUpdateRequest(SiteOnboardingUpdateRequest siteOnboardingUpdateRequest) {
	this.siteOnboardingUpdateRequest = siteOnboardingUpdateRequest;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
