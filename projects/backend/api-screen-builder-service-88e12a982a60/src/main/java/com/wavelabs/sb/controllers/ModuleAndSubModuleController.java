package com.wavelabs.sb.controllers;

import java.io.IOException;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.command.AddSubModuleCommand;
import com.wavelabs.sb.command.CreateModuleCommand;
import com.wavelabs.sb.command.CreateScreenCommand;
import com.wavelabs.sb.command.DeleteSubModCommand;
import com.wavelabs.sb.command.FetchAllModAndSubModByUserCommand;
import com.wavelabs.sb.command.FetchAllModAndSubModCommand;
import com.wavelabs.sb.command.FetchAllSubModCommand;
import com.wavelabs.sb.command.GetFormBuilderCommand;
import com.wavelabs.sb.command.GetWorkFlowDetailsCommand;
import com.wavelabs.sb.command.SaveFeatureTemplateCommand;
import com.wavelabs.sb.command.SaveWorkflowCommand;
import com.wavelabs.sb.command.UpdateScreenCommand;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.mappers.ScreenBuilderMapper;
import com.wavelabs.sb.model.CreateModuleAndSubmoduleModel;
import com.wavelabs.sb.model.CreateSubModuleModel;
import com.wavelabs.sb.model.DeleteSubModuleModel;
import com.wavelabs.sb.model.FetchAllModAndSubModModel;
import com.wavelabs.sb.model.FetchAllModulesByUesrModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.AddSubmoduleRequest;
import com.wavelabs.sb.request.CreateModuleRequest;
import com.wavelabs.sb.request.FetchAllModAndSubModRequest;
import com.wavelabs.sb.request.UpdateModuleRequest;
import com.wavelabs.sb.response.FetchAllModAndSubModResponse;
import com.wavelabs.sb.response.FetchAllModulesResponse;
import com.wavelabs.sb.response.FetchRecordsResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.UserModulesResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.FormDataService;
import com.wavelabs.sb.services.ScreenBuilderService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/screenbuilder/api/v1")
@CrossOrigin("*")
public class ModuleAndSubModuleController {


    @Autowired
    FetchAllSubModCommand fetchAllSubModCmd;

    @Autowired
    AddSubModuleCommand addSubModuleCommand;

    @Autowired
    DeleteSubModCommand deleteSubModCommand;

    @Autowired
    SaveWorkflowCommand saveWorkflowCommand;

    @Autowired
    CreateScreenCommand createScreenCommand;

    @Autowired
    UpdateScreenCommand updateScreenCommand;

    @Autowired
    GetWorkFlowDetailsCommand getWorkFlowDetailsCommand;

    @Autowired
    GetFormBuilderCommand getFormBuilderCommand;

    @Autowired
    ScreenBuilderService screenBuilderService;

    @Autowired
    SaveFeatureTemplateCommand saveFeatureTemplateCommand;

    @Autowired
    CreateModuleCommand createModuleCommand;

    @Autowired
    FormDataService formDataService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    FetchAllModAndSubModCommand fetchAllModAndSubModCommand;

    @Autowired
    FetchAllModAndSubModByUserCommand allModAndSubModByUserCommand;


    @ApiOperation(value = "This operation is used to create module")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/modules", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> createModule(@Valid @RequestBody CreateModuleRequest request,
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	CreateModuleAndSubmoduleModel model = new CreateModuleAndSubmoduleModel();
	model.setRequest(request);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(createModuleCommand.execute(model));
    }

    @ApiOperation(value = "This operation is used to update module")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/modules/{moduleId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateModule(@PathVariable String moduleId,
	    @Valid @RequestBody UpdateModuleRequest request,
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	return ResponseEntity.status(HttpStatus.OK).body(screenBuilderService.updateModule(request, moduleId, details));
    }

    @ApiOperation(value = "This operation is used to delete module")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @DeleteMapping(value = "/modules/{moduleId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> deleteModule(@PathVariable String moduleId,
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	return ResponseEntity.status(HttpStatus.OK).body(screenBuilderService.deleteModule(moduleId, details));
    }

    @ApiOperation(value = "This operation is used to fetch modules")
    @ApiResponses({ @ApiResponse(code = 200, response = FetchAllModulesResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/modules", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FetchAllModulesResponse> fetchAllModules(@RequestParam String clientId,
	    @RequestHeader(required = true, value = "Authorization") String authorization) {
	return ResponseEntity.status(HttpStatus.OK).body(screenBuilderService.fetchAllModules(clientId));
    }

    @ApiOperation(value = "This operation is used to fetch all submodules")
    @ApiResponses({ @ApiResponse(code = 200, response = FetchRecordsResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/modules/{moduleId}/submodules", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FetchRecordsResponse> fetchAllSubModules(@PathVariable String moduleId,
	    @RequestHeader(required = true, value = "Authorization") String authorization) {
	FetchRecordsResponse response = ScreenBuilderMapper
		.getFetchAllSubmodResponse(fetchAllSubModCmd.execute(moduleId));
	return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @ApiOperation(value = "This operation is used to update submodules")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/modules/{moduleId}/submodules", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> createSubModules(@Valid @RequestBody AddSubmoduleRequest request,
	    @PathVariable String moduleId,
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) {
	request.setModuleId(moduleId);
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	CreateSubModuleModel model = new CreateSubModuleModel();
	model.setTokenPayLoadDetails(details);
	model.setRequest(request);
	return ResponseEntity.status(HttpStatus.OK).body(addSubModuleCommand.execute(model));
    }

    @ApiOperation(value = "This operation is used to update submodules")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/submodules/{subModuleId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateSubModules(
	    @PathVariable(required = true, value = "subModuleId") String subModuleId,
	    @Valid @RequestBody UpdateModuleRequest updateModuleRequest,
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) throws IOException {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	return ResponseEntity.status(HttpStatus.OK)
		.body(screenBuilderService.updateSubModules(updateModuleRequest, subModuleId, details));

    }

    @ApiOperation(value = "This operation is used to delete submodule")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @DeleteMapping(value = "/modules/{moduleId}/submodules/{submoduleId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> deleteSubModules(
	    @PathVariable(required = true, value = "moduleId") String moduleId,
	    @PathVariable(required = true, value = "submoduleId") String subModuleId,
	    @RequestHeader(required = false, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	return ResponseEntity.status(HttpStatus.OK)
		.body(screenBuilderService.deleteSubModule(moduleId, subModuleId, details));

    }

    @ApiOperation(value = "This operation is responsible to save modules master data")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/savemodules", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> saveModule(
	    @RequestHeader(required = false, value = "Authorization") String authorization,
	    @Valid @RequestBody List<String> modules, HttpServletRequest httpRequest) throws IllegalArgumentException {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	return ResponseEntity.status(HttpStatus.OK).body(screenBuilderService.saveModules(modules, details));

    }

    @ApiOperation(value = "This operation is responsible to delete submodules")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
 //   @DeleteMapping(value = "/submodules/{subModuleId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> deleteSubModules(@PathVariable String subModuleId,
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	DeleteSubModuleModel model = new DeleteSubModuleModel();
	model.setSubModuleId(subModuleId);
	model.setTokenPayLoadDetails(details);
	return deleteSubModCommand.execute(model);
    }

    @ApiOperation(value = "This operation is used to fetch modules and sub modules")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/clients/{clientId}/modules", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FetchAllModAndSubModResponse> fetchAllModAndSubmod(
	    @PathVariable(value = "clientId", required = true) String clientId,
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest, @ModelAttribute FetchAllModAndSubModRequest fetchAllRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	FetchAllModAndSubModModel model = new FetchAllModAndSubModModel();
	model.setClientId(clientId);
	model.setFetchAllRequest(fetchAllRequest);
	model.setTokenPayLoadDetails(details);
	return fetchAllModAndSubModCommand.execute(model);
    }

    @ApiOperation(value = "This operation is used to fetch modules and sub modules")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @GetMapping(value = "/users/{id}/modules", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserModulesResponse> fetchAllModulesByUesrId(
	    @PathVariable(value = "id", required = true) String id, @RequestParam String type) {
	FetchAllModulesByUesrModel model= new FetchAllModulesByUesrModel();
	model.setId(id);
	model.setType(type);
	return allModAndSubModByUserCommand.execute(model);
    }


}
