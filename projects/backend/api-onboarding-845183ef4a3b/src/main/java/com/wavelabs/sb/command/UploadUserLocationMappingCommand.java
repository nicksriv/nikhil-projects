package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.services.UserOnboardingService;
import com.wavelabs.sb.model.UploadUserLocationMappingModel;
import com.wavelabs.sb.response.SuccessResponse;

@Component
public class UploadUserLocationMappingCommand implements Command<UploadUserLocationMappingModel, SuccessResponse>  {
    
    @Autowired
    UserOnboardingService userOnboardingService;

    @Override
    public SuccessResponse execute(UploadUserLocationMappingModel model) {
	    return userOnboardingService.uploadUserLocationMapping(model);
    }
}
