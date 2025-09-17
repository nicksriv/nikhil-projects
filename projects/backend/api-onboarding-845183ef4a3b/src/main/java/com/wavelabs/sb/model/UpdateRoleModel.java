package com.wavelabs.sb.model;

import com.wavelabs.sb.request.UpdateRoleRequest;

public class UpdateRoleModel {

    private UpdateRoleRequest updateRoleRequest;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public UpdateRoleRequest getUpdateRoleRequest() {
	return updateRoleRequest;
    }

    public void setUpdateRoleRequest(UpdateRoleRequest updateRoleRequest) {
	this.updateRoleRequest = updateRoleRequest;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
