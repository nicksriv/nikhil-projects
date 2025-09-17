package com.wavelabs.sb.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.command.FetchAdminDashboardCommand;
import com.wavelabs.sb.command.FetchUserDashboardCommand;
import com.wavelabs.sb.command.FetchUserStatisticsCommand;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UserStatisticsModel;
import com.wavelabs.sb.repositories.QADashboardResponse;
import com.wavelabs.sb.response.AdminDashboardResponse;
import com.wavelabs.sb.response.UserDashboardResponse;
import com.wavelabs.sb.response.UserEmployeeInfo;
import com.wavelabs.sb.response.UserStatisticsResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.DashboardService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("api/v1")
@CrossOrigin("*")
public class DashboardController {


    @Autowired
    FetchUserDashboardCommand fetchUserDashboardCommand;

    @Autowired
    FetchAdminDashboardCommand fetchAdminDashboardCommand;
    

    @Autowired
    AuthenticationService authenticationService;
    
    @Autowired
    FetchUserStatisticsCommand fetchUserStatisticsCommand;

    @Autowired
    DashboardService dashboardService;

    @ApiOperation(value = "This operation is used to fetch user modules")
    @ApiResponses({ @ApiResponse(code = 200, response = UserDashboardResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/dashboard/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDashboardResponse> getUserDashboard(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	return fetchUserDashboardCommand.execute(details);
    }

    @ApiOperation(value = "This operation is used to fetch admin details")
    @ApiResponses({ @ApiResponse(code = 200, response = UserEmployeeInfo.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
            @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
     @EnableTokenAuthorisation
    @GetMapping(value = "/dashboard/admin", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AdminDashboardResponse> getAdminDashboard(
            @RequestHeader(required = true, value = "Authorization") String authorization,
            HttpServletRequest httpRequest) {
        TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
        return fetchAdminDashboardCommand.execute(details);
    }

    @ApiOperation(value = "This operation is used to fetch user modules")
    @ApiResponses({ @ApiResponse(code = 200, response = UserDashboardResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/dashboard/userstatistics", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserStatisticsResponse> getUserDashboard(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest, @RequestParam(required = false) String clientId) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	UserStatisticsModel model =new  UserStatisticsModel();
	model.setClientId(clientId);
	model.setDetails(details);
	return fetchUserStatisticsCommand.execute(model);
    }


    @GetMapping("dashboard/qualitty-assurance")
    public QADashboardResponse getQADashboard(HttpServletRequest httpServletRequest){
        
        TokenPayLoadDetails details = authenticationService.getQualityAssuranceToken(httpServletRequest);
        return dashboardService.getQADashboard(details);
    }
}
