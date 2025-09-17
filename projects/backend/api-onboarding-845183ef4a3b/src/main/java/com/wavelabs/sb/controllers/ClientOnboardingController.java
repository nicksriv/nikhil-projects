package com.wavelabs.sb.controllers;

import java.io.IOException;
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

import com.wavelabs.sb.command.CreateClientCommand;
import com.wavelabs.sb.command.EditWorkflowAndThemeCommand;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ClientsCredentials;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.ClientOnboardingMapper;
import com.wavelabs.sb.model.CreateClientModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UpdatePrivilegesModel;
import com.wavelabs.sb.request.ClientCredentialsEmailRequest;
import com.wavelabs.sb.request.ClientModuleRequest;
import com.wavelabs.sb.request.ClientOnboardingRequest;
import com.wavelabs.sb.request.ClientOnboardingUpdateRequest;
import com.wavelabs.sb.request.EditPasswordRequest;
import com.wavelabs.sb.request.EditWorkflowAndThemeRequest;
import com.wavelabs.sb.request.FetchAllRequest;
import com.wavelabs.sb.response.AssignedQualityAssuranceResponse;
import com.wavelabs.sb.response.ClientCredentialsEmailResponse;
import com.wavelabs.sb.response.ClientCredentialsResponse;
import com.wavelabs.sb.response.ClientDetails;
import com.wavelabs.sb.response.ClientOnboardingDetailsResponse;
import com.wavelabs.sb.response.FetchAllClientResponse;
import com.wavelabs.sb.response.ModuleIdResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.ClientOnboardingService;
import com.wavelabs.sb.services.EmailService;
import com.wavelabs.sb.services.ExcelService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/api/v1/clients")
@CrossOrigin("*")
public class ClientOnboardingController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    ClientOnboardingService clientOnboardingService;

    @Autowired
    EmailService emailService;

    @Autowired
    CreateClientCommand createClientCommand;

    @Autowired
    EditWorkflowAndThemeCommand editCommand;

    @ApiOperation(value = "This operation is responsible to save Client Onboarding Details  ")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> createClientOnboarding(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody ClientOnboardingRequest clientOnboardingRequest, HttpServletRequest httpRequest)
	    throws IllegalArgumentException {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	CreateClientModel model = new CreateClientModel();
	model.setClientOnboardingRequest(clientOnboardingRequest);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(createClientCommand.execute(model));
    }

    @ApiOperation(value = "This operation is responsible to save Client Onboarding modules  ")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "{clientId}/modules", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateModulesOnClient(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "clientId") String clientId,
	    @Valid @RequestBody List<ClientModuleRequest> clientModuleRequest, HttpServletRequest httpRequest)
	    throws ResourceNotFoundException {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	ClientOnboardingDetails clientonboardingdetails = clientOnboardingService.updateClientModules(clientId, details,
		clientModuleRequest);
	return ResponseEntity.status(HttpStatus.OK).body(ClientOnboardingMapper.toResponse(clientonboardingdetails));
    }

//    @ApiOperation(value = "This operation is responsible to save Client Onboarding Roles ")
//    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
//	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
//	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed") })
//    @PutMapping(value = "/{clientId}/privileges", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<SuccessResponse> updateRolesOnClient(@PathVariable("clientId") String clientId,
//	    @Valid @RequestBody List<ClientRolesRequest> clientRolesRequest) throws ResourceNotFoundException {
//
//	ClientOnboardingDetails clientonboardingdetails = clientOnboardingService.updateClientRoles(clientId,
//		clientRolesRequest);
//	return ResponseEntity.status(HttpStatus.OK)
//		.body(ClientOnboardingMapper.getClientCredentilasResponse(clientonboardingdetails));
//
//    }

    @ApiOperation(value = "This operation is responsible to save Client Onboarding Roles ")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/{clientId}/privileges", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateRolesOnClient(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable("clientId") String clientId, @Valid @RequestBody EditWorkflowAndThemeRequest request,
	    HttpServletRequest httpRequest) throws ResourceNotFoundException {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	request.setClientId(clientId);
	UpdatePrivilegesModel model = new UpdatePrivilegesModel();
	model.setEditWorkflowAndThemeRequest(request);
	model.setTokenPayLoadDetails(details);
	return ResponseEntity.status(HttpStatus.OK).body(editCommand.execute(model));
    }

    @ApiOperation(value = "This operation is responsible to Update Client Onboarding Basic Details ")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/{clientId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateClientOnboardingDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @PathVariable("clientId") String clientId,
	    @Valid @RequestBody ClientOnboardingUpdateRequest clientOnboardingUpdateRequest,
	    HttpServletRequest httpRequest) throws ResourceNotFoundException {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	ClientOnboardingDetails clientonboardingdetails = clientOnboardingService.clientDetailsUpdate(clientId,
		clientOnboardingUpdateRequest, details);
	return ResponseEntity.status(HttpStatus.OK)
		.body(ClientOnboardingMapper.getClientDetailsUpdated(clientonboardingdetails));
    }

    @ApiOperation(value = "This operation is used to search Clients Records based on client details")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PaginationResponse<FetchAllClientResponse>> fetchAll(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @ModelAttribute FetchAllRequest fetchAllRequest) {
	PaginationResponse<ClientOnboardingDetails> fetchAll = clientOnboardingService.fetchAll(fetchAllRequest);
	return ResponseEntity.ok(clientOnboardingService.fetchAllClientResponse(fetchAll));
    }

    @ApiOperation(value = "This operation is used to fetch Client by id")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ClientOnboardingDetailsResponse> getClientById(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable("id") String id) {
	return ResponseEntity.status(HttpStatus.OK).body(clientOnboardingService.fetchClientById(id));
    }

    @ApiOperation(value = "This operation is used to fetch the Modules of a Client")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/{id}/modules", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ModuleIdResponse>> getModulesByClientId(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable("id") String id) {
	return ResponseEntity.status(HttpStatus.OK).body(clientOnboardingService.fetchModulesByClientId(id));
    }

//    @ApiOperation(value = "This operation is used to fetch the Privileges of a Client")
//    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
//	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
//	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed") })
//    @GetMapping(value = "/{id}/privileges", produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<List<ClientPrivilegesResponse>> getPrivilegesByClientId(@PathVariable("id") String id) {
//	return ResponseEntity.status(HttpStatus.OK).body(clientOnboardingService.fetchPrivilegesByClientId(id));
//    }

    @ApiOperation(value = "This operation is used to Deactivate a Client")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> deleteClient(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable("id") String id, HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	return ResponseEntity.status(HttpStatus.OK).body(clientOnboardingService.deleteClientByClientId(id, details));
    }

    @ApiOperation(value = "This operation is used to Save Logo of a Client")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/upload-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> saveLogo(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @RequestPart(required = true, value = "file") MultipartFile multipartFile) throws IOException {
	return ResponseEntity.status(HttpStatus.OK).body(clientOnboardingService.saveImage(multipartFile));
    }

    @ApiOperation(value = "This operation is used to Fetch Logo of a Client")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping("/{id}/logo")
    public ResponseEntity<Resource> getClientLogo(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "id") String id) throws IOException {
	return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_OCTET_STREAM)
		.body(clientOnboardingService.getClientLogo(id));
    }

    @ApiOperation(value = "This operation is used to fetch Credentials of a Client")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping("/{clientId}/credentials")
    public ResponseEntity<ClientCredentialsResponse> getCredentials(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "clientId") String clientId) {
	return ResponseEntity.status(HttpStatus.OK).body(clientOnboardingService.fetchCredentialsByClientId(clientId));
    }

    @ApiOperation(value = "This operation is used to Change password of a Client")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping("/{clientId}/password-change")
    public ResponseEntity<SuccessResponse> changeClientPassword(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @PathVariable("clientId") String clientId, @Valid @RequestBody EditPasswordRequest request,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	return ResponseEntity.status(HttpStatus.OK)
		.body(clientOnboardingService.changePasswordOfClient(clientId, request, details));
    }

    @ApiOperation(value = "This operation is used to send credentails to Email Address")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "{clientId}/email", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> sendClientCredentials(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @PathVariable("clientId") String clientId) {

	return ResponseEntity.status(HttpStatus.OK).body(emailService.shareClientCredentialsEmail(clientId));
    }

    @ApiOperation(value = "This operation is used to fetch credentials of a client")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "{clientId}/email-template", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ClientCredentialsEmailResponse> getClientCredentialsEmail(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @PathVariable("clientId") String clientId) {

	return ResponseEntity.status(HttpStatus.OK).body(emailService.getClientCredentialsEmailTemplate(clientId));
    }

    @ApiOperation(value = "This operation is used to send credentails to a specific Email Address")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "{clientId}/email-template", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> sendClientCredentialsEmail(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody ClientCredentialsEmailRequest request, @PathVariable("clientId") String clientId) {

	return ResponseEntity.status(HttpStatus.OK).body(emailService.sendClientCredentialsEmail(request));
    }

    @ApiOperation(value = "This operation is used to Download clients details to Excel")
    @ApiResponses({ @ApiResponse(code = 200, response = ClientsCredentials.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/download")
    public ResponseEntity<Resource> downloadClientsDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @ModelAttribute FetchAllRequest fetchAllRequest) {
	fetchAllRequest.setPaginationRequired(false);
	PaginationResponse<ClientOnboardingDetails> fetchAll = clientOnboardingService.fetchAll(fetchAllRequest);
	List<ClientDetails> clientsDetails = ClientOnboardingMapper.clientDetailsResponse(fetchAll).getData();
	String filename = "OnboardedClientsDetails.xls";
	InputStreamResource file = new InputStreamResource(ExcelService.clientDetailsToExcel(clientsDetails));
	return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
		.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
    }
	
	@ApiOperation(value = "This operation is used to get QualityAssurances assigned to clients")
	@ApiResponses({ @ApiResponse(code = 200, response = AssignedQualityAssuranceResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
	@GetMapping("{clientId}/assign/qualityAssurance")
	public List<AssignedQualityAssuranceResponse> getAssignedQualityAssurance(@PathVariable String clientId, HttpServletRequest request){
		
		TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getAdminTokenPayLoadDetails(request);
		return clientOnboardingService.getAssignedQualityAssurance(clientId);

	}

	@ApiOperation(value = "This operation is used to update the status of client")
	@ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
	@PutMapping("{clientId}/status")
	public SuccessResponse updateClientStatus(@PathVariable String clientId, @RequestParam Status status, HttpServletRequest request){
		TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getAdminTokenPayLoadDetails(request);
		clientOnboardingService.updateClientStatus(clientId,status);
		return new SuccessResponse("Status updated");
	}

}
