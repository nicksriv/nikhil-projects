/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.api.controller;

import com.brandpulse.fv.api.dto.LoginVendorOrVendorUserRequestDto;
import com.brandpulse.fv.api.dto.SendOTPRequestDto;
import com.brandpulse.fv.api.dto.SuccessLoginUpdateDto;
import com.brandpulse.fv.api.dto.VerifyOTPRequestDto;
import com.brandpulse.fv.api.dto.LoginSuccessResponseDto;
import com.brandpulse.fv.api.dto.OnboardingCreateAccountRequestDto;
import com.brandpulse.fv.api.dto.OnboardingSendOTPRequestDto;
import com.brandpulse.fv.api.dto.OnboardingVerifyOTPRequestDto;
import com.brandpulse.fv.api.dto.OnboardingVerifyOTPResponseDto;
import com.brandpulse.fv.app.freelancer.Freelancer;
import com.brandpulse.fv.app.freelancer.FreelancerService;
import com.brandpulse.fv.app.token.TokenService;
import com.brandpulse.fv.app.vendor.Vendor;
import com.brandpulse.fv.app.vendor.VendorCredential;
import com.brandpulse.fv.app.vendor.VendorService;
import com.brandpulse.fv.app.vendor.VendorUser;
import com.brandpulse.fv.app.vendor.VendorUserCredential;
import com.brandpulse.fv.common.dto.CommonResponseDto;
import com.brandpulse.fv.common.enums.OTPType;
import com.brandpulse.fv.common.enums.UserType;
import com.brandpulse.fv.common.service.CommunicationService;
import com.brandpulse.fv.exception.ApiException;
import com.brandpulse.fv.exception.ErrorCodeConstant;
import com.brandpulse.fv.exception.ServiceException;
import com.brandpulse.fv.security.AuthenticationService;
import com.brandpulse.fv.util.AesEncryptionUtil;
import com.brandpulse.fv.util.ClassUtil;
import com.brandpulse.fv.util.RequestUtil;
import java.time.Instant;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Suhail Tamboli
 */
@RestController
@RequestMapping("api/v1/authenticate/")
public class AuthenticationController {

    @Autowired
    FreelancerService freelancerService;

    @Autowired
    TokenService tokenService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    CommunicationService communicationService;

    @Autowired
    VendorService vendorService;

    @Autowired
    AesEncryptionUtil aesEncryptionUtil;

    /**
     * Steps: validate user inputs in DTO get active freelancer from db generate
     * otp and save in otp log send sms
     *
     *
     */
    @PostMapping("send-otp")
    public CommonResponseDto sendOTP(@Valid @RequestBody SendOTPRequestDto sendOTPRequest) {

        try {
            // get freelancer
            Freelancer freelancer = freelancerService.getActiveFreelancerByMobile(sendOTPRequest.getMobile());
            String otp = tokenService.generateOtp(freelancer.getId(), freelancer.getMobile(), OTPType.MOBILE);
            communicationService.sendMobileOTP(freelancer.getMobile(), otp);

        } catch (Exception e) {
            throw new ApiException(e.getMessage());
        }

        return new CommonResponseDto("OTP has been sent on your registered mobile number");
    }

    /**
     * Steps: validate user inputs in DTO get freelancer for user details find
     * in otplog table with mobile n otp if not exist throw error check record
     * should not be expired or already used update freelancer for details sent
     * by user generate token send response with token and user
     *
     */
    @PostMapping("verify-otp")
    public LoginSuccessResponseDto verifyOTP(HttpServletRequest request, @Valid @RequestBody VerifyOTPRequestDto verifyOTPRequestDto) {

        try {
            // get freelancer
            Freelancer freelancer = freelancerService.getActiveFreelancerByMobile(verifyOTPRequestDto.getMobile());
            Instant lastLogin = freelancer.getLastLoginAt();

            if (!freelancerService.isValidLoginTry(freelancer)) {
                throw new ApiException(ErrorCodeConstant.FV0003);
            }

            boolean success = tokenService.verifyOtp(verifyOTPRequestDto.getMobile(), verifyOTPRequestDto.getOtp());
            if (!success) {
                throw new ApiException(ErrorCodeConstant.FV0004);
            }

            SuccessLoginUpdateDto slud = ClassUtil.convert(verifyOTPRequestDto, SuccessLoginUpdateDto.class);
            freelancerService.successLoginUpdate(freelancer, slud);

            String ipAddress = RequestUtil.getClientIp(request);
            String userAgent = RequestUtil.getBrowser(request);

            String token = authenticationService.generateJwt(freelancer.getId(), "", UserType.FREELANCER, freelancer.getFreelancerRefNo(), freelancer.getFirstName(), freelancer.getLastName(), ipAddress, userAgent);

            LoginSuccessResponseDto response = ClassUtil.convert(freelancer, LoginSuccessResponseDto.class);
            response.setToken(token);
            response.setLastLoginAt(lastLogin);

            return response;
        } catch (Exception e) {
            throw new ApiException(e.getMessage());
        }
    }

    /**
     * Steps: get log id from token logout user by invalidating token
     *
     */
    @GetMapping("logout")
    public CommonResponseDto logout() {

        try {
            String logId = authenticationService.getToken().getLogId();
            authenticationService.logOutUser(logId);

        } catch (Exception e) {
            return new CommonResponseDto("You are logged out.");
        }

        return new CommonResponseDto("You are logged out");
    }

    /**
     * - get email & mobile - check for email & mobile existance - send
     * different otp on email & mobile - allow only three attempts in 15 min
     */
    @PostMapping("onboarding/step-1/send-otp")
    public CommonResponseDto onboardingSendOTP(@Valid @RequestBody OnboardingSendOTPRequestDto osotprd) {

        try {
            if (osotprd.getOtpType() == null || (osotprd.getOtpType() != null && osotprd.getOtpType().equals(OTPType.MOBILE))) {
                freelancerService.isUniqueMobile(osotprd.getMobile());
            }
            if (osotprd.getOtpType() == null || (osotprd.getOtpType() != null && osotprd.getOtpType().equals(OTPType.EMAIL))) {
                freelancerService.isUniqueEmail(osotprd.getEmail());
            }

            if (osotprd.getOtpType() == null || (osotprd.getOtpType() != null && osotprd.getOtpType().equals(OTPType.MOBILE))) {
                String otp = tokenService.generateOtp("", osotprd.getMobile(), OTPType.MOBILE);
                communicationService.sendMobileOTP(osotprd.getMobile(), otp);
            }

            if (osotprd.getOtpType() == null || (osotprd.getOtpType() != null && osotprd.getOtpType().equals(OTPType.EMAIL))) {
                String otp2 = tokenService.generateOtp("", osotprd.getEmail(), OTPType.EMAIL);
                communicationService.sendEmailOTP(osotprd.getEmail(), otp2);
            }
            return new CommonResponseDto("OTP sent on your mobile & email");

        } catch (Exception e) {
            throw new ApiException(e.getMessage());
        }
    }

    /**
     * - get email & mobile - check for email & mobile existance - send
     * different otp on email & mobile - allow only three attempts in 15 min
     */
    @PostMapping("onboarding/step-2/verify-otp")
    public OnboardingVerifyOTPResponseDto onboardingVerifyOTP(@Valid @RequestBody OnboardingVerifyOTPRequestDto ovotprd) {

        try {
            List<String> ids = tokenService.verifyMobileAndEmailOtp(ovotprd.getMobile(), ovotprd.getEmail(), ovotprd.getMobileOTP(), ovotprd.getEmailOTP());

            return new OnboardingVerifyOTPResponseDto(ids.get(0), ids.get(1));

        } catch (Exception e) {
            throw new ApiException(e.getMessage());
        }
    }

    /**
     *
     */
    @PostMapping("onboarding/step-3/create-account")
    public LoginSuccessResponseDto onboardingCreateAccount(HttpServletRequest request, @Valid @RequestBody OnboardingCreateAccountRequestDto ocard) {

        try {
            freelancerService.isUniqueMobile(ocard.getMobile());
            freelancerService.isUniqueEmail(ocard.getEmail());
            tokenService.verifyIds(ocard.getMobile(), ocard.getEmail(), ocard.getMobileVerifyId(), ocard.getEmailVerifyId());

            Freelancer freelancer = freelancerService.createVerifiedFreelancer(ocard.getFirstName(), ocard.getMiddleName(), ocard.getLastName(), ocard.getMobile(), ocard.getEmail());

            SuccessLoginUpdateDto slud = ClassUtil.convert(ocard, SuccessLoginUpdateDto.class);
            freelancerService.successLoginUpdate(freelancer, slud);

            String ipAddress = RequestUtil.getClientIp(request);
            String userAgent = RequestUtil.getBrowser(request);

            String token = authenticationService.generateJwt(freelancer.getId(), "", UserType.FREELANCER, freelancer.getFreelancerRefNo(), freelancer.getFirstName(), freelancer.getLastName(), ipAddress, userAgent);

            LoginSuccessResponseDto response = ClassUtil.convert(freelancer, LoginSuccessResponseDto.class);
            response.setToken(token);
            response.setLastLoginAt(Instant.now());

            return response;
        } catch (Exception e) {
            throw new ApiException(e.getMessage());
        }
    }

    /**
     *
     */
    @PostMapping("vendor/login")
    public LoginSuccessResponseDto vendorOrVendorUser(HttpServletRequest request, @RequestBody LoginVendorOrVendorUserRequestDto lrvovu) {
        LoginSuccessResponseDto response = new LoginSuccessResponseDto();

        try {
            if (lrvovu.getUserType().equals(UserType.VENDOR_USER)) {

                VendorUserCredential vendorUserCredential = vendorService.getVendorUserCredentialByRef(lrvovu.getUserName());
                VendorUser vendorUser = vendorService.getVendorUserById(vendorUserCredential.getVendorUserId(), null);

                if (!vendorUserCredential.getPassword().equals(aesEncryptionUtil.encrypt(lrvovu.getPassword()))) {
                    throw new ServiceException(ErrorCodeConstant.FVV005);
                }

                SuccessLoginUpdateDto slud = ClassUtil.convert(lrvovu, SuccessLoginUpdateDto.class);
                vendorService.successVendorUserLoginUpdate(vendorUser, slud);
                String ipAddress = RequestUtil.getClientIp(request);
                String userAgent = RequestUtil.getBrowser(request);
                String token = authenticationService.generateJwt(vendorUser.getVendorId(), vendorUser.getId(), UserType.VENDOR_USER, "", vendorUser.getFirstName(), vendorUser.getLastName(), ipAddress, userAgent);

                response.setFirstName(vendorUser.getFirstName());
                response.setMiddleName(vendorUser.getMiddleName());
                response.setLastName(vendorUser.getLastName());
                response.setProfileImage(vendorUser.getProfileImage());
                response.setProfileCompletionPercentage(0);
                response.setProfileCompleted(false);
                response.setLastLoginAt(vendorUser.getLastLoginAt());
                response.setVendorUserRating(vendorUser.getVendorUserRating());
                response.setToken(token);

                return response;

            } else {

                VendorCredential vendorCredential = vendorService.getVendorCredentialByRef(lrvovu.getUserName());
                Vendor vendor = vendorService.getVendorById(vendorCredential.getVendorId());

                if (!vendorCredential.getPassword().equals(aesEncryptionUtil.encrypt(lrvovu.getPassword()))) {
                    throw new ServiceException(ErrorCodeConstant.FVV005);
                }

                SuccessLoginUpdateDto slud = ClassUtil.convert(lrvovu, SuccessLoginUpdateDto.class);
                vendorService.successVendorLoginUpdate(vendor, slud);
                String ipAddress = RequestUtil.getClientIp(request);
                String userAgent = RequestUtil.getBrowser(request);
                String token = authenticationService.generateJwt(vendor.getId(), "", UserType.VENDOR, vendor.getVendorRefNo(), vendor.getVendorName(), "", ipAddress, userAgent);

                response.setFirstName(vendor.getVendorName());
                response.setProfileImage(vendor.getCompanyLogo());
                response.setProfileCompletionPercentage(vendor.getProfileCompletionPercentage());
                response.setProfileCompleted(vendor.isProfileCompleted());
                response.setLastLoginAt(vendor.getLastLoginAt());
                response.setVendorRating(vendor.getVendorRating());
                response.setToken(token);

                return response;

            }
        } catch (Exception e) {
            throw new ApiException(e.getMessage());
        }
    }
}
