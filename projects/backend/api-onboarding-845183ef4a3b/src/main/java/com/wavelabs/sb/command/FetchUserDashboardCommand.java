package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.response.UserDashboardResponse;
import com.wavelabs.sb.services.DashboardService;

@Component
public class FetchUserDashboardCommand implements Command<TokenPayLoadDetails, ResponseEntity<UserDashboardResponse>>{

    
    @Autowired
    DashboardService dashboardService;
    
    @Override
    public ResponseEntity<UserDashboardResponse> execute(TokenPayLoadDetails request) {
	return ResponseEntity.status(HttpStatus.OK).body(dashboardService.fetchUserDashboardData(request));
    }


}
