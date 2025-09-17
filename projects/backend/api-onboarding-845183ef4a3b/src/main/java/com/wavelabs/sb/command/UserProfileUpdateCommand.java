package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.UserProfileUpdateModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.UserProfileService;

@Component
public class UserProfileUpdateCommand implements Command<UserProfileUpdateModel, SuccessResponse> {

    @Autowired
    UserProfileService userProfileService;

    @Override
    public SuccessResponse execute(UserProfileUpdateModel details) {
	return userProfileService.updateUserProfile(details.getTokenPayLoadDetails(),
		details.getUserProfileUpdateRequest());
    }
}
