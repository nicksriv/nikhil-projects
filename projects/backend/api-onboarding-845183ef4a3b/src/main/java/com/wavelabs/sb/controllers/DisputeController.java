package com.wavelabs.sb.controllers;

import java.time.Instant;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.documents.Dispute;
import com.wavelabs.sb.enums.DisputeStatus;
import com.wavelabs.sb.enums.UserType;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.FreelancerRepository;
import com.wavelabs.sb.repositories.VendorRepository;
import com.wavelabs.sb.request.AddRemarkRequest;
import com.wavelabs.sb.response.DisputeDetailResponse;
import com.wavelabs.sb.response.DisputeListResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.DisputeExcelService;
import com.wavelabs.sb.services.DisputeService;
import com.wavelabs.sb.utils.ClassUtil;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("api/v1/disputes")
public class DisputeController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    DisputeService disputeService;

    @Autowired
    ClientOnboardingRepository clientOnboardingRepository;

    @Autowired
    FreelancerRepository freelancerRepository;

    @Autowired
    VendorRepository vendorRepository;

    @ApiOperation(value = "This operation is used to get disputes list")
    @ApiResponses({
        @ApiResponse(code = 200, response = DisputeListResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @GetMapping("")
    public Page<DisputeListResponse> getDisputeList(Pageable pageable,
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String disputeRefNo,
            @RequestParam(required = false) String clientId,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) UserType userType,
            @RequestParam(required = false) String disputeCategoryId,
            @RequestParam(required = false) String disputeTitle,
            @RequestParam(required = false) DisputeStatus disputeStatus,
            @RequestParam(required = false) Instant raisedAt,
            @RequestParam(required = false) String raisedBy,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to,
            HttpServletRequest request) {

        TokenPayLoadDetails details = authenticationService.getAdminOrClientTokenPayLoadDetails(request);

        Page<Dispute> disputePage = disputeService.getDisputeList(pageable, id, disputeRefNo, clientId, userId,
                userType, disputeCategoryId, disputeTitle,
                disputeStatus, raisedAt, raisedBy, from, to, details);

        Page<DisputeListResponse> disputeListResponse = disputeService.disputePageToDto(disputePage);
        return disputeListResponse;
    }

    @ApiOperation(value = "This operation is used to get disputes details")
    @ApiResponses({
        @ApiResponse(code = 200, response = DisputeDetailResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @GetMapping("{id}")
    public DisputeDetailResponse getDisputeDetails(@PathVariable String id, HttpServletRequest request) {

       TokenPayLoadDetails details = authenticationService.getAdminOrClientTokenPayLoadDetails(request);

        return disputeService.getDisputeDetails(id, details);
    }

    @ApiResponses({
        @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @PutMapping("{id}/status")
    public SuccessResponse updateStatus(@PathVariable String id, @RequestParam DisputeStatus disputeStatus,
            HttpServletRequest request) {

        authenticationService.getAdminOrClientTokenPayLoadDetails(request);
        disputeService.updateStatus(id, disputeStatus);
        return new SuccessResponse("Status Updated");

    }

    @ApiOperation(value = "This operation is used to download disputes list")
    @ApiResponses({
        @ApiResponse(code = 200, response = ResponseEntity.class, message = "Success"),
        @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
        @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed")})
    @EnableTokenAuthorisation
    @GetMapping("excel/download")
    public ResponseEntity<byte[]> excelDownload(Pageable pageable,
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String disputeRefNo,
            @RequestParam(required = false) String disputeCategoryId,
            @RequestParam(required = false) String clientId,
            @RequestParam(required = false) String disputeTitle,
            @RequestParam(required = false) UserType userType,
            @RequestParam(required = false) DisputeStatus disputeStatus,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) Instant raisedAt,
            @RequestParam(required = false) String raisedBy,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to,
            HttpServletRequest request) {

        TokenPayLoadDetails details = authenticationService.getAdminOrClientTokenPayLoadDetails(request);

        Page<Dispute> disputePage = disputeService.getDisputeList(pageable , id, disputeRefNo, clientId, userId,
                userType, disputeCategoryId, disputeTitle,
                disputeStatus, raisedAt, raisedBy, from, to, details);
        Page<DisputeListResponse> disputeListResponse = disputeService.disputePageToDto(disputePage);

        // List<Dispute> disputes = disputePage.getContent();
        // List<DisputeListResponse> disputeListDtos = ClassUtil.convertList(disputes, DisputeListResponse.class);

        byte[] contents = DisputeExcelService.getDisputeExcel(disputeListResponse.getContent());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType
                .valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        headers.setContentDispositionFormData("Dispute Details", "Disputes-List-" + ".xlsx");
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.SC_OK);

        return response;
    }

    @EnableTokenAuthorisation
    @PutMapping("{id}/remark")
    public SuccessResponse addRemark(@PathVariable String id, @Valid @RequestBody AddRemarkRequest addRemarkRequest,
            HttpServletRequest request) {
        authenticationService.getAdminOrClientTokenPayLoadDetails(request);
        disputeService.addRemark(id, addRemarkRequest);
        return new SuccessResponse("Remark Add Succesfully");
    }

}
