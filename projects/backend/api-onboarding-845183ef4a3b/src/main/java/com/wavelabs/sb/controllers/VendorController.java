/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.wavelabs.sb.controllers;

import com.wavelabs.sb.documents.Vendor;
import com.wavelabs.sb.documents.VendorCredential;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ErrorDetails;
import com.wavelabs.sb.repositories.SkillRepository;
import com.wavelabs.sb.request.EditPasswordRequest;
import com.wavelabs.sb.request.VendorCredentialsEmailRequest;
import com.wavelabs.sb.request.VendorDetailRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.VendorCredentialEmailResponse;
import com.wavelabs.sb.response.VendorCredentialResponse;
import com.wavelabs.sb.response.VendorDetailResponse;
import com.wavelabs.sb.response.VendorListResponse;
import com.wavelabs.sb.response.VendorUserStatResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.EmailService;
import com.wavelabs.sb.services.VendorExcelService;
import com.wavelabs.sb.services.VendorService;
import com.wavelabs.sb.utils.EnableTokenAuthorisation;
import com.wavelabs.sb.utils.FileServiceUtil;
import com.wavelabs.sb.utils.ValidatorUtil;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.time.Instant;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.http.HttpStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author dell
 */
@RestController
@RequestMapping("/api/v1/vendors/")
public class VendorController {

    @Autowired
    VendorService vendorService;

    @Autowired
    VendorExcelService vendorExcelService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    SkillRepository skillRepository;

    @Autowired
    FileServiceUtil fileServiceUtil;

    @Autowired
    EmailService emailService;

    // 1
    @ApiOperation(value = "This operation is used to fetch vendor Details")
    @ApiResponses({
            @ApiResponse(code = 200, response = VendorDetailResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping("{vendorId}")
    public VendorDetailResponse getVendorDetails(HttpServletRequest httpRequest, @PathVariable String vendorId) {
        authenticationService.getClientOrAdminOrQualityAssuranceToken(httpRequest);
        VendorDetailResponse vendorDetailDto = vendorService.getVendorDetails(vendorId);
        return vendorDetailDto;
    }

    // 2
    @ApiOperation(value = "This operation is used to fetch vendor Details")
    @ApiResponses({
            @ApiResponse(code = 200, response = VendorListResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
     @EnableTokenAuthorisation
    @GetMapping("")
    public Page<VendorListResponse> getVendorList(HttpServletRequest httpRequest, Pageable pageable,
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String vendorName,
            @RequestParam(required = false) String vendorRefNo,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to) {
         authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        try {
            Page<Vendor> vendorPage = vendorService.getVendorList(pageable, id, vendorName, vendorRefNo, state, skills,
                    status, from, to);
            Page<VendorListResponse> vendorListResponse = vendorService.getVendorDtoList(vendorPage);
            return vendorListResponse;

        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }

    // 3
    @ApiOperation(value = "This operation is used to fetch vendor Details")
    @ApiResponses({
            @ApiResponse(code = 200, response = ResponseEntity.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping("excel/download")
    public ResponseEntity<byte[]> excelDownload(HttpServletRequest httpRequest,
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String vendorName,
            @RequestParam(required = false) String vendorRefNo,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to) {
          authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        try {
            Page<Vendor> vendorPage = vendorService.getVendorList(null, id, vendorName, vendorRefNo,
                    state, skills, status, from, to);

            Page<VendorListResponse> vendorListResponse = vendorService.getVendorDtoList(vendorPage);
            byte[] contents = VendorExcelService.getVendorExcel(vendorListResponse.getContent());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(
                    MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
            headers.setContentDispositionFormData("Vendor Details", "vendor-details" + ".xlsx");
            ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.SC_OK);

            return response;
        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }

    // 4
    @ApiOperation(value = "This operation is used to Add vendor Details And auto generate passsword")
    @ApiResponses({
            @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PostMapping("")
    public SuccessResponse addVendorDetails(HttpServletRequest httpRequest,
            @Valid @RequestBody VendorDetailRequest vendorDetailRequest) {
        authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        try {

            String vendorId = vendorService.addVendorDetails(vendorDetailRequest);

            vendorService.addBank(vendorId, vendorDetailRequest.getBankDetail());

            return new SuccessResponse("Vendor added successfully");
        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }

    // 5
    @ApiOperation(value = "This operation is used to update vendor Details")
    @ApiResponses({
            @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping("{id}")
    public SuccessResponse updateVendorDetails(HttpServletRequest httpRequest, @Valid @PathVariable String id,
            @RequestBody VendorDetailRequest vendorDetailRequest) {
         authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        try {

            vendorService.updateVendorDetails(id, vendorDetailRequest);

            vendorService.updateBank(id, vendorDetailRequest.getBankDetail());

            return new SuccessResponse("Vendor updated successfully");
        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }

   
    @ApiOperation(value = "This operation is used to fetch vendor and Vendor Details Stats")
    @ApiResponses({
            @ApiResponse(code = 200, response = VendorUserStatResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping("{vendorId}/vendor-user/stats")
    public VendorUserStatResponse vendorUserStats(HttpServletRequest httpRequest, @PathVariable String vendorId) {
         authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        try {
            return vendorService.vendorUserStats(vendorId);

        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }

    // 8
    @ApiOperation(value = "This operation is used to Update vendor Status Active/Inactive")
    @ApiResponses({
            @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
     @EnableTokenAuthorisation
    @PutMapping("{vendorId}/status")
    public SuccessResponse updateStatus(HttpServletRequest httpRequest, @PathVariable String vendorId,
            @RequestParam Status status) {
          authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        try {
            vendorService.updateStatus(vendorId, status);

            return new SuccessResponse("status Updated");
        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }

    // 9
    @ApiOperation(value = "This operation is used to Update vendor profile image ")
    @ApiResponses({
            @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
     @EnableTokenAuthorisation
    @PutMapping("profile/image")
    public SuccessResponse uploadCompanyLogo(HttpServletRequest httpRequest,
            @RequestParam("image") MultipartFile companyLogo,
            @RequestParam String vendorId) {

          authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        try {

            Vendor vendor = vendorService.getVendorById(vendorId);
            ValidatorUtil.isValidImage(companyLogo);
            String fileUrl = fileServiceUtil.uploadVendorCompanyLogo(companyLogo, vendor.getVendorRefNo());
            vendorService.updateCompanyLogo(vendor,  fileUrl);
            return new SuccessResponse("Profile Picture Updated ");

        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }

    // 10
    @ApiOperation(value = "This operation is used to Update vendor portfolio")
    @ApiResponses({
            @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
     @EnableTokenAuthorisation
    @PutMapping("profile/portfolio")
    public SuccessResponse uploadPortfolio(HttpServletRequest httpRequest,
            @RequestParam("portfolio") MultipartFile portfolioFile,
            @RequestParam String vendorId) {
          authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        try {

            Vendor vendor = vendorService.getVendorById(vendorId);
            ValidatorUtil.isValidDoc(portfolioFile);
            String fileUrl = fileServiceUtil.uploadVendorPortfolio(portfolioFile, vendor.getVendorRefNo());
            vendorService.updatePortfolio(vendor,  fileUrl);
            return new SuccessResponse("Portfolio Updated");

        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage());
        }

    }

    // change pass
    @ApiOperation(value = "This operation is used to Change Password")
    @ApiResponses({
            @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @PutMapping("{vendorId}/password-change")
    public ResponseEntity<SuccessResponse> changeVendorPassword(
            @RequestHeader(required = true, value = "Authorization") String authorization,
            @Valid @PathVariable("vendorId") String vendorId, @Valid @RequestBody EditPasswordRequest request,
            HttpServletRequest httpRequest) {
         authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        try {
            return ResponseEntity.status(HttpStatus.SC_OK)
                    .body(vendorService.changePasswordOfVendor(vendorId, request));
        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage());
        }

    }

    @ApiOperation(value = "This operation is used to Send Email-Template")
    @ApiResponses({
            @ApiResponse(code = 200, response = SuccessResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation

    @PostMapping(value = "{vendorId}/email", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SuccessResponse> sendVendorCredentials(
            @RequestHeader(required = true, value = "Authorization") String authorization,
            @RequestBody VendorCredentialsEmailRequest request, @PathVariable("vendorId") String vendorId,HttpServletRequest httpRequest) {
          authenticationService.getAdminTokenPayLoadDetails(httpRequest);
   
        return ResponseEntity.status(HttpStatus.SC_OK).body(emailService.shareVendorCredentialsEmail(request));

    }

    @ApiOperation(value = "This operation is used to Get Email-Template")
    @ApiResponses({
            @ApiResponse(code = 200, response = VendorCredentialEmailResponse.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping(value = "{vendorId}/email-template", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<VendorCredentialEmailResponse> getvendorCredentialsEmail(
            @Valid @PathVariable("vendorId") String vendorId,HttpServletRequest httpRequest) {
             authenticationService.getAdminTokenPayLoadDetails(httpRequest);
   
        return ResponseEntity.status(HttpStatus.SC_OK).body(emailService.getVendorCredentialsEmailTemplate(vendorId));

    }

    // decrypt
    @ApiOperation(value = "This operation is used to fetch Credentials of a Vendor")
    @ApiResponses({ @ApiResponse(code = 200, response = VendorCredential.class, message = "Success"),
            @ApiResponse(code = 401, response = ErrorDetails.class, message = "Access token Expired / Invalid Access token"),
            @ApiResponse(code = 403, response = ErrorDetails.class, message = "ACCESS_FORBIDDEN"),
            @ApiResponse(code = 422, response = ErrorDetails.class, message = "Unable to connect database due to database is down") })
    @EnableTokenAuthorisation
    @GetMapping("{vendorId}/credentials")
    public ResponseEntity<VendorCredentialResponse> getCredentials(
         @RequestHeader(required = true, value = "Authorization") String authorization,
            @PathVariable(required = true, value = "vendorId") String vendorId ,HttpServletRequest httpRequest) {
            authenticationService.getAdminTokenPayLoadDetails(httpRequest);
        return ResponseEntity.status(HttpStatus.SC_OK).body(vendorService.fetchCredentialsByVendorId(vendorId));
       }

}
