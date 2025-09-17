package com.wavelabs.sb.model;

import com.wavelabs.sb.request.UpdateChartRequest;

public class UpdateChartModel {

    private UpdateChartRequest updateChartRequest;
    private TokenPayLoadDetails tokenPayLoadDetails;
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public UpdateChartRequest getUpdateChartRequest() {
        return updateChartRequest;
    }

    public void setUpdateChartRequest(UpdateChartRequest updateChartRequest) {
        this.updateChartRequest = updateChartRequest;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
