package com.wavelabs.sb.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.wavelabs.sb.command.GetProfileImageCommand;
import com.wavelabs.sb.command.UpdatePasswordCommand;
import com.wavelabs.sb.command.UploadProfileImageCommand;
import com.wavelabs.sb.command.UserProfileFetchCommand;
import com.wavelabs.sb.command.UserProfileUpdateCommand;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.model.UserProfileUpdateModel;
import com.wavelabs.sb.request.ChangePasswordRequest;
import com.wavelabs.sb.request.UpdatePasswordRequest;
import com.wavelabs.sb.request.UploadProfileImageRequest;
import com.wavelabs.sb.request.UserProfileUpdateRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.UserProfileDetails;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.UserProfileService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/api/v1/profiles")
@CrossOrigin("*")
public class UserProfileController {

    @Autowired
    UserProfileService userProfileService;

    @Autowired
    UserProfileFetchCommand userProfileFetchCommand;

    @Autowired
    UserProfileUpdateCommand userProfileUpdateCommand;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    UpdatePasswordCommand updatePasswordCommand;

    @Autowired
    UploadProfileImageCommand uploadProfileImageCommand;

    @Autowired
    GetProfileImageCommand getProfileImageCommand;


    @ApiOperation(value = "This operation is used to send credentails to Email Address")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed") })
    @EnableTokenAuthorisation
    @PostMapping(value = "/changepassword", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updatePassword(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest, @Valid @RequestBody ChangePasswordRequest request) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);

	UpdatePasswordRequest updatePasswordRequest = new UpdatePasswordRequest();
	updatePasswordRequest.setChangePasswordRequest(request);
	updatePasswordRequest.setPayLoadDetails(details);
	return updatePasswordCommand.execute(updatePasswordRequest);
    }

    @ApiOperation(value = "This operation is used to fetch Profile Details")
    @ApiResponses({ @ApiResponse(code = 200, response = UserProfileDetails.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserProfileDetails> retrieveUserProfile(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);

	return ResponseEntity.status(HttpStatus.OK).body(userProfileFetchCommand.execute(details));
    }

    @ApiOperation(value = "This operation is used to update Profile Details")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
	    @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
	    @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> updateUserProfile(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest, @Valid @RequestBody UserProfileUpdateRequest request) {
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	UserProfileUpdateModel profileDetailsToUpdate = new UserProfileUpdateModel();
	profileDetailsToUpdate.setTokenPayLoadDetails(details);
	profileDetailsToUpdate.setUserProfileUpdateRequest(request);
	return ResponseEntity.status(HttpStatus.OK).body(userProfileUpdateCommand.execute(profileDetailsToUpdate));
    }

    @ApiOperation(value = "This operation is used to Save profile image")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/upload-profile-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SuccessResponse> saveImage(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest, @RequestPart(required = true, value = "file") MultipartFile multipartFile) {
	UploadProfileImageRequest request = new UploadProfileImageRequest();
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	request.setDetails(details);
	request.setFile(multipartFile);
	return ResponseEntity.status(HttpStatus.OK).body(uploadProfileImageCommand.execute(request));
    }

    @ApiOperation(value = "This operation is used to Fetch profile image")
    @ApiResponses({ @ApiResponse(code = 200, response = Resource.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed") })
    @EnableTokenAuthorisation
    @GetMapping("/profile-image")
    public ResponseEntity<Resource> getProfileImage(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest) {
	TokenPayLoadDetails request = authenticationService.getTokenPayLoadDetails(httpRequest);
	return getProfileImageCommand.execute(request);
    }

   
}