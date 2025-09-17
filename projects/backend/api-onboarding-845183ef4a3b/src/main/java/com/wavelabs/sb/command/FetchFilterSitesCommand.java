package com.wavelabs.sb.command;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.response.UserSitesFilterResponse;
import com.wavelabs.sb.services.UserOnboardingService;

@Component
public class FetchFilterSitesCommand
	implements Command<TokenPayLoadDetails, ResponseEntity<List<UserSitesFilterResponse>>> {

    @Autowired
    UserOnboardingService onboardingService;

    public ResponseEntity<List<UserSitesFilterResponse>> execute(TokenPayLoadDetails details) {
	return ResponseEntity.status(HttpStatus.OK).body(onboardingService.fetchSitesByUser(details));
    }

}
