package com.wavelabs.sb.utils;

import org.springframework.stereotype.Component;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.model.TokenPayLoadDetails;

@Component
public class OnboardingUtil {

    public static String getCreatedOrModifiedBy(TokenPayLoadDetails details) {
	if (details.getTypeOfUser().equalsIgnoreCase(Constants.ADMIN)) {
	    return details.getAdminId();
	} else if (details.getTypeOfUser().equalsIgnoreCase(Constants.CLIENT)) {
	    if (details.getUserId() != null && !details.getUserId().isEmpty()) {
		return details.getUserId();
	    }
	    return details.getClientId();
	} else if (details.getTypeOfUser().equalsIgnoreCase(Constants.USER)) {
	    return details.getUserId();
	} else {
	    return Constants.ADMIN;
	}
    }
}
