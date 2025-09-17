package com.wavelabs.sb.controllers;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.documents.QualityAssurance;
import com.wavelabs.sb.enums.QualityControllerStatus;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.request.EditPasswordRequest;
import com.wavelabs.sb.request.QualityAssuranceCredentialsEmailRequest;
import com.wavelabs.sb.request.QualityAssuranceRequestDto;
import com.wavelabs.sb.response.QualityAssuranceCredentialsEmailResponse;
import com.wavelabs.sb.response.QualityAssuranceCredentialsResponse;
import com.wavelabs.sb.response.QualityAssuranceDetailResponse;
import com.wavelabs.sb.response.QualityAssuranceListResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.ClientOnboardingService;
import com.wavelabs.sb.services.EmailService;
import com.wavelabs.sb.services.QualityAssuranceExcelService;
import com.wavelabs.sb.services.QualityAssuranceService;
import com.wavelabs.sb.utils.ClassUtil;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("api/v1/quality-assurances")
public class QualityAssuranceController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    QualityAssuranceService qualityAssuranceService;

    @Autowired
    ClientOnboardingService clientOnboardingService;

    @Autowired
    QualityAssuranceExcelService qaExcelService;

    @Autowired
    ClientOnboardingRepository clientOnboardingRepository;

    @Autowired
    EmailService emailService;

    @ApiOperation(value = "This operation is used to list Quality Assurance")
    @ApiResponses({
        @ApiResponse(code = 200, response = QualityAssurance.class, message = "Success"),
        @ApiResponse(code = 200, response = QualityAssuranceListResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @GetMapping("")
    public Page<QualityAssuranceListResponse> getqaList(Pageable pageable,HttpServletRequest httpRequest,
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String qualityAssuranceRefNo,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String mobile,
            @RequestParam(required = false) String qualityControllerStatus,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to) {
                authenticationService.getAdminTokenPayLoadDetails(httpRequest);

        Page<QualityAssurance> qaPage = qualityAssuranceService.getqaList(pageable, id, firstName, lastName,
                qualityAssuranceRefNo, email, mobile, qualityControllerStatus , from , to );
        Page<QualityAssuranceListResponse> qaListResponse = qualityAssuranceService.getQualityAssuranceResponseList(qaPage);
        return qaListResponse;
    }

    @ApiOperation(value = "This operation is used to download the excel")
    @ApiResponses({
        @ApiResponse(code = 200, response = ResponseEntity.class, message = "Success"),
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @GetMapping("excel/download")
    public ResponseEntity<byte[]> excelDownload(Pageable pageable,HttpServletRequest httpRequest,
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String qualityAssuranceRefNo,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String mobile,
            @RequestParam(required = false) String qualityControllerStatus,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to) {

                authenticationService.getAdminTokenPayLoadDetails(httpRequest);

        Page<QualityAssuranceListResponse> qaPage = getqaList(Pageable.unpaged(), httpRequest, id, firstName, lastName,
                qualityAssuranceRefNo, email, mobile, qualityControllerStatus, from , to);
        List<QualityAssuranceListResponse> qaList = qaPage.getContent();
        List<QualityAssuranceListResponse> qaListResponse = ClassUtil.convertList(qaList,
                QualityAssuranceListResponse.class);

        byte[] contents = QualityAssuranceExcelService.getQaExcel(qaListResponse);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType
                .valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        headers.setContentDispositionFormData("Freelancer Details", "QA-details-" + ".xlsx");
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);

        return response;
    }

    @ApiOperation(value = "This operation is used to update the status of Quality Assurance")
    @ApiResponses({
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @PutMapping("{qualityAssuranceId}/status")
    public SuccessResponse updateStatus(@PathVariable String qualityAssuranceId,
            @RequestParam QualityControllerStatus qualityControllerStatus, HttpServletRequest httpRequest) {
        authenticationService.getAdminTokenPayLoadDetails(httpRequest);

        qualityAssuranceService.updateStatus(qualityAssuranceId, qualityControllerStatus);
        return new SuccessResponse("Quality Assurance Status Updated");

    }

    @ApiOperation(value = "This operation is used to Add Quality Assurance")
    @ApiResponses({
        @ApiResponse(code = 200, response = QualityAssurance.class, message = "Success"),
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @PostMapping("")
    public SuccessResponse addQualityAssuranceDetails(@RequestBody QualityAssuranceRequestDto qualityAssuranceRequestDto, HttpServletRequest httpRequest) {

        authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        qualityAssuranceService.validate(qualityAssuranceRequestDto);
        qualityAssuranceService.createQualityAssuranceDeatils(qualityAssuranceRequestDto);
        return new SuccessResponse("Quality Assurance added successfully");
    }

    @ApiOperation(value = "This operation is used to get details of Quality Assurance")
    @ApiResponses({
        @ApiResponse(code = 200, response = QualityAssurance.class, message = "Success"),
        @ApiResponse(code = 200, response = QualityAssuranceDetailResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @GetMapping("{qualityAssuranceId}")
    public QualityAssuranceDetailResponse getQualityAssuranceDetails(@PathVariable String qualityAssuranceId, HttpServletRequest httpRequest) {
        authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        return qualityAssuranceService.getQualityAssuranceDetails(qualityAssuranceId);
    }

    @ApiOperation(value = "This operation is used to update Quality Assurance")
    @ApiResponses({
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @PutMapping("{qualityAssuranceId}")
    public SuccessResponse updateQaDetails(@PathVariable String qualityAssuranceId,
            @RequestBody QualityAssuranceDetailResponse qualityAssuranceDetailResponse, HttpServletRequest httpRequest) {
        authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        qualityAssuranceService.UpdateQaDetails(qualityAssuranceId, qualityAssuranceDetailResponse);
        return new SuccessResponse("Quality Assurance Updated Successfully");
    }

    @ApiOperation(value = "This operation is used to get credentials of Quality Assurance")
    @ApiResponses({
        @ApiResponse(code = 200, response = QualityAssurance.class, message = "Success"),
        @ApiResponse(code = 200, response = QualityAssuranceCredentialsResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @GetMapping("{qualityAssuranceId}/credentials")
    public ResponseEntity<QualityAssuranceCredentialsResponse> getCredentials(@PathVariable String qualityAssuranceId, HttpServletRequest httpRequest) {
        authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        return ResponseEntity.status(HttpStatus.OK)
                .body(qualityAssuranceService.fetchCredentialsById(qualityAssuranceId));

    }

    @ApiOperation(value = "This operation is used to change password of Quality Assurance")
    @ApiResponses({
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @PutMapping({"{id}/password-change"})
    public ResponseEntity<SuccessResponse> changeQaPassword(@PathVariable String id,
            @RequestBody EditPasswordRequest request, HttpServletRequest httpRequest) {
        authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        return ResponseEntity.status(HttpStatus.OK)
                .body(qualityAssuranceService.changeQaPassword(id, request));
    }

    @ApiOperation(value = "This operation is used to send credentails to Email Address")
    @ApiResponses({
        @ApiResponse(code = 200, response = QualityAssurance.class, message = "Success"),
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @PostMapping(value = "{qualityAssuranceId}/email", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> sendQaCredentials(@Valid @PathVariable String qualityAssuranceId,HttpServletRequest httpRequest) {
        TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        return ResponseEntity.status(HttpStatus.OK)
                .body(emailService.shareQualityAssuranceCredentialsEmail(qualityAssuranceId,tokenPayLoadDetails));
    }

    @ApiOperation(value = "This operation is used to fetch credentials of a Quality Assurance")
    @ApiResponses({
        @ApiResponse(code = 200, response = QualityAssurance.class, message = "Success"),
        @ApiResponse(code = 200, response = QualityAssuranceCredentialsEmailResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @GetMapping(value = "{qualityAssuranceId}/email-template", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<QualityAssuranceCredentialsEmailResponse> getQaCredentialsEmail(
            @Valid @PathVariable("qualityAssuranceId") String qualityAssuranceId, HttpServletRequest httpRequest) {
                TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        return ResponseEntity.status(HttpStatus.OK)
                .body(emailService.getQaCredentialsEmailTemplate(qualityAssuranceId, tokenPayLoadDetails));
    }

    @ApiOperation(value = "This operation is used to send credentails to a specific Email Address")
    @ApiResponses({
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @PostMapping(value = "{qualityAssuranceId}/email-template", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> sendQualityAssuranceCredentialsEmail(
            @Valid @PathVariable("qualityAssuranceId") String qualityAssuranceId,
            @Valid @RequestBody QualityAssuranceCredentialsEmailRequest request, HttpServletRequest httpRequest) {
        TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        return ResponseEntity.status(HttpStatus.OK).body(emailService.sendQualityAssuranceCredentialsEmail(request, tokenPayLoadDetails));
    }
   
    @ApiResponses({
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @PostMapping("{qualityAssuranceId}/assign-clients")
    public SuccessResponse assignClient(@PathVariable String qualityAssuranceId,
            @RequestParam ArrayList<String> clients, HttpServletRequest httpRequest) {
        authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        qualityAssuranceService.assignClient(qualityAssuranceId, clients);
        return new SuccessResponse("Client Successfully Assigned");
    }   
}
