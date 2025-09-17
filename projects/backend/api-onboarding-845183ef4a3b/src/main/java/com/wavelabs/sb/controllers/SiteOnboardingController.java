 package com.wavelabs.sb.controllers;

import java.text.ParseException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.wavelabs.sb.command.DeleteSiteCommand;
import com.wavelabs.sb.command.DownloadAllSitesCommand;
import com.wavelabs.sb.command.EmployeeCommand;
import com.wavelabs.sb.command.FetchAllSitesCommand;
import com.wavelabs.sb.command.FetchSiteCommand;
import com.wavelabs.sb.command.SiteOnboardingCommand;
import com.wavelabs.sb.command.SiteOnboardingUpdateCommand;
import com.wavelabs.sb.command.SitesBulkUploadCommand;
import com.wavelabs.sb.documents.SiteOnboardingDetails;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.CreateSiteModel;
import com.wavelabs.sb.model.DeleteSiteModel;
import com.wavelabs.sb.model.SiteDetails;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UpdateSiteModel;
import com.wavelabs.sb.model.UploadSitesModel;
import com.wavelabs.sb.request.FetchAllSitesRequest;
import com.wavelabs.sb.request.SearchEmployee;
import com.wavelabs.sb.request.SiteOnboardingRequest;
import com.wavelabs.sb.request.SiteOnboardingUpdateRequest;
import com.wavelabs.sb.response.EmployeeInfo;
import com.wavelabs.sb.response.FetchAllSitesResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SiteResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.ViewBulkUploadResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.ExcelService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/api/v1/sites")
@CrossOrigin("*")
public class SiteOnboardingController {

    @Autowired
    SiteOnboardingCommand siteOnboardingCommand;

    @Autowired
    SiteOnboardingUpdateCommand siteOnboardingUpdateCommand;

    @Autowired
    DeleteSiteCommand deleteSiteCommand;

    @Autowired
    EmployeeCommand employeeCommand;

    @Autowired
    FetchAllSitesCommand fetchAllSitesCommand;

    @Autowired
    SitesBulkUploadCommand sitesBulkUploadCommand;

    @Autowired
    FetchSiteCommand fetchSiteCommand;

    @Autowired
    DownloadAllSitesCommand downloadAllSitesCommand;
    
    @Autowired
    AuthenticationService authenticationService;

    @ApiOperation(value = "This operation is for saving Site Details")
    @ApiResponses({ @ApiResponse(code = 200, response = SiteOnboardingRequest.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> saveSite(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody SiteOnboardingRequest siteOnboardingRequest, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	CreateSiteModel model = new CreateSiteModel();
	model.setSiteOnboardingRequest(siteOnboardingRequest);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.CREATED).body(siteOnboardingCommand.execute(model));
    }

    @ApiOperation(value = "This operation is for updating Site Details")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateSite(
	    @RequestHeader(required = true, value = "Authorization") String authorization, @PathVariable String id,
	    @Valid @RequestBody SiteOnboardingUpdateRequest request, HttpServletRequest httpRequest) {
	request.setId(id);
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	UpdateSiteModel model = new UpdateSiteModel();
	model.setSiteOnboardingUpdateRequest(request);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.CREATED).body(siteOnboardingUpdateCommand.execute(model));
    }

    @ApiOperation(value = "This operation is for Deactivating a Site")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @DeleteMapping(value = "/{site_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> deleteSite(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable("site_id") String siteId, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	DeleteSiteModel model = new DeleteSiteModel();
	model.setSiteId(siteId);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(deleteSiteCommand.execute(model));
    }

    @ApiOperation(value = "This operation is for searching an Employee by userId and  clientId")
    @ApiResponses({ @ApiResponse(code = 200, response = EmployeeInfo.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/employee/{user_id}/client/{client_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EmployeeInfo> getEmployeeDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "user_id") String userId,
	    @PathVariable(required = true, value = "client_id") String clientId) {
	SearchEmployee searchEmp = new SearchEmployee();
	searchEmp.setClientId(clientId);
	searchEmp.setUserId(userId);
	return employeeCommand.execute(searchEmp);
    }

    @ApiOperation(value = "This operation is used to fetch All Sites details")
    @ApiResponses({ @ApiResponse(code = 200, response = FetchAllSitesResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PaginationResponse<FetchAllSitesResponse>> fetchAllSites(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @ModelAttribute FetchAllSitesRequest fetchAllSitesRequest,@RequestParam String clientId) {
	fetchAllSitesRequest.setClientId(clientId);
	return fetchAllSitesCommand.execute(fetchAllSitesRequest);
    }

    @ApiOperation(value = "This operation is used for Downloading Sites Bulk Upload Template")
    @ApiResponses({ @ApiResponse(code = 200, response = SiteOnboardingDetails.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/bulkupload/template")
    public ResponseEntity<Resource> downloadSitesBulkUploadTemplate(
	    @RequestHeader(required = true, value = "Authorization") String authorization) throws ParseException {
	String filename = "SitesBulkUpload.xls";
	InputStreamResource file = new InputStreamResource(ExcelService.sitesBulkUploadTemplate());
	return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
		.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
    }

    @ApiOperation(value = "This operation is used to upload sites data")
    @ApiResponses({ @ApiResponse(code = 200, response = ViewBulkUploadResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/{client_id}/bulkupload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ViewBulkUploadResponse> uploadSites(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "client_id") String clientId,
	    @RequestPart("file") MultipartFile file, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	UploadSitesModel model = new UploadSitesModel();
	model.setTokenPayLoadDetails(details);
	model.setClientId(clientId);
	model.setFile(file);
	return ResponseEntity.status(HttpStatus.OK).body(sitesBulkUploadCommand.execute(model));
    }

    @ApiOperation(value = "This operation is used to fetch Site by id")
    @ApiResponses({ @ApiResponse(code = 200, response = SiteResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SiteResponse> fetchSite(
	    @RequestHeader(required = true, value = "Authorization") String authorization, @PathVariable String id) {
	return fetchSiteCommand.execute(id);
    }

    @ApiOperation(value = "This operation is used to Download Sites Details")
    @ApiResponses({ @ApiResponse(code = 200, response = SiteDetails.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/{client_id}/download")
    public ResponseEntity<Resource> downloadSitesDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "client_id") String clientId,
	    @ModelAttribute FetchAllSitesRequest fetchAllSitesRequest) {
	fetchAllSitesRequest.setPaginationRequired(false);
	fetchAllSitesRequest.setClientId(clientId);
	List<SiteDetails> sitesDetailsList = downloadAllSitesCommand.execute(fetchAllSitesRequest);
	String filename = "OnboardedSitesDetails.xls";
	InputStreamResource file = new InputStreamResource(ExcelService.sitesDetailsToExcel(sitesDetailsList));
	return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
		.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
    }

}