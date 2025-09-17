package com.wavelabs.sb.controllers;

import java.text.ParseException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.command.AddSubModuleCommand;
import com.wavelabs.sb.command.CreateFormCommand;
import com.wavelabs.sb.command.CreateModuleCommand;
import com.wavelabs.sb.command.CreateScreenCommand;
import com.wavelabs.sb.command.DeleteFormCommand;
import com.wavelabs.sb.command.DeleteSubModCommand;
import com.wavelabs.sb.command.DownloadFormDataCommand;
import com.wavelabs.sb.command.FetchAllFormsCommand;
import com.wavelabs.sb.command.FetchAllSubModCommand;
import com.wavelabs.sb.command.FetchColumnsAndFiltersCommand;
import com.wavelabs.sb.command.FetchFromByIdCommand;
import com.wavelabs.sb.command.GetFormBuilderCommand;
import com.wavelabs.sb.command.GetWorkFlowDetailsCommand;
import com.wavelabs.sb.command.SaveFeatureTemplateCommand;
import com.wavelabs.sb.command.SaveWorkflowCommand;
import com.wavelabs.sb.command.UpdateFormCommand;
import com.wavelabs.sb.command.UpdateScreenCommand;
import com.wavelabs.sb.common.CollectionConstants;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.DeleteFormDataModel;
import com.wavelabs.sb.model.FetchAllFormsModel;
import com.wavelabs.sb.model.SaveFormDataModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UpdateFormDataModel;
import com.wavelabs.sb.request.FetchFormsRequest;
import com.wavelabs.sb.request.FormRequest;
import com.wavelabs.sb.response.ColumnsAndFiltersResponse;
import com.wavelabs.sb.response.FeatureTemplateResponse;
import com.wavelabs.sb.response.FetchFormResponse;
import com.wavelabs.sb.response.FormsResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.ExcelService;
import com.wavelabs.sb.services.ScreenBuilderService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/screenbuilder/api/v1")
@CrossOrigin("*")
public class ScreenBuilderController {


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
    CreateFormCommand createFormCommand;

    @Autowired
    UpdateFormCommand updateFormCommand;

    @Autowired
    DeleteFormCommand deleteFormCommand;

    @Autowired
    FetchColumnsAndFiltersCommand fetchColumnsAndFiltersCommand;

    @Autowired
    FetchFromByIdCommand fetchFromByIdCommand;

    @Autowired
    FetchAllFormsCommand fetchAllFormsCommand;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    DownloadFormDataCommand downloadFormDataCommand;
    
    @ApiOperation(value = "This operation is used to save form data")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/modules/{moduleId}/forms", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> saveFormDataByModule(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable String moduleId, @RequestParam String workflowId, @RequestBody Map<String, Object> form,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	FormRequest request = new FormRequest();
	form.put(CollectionConstants.WORKFLOW_ID, workflowId);
	request.setWorlflowId(workflowId);
	request.setForm(form);
	request.setModuleId(moduleId);
	SaveFormDataModel model = new SaveFormDataModel();
	model.setRequest(request);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(createFormCommand.execute(model));
    }

    @ApiOperation(value = "This operation is used to save form data")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/modules/{moduleId}/forms/{formId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateFormDataByModule(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable String moduleId, @RequestBody Map<String, Object> form, @RequestParam String workflowId,
	    @PathVariable String formId, HttpServletRequest httpRequest) {
	FormRequest request = new FormRequest();
	form.put(CollectionConstants.WORKFLOW_ID, workflowId);
	request.setWorlflowId(workflowId);
	request.setFormId(formId);
	request.setModuleId(moduleId);
	request.setForm(form);
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	UpdateFormDataModel model = new UpdateFormDataModel();
	model.setRequest(request);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(updateFormCommand.execute(model));
    }

    @ApiOperation(value = "This operation is used to save form data")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @DeleteMapping(value = "/modules/{moduleId}/forms/{formId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> deleteFormDataByModule(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable String moduleId, @PathVariable String formId, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	FormRequest request = new FormRequest();
	request.setFormId(formId);
	request.setModuleId(moduleId);
	DeleteFormDataModel model = new DeleteFormDataModel();
	model.setRequest(request);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(deleteFormCommand.execute(model));
    }

    /*
     * @ApiOperation(value = "This operation is used to fetch Roles of a Client")
     * 
     * @ApiResponses({ @ApiResponse(code = 200, response = RolesResponse.class,
     * message = "Success"),
     * 
     * @ApiResponse(code = 401, response = ErrorDetails.class, message =
     * "Access token Expired / Invalid Access token"),
     * 
     * @ApiResponse(code = 403, response = ErrorDetails.class, message =
     * "ACCESS_FORBIDDEN"),
     * 
     * @ApiResponse(code = 422, response = ErrorDetails.class, message =
     * "Unable to connect database due to database is down") })
     * 
     * @EnableTokenAuthorisation
     * 
     * @GetMapping(value = "/{client_Id}/roles", produces =
     * MediaType.APPLICATION_JSON_VALUE) public ResponseEntity<RolesResponse>
     * getRoles(
     * 
     * @RequestHeader(required = true, value = "Authorization") String
     * authorization,
     * 
     * @PathVariable(required = true, value = "client_Id") String clientId) { return
     * ResponseEntity.status(HttpStatus.OK).body(roleService.getRolesByClientId(
     * clientId)); }
     */

    @ApiOperation(value = "This operation is used to fetch all forms")
    @ApiResponses({ @ApiResponse(code = 200, response = FormsResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/modules/{moduleId}/forms/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FormsResponse> fetchAllForms(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "moduleId") String moduleId,
	    @RequestBody FetchFormsRequest fetchAllRequest, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	fetchAllRequest.setModuleId(moduleId);
	FetchAllFormsModel request = new FetchAllFormsModel();
	request.setPayLoadDetails(details);
	request.setRequest(fetchAllRequest);
	return fetchAllFormsCommand.execute(request);
    }

    @ApiOperation(value = "This operation is used to fetch form by id")
    @ApiResponses({ @ApiResponse(code = 200, response = Map.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/modules/{moduleId}/forms/{formId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> fetchFormById(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "moduleId") String moduleId,
	    @PathVariable(required = true, value = "formId") String formId) {
	FormRequest request = new FormRequest();
	request.setModuleId(moduleId);
	request.setFormId(formId);
	return fetchFromByIdCommand.execute(request);
    }

    @ApiOperation(value = "This operation is used to save form data")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/modules/{moduleId}/submodule/{subModuleId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> saveFormDataByModuleAndSubModule(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "moduleId") String moduleId,
	    @PathVariable(required = true, value = "subModuleId") String subModuleId, @RequestParam String workflowId,
            @RequestParam(required = false) String jobId,
	    @RequestBody Map<String, Object> form, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	FormRequest request = new FormRequest();
	form.put(CollectionConstants.WORKFLOW_ID, workflowId);
	form.put(CollectionConstants.JOB_ID, jobId);
	request.setForm(form);
	request.setWorlflowId(workflowId);
	request.setModuleId(moduleId);
	request.setSubmoduleId(subModuleId);
	SaveFormDataModel model = new SaveFormDataModel();
	model.setRequest(request);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(createFormCommand.execute(model));
    }

    @ApiOperation(value = "This operation is used to save form data")
    @ApiResponses({ @ApiResponse(code = 200, response = FeatureTemplateResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/modules/{moduleId}/submodule/{subModuleId}/form/{formId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateFormDataByModuleAndSubModule(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "moduleId") String moduleId,
	    @PathVariable(required = true, value = "subModuleId") String subModuleId, @RequestParam String workflowId,
	    @RequestBody Map<String, Object> form, @PathVariable(required = true, value = "formId") String formId,
	    @RequestParam(required = false) String mappedBy, HttpServletRequest httpRequest) {
	FormRequest request = new FormRequest();
	form.put(CollectionConstants.WORKFLOW_ID, workflowId);
	request.setWorlflowId(workflowId);
	request.setFormId(formId);
	request.setModuleId(moduleId);
	request.setForm(form);
	request.setMappedBy(mappedBy);
	request.setSubmoduleId(subModuleId);
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	UpdateFormDataModel model = new UpdateFormDataModel();
	model.setRequest(request);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(updateFormCommand.execute(model));
    }

    @ApiOperation(value = "This operation is used to save form data")
    @ApiResponses({ @ApiResponse(code = 200, response = FeatureTemplateResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @DeleteMapping(value = "/modules/{moduleId}/submodule/{subModuleId}/form/{formId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> deleteFormDataByModuleAndSubModule(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "moduleId") String moduleId,
	    @PathVariable(required = true, value = "subModuleId") String subModuleId,
	    @PathVariable(required = true, value = "formId") String formId, HttpServletRequest httpRequest) {
	FormRequest request = new FormRequest();
	request.setFormId(formId);
	request.setModuleId(moduleId);
	request.setSubmoduleId(subModuleId);
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	DeleteFormDataModel model = new DeleteFormDataModel();
	model.setRequest(request);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(deleteFormCommand.execute(model));
    }

    @ApiOperation(value = "This operation is used to fetch all forms")
    @ApiResponses({ @ApiResponse(code = 200, response = FormsResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/modules/{moduleId}/submodule/{subModuleId}/all", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FormsResponse> fetchAllFormsBySubModule(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "moduleId") String moduleId,
	    @PathVariable(required = true, value = "subModuleId") String subModuleId,
	    @RequestParam(required = false) String mappedBy, @RequestBody FetchFormsRequest fetchAllRequest,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	fetchAllRequest.setModuleId(moduleId);
	fetchAllRequest.setSubModuleId(subModuleId);
	fetchAllRequest.setMappedBy(mappedBy);
	FetchAllFormsModel request = new FetchAllFormsModel();
	request.setPayLoadDetails(details);
	request.setRequest(fetchAllRequest);
	return fetchAllFormsCommand.execute(request);
    }

    @ApiOperation(value = "This operation is used to fetch form by id")
    @ApiResponses({ @ApiResponse(code = 200, response = Map.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/modules/{moduleId}/submodules/{submoduleId}/forms/{formId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> fetchFormById(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "moduleId") String moduleId,
	    @PathVariable(required = true, value = "submoduleId") String submoduleId,
	    @PathVariable(required = true, value = "formId") String formId,
	    @RequestParam(required = false) String mappedBy, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	FormRequest request = new FormRequest();
	request.setModuleId(moduleId);
	request.setFormId(formId);
	request.setSubmoduleId(submoduleId);
	request.setMappedBy(mappedBy);
	request.setDetails(details);
	return fetchFromByIdCommand.execute(request);
    }

    @ApiOperation(value = "This operation is used to fetch form by id")
    @ApiResponses({ @ApiResponse(code = 200, response = ColumnsAndFiltersResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/modules/{moduleId}/columnsandfilters", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ColumnsAndFiltersResponse> fetchModuleColumns(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "moduleId") String moduleId) {
	FormRequest request = new FormRequest();
	request.setModuleId(moduleId);
	return fetchColumnsAndFiltersCommand.execute(request);
    }

    @ApiOperation(value = "This operation is used to fetch form by id")
    @ApiResponses({ @ApiResponse(code = 200, response = ColumnsAndFiltersResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/modules/{moduleId}/submodules/{subModuleId}/columnsandfilters", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ColumnsAndFiltersResponse> fetchModuleColumns(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "moduleId") String moduleId,
	    @PathVariable(required = true, value = "subModuleId") String subModuleId,
	    @RequestParam(required = false) String mappedBy) {
	FormRequest request = new FormRequest();
	request.setModuleId(moduleId);
	request.setSubmoduleId(subModuleId);
	request.setMappedBy(mappedBy);
	return fetchColumnsAndFiltersCommand.execute(request);
    }

    @ApiOperation(value = "This operation is used to fetch Screen by screen-id")
    @ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/{client_id}/bulk-upload")
    public ResponseEntity<Resource> bulkUploadTemplate(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = false, value = "client_id") String clientId) throws ParseException {
	String filename = "BulkUpload.xls";
	InputStreamResource file = new InputStreamResource(ExcelService.bulkUploadTemplate());
	return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
		.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
    }
    
    @ApiOperation(value = "This operation is used to fetch Screen by screen-id")
    @ApiResponses({ @ApiResponse(code = 200, response = FetchFormResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/modules/{moduleId}/submodule/{subModuleId}/download")
    public ResponseEntity<Resource> downloadFormData(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "moduleId") String moduleId,
	    @PathVariable(required = true, value = "subModuleId") String subModuleId,
	    @RequestParam(required = false) String mappedBy, @RequestBody FetchFormsRequest fetchAllRequest,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	fetchAllRequest.setModuleId(moduleId);
	fetchAllRequest.setSubModuleId(subModuleId);
	fetchAllRequest.setMappedBy(mappedBy);
	FetchAllFormsModel request = new FetchAllFormsModel();
	request.setPayLoadDetails(details);
	request.setRequest(fetchAllRequest);
	return downloadFormDataCommand.execute(request);
    }
}
