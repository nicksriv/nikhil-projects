package com.wavelabs.sb.command;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.mock.web.MockMultipartFile;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.model.DataBuilder;
import com.wavelabs.sb.model.ExcelDataBuilder;
import com.wavelabs.sb.model.UploadSitesModel;
import com.wavelabs.sb.model.UsersUploadDataBuilder;
import com.wavelabs.sb.response.ViewBulkUploadResponse;
import com.wavelabs.sb.services.ClientOnboardingService;
import com.wavelabs.sb.services.SiteUploadService;

@RunWith(MockitoJUnitRunner.class)
public class SitesBulkUploadCommandTest {

    @Mock
    SiteUploadService siteUploadService;

    @Mock
    ClientOnboardingService clientOnboardingService;

    @InjectMocks
    SitesBulkUploadCommand sitesBulkUploadCommand;

    @Test
    public void executeTest() {
	lenient().when(siteUploadService.saveSite(Mockito.any(), Mockito.anyString(), Mockito.any()))
		.thenReturn(UsersUploadDataBuilder.getErrorRecord());
	try {
	    MockMultipartFile file = new MockMultipartFile("file", "file.xlsx", "multipart/form-data",
		    ExcelDataBuilder.sitesBulkUploadTemplate());
	    when(clientOnboardingService.getClientDetailsForModulesAndRoles(Mockito.anyString()))
		    .thenReturn(Optional.of(DataBuilder.getClientOnboardingDetail()));
	    UploadSitesModel model = new UploadSitesModel();
	    model.setClientId("client-id");
	    model.setFile(file);
	    ViewBulkUploadResponse response = sitesBulkUploadCommand.execute(model);
	    assertEquals(Constants.USERS_DATA_UPLOADED, response.getMessage());
	} catch (IOException e) {
	}
    }
}
