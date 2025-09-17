package com.wavelabs.sb.request;

public class FetchAllRoles {

    private FetchAllRolesRequest request;
    private String clientId;

    public FetchAllRolesRequest getRequest() {
	return request;
    }

    public void setRequest(FetchAllRolesRequest request) {
	this.request = request;
    }

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

}
