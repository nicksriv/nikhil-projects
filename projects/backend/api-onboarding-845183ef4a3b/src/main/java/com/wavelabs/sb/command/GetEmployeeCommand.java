package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.response.EmployeeDetails;
import com.wavelabs.sb.services.UserOnboardingService;

@Component
public class GetEmployeeCommand implements Command<String, EmployeeDetails> {

    @Autowired
    UserOnboardingService userOnboardingService;

    @Override
    public EmployeeDetails execute(String userId) {
	return userOnboardingService.getEmployeeDetails(userId);
    }

}
