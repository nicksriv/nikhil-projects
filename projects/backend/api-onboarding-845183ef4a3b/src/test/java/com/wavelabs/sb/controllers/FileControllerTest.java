package com.wavelabs.sb.controllers;

import static org.mockito.Mockito.when;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;

import com.wavelabs.sb.command.GetFileCommand;
import com.wavelabs.sb.command.UploadFileCommand;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.enums.FileType;
import com.wavelabs.sb.model.FileDataBuilder;
import com.wavelabs.sb.model.RoleOnboardingDataBuilder;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;

@RunWith(MockitoJUnitRunner.class)
public class FileControllerTest {

    @InjectMocks
	FileController fileController;

	@Mock
	UploadFileCommand uploadFileCommand;

	@Mock
	AuthenticationService authenticationService;

	@Mock
	HttpServletRequest httpServletRequest;

	@Mock
	GetFileCommand getFileCommand;

    @Test
    @DisplayName("Test saveFile")
    public void saveFile()  {
	when(authenticationService.getTokenPayLoadDetails(Mockito.any())).thenReturn((FileDataBuilder.getTokenPayLoadDetails()));
	when(uploadFileCommand.execute(Mockito.any())).thenReturn((RoleOnboardingDataBuilder.getTestSuccessResponse()));
	MockMultipartFile firstFile = new MockMultipartFile("data", "filename.txt", "text/plain", "some xml".getBytes());
	ResponseEntity<SuccessResponse> response = fileController.saveFile("authorization",httpServletRequest,firstFile,FileType.PROFILE);
    Assertions.assertEquals(Constants.FILE_UPLOADED_SUCCESSFULLY, response.getBody().getMessage());
	}

	@Test
	@DisplayName("Test getClientLogo")
	public void getClientLogo()  {
		when(getFileCommand.execute(Mockito.any())).thenReturn(FileDataBuilder.getResource());
		ResponseEntity<Resource> response=fileController.getClientLogo("test-fileId");
	}

}
