package com.wavelabs.sb.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.request.ActionButtonRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class ActionController {

    @ApiOperation(value = "This operation is used to create Action")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to save record on database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/customButtonCall", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> createChart(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody ActionButtonRequest request, HttpServletRequest httpServletRequest) {
	SuccessResponse response = new SuccessResponse(Constants.DATA_SAVED_SUCCESSFULLY);
	return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
