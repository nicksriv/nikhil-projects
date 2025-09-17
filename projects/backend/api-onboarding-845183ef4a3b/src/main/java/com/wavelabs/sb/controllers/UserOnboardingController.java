package com.wavelabs.sb.controllers;

import java.text.ParseException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

import com.wavelabs.sb.command.FetchFilterSitesCommand;
import com.wavelabs.sb.command.GetEmployeeCommand;
import com.wavelabs.sb.command.GetUserEmployeeInfoCommand;
import com.wavelabs.sb.command.GetUserModulesCommand;
import com.wavelabs.sb.command.UploadUsersCommand;
import com.wavelabs.sb.command.UserLocationsFetchCommand;
import com.wavelabs.sb.command.UserLocationsUpdateCommand;
import com.wavelabs.sb.command.UploadUserLocationMappingCommand;
import com.wavelabs.sb.command.UsersCommand;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.LocationMappingFileType;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.mappers.UserOnboardingMapper;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UploadUsersModel;
import com.wavelabs.sb.model.UserLocationsUpdateModel;
import com.wavelabs.sb.model.UploadUserLocationMappingModel;
import com.wavelabs.sb.request.EmployeeRequest;
import com.wavelabs.sb.request.FetchAllUsersRequest;
import com.wavelabs.sb.request.LocationRequest;
import com.wavelabs.sb.request.UserBankRequest;
import com.wavelabs.sb.request.UserCredentialsEmailRequest;
import com.wavelabs.sb.request.UserRequest;
import com.wavelabs.sb.response.BaseResponse;
import com.wavelabs.sb.response.EmployeeDetails;
import com.wavelabs.sb.response.LocationDetailsResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.UserBankDetailsResponse;
import com.wavelabs.sb.response.UserCredentialsEmailResponse;
import com.wavelabs.sb.response.UserCredentialsResponse;
import com.wavelabs.sb.response.UserDetails;
import com.wavelabs.sb.response.UserEmployeeInfo;
import com.wavelabs.sb.response.UserLocationMapping;
import com.wavelabs.sb.response.UserModulesResponse;
import com.wavelabs.sb.response.UserPersonalInfo;
import com.wavelabs.sb.response.UserSitesFilterResponse;
import com.wavelabs.sb.response.ViewBulkUploadResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.EmailService;
import com.wavelabs.sb.services.ExcelService;
import com.wavelabs.sb.services.UserOnboardingService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class UserOnboardingController {

    @Autowired
    UserOnboardingService userOnboardingService;

    @Autowired
    UsersCommand usersCommand;

    @Autowired
    UploadUsersCommand uploadUsersCommand;

    @Autowired
    UserLocationsUpdateCommand userLocationsUpdateCommand;

    @Autowired
    UserLocationsFetchCommand userLocationsFetchCommand;

	@Autowired
    UploadUserLocationMappingCommand uploadUserLocationMappingCommand;

    @Autowired
    EmailService emailService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    GetUserModulesCommand getUserModulesCommand;

    @Autowired
    GetEmployeeCommand getEmployeeCommand;

    @Autowired
    GetUserEmployeeInfoCommand getUserEmployeeInfoCommand;
    
    @Autowired
    FetchFilterSitesCommand fetchFilterSitesCommand;

    @ApiOperation(value = "This operation is responsible to save User basic Onboarding Details  ")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/clients/{client_id}/users", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> userBasicDetailsOnboarding(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody UserRequest userRequest,
	    @PathVariable(required = true, value = "client_id") String clientId, HttpServletRequest httpRequest)
	    throws IllegalArgumentException, ParseException {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	Users user = userOnboardingService.saveUserBasicDetails(userRequest, clientId, details);
	return ResponseEntity.status(HttpStatus.OK).body(UserOnboardingMapper.toResponse(user));

    }

    @ApiOperation(value = "This operation is used to update UserLocations")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/users/{user_id}/locations", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateUserLocations(
	    @PathVariable(required = true, value = "user_id") String userId,
	    @Valid @RequestBody LocationRequest locationRequest,
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	UserLocationsUpdateModel model = new UserLocationsUpdateModel();
	model.setLocationRequest(locationRequest);
	model.setTokenPayLoadDetails(details);
	model.setUserId(userId);
	return ResponseEntity.status(HttpStatus.OK).body(userLocationsUpdateCommand.execute(model));
    }

	@ApiOperation(value = "This operation is used to upload user location mapping details")
    @ApiResponses({ 
		@ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed"),
		@ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down")
	})
    @EnableTokenAuthorisation
    @PutMapping(value = "/clients/{client_id}/upload-user-location-mapping", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SuccessResponse> uploadUserLocationMapping(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest, 
            @PathVariable(required = true, value = "client_id") String clientId,
		@RequestPart(required = true, value = "file") MultipartFile multipartFile
	) {
		UploadUserLocationMappingModel model = new UploadUserLocationMappingModel();
		TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
                details.setClientId(clientId);
		model.setDetails(details);
		model.setFile(multipartFile);

		return ResponseEntity.status(HttpStatus.OK).body(uploadUserLocationMappingCommand.execute(model));
    }

	@ApiOperation(value = "This operation is used to download user location mapping excel")
	@ApiResponses(value = {
	    @ApiResponse(code = HttpServletResponse.SC_OK, response = Resource.class, message = "File Downloaded Successfully "),
	    @ApiResponse(code = HttpServletResponse.SC_BAD_REQUEST, response = ErrorDetails.class, message = "Invalid parameters"),
	    @ApiResponse(code = HttpServletResponse.SC_UNAUTHORIZED, response = ErrorDetails.class, message = "Invalid Token / Without Token"),
	    @ApiResponse(code = HttpServletResponse.SC_FORBIDDEN, response = ErrorDetails.class, message = "UnAuthorized Access") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/location-mapping-download")
    public ResponseEntity<Resource> downloadLocationMapping(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
		@RequestParam(required = true) LocationMappingFileType fileType
	) throws ParseException {
		String filename = "LocationMapping-" + fileType + ".xls";
		InputStreamResource file = new InputStreamResource(ExcelService.locationMappingExcel(fileType));
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
			.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
    }

	@ApiOperation(value = "This operation is used to get user location mapping details")
    @ApiResponses({ 
		@ApiResponse(code = 200, response = PaginationResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") 
	})
    @EnableTokenAuthorisation
    @GetMapping(value = "/users/{userId}/location-mappings", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserLocationMapping>> getUserLocationMapping(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "userId") String userId
	) {
		return ResponseEntity.ok(userOnboardingService.getUserLocationMapping(userId));
    }

    @ApiOperation(value = "This operation is responsible to update User employee Details  ")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/users/{user_id}/employee", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateUserEmployeeDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody EmployeeRequest employeeRequest,
	    @PathVariable(required = true, value = "user_id") String userId, HttpServletRequest httpRequest)
	    throws IllegalArgumentException, ParseException {
	TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpRequest);
	userOnboardingService.updateEmployeeDetails(employeeRequest, userId, tokenPayLoadDetails);
	return ResponseEntity.status(HttpStatus.OK)
		.body(SuccessResponse.newInstance(Constants.USER_EMPLOYEE_DETAILS_SAVED));
    }

    @ApiOperation(value = "This operation is responsible to save User Bank Details  ")
    @ApiResponses({
	    @ApiResponse(code = 200, response = SuccessResponse.class, message = "User bank details are saved..!"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/users/{user_id}/banks", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BaseResponse> userBankDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody UserBankRequest userBankRequest,
	    @PathVariable(required = true, value = "user_id") String userId, HttpServletRequest httpRequest) {
	TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpRequest);
	return ResponseEntity.status(HttpStatus.OK)
		.body(userOnboardingService.saveUserBankDetails(userBankRequest, userId, tokenPayLoadDetails));
    }

    @ApiOperation(value = "This operation is responsible to update User basic Onboarding Details  ")
    @ApiResponses({ @ApiResponse(code = 200, response = BaseResponse.class, message = Constants.USER_UPDATED),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/users/{user_id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BaseResponse> updateUserBasicDetailsOnboarding(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody UserRequest userRequest,
	    @PathVariable(required = true, value = "user_id") String userId, HttpServletRequest httpRequest)
	    throws IllegalArgumentException, ParseException {
	TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpRequest);
	return ResponseEntity.status(HttpStatus.OK)
		.body(userOnboardingService.updateUserBasicDetails(userRequest, userId, tokenPayLoadDetails));

    }

    @ApiOperation(value = "This operation is used to fetch all user details")
    @ApiResponses({ @ApiResponse(code = 200, response = PaginationResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/clients/{client_id}/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PaginationResponse<UserDetails>> fetchAllUsers(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "client_id") String clientId,
	    @ModelAttribute FetchAllUsersRequest fetchAllRequest) {
	PaginationResponse<Users> fetchAll = userOnboardingService.fetchAll(fetchAllRequest, clientId, Boolean.TRUE);
	return ResponseEntity.ok(UserOnboardingMapper.toFetchResponse(fetchAll));
    }

    @ApiOperation(value = "This operation is used to fetch user details")
    @ApiResponses({ @ApiResponse(code = 200, response = UserPersonalInfo.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/users/{user_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserPersonalInfo> getUserDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "user_id") String userId) {
	Users user = usersCommand.execute(userId);
	return ResponseEntity.ok(UserOnboardingMapper.toUserPersonalInfo(user));
    }

    @ApiOperation(value = "This operation is used to fetch user employee details")
    @ApiResponses({ @ApiResponse(code = 200, response = EmployeeDetails.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/users/{user_id}/employee", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EmployeeDetails> getUserEmployeeDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "user_id") String userId) {
	return ResponseEntity.ok(getEmployeeCommand.execute(userId));
    }

    @ApiOperation(value = "This operation is used to Deactivate a User")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @DeleteMapping(value = "/users/{user_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> deleteUser(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable("user_id") String userId, HttpServletRequest httpRequest) {
	TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpRequest);
	return ResponseEntity.status(HttpStatus.OK)
		.body(userOnboardingService.deleteUserByUserId(userId, tokenPayLoadDetails));
    }

    @ApiOperation(value = "This operation is responsible to get User Bank Details  ")
    @ApiResponses({
	    @ApiResponse(code = 200, response = SuccessResponse.class, message = "User bank details are fetched..!"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/users/{user_id}/banks", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserBankDetailsResponse> fetchUserBankDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "user_id") String userId) {
	return ResponseEntity.status(HttpStatus.OK).body(userOnboardingService.fetchUserBankDetails(userId));
    }

    @ApiOperation(value = "This operation is used to view locations of a User")
    @ApiResponses({ @ApiResponse(code = 200, response = LocationDetailsResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/users/{user_id}/locations", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LocationDetailsResponse> viewLocationsByUserId(
	    @PathVariable(required = true, value = "user_id") String userId,
	    @RequestHeader(required = true, value = "Authorization") String authorization) {
	return ResponseEntity.status(HttpStatus.OK).body(userLocationsFetchCommand.execute(userId));
    }

    @ApiOperation(value = "This operation is used to upload bulk of Users Excel")
    @ApiResponses({ @ApiResponse(code = 200, response = LocationDetailsResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/users/{client_id}/bulk-upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ViewBulkUploadResponse> uploadUsers(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "client_id") String clientId,
	    @RequestPart("file") MultipartFile file, HttpServletRequest httpRequest) {
	TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpRequest);
	UploadUsersModel model = new UploadUsersModel();
	model.setClientId(clientId);
	model.setFile(file);
	model.setTokenPayLoadDetails(tokenPayLoadDetails);
	return ResponseEntity.status(HttpStatus.OK).body(uploadUsersCommand.execute(model));

    }

    @ApiOperation(value = "This operation is used to Chnage password of a User")
    @ApiResponses({ @ApiResponse(code = 200, response = LocationDetailsResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/users/{user_id}/reset", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> userPasswordChange(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "user_id") String userId, @RequestParam String newPassword,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getTokenPayLoadDetails(httpRequest);
	return ResponseEntity.status(HttpStatus.OK)
		.body(userOnboardingService.changePasswordOfUser(userId, newPassword, tokenPayLoadDetails));
    }

    @ApiResponses(value = {
	    @ApiResponse(code = HttpServletResponse.SC_OK, response = Resource.class, message = "File Downloaded Successfully "),
	    @ApiResponse(code = HttpServletResponse.SC_BAD_REQUEST, response = ErrorDetails.class, message = "Invalid parameters"),
	    @ApiResponse(code = HttpServletResponse.SC_UNAUTHORIZED, response = ErrorDetails.class, message = "Invalid Token / Without Token"),
	    @ApiResponse(code = HttpServletResponse.SC_FORBIDDEN, response = ErrorDetails.class, message = "UnAuthorized Access") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/clients/{client_id}/users-download")
    public ResponseEntity<Resource> downloadUsersDetails(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "client_id") String clientId,
	    @ModelAttribute FetchAllUsersRequest fetchAllRequest) throws ParseException {
	PaginationResponse<Users> fetchAll = userOnboardingService.fetchAll(fetchAllRequest, clientId, Boolean.FALSE);
	List<UserDetails> userDetails = UserOnboardingMapper.toFetchResponse(fetchAll).getData();
	String filename = "UserDetails.xls";
	InputStreamResource file = new InputStreamResource(ExcelService.userDetailsToExcel(userDetails));
	return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
		.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
    }

    @ApiResponses(value = {
	    @ApiResponse(code = HttpServletResponse.SC_OK, response = Resource.class, message = "File Downloaded Successfully "),
	    @ApiResponse(code = HttpServletResponse.SC_BAD_REQUEST, response = ErrorDetails.class, message = "Invalid parameters"),
	    @ApiResponse(code = HttpServletResponse.SC_UNAUTHORIZED, response = ErrorDetails.class, message = "Invalid Token / Without Token"),
	    @ApiResponse(code = HttpServletResponse.SC_FORBIDDEN, response = ErrorDetails.class, message = "UnAuthorized Access") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/clients/{client_id}/bulk-upload")
    public ResponseEntity<Resource> usersBulkUploadTemplate(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "client_id") String clientId) throws ParseException {
	String filename = "UsersBulkUpload.xls";
	InputStreamResource file = new InputStreamResource(ExcelService.usersBulkUploadTemplate());
	return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
		.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
    }

    @ApiOperation(value = "This operation is used to fetch Credentials of a User")
    @ApiResponses({ @ApiResponse(code = 200, response = UserCredentialsResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping("/users/{user_id}/credentials")
    public ResponseEntity<UserCredentialsResponse> getCredentials(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable(required = true, value = "user_id") String userId) {
	return ResponseEntity.status(HttpStatus.OK).body(userOnboardingService.fetchCredentialsByUserId(userId));
    }

    @ApiOperation(value = "This operation is used to send credentails to Email Address")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/users/{user_id}/email", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> sendUserCredentials(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @PathVariable("user_id") String userId) {
	return ResponseEntity.status(HttpStatus.OK).body(emailService.shareUserCredentialsEmail(userId));
    }

    @ApiOperation(value = "This operation is used to fetch credentails to Email Address")
    @ApiResponses({ @ApiResponse(code = 200, response = UserCredentialsEmailResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/users/{user_id}/email-template", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserCredentialsEmailResponse> getUserCredentialsEmail(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @PathVariable("user_id") String userId) {

	return ResponseEntity.status(HttpStatus.OK).body(emailService.getUserCredentialsEmailTemplate(userId));
    }

    @ApiOperation(value = "This operation is used to send credentails to Email Address")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/users/{user_id}/email-template", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> sendUserCredentialsEmail(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    @Valid @RequestBody UserCredentialsEmailRequest request, @PathVariable("user_id") String userId) {

	return ResponseEntity.status(HttpStatus.OK).body(emailService.sendUserCredentialsEmail(request));
    }

    @ApiOperation(value = "This operation is used to fetch user modules")
    @ApiResponses({ @ApiResponse(code = 200, response = UserCredentialsEmailResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/users/modules", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserModulesResponse>> getUserModules(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	return getUserModulesCommand.execute(details);
    }

    @ApiOperation(value = "This operation is used to fetch user modules")
    @ApiResponses({ @ApiResponse(code = 200, response = UserEmployeeInfo.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/employee-info", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserEmployeeInfo>> getUserInfo(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	return getUserEmployeeInfoCommand.execute(details);
    }

    @ApiOperation(value = "This operation is used to view locations of a User")
    @ApiResponses({ @ApiResponse(code = 200, response = LocationDetailsResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/users/filter-sites", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserSitesFilterResponse>> fetchSitesByUser(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	return fetchFilterSitesCommand.execute(details);
    }

}
