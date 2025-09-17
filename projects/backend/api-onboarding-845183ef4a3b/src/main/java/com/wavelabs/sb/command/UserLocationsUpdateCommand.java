package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.UserLocationsUpdateModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.UserOnboardingService;

@Component
public class UserLocationsUpdateCommand implements Command<UserLocationsUpdateModel, SuccessResponse> {

    @Autowired
    UserOnboardingService userOnboardingService;

    @Override
    public SuccessResponse execute(UserLocationsUpdateModel model) {
	return userOnboardingService.updateUserLocations(model.getLocationRequest(), model.getTokenPayLoadDetails(),
		model.getUserId());
    }
}
