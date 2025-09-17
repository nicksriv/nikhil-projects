package com.wavelabs.sb.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import com.wavelabs.sb.command.CreateScreenCommand;
import com.wavelabs.sb.command.GetFormBuilderCommand;
import com.wavelabs.sb.command.UpdateScreenCommand;
import com.wavelabs.sb.command.DynamicMappingCommand;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.CreateScreenModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UpdateScreenModel;
import com.wavelabs.sb.request.CreateScreenRequest;
import com.wavelabs.sb.request.DynamicMappingRequest;
import com.wavelabs.sb.request.UpdateScreenRequest;
import com.wavelabs.sb.response.FetchFormResponse;
import com.wavelabs.sb.response.SaveScreenResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.DynamicMappingResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/screenbuilder/api/v1")
@CrossOrigin("*")
public class ScreensController {

    @Autowired
    CreateScreenCommand createScreenCommand;

    @Autowired
    UpdateScreenCommand updateScreenCommand;

    @Autowired
    GetFormBuilderCommand getFormBuilderCommand;
    
    @Autowired
    DynamicMappingCommand dynamicMappingCommand;
    
    @Autowired
    AuthenticationService authenticationService;

    @ApiOperation(value = "This operation is responsible to save screen workflows")
    @ApiResponses({ @ApiResponse(code = 200, response = SaveScreenResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/screens", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SaveScreenResponse> createScreen(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody CreateScreenRequest request, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	CreateScreenModel model = new CreateScreenModel();
	model.setRequest(request);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.CREATED).body(createScreenCommand.execute(model));
    }

    @ApiOperation(value = "This operation is responsible to save screen workflows")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/screens", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateScreen(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody UpdateScreenRequest request, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	UpdateScreenModel model = new UpdateScreenModel();
	model.setRequest(request);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.CREATED).body(updateScreenCommand.execute(model));
    }

    @ApiOperation(value = "This operation is used to fetch Screen by screen-id")
    @ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/submodules/{screenId}/screens", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FetchFormResponse> getFormById(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "screenId") String screenId) {
	return getFormBuilderCommand.execute(screenId);
    }

    @ApiOperation(value = "This operation is used to fetch dynamic mapping response")
    @ApiResponses({
            @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down")
    })
    @EnableTokenAuthorisation
    @GetMapping(value = "/dynamic-mapping/{mapTo}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<DynamicMappingResponse>> getDynamicMapping(
        @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable() String mapTo,
        HttpServletRequest httpRequest
    ) {
    	TokenPayLoadDetails tokenDetails = authenticationService.getTokenPayLoadDetails(httpRequest);
        DynamicMappingRequest request = new DynamicMappingRequest();
        
        request.setMapTo(mapTo);
        request.setTokenDetails(tokenDetails);

        return dynamicMappingCommand.execute(request);
    }
}
