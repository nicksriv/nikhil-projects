package com.wavelabs.sb.request;

import java.util.List;

import com.wavelabs.sb.documents.LocationMapping;

public class LocationRequest {

    // @NotEmpty(message = "Mapped sites list cannot be empty.")
    private List<LocationMapping> sitesToMap;
    private List<String> siteIdsToDelete;

    public List<LocationMapping> getSitesToMap() {
        return sitesToMap;
    }

    public void setSitesToMap(List<LocationMapping> sitesToMap) {
        this.sitesToMap = sitesToMap;
    }

    public List<String> getSiteIdsToDelete() {
        return siteIdsToDelete;
    }

    public void setSiteIdsToDelete(List<String> siteIdsToDelete) {
        this.siteIdsToDelete = siteIdsToDelete;
    }
}
