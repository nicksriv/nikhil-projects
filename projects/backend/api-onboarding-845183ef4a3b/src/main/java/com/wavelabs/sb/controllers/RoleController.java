package com.wavelabs.sb.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import com.wavelabs.sb.documents.Roles;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.mappers.RoleMapper;
import com.wavelabs.sb.response.RolesResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.RoleService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

//@RestController
//@RequestMapping("/api/v1/clients")
//@CrossOrigin("*")
public class RoleController {

    @Autowired
    RoleService roleService;

    @ApiOperation(value = "This operation is used to create Roles of a Client")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/{client_Id}/roles")
    public ResponseEntity<SuccessResponse> saveRoleDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "client_Id") String clientId, @RequestParam String role) {
	RolesResponse rolesList = roleService.fetchRolesByClientId(clientId);
	if (rolesList.getRoles().contains(role)) {
	    throw new BadRequestException(role + " role already mapped to Client with ID : " + clientId);
	}
	Roles response = roleService.saveRoleDetails(role, clientId);
	return ResponseEntity.status(HttpStatus.OK).body(RoleMapper.toResponse(response));
    }

    @ApiOperation(value = "This operation is used to fetch Roles of a Client")
    @ApiResponses({ @ApiResponse(code = 200, response = RolesResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping("/{client_Id}/roles")
    public ResponseEntity<RolesResponse> getRoles(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "client_Id") String clientId) {
	return ResponseEntity.status(HttpStatus.OK).body(roleService.fetchRolesByClientId(clientId));
    }
}
