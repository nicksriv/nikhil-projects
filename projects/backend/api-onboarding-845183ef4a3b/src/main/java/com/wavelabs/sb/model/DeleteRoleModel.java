package com.wavelabs.sb.model;

public class DeleteRoleModel {

    private String id;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public String getId() {
	return id;
    }

    public void setId(String id) {
	this.id = id;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
