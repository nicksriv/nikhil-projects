/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.controller;

import com.brandpulse.fv.api.dto.ChangeVendorUserPasswordDto;
import com.brandpulse.fv.api.dto.VendorUserCredentialDto;
import com.brandpulse.fv.api.dto.VendorUserDto;
import com.brandpulse.fv.api.dto.VendorUserRequestDto;
import com.brandpulse.fv.api.dto.VendorUserUpdateRequestDto;
import com.brandpulse.fv.app.vendor.VendorService;
import com.brandpulse.fv.app.vendor.VendorUser;
import com.brandpulse.fv.common.dto.CommonResponseDto;
import com.brandpulse.fv.common.validator.CommonValidator;
import com.brandpulse.fv.exception.ApiException;
import com.brandpulse.fv.security.AuthenticationService;
import com.brandpulse.fv.security.Token;
import com.brandpulse.fv.util.ClassUtil;
import com.brandpulse.fv.util.FileServiceUtil;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("api/v1/vendor-user/")
public class VendorUserController {

    @Autowired
    VendorService vendorService;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    CommonValidator commonValidator;

    @Autowired
    FileServiceUtil fileServiceUtil;

    @GetMapping("")
    public Page<VendorUserDto> getVendorUser(Pageable pageable,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String userName,
            @RequestParam(required = false) String userCode,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String status
    ) {

        try {
            Token token = authenticationService.getVendorToken();
            Page<VendorUser> vendorUser = vendorService.getVendorUserList(pageable, token, search, userName, userCode, state, status);
            Page<VendorUserDto> vendorUserDtos = vendorUser.map(vu -> ClassUtil.convert(vu, VendorUserDto.class));
            return vendorUserDtos;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("{userId}")
    public VendorUserDto getVendorUserDetails(@PathVariable String userId) {
        VendorUserDto vendorUserDetailDto;

        try {
            Token token = authenticationService.getVendorToken();
            VendorUser vendorUser = vendorService.getVendorUserById(userId, token);
            vendorUserDetailDto = ClassUtil.convert(vendorUser, VendorUserDto.class);

            return vendorUserDetailDto;

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("")
    public CommonResponseDto createVendorUser(@RequestBody VendorUserRequestDto vurd) {
        try {
            Token token = authenticationService.getVendorToken();

            commonValidator.isValidAddress(vurd.getAddress());
            vendorService.createVendorUser(vurd, token);
            return new CommonResponseDto("Created");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("{userId}")
    private CommonResponseDto updateVendorUser(@PathVariable String userId, @Valid @RequestBody VendorUserUpdateRequestDto vuud) {
        try {
            Token token = authenticationService.getVendorToken();
            commonValidator.isValidAddress(vuud.getAddress());
            vendorService.updateVendorUser(userId, vuud, token);
            return new CommonResponseDto("Basic details updated");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("activate/{userId}")
    private CommonResponseDto activate(@PathVariable String userId) {
        try {
            Token token = authenticationService.getVendorToken();

            vendorService.vendorUserActivate(userId, token);
            return new CommonResponseDto("User activated");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("deactivate/{userId}")
    private CommonResponseDto deactivate(@PathVariable String userId) {
        try {
            Token token = authenticationService.getVendorToken();

            vendorService.vendorUserDeactivate(userId, token);
            return new CommonResponseDto("User deactivated");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("change-password/{userId}")
    private CommonResponseDto passwordChange(@PathVariable String userId, @RequestParam String newPassword) {
        try {
            Token token = authenticationService.getVendorOrVendorUserToken(userId);

            vendorService.vendorUserChangePassword(userId, newPassword, token);

            return new CommonResponseDto("Password Changed");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PutMapping("profile/image/{userId}")
    private CommonResponseDto uploadProfilePictureVendorUser(@PathVariable String userId, @RequestParam("image") MultipartFile profileImage) {
        try {
            Token token = authenticationService.getVendorOrVendorUserToken(userId);

            commonValidator.isValidImage(profileImage);
            String fileUrl = fileServiceUtil.uploadVendorUserProfileImage(profileImage, token.getUserRef(), userId);
            vendorService.updateVendorUserImage(userId, fileUrl, token);
            return new CommonResponseDto("Profile Picture Updated ");

        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }

    }

    @GetMapping("vendoruserProfile")
    public VendorUserDto getVendorUserProfile() {

        VendorUserDto vendorUserDetailDto;
        try {
            Token token = authenticationService.getVendorUserToken();
            VendorUser vendorUser = vendorService.getVendorUserById(token.getUserSubId(), token);
            vendorUserDetailDto = ClassUtil.convert(vendorUser, VendorUserDto.class);

            return vendorUserDetailDto;
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @PostMapping("change-password")
    public CommonResponseDto changeVendorUserPassword(HttpServletRequest request,
            @RequestBody ChangeVendorUserPasswordDto changeVendorUserPasswordDto) {
        Token token = authenticationService.getVendorUserToken();

        try {
            vendorService.changeVendorUserPassword(token.getUserSubId(),
                    changeVendorUserPasswordDto.getOldPassword(),
                    changeVendorUserPasswordDto.getNewPassword());

            return new CommonResponseDto("Password changed successfully");
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }

    @GetMapping("{vendorUserId}/credentials")
    public ResponseEntity<VendorUserCredentialDto> getVendorUserCredentials(@PathVariable String vendorUserId) {
        try {
            authenticationService.getVendorToken();

            return ResponseEntity.status(HttpStatus.OK).body(vendorService.fetchCredentialsByVendorUserId(vendorUserId));
        } catch (Exception ex) {
            throw new ApiException(ex.getMessage());
        }
    }
}
