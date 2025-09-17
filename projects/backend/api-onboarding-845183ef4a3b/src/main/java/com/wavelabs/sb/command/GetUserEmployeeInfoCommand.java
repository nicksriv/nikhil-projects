package com.wavelabs.sb.command;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.response.UserEmployeeInfo;
import com.wavelabs.sb.services.UserOnboardingService;

@Component
public class GetUserEmployeeInfoCommand implements Command<TokenPayLoadDetails, ResponseEntity<List<UserEmployeeInfo>>>{

    @Autowired
    UserOnboardingService userOnboardingService;
    
    public ResponseEntity<List<UserEmployeeInfo>> execute(TokenPayLoadDetails details) {
	return ResponseEntity.status(HttpStatus.OK).body(userOnboardingService.getEmployeeInfo(details));
    }

}
