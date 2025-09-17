package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.services.UserOnboardingService;

@Component
public class UsersCommand implements Command<String, Users> {

    @Autowired
    UserOnboardingService userOnboardingService;

    @Override
    public Users execute(String userId) {
	return userOnboardingService.getUser(userId);
    }

}
