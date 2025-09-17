package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.UpdateSiteModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.SiteOnboardingService;

@Component
public class SiteOnboardingUpdateCommand
	implements Command<UpdateSiteModel, SuccessResponse> {

    @Autowired
    SiteOnboardingService siteOnboardingService;

    @Override
    public SuccessResponse execute(UpdateSiteModel model) {
	return siteOnboardingService.updateSiteDetails(model);
    }

}
