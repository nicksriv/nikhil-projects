package com.wavelabs.sb.command;

import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import com.wavelabs.sb.model.AuthDetailsDataBuilder;
import com.wavelabs.sb.model.FileDataBuilder;
import com.wavelabs.sb.services.FileService;
import com.wavelabs.sb.services.UserProfileService;

@RunWith(MockitoJUnitRunner.class)
public class GetProfileImageCommandTest {

    @Mock
    FileService fileService;

    

    @InjectMocks
    GetProfileImageCommand getProfileImageCommand;

    @Mock
    UserProfileService userProfileService;

    @Test()
    @DisplayName("Test getFileCommand")
    public void getFileCommand() {
	when(userProfileService.getProfile(Mockito.any())).thenReturn(FileDataBuilder.getFiles().get());
	Resource resource = null;
	when(userProfileService.getFile(Mockito.any())).thenReturn(resource);
	HttpHeaders headers = null;
	when(fileService.getHttp(Mockito.any())).thenReturn(headers);
	ResponseEntity<Resource> response = getProfileImageCommand
		.execute(AuthDetailsDataBuilder.getTokenPayLoadDetails());
    }

}
