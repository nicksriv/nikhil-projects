package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.response.LocationDetailsResponse;
import com.wavelabs.sb.services.UserOnboardingService;

@Component
public class UserLocationsFetchCommand implements Command<String, LocationDetailsResponse> {

    @Autowired
    UserOnboardingService userOnboardingService;

    @Override
    public LocationDetailsResponse execute(String userId) {
	return userOnboardingService.viewLocationDetailsByUserId(userId);
    }
}
