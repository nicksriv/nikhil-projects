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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.command.DeleteFeatureTemplateDetailsCommand;
import com.wavelabs.sb.command.FetchAllFeatureTemplatesCommand;
import com.wavelabs.sb.command.GetFeatureTemplateByIdCommand;
import com.wavelabs.sb.command.SaveFeatureTemplateCommand;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.DeleteFeatureTemplateModel;
import com.wavelabs.sb.model.SaveFeatureTemplateModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.SaveFeatureTemplateRequest;
import com.wavelabs.sb.response.FeatureTemplateInfo;
import com.wavelabs.sb.response.FeatureTemplateResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/screenbuilder/api/v1")
@CrossOrigin("*")
public class FeatureTemplateController {

    @Autowired
    SaveFeatureTemplateCommand saveFeatureTemplateCommand;

    @Autowired
    GetFeatureTemplateByIdCommand getFeatureTemplateByIdCommand;
    
    @Autowired
    FetchAllFeatureTemplatesCommand fetchAllFeatureTemplatesCommand;
    
    @Autowired
    DeleteFeatureTemplateDetailsCommand deleteFeatureTemplateDetailsCommand;
    
    @Autowired
    AuthenticationService authenticationService;

    @ApiOperation(value = "This operation is responsible to save feature templates")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/featuretemplate", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> saveFeatureTemplate(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody SaveFeatureTemplateRequest featureTemplateRequest,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	SaveFeatureTemplateModel model = new SaveFeatureTemplateModel();
	model.setRequest(featureTemplateRequest);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK)
		.body(saveFeatureTemplateCommand.execute(model));
    }

    @ApiOperation(value = "This operation is used to fetch future template details")
    @ApiResponses({ @ApiResponse(code = 200, response = String.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/featuretemplate/{templateId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FeatureTemplateInfo> getFeatureTemplateDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable String templateId) {
	return getFeatureTemplateByIdCommand.execute(templateId); 
    }

    @ApiOperation(value = "This operation is used to fetch feature template details")
    @ApiResponses({ @ApiResponse(code = 200, response = FeatureTemplateResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/featuretemplate", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FeatureTemplateResponse> fetchAllFeatureTemplateDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization) {
	return fetchAllFeatureTemplatesCommand.execute(null);
    }

    @ApiOperation(value = "This operation is used to fetch feature template details")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @DeleteMapping(value = "/featuretemplate/{templateId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> deleteFeatureTemplateDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable String templateId, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	DeleteFeatureTemplateModel model = new DeleteFeatureTemplateModel();
	model.setTemplateId(templateId);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(deleteFeatureTemplateDetailsCommand.execute(model));
    }

}
