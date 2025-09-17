package com.wavelabs.sb.model;

import com.wavelabs.sb.request.CreateChartRequest;

public class CreateChartModel {

    private CreateChartRequest createChartRequest;
    private TokenPayLoadDetails tokenPayLoadDetails;

    public CreateChartRequest getCreateChartRequest() {
        return createChartRequest;
    }

    public void setCreateChartRequest(CreateChartRequest createChartRequest) {
        this.createChartRequest = createChartRequest;
    }

    public TokenPayLoadDetails getTokenPayLoadDetails() {
	return tokenPayLoadDetails;
    }

    public void setTokenPayLoadDetails(TokenPayLoadDetails tokenPayLoadDetails) {
	this.tokenPayLoadDetails = tokenPayLoadDetails;
    }

}
