package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.UserStatisticsModel;
import com.wavelabs.sb.response.UserStatisticsResponse;
import com.wavelabs.sb.services.DashboardService;

@Component
public class FetchUserStatisticsCommand
	implements Command<UserStatisticsModel, ResponseEntity<UserStatisticsResponse>> {

    @Autowired
    DashboardService dashboardService;
    
    
    @Override
    public ResponseEntity<UserStatisticsResponse> execute(UserStatisticsModel request) {
	return ResponseEntity.status(HttpStatus.OK).body(dashboardService.fetchUserStatistics(request));
    }

}
