package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.model.FileDataBuilder;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.FileService;

@RunWith(MockitoJUnitRunner.class)
public class UploadFileCommandTest {

    @Mock
    FileService fileService;

    @InjectMocks
    UploadFileCommand uploadFileCommand;

    @Test()
    @DisplayName("Test uploadFileCommand")
    public void uploadFileCommand() {
	when(fileService.uploadFile(Mockito.any())).thenReturn(FileDataBuilder.getSuccessResponseFileUpload());
	SuccessResponse response = uploadFileCommand.execute(FileDataBuilder.getUploadFileRequest());
	assertEquals(Constants.FILE_UPLOADED_SUCCESSFULLY,response.getMessage());
    }

    @Test()
    @DisplayName("Test getFileCommand")
    public void getFileCommand() {
        when(fileService.uploadFile(Mockito.any())).thenReturn(FileDataBuilder.getSuccessResponseFileUpload());
        SuccessResponse response = uploadFileCommand.execute(FileDataBuilder.getUploadFileRequest());
        assertEquals(Constants.FILE_UPLOADED_SUCCESSFULLY,response.getMessage());
    }


}
