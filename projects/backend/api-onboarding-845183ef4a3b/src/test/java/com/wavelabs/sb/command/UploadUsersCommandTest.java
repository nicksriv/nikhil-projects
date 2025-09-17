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
import com.wavelabs.sb.model.UploadUsersModel;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.model.UsersUploadDataBuilder;
import com.wavelabs.sb.response.ViewBulkUploadResponse;
import com.wavelabs.sb.services.ClientOnboardingService;
import com.wavelabs.sb.services.UsersUploadService;

@RunWith(MockitoJUnitRunner.class)
public class UploadUsersCommandTest {

    @InjectMocks
    UploadUsersCommand uploadUsersCommand;
    @Mock
    UsersUploadService usersUploadService;

    @Mock
    ClientOnboardingService clientOnboardingService;

    @Test
    public void executeTest() {
	lenient().when(
		usersUploadService.saveUser(Mockito.any(), Mockito.anyString(), Mockito.anyString(), Mockito.any()))
		.thenReturn(UsersUploadDataBuilder.getErrorRecord());

	MockMultipartFile file;
	try {
	    file = new MockMultipartFile("file", "fileName.xlsx", "multipart/form-data",
		    ExcelDataBuilder.usersBulkUploadTemplate());
	    when(clientOnboardingService.getClientDetailsForModulesAndRoles(Mockito.anyString()))
		    .thenReturn(Optional.of(DataBuilder.getClientOnboardingDetail()));

	    UploadUsersModel model = new UploadUsersModel();
	    model.setClientId("client-id");
	    model.setFile(file);
	    model.setTokenPayLoadDetails(UserDataBuilder.getTokenPayLoadRequest());
	    ViewBulkUploadResponse response = uploadUsersCommand.execute(model);
	    assertEquals(Constants.USERS_DATA_UPLOADED, response.getMessage());

	} catch (IOException e) {
	}

    }

}
