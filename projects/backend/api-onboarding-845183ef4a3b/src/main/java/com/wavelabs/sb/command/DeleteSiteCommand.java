package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.DeleteSiteModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.SiteOnboardingService;

@Component
public class DeleteSiteCommand implements Command<DeleteSiteModel, SuccessResponse> {

    @Autowired
    SiteOnboardingService siteOnboardingService;

    @Override
    public SuccessResponse execute(DeleteSiteModel model) {
	return siteOnboardingService.deleteSiteDetails(model);
    }

}
