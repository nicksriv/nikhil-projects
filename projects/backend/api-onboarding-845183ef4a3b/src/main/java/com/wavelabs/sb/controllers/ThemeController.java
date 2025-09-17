package com.wavelabs.sb.controllers;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.command.CreateThemeDetailsCommand;
import com.wavelabs.sb.command.FetchThemeDetailsCommand;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.FetchThemeDetailsModel;
import com.wavelabs.sb.model.SaveThemeDetailsModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.ThemeRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.ThemeResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("api/v1")
@CrossOrigin("*")
public class ThemeController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    CreateThemeDetailsCommand createThemeDetailsCommand;

    @Autowired
    FetchThemeDetailsCommand fetchThemeDetailsCommand;

    @ApiOperation(value = "This operation is used to save Theme details")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/themes", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> saveTheme(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest, @Valid @RequestBody ThemeRequest request) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);

	SaveThemeDetailsModel themeDetailsWithPayload = new SaveThemeDetailsModel();
	themeDetailsWithPayload.setThemeRequest(request);
	themeDetailsWithPayload.setTokenPayLoadDetails(details);

	return ResponseEntity.status(HttpStatus.OK).body(createThemeDetailsCommand.execute(themeDetailsWithPayload));
    }

    @ApiOperation(value = "This operation is used to fetch Theme Details")
    @ApiResponses({ @ApiResponse(code = 200, response = ThemeResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/themes/{client_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ThemeResponse> fetchThemeDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = false, value = "client_id") String clientId, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	FetchThemeDetailsModel fetchThemeDetailsModel = new FetchThemeDetailsModel();
	fetchThemeDetailsModel.setClientId(clientId);
	fetchThemeDetailsModel.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(fetchThemeDetailsCommand.execute(fetchThemeDetailsModel));
    }

}