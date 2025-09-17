package com.wavelabs.sb.command;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.SiteDetails;
import com.wavelabs.sb.request.FetchAllSitesRequest;
import com.wavelabs.sb.services.SiteOnboardingService;

@Component
public class DownloadAllSitesCommand implements Command<FetchAllSitesRequest, List<SiteDetails>> {

    @Autowired
    SiteOnboardingService siteOnboardingService;

    @Override
    public List<SiteDetails> execute(FetchAllSitesRequest fetchAllSitesRequest) {
	return siteOnboardingService.fetchAllSitesToDownload(fetchAllSitesRequest);
    }

}
