package com.wavelabs.sb.command;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.response.UserModulesResponse;
import com.wavelabs.sb.services.UserOnboardingService;

@Component
public class GetUserModulesCommand implements Command<TokenPayLoadDetails, ResponseEntity<List<UserModulesResponse>>> {

    @Autowired
    UserOnboardingService userOnboardingService;

    @Override
    public ResponseEntity<List<UserModulesResponse>> execute(TokenPayLoadDetails request) {
	return ResponseEntity.status(HttpStatus.OK).body(userOnboardingService.getUserModules(request));
    }

}
