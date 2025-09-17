package com.wavelabs.sb.model;

import com.wavelabs.sb.request.RoleOnboardingRequest;

public class CreateRoleModel {

    private RoleOnboardingRequest roleOnboardingRequest;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public RoleOnboardingRequest getRoleOnboardingRequest() {
	return roleOnboardingRequest;
    }

    public void setRoleOnboardingRequest(RoleOnboardingRequest roleOnboardingRequest) {
	this.roleOnboardingRequest = roleOnboardingRequest;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
