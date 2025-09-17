package com.wavelabs.sb.command;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.documents.SiteOnboardingDetails;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.mappers.SiteOnboardingMapper;
import com.wavelabs.sb.response.SiteResponse;
import com.wavelabs.sb.services.SiteOnboardingService;

@Component
public class FetchSiteCommand implements Command<String, ResponseEntity<SiteResponse>> {

    @Autowired
    SiteOnboardingService siteOnboardingService;
    
    @Override
    public ResponseEntity<SiteResponse> execute(String id) {
	SiteOnboardingDetails site = siteOnboardingService.fetchSite(id);
	List<Users> users = siteOnboardingService.fetchAllManagers(site.getManagers(), site.getClientId());
	return ResponseEntity.status(HttpStatus.OK).body(SiteOnboardingMapper.getSite(site, users));
    }

}
