package com.wavelabs.sb.model;

import com.wavelabs.sb.request.FetchAllModAndSubModRequest;

public class FetchAllModAndSubModModel {

    private String clientId;
    private TokenPayLoadDetails tokenPayLoadDetails;
    private FetchAllModAndSubModRequest fetchAllRequest;

    public String getClientId() {
	return clientId;
    }

    public void setClientId(String clientId) {
	this.clientId = clientId;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

    public FetchAllModAndSubModRequest getFetchAllRequest() {
	return fetchAllRequest;
    }

    public void setFetchAllRequest(FetchAllModAndSubModRequest fetchAllRequest) {
	this.fetchAllRequest = fetchAllRequest;
    }

}
