package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.CreateSiteModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.SiteOnboardingService;

@Component
public class SiteOnboardingCommand implements Command<CreateSiteModel, SuccessResponse> {

    @Autowired
    SiteOnboardingService siteOnboardingService;

    @Override
    public SuccessResponse execute(CreateSiteModel model) {
	return siteOnboardingService.saveSiteDetails(model);
    }

}
