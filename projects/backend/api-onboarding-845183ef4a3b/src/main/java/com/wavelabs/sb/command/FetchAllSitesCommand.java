package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.request.FetchAllSitesRequest;
import com.wavelabs.sb.response.FetchAllSitesResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.services.SiteOnboardingService;

@Component
public class FetchAllSitesCommand implements Command<FetchAllSitesRequest, ResponseEntity<PaginationResponse<FetchAllSitesResponse>>> {

    @Autowired
    SiteOnboardingService siteOnboardingService;

    @Override
    public ResponseEntity<PaginationResponse<FetchAllSitesResponse>> execute(FetchAllSitesRequest fetchAllSitesRequest) {
	return ResponseEntity.status(HttpStatus.OK).body(siteOnboardingService.fetchAllSites(fetchAllSitesRequest));
    }

}
