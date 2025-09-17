package com.wavelabs.sb.request;

import com.wavelabs.sb.model.TokenPayLoadDetails;

public class DynamicMappingRequest {
    
    private String mapTo;
    private TokenPayLoadDetails tokenDetails;

    public String getMapTo() {
        return mapTo;
    }
    public void setMapTo(String mapTo) {
        this.mapTo = mapTo;
    }
    public TokenPayLoadDetails getTokenDetails() {
        return tokenDetails;
    }
    public void setTokenDetails(TokenPayLoadDetails tokenDetails) {
        this.tokenDetails = tokenDetails;
    }
}
