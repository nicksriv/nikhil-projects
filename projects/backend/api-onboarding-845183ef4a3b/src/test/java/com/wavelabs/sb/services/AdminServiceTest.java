package com.wavelabs.sb.services;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.AdminDetailsDataBuilder;
import com.wavelabs.sb.repositories.AdminCredentialsRepository;
import com.wavelabs.sb.repositories.AdminDetailsRepository;
import com.wavelabs.sb.response.SuccessResponse;

@RunWith(MockitoJUnitRunner.class)
public class AdminServiceTest {

    @InjectMocks
    AdminService adminService;


    @Mock
    AdminCredentialsRepository adminCredentialsRepository;

    @Mock
    AesEncryption aesEncryption;

    @Mock
    AdminDetailsRepository adminDetailsRepository;


    @Test
    @DisplayName("test save admin details")
    public void saveAdmin() {
    when(adminDetailsRepository.findById(Mockito.any())).thenReturn(Optional.of(AdminDetailsDataBuilder.getAdminDetails()));
    when(adminDetailsRepository.findByMobile(Mockito.any())).thenReturn(AdminDetailsDataBuilder.getAdminDetails());
    when(adminDetailsRepository.max()).thenReturn("maxNumber");
    when(adminDetailsRepository.save(Mockito.any())).thenReturn(AdminDetailsDataBuilder.getAdminDetails());
	SuccessResponse response = adminService.saveAdmin(AdminDetailsDataBuilder.getAdminDetailsRequest());
	assertEquals(Constants.ADMIN_DETAILS_SAVED_SUCCESSFULLY, response.getMessage());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test save admin details")
    public void saveAdminThrowsException() {
        when(adminDetailsRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        //when(adminDetailsRepository.findByMobile(Mockito.any())).thenReturn(AdminDetailsDataBuilder.getAdminDetails());
        SuccessResponse response = adminService.saveAdmin(AdminDetailsDataBuilder.getAdminDetailsRequest());
    }

    @Test(expected = BadRequestException.class)
    @DisplayName("test save admin details")
    public void saveAdminThrowsBadRequestException() {
        when(adminDetailsRepository.findById(Mockito.any())).thenReturn(Optional.of(AdminDetailsDataBuilder.getAdminDetails()));
        when(adminDetailsRepository.findByMobile(Mockito.any())).thenReturn(AdminDetailsDataBuilder.getAdminDetailsRequestMobile());
        SuccessResponse response = adminService.saveAdmin(AdminDetailsDataBuilder.getAdminDetailsRequest());
    }

}
