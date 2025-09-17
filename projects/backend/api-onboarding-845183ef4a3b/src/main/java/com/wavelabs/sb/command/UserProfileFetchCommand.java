package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.response.UserProfileDetails;
import com.wavelabs.sb.services.UserProfileService;

@Component
public class UserProfileFetchCommand implements Command<TokenPayLoadDetails, UserProfileDetails> {

	@Autowired
	UserProfileService userProfileService;

	@Override
	public UserProfileDetails execute(TokenPayLoadDetails details) {
	    return userProfileService.fetchUserProfile(details);
	}
}
