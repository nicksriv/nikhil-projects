package com.wavelabs.sb.model;

import com.wavelabs.sb.request.FetchFormsRequest;

public class FetchAllFormsModel {

    private FetchFormsRequest request;
    private TokenPayLoadDetails payLoadDetails;

    public FetchFormsRequest getRequest() {
	return request;
    }

    public void setRequest(FetchFormsRequest request) {
	this.request = request;
    }

    public TokenPayLoadDetails getPayLoadDetails() {
	return payLoadDetails;
    }

    public void setPayLoadDetails(TokenPayLoadDetails payLoadDetails) {
	this.payLoadDetails = payLoadDetails;
    }

}
