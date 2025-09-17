package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.request.UploadProfileImageRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ClientOnboardingService;
import com.wavelabs.sb.services.UserProfileService;	

@Component
public class UploadProfileImageCommand implements Command<UploadProfileImageRequest, SuccessResponse> {

    @Autowired
    ClientOnboardingService clientOnboardingService;

    @Autowired
    UserProfileService userProfileService;

    @Override
    public SuccessResponse execute(UploadProfileImageRequest request) {

	return userProfileService.uploadProfile(request);

    }

}
