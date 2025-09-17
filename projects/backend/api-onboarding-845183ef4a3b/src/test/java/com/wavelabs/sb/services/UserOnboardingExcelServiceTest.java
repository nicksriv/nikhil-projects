package com.wavelabs.sb.services;

import java.io.ByteArrayInputStream;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.repositories.UserOnboardingRepository;

@RunWith(MockitoJUnitRunner.class)
public class UserOnboardingExcelServiceTest {

    @InjectMocks
    ExcelService userOnboardingService;

    @Mock
    UserOnboardingRepository userOnboardingRepository;

    @Test
    @DisplayName("test userDetailsExcel with success response")
    public void userDetailsExcelTest() {
	ByteArrayInputStream userDetailsToExcel = ExcelService.userDetailsToExcel(UserDataBuilder.getUserDetails());
    }

    @Test
    @DisplayName("test userDetailsExcel with success response")
    public void usersBulkUploadTemplateTest() {
	ByteArrayInputStream userDetailsToExcel = ExcelService.usersBulkUploadTemplate();
    }

}
