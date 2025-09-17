package com.wavelabs.sb.utils;

import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.TokenPayLoadDetails;

@Component
public class OnboardingUtil {

    public static String getCreatedOrModifiedBy(TokenPayLoadDetails details) {
	return details.getFirstName() + " " + details.getLastName();
    }
    
}
