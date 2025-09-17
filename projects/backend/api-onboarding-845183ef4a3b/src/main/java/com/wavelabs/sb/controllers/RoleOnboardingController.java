package com.wavelabs.sb.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.command.CreateRoleOnboardingCommand;
import com.wavelabs.sb.command.DeleteRoleCommand;
import com.wavelabs.sb.command.FetchAllRolesCommand;
import com.wavelabs.sb.command.FetchRoleCommand;
import com.wavelabs.sb.command.UpdateRoleOnboardingCommand;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.CreateRoleModel;
import com.wavelabs.sb.model.DeleteRoleModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UpdateRoleModel;
import com.wavelabs.sb.request.FetchAllRoles;
import com.wavelabs.sb.request.FetchAllRolesRequest;
import com.wavelabs.sb.request.RoleOnboardingRequest;
import com.wavelabs.sb.request.UpdateRoleRequest;
import com.wavelabs.sb.response.FetchAllRolesResponse;
import com.wavelabs.sb.response.RoleResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/api/v1/roles")
@CrossOrigin("*")
public class RoleOnboardingController {

    @Autowired
    CreateRoleOnboardingCommand createRoleOnboardingCommand;

    @Autowired
    UpdateRoleOnboardingCommand updateRoleOnboardingCommand;

    @Autowired
    FetchAllRolesCommand fetchAllRolesCommand;

    @Autowired
    FetchRoleCommand fetchRoleCommand;
    
    @Autowired
    DeleteRoleCommand deleteRoleCommand;
    
    @Autowired
    AuthenticationService authenticationService;

    @ApiOperation(value = "This operation is for saving Role Details")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> createRole(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody RoleOnboardingRequest request,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	CreateRoleModel model = new CreateRoleModel();
	model.setRoleOnboardingRequest(request);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(createRoleOnboardingCommand.execute(model));
    }

    @ApiOperation(value = "This operation is for updating Role Details")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateRole(
	    @RequestHeader(required = true, value = "Authorization") String authorization, @PathVariable String id,
	    @Valid @RequestBody UpdateRoleRequest request, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	request.setId(id);
	UpdateRoleModel model = new UpdateRoleModel();
	model.setTokenPayLoadDetails(details);
	model.setUpdateRoleRequest(request);
	return ResponseEntity.status(HttpStatus.OK).body(updateRoleOnboardingCommand.execute(model));
    }

    @ApiOperation(value = "This operation is used to fetch the basic client details")
    @ApiResponses({ @ApiResponse(code = 200, response = FetchAllRolesResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/client/{clientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FetchAllRolesResponse> fetchAllRoles(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @ModelAttribute FetchAllRolesRequest fetchAllRequest, @PathVariable String clientId) {
	FetchAllRoles roles = new FetchAllRoles();
	roles.setClientId(clientId);
	roles.setRequest(fetchAllRequest);
	return fetchAllRolesCommand.execute(roles);
    }

    @ApiOperation(value = "This operation is used to fetch the basic client details")
    @ApiResponses({ @ApiResponse(code = 200, response = RoleResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RoleResponse> fetchRoleById(
	    @RequestHeader(required = true, value = "Authorization") String authorization, @PathVariable String id) {
	return fetchRoleCommand.execute(id);
    }

    @ApiOperation(value = "This operation is used to fetch the basic client details")
    @ApiResponses({ @ApiResponse(code = 200, response = FetchAllRolesResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> deleteRoles(
	    @RequestHeader(required = true, value = "Authorization") String authorization, @PathVariable String id,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	DeleteRoleModel model = new DeleteRoleModel();
	model.setId(id);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(deleteRoleCommand.execute(model));
    }
}