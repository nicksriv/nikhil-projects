/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.controller;

import com.brandpulse.fv.api.dto.BankDetailDto;
import com.brandpulse.fv.api.dto.ChangeVendorPasswordDto;
import com.brandpulse.fv.api.dto.SkillRequestDto;
import com.brandpulse.fv.api.dto.VendorBasicProfileRequestDto;
import com.brandpulse.fv.api.dto.VendorDetailDto;
import com.brandpulse.fv.api.dto.VendorListDto;
import com.brandpulse.fv.api.dto.VendorProfileDto;
import com.brandpulse.fv.api.dto.VendorUserStatMonthWiseDto;
import com.brandpulse.fv.app.job.JobCandidateStatMonthWise;
import com.brandpulse.fv.app.job.JobService;
import com.brandpulse.fv.app.vendor.Vendor;
import com.brandpulse.fv.app.vendor.VendorCandidateDashboardStats;
import com.brandpulse.fv.app.vendor.VendorService;
import com.brandpulse.fv.common.dto.CommonResponseDto;
import com.brandpulse.fv.common.validator.CommonValidator;
import com.brandpulse.fv.exception.ApiException;
import com.brandpulse.fv.security.AuthenticationService;
import com.brandpulse.fv.security.Token;
import com.brandpulse.fv.util.ClassUtil;
import com.brandpulse.fv.util.FileServiceUtil;
import java.time.OffsetDateTime;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author ts
 */
@RestController
@RequestMapping("/api/v1/vendor/")
public class VendorController {

    @Autowired
    VendorService vendorService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    CommonValidator commonValidator;

    @Autowired
    FileServiceUtil fileServiceUtil;

    @Autowired
    JobService jobService;

    @GetMapping("profile")
    private VendorProfileDto getProfile() {
        try {
            String vendorId = authenticationService.getVendorId();

            return vendorService.getProfile(vendorId);

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("profile/basic-details")
    private CommonResponseDto updateBasicProfileDetails(@Valid @RequestBody VendorBasicProfileRequestDto vbprd) {
        try {
            String vendorId = authenticationService.getVendorId();
            commonValidator.isValidAddress(vbprd.getAddress());
            vendorService.updateBasicProfileDetails(vendorId, vbprd);
            return new CommonResponseDto("Basic details updated");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("profile/skills")
    private CommonResponseDto updateSkills(@RequestBody SkillRequestDto srd) {
        try {
            String vendorId = authenticationService.getVendorId();
            vendorService.updateSkill(vendorId, srd);
            return new CommonResponseDto("Skills updated");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("profile/bank-details")
    private CommonResponseDto updateBankDetails(@Valid @RequestBody BankDetailDto vbdd) {
        try {
            String vendorId = authenticationService.getVendorId();
            vendorService.updateBank(vendorId, vbdd);
            return new CommonResponseDto("Bank details updated");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("profile/image")
    private CommonResponseDto uploadCompanyLogo(@RequestParam("image") MultipartFile companyLogo) {
        try {
            Token token = authenticationService.getVendorToken();

            commonValidator.isValidImage(companyLogo);
            String fileUrl = fileServiceUtil.uploadVendorCompanyLogo(companyLogo, token.getUserRef());
            vendorService.updateCompanyLogo(token.getUserId(), fileUrl);
            return new CommonResponseDto("Profile Picture Updated ");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }

    }

    @PutMapping("profile/portfolio")
    private CommonResponseDto uploadPortfolio(@RequestParam("portfolio") MultipartFile portfolioFile) {
        try {
            Token token = authenticationService.getVendorToken();

            commonValidator.isValidDoc(portfolioFile);
            String fileUrl = fileServiceUtil.uploadVendorPortfolio(portfolioFile, token.getUserRef());
            vendorService.updatePortfolio(token.getUserId(), fileUrl);
            return new CommonResponseDto("Portfolio Updated");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }

    }

    @PostMapping("change-password")
    public CommonResponseDto changePassword(HttpServletRequest request,
            @RequestBody ChangeVendorPasswordDto changeVendorPasswordDto) {
        Token token = authenticationService.getVendorToken();

        try {
            vendorService.changeVendorPassword(token.getUserId(),
                    changeVendorPasswordDto.getOldPassword(),
                    changeVendorPasswordDto.getNewPassword());

            return new CommonResponseDto("Password changed successfully");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("vendor-list")
    public Page<VendorListDto> getVendorList(Pageable pageable,
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String vendorRefNo,
            @RequestParam(required = false) String vendorName,
            @RequestParam(required = false) String mobile,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime to) {


        try {
            Token token = authenticationService.getVendorToken();
            Page<Vendor> vendorPage = vendorService.getVendorList(pageable, token, id, vendorRefNo, vendorName, mobile, name, state, status, from, to);
            Page<VendorListDto> vendorListDto = vendorPage.map(j -> ClassUtil.convert(j, VendorListDto.class));
            return vendorListDto;
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("{vendorId}")
    public VendorDetailDto getVendorDetails(@PathVariable String vendorId) {


        try {
            authenticationService.getVendorToken();
            Vendor vendor = vendorService.getVendorById(vendorId);
            VendorDetailDto vendorDetailDto = ClassUtil.convert(vendor, VendorDetailDto.class);
            return vendorDetailDto;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("user-stats")
    public List<VendorUserStatMonthWiseDto> vendorUserStats(@RequestParam String year) {
        try {
            Token token = authenticationService.getVendorToken();
            return vendorService.vendorUserStats(year, token);

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("job-stats")
    public List<JobCandidateStatMonthWise> vendorJobStats(@RequestParam String year) {
        try {
            Token token = authenticationService.getVendorToken();
            return vendorService.vendorJobStats(year, token);

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("dashboard/stats")
    public VendorCandidateDashboardStats vendorDashboardStats() {
        try {
            Token token = authenticationService.getVendorToken();
            return vendorService.vendorDashboardStats(token);

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }
}
