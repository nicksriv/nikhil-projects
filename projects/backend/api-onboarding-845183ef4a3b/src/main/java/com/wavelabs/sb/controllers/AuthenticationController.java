package com.wavelabs.sb.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.command.ClientLoginCommand;
import com.wavelabs.sb.command.LogOutCommand;
import com.wavelabs.sb.command.UserLoginCommand;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.AuthenticateLoginModel;
import com.wavelabs.sb.request.AuthenticateClientRequest;
import com.wavelabs.sb.request.AuthenticateUserRequest;
import com.wavelabs.sb.response.LoginResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("api/v1")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    ClientLoginCommand clientLoginCommand;

    @Autowired
    UserLoginCommand userLoginCommand;

    @Autowired
    LogOutCommand logOutCommand;
    
    @Autowired
    AuthenticationService authenticationService;

    @ApiOperation(value = "This operation is for authentication client")
    @ApiResponses({ @ApiResponse(code = 200, response = LoginResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @PostMapping(value = "/clients/authenticate", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoginResponse> authenticateClient(@Valid @RequestBody AuthenticateClientRequest request,
	    HttpServletRequest servletRequest) {
	String ip=authenticationService.getClientIp(servletRequest);
	String browser=authenticationService.getBrowser(servletRequest);
	AuthenticateLoginModel model = new AuthenticateLoginModel();
	model.setBrowser(browser);
	model.setIp(ip);
	model.setClientRequest(request);
	return ResponseEntity.status(HttpStatus.OK).body(clientLoginCommand.execute(model));
    }

    @ApiOperation(value = "This operation is for authentication user")
    @ApiResponses({ @ApiResponse(code = 200, response = LoginResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @PostMapping(value = "/users/authenticate", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoginResponse> authenticateUser(@Valid @RequestBody AuthenticateUserRequest request,
	    HttpServletRequest servletRequest) {
	String ip=authenticationService.getClientIp(servletRequest);
	String browser=authenticationService.getBrowser(servletRequest);
	AuthenticateLoginModel model = new AuthenticateLoginModel();
	model.setBrowser(browser);
	model.setIp(ip);
	model.setUserRequest(request);
	return ResponseEntity.status(HttpStatus.OK).body(userLoginCommand.execute(model));
    }

    @ApiOperation(value = "This operation is for  user/client logout")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> logOut(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpServletRequest) {
	return logOutCommand.execute(authorization);
    }

}