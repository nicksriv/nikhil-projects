package com.wavelabs.sb.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.wavelabs.sb.command.GetFileCommand;
import com.wavelabs.sb.command.UploadFileCommand;
import com.wavelabs.sb.enums.FileType;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.UploadFilesRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@Validated
@RequestMapping("/api/v1/files")
@CrossOrigin("*")
public class FileController {

    @Autowired
    UploadFileCommand uploadFileCommand;

    @Autowired
    GetFileCommand getFileCommand;

    @Autowired
    AuthenticationService authenticationService;

    @ApiOperation(value = "This operation is used to Save profile image")
    @ApiResponses({ @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed") })
    @EnableTokenAuthorisation
    @PutMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SuccessResponse> saveFile(
	    @RequestHeader(required = true, value = "Authorization") String authorization,
	    HttpServletRequest httpRequest, @RequestPart("file") MultipartFile file,
	    @RequestParam FileType fileType) {
	UploadFilesRequest request = new UploadFilesRequest();
	TokenPayLoadDetails details = authenticationService.getTokenPayLoadDetails(httpRequest);
	request.setDetails(details);
	request.setFile(file);
	request.setFiletype(fileType);
	return ResponseEntity.status(HttpStatus.OK).body(uploadFileCommand.execute(request));
    }

    @ApiOperation(value = "This operation is used to Fetch profile image")
    @ApiResponses({ @ApiResponse(code = 200, response = Resource.class, message = "Success"),
	    @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
	    @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed") })
    @GetMapping("/{fileId}")
    public ResponseEntity<Resource> getClientLogo( @PathVariable String fileId) {

	return getFileCommand.execute(fileId);
	
    }
}
