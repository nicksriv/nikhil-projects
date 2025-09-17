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

import com.wavelabs.sb.command.CloneModulesCommand;
import com.wavelabs.sb.command.GetWorkFlowDetailsCommand;
import com.wavelabs.sb.command.SaveWorkflowCommand;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.CloneModulesModel;
import com.wavelabs.sb.model.SaveWorkflowModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.ModuleCloneRequest;
import com.wavelabs.sb.request.SaveWorkflowRequest;
import com.wavelabs.sb.response.DynamicWorkFlowDetailsResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.WorkFlowDetailsResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.WorkflowService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/screenbuilder/api/v1")
@CrossOrigin("*")
public class WorkFlowController {

    @Autowired
    SaveWorkflowCommand saveWorkflowCommand;
    
    @Autowired
    WorkflowService workflowService;

    @Autowired
    GetWorkFlowDetailsCommand getWorkFlowDetailsCommand;
    
    @Autowired
    CloneModulesCommand cloneModulesCommand;
    
    @Autowired
    AuthenticationService authenticationService;

    @ApiOperation(value = "This operation is responsible to save / update screen workflows")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/workflows", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> saveWorkflows(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody SaveWorkflowRequest workflowRequest, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	SaveWorkflowModel model = new SaveWorkflowModel();
	model.setTokenPayLoadDetails(details);
	model.setRequest(workflowRequest);
	return ResponseEntity.status(HttpStatus.OK).body(saveWorkflowCommand.execute(model));
    }

    @ApiOperation(value = "This operation is used to fetch workflow details")
    @ApiResponses({ @ApiResponse(code = 200, response = WorkFlowDetailsResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/workflows/{workflowId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WorkFlowDetailsResponse> getWorkFlowDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "workflowId") String workflowId) {
	return getWorkFlowDetailsCommand.execute(workflowId);
    }
    
    @ApiOperation(value = "This operation is used to fetch Dynamic workflow details by moduleId")
    @ApiResponses({ @ApiResponse(code = 200, response = DynamicWorkFlowDetailsResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/modules/{moduleId}/workflows/latest", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DynamicWorkFlowDetailsResponse> getWorkFlowDetailsByModule(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable String moduleId) {
	return ResponseEntity.status(HttpStatus.OK).body(workflowService.fetchDynamicWorkFlowDetails(moduleId, Constants.EMPTY));
    }

    @ApiOperation(value = "This operation is used to fetch Dynamic workflow details by moduleId submoduleId")
    @ApiResponses({ @ApiResponse(code = 200, response = DynamicWorkFlowDetailsResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/modules/{moduleId}/submodules/{subModuleId}/workflows/latest", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DynamicWorkFlowDetailsResponse> getWorkFlowDetailsByModuleSubModule(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable String moduleId, @PathVariable String subModuleId) {
	return ResponseEntity.status(HttpStatus.OK).body(workflowService.fetchDynamicWorkFlowDetails(moduleId, subModuleId));
    }
    
    @ApiOperation(value = "This operation is responsible to clone modules")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/modules/clone", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> cloneModules(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody ModuleCloneRequest moduleCloneRequest,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	CloneModulesModel model = new CloneModulesModel();
	model.setRequest(moduleCloneRequest);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(cloneModulesCommand.execute(model));
    }

}
