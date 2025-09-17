/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.wavelabs.sb.controllers;

import java.time.Instant;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wavelabs.sb.documents.Freelancer;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.response.FreelancerDetailResponse;
import com.wavelabs.sb.response.FreelancerListResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.FreelancerExcelService;
import com.wavelabs.sb.services.FreelancerService;
import com.wavelabs.sb.utils.ClassUtil;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("api/v1/freelancer/")
public class FreelancerController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    FreelancerService freelancerService;

    @Autowired
    FreelancerExcelService freelancerExcelService;

    @ApiOperation(value = "This operation is used to get freelancer list")
    @ApiResponses({
            @ApiResponse(code = 200, response = FreelancerListResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
            @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed") })
      @EnableTokenAuthorisation
    @GetMapping("")
    public Page<FreelancerListResponse> getFreelancerList(HttpServletRequest httpRequest,Pageable pageable,
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String freelancerRefNo,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String mobile,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to) {
                TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        Page<Freelancer> freelancerPage = freelancerService.getFreelancerList(pageable, id,freelancerRefNo, firstName,lastName, email, mobile,
                state, status, from, to,  tokenPayLoadDetails);
        Page<FreelancerListResponse> freelancerListDto = freelancerPage
                .map(j -> ClassUtil.convert(j, FreelancerListResponse.class));
        return freelancerListDto;
    }

    @ApiOperation(value = "This operation is used to download freelancer list")
    @ApiResponses({
            @ApiResponse(code = 200, response = ResponseEntity.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
            @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed") })
      @EnableTokenAuthorisation
    @GetMapping("excel/download")
    public ResponseEntity<byte[]> excelDownload( HttpServletRequest httpRequest,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String freelancerRefNo,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String mobile,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String freelancerRating,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to) {
         TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        Page<Freelancer> freelancerPage = freelancerService.getFreelancerList(Pageable.unpaged(), id, freelancerRefNo ,firstName, lastName, email, mobile, state,
                status, from, to, tokenPayLoadDetails);
        List<Freelancer> freelancers = freelancerPage.getContent();
        List<FreelancerListResponse> freelancerListDtos = ClassUtil.convertList(freelancers,
                FreelancerListResponse.class);

        byte[] contents = FreelancerExcelService.getFreelancerExcel(freelancerListDtos);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType
                .valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        headers.setContentDispositionFormData("Freelancer Details", "freelancer-details-" + ".xlsx");
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.SC_OK);

        return response;
    }

    @ApiOperation(value = "This operation is used to get freelancer details")
    @ApiResponses({
            @ApiResponse(code = 200, response = FreelancerDetailResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
            @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed") })
    @EnableTokenAuthorisation
    @GetMapping("{freelancerId}")
    public FreelancerDetailResponse getFreelancerDetails(HttpServletRequest httpRequest,
            @PathVariable String freelancerId) {

        TokenPayLoadDetails tokenPayLoadDetails = authenticationService.getClientOrAdminOrQualityAssuranceToken(httpRequest);
        return freelancerService.getFreelancerDetails(freelancerId, tokenPayLoadDetails);
    }

    @ApiOperation(value = "Freelancer status update")
    @ApiResponses({
            @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "You are not Authorized to view the resource"),
            @ApiResponse(code = 400, response = ErrorDetails.class, message = "Validation Failed") })
    @EnableTokenAuthorisation
    @PutMapping("status/{freelancerId}")
    public SuccessResponse updateStatus(HttpServletRequest httpRequest,@PathVariable String freelancerId, @RequestParam Status status) {
        authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        freelancerService.updateStatus(freelancerId, status);

        return new SuccessResponse("Status Updated");

    }
}
