package com.wavelabs.sb.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.mock.web.MockMultipartFile;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.Files;
import com.wavelabs.sb.enums.FileType;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.model.FileDataBuilder;
import com.wavelabs.sb.repositories.AdminDetailsRepository;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.FilesRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.request.UploadFilesRequest;
import com.wavelabs.sb.response.SuccessResponse;

@RunWith(MockitoJUnitRunner.class)
public class FileServiceTest {

    @InjectMocks
    private FileService fileService;

    @Mock
    FilesRepository filesRepository;

    @Mock
    UserProfileService profileService;

    @Mock
    UserOnboardingRepository userOnboardingRepository;
    @Mock
    ClientOnboardingRepository clientOnboardingRepository;

    @Mock
    AdminDetailsRepository adminDetailsRepository;

    @Test
    @DisplayName("test uploadFile")
    public void uploadFile() {
	when(userOnboardingRepository.save(Mockito.any())).thenReturn(FileDataBuilder.getUser());
	when(profileService.getUser(Mockito.any(), Mockito.any())).thenReturn(FileDataBuilder.getUser());
	SuccessResponse response = fileService.uploadFile(FileDataBuilder.getUploadFileRequest());
	// assertEquals(Constants.RECORDS_FETCHED_SUCCESSFULLY,response.getMessage());
    }

    @Test
    @DisplayName("test uploadLogoFile")
    public void uploadLogoFile() {
	when(filesRepository.save(Mockito.any())).thenReturn(FileDataBuilder.getFiles().get());
	UploadFilesRequest request = FileDataBuilder.getUploadFileRequest();
	request.setFiletype(FileType.LOGO);
	SuccessResponse response = fileService.uploadFile(request);
	assertEquals(Constants.FILE_UPLOADED_SUCCESSFULLY, response.getMessage());
    }

    @Test
    @DisplayName("test uploadLogoFile")
    public void uploadDOcumentFile() {
	when(filesRepository.save(Mockito.any())).thenReturn(FileDataBuilder.getFiles().get());
	UploadFilesRequest request = FileDataBuilder.getUploadFileRequest();
	request.setFiletype(FileType.DOCUMENT);
	MockMultipartFile multiPartFile = new MockMultipartFile("data", "filename.pdf", "text/plain",
		"some csv".getBytes());
	request.setFile(multiPartFile);
	SuccessResponse response = fileService.uploadFile(request);
	assertEquals(Constants.FILE_UPLOADED_SUCCESSFULLY, response.getMessage());
    }

    @Test
    @DisplayName("test uploadLogoFile")
    public void uploadDOcumentFileException() {
	UploadFilesRequest request = FileDataBuilder.getUploadFileRequest();
	request.setFiletype(FileType.DOCUMENT);
	assertThrows(BadRequestException.class, () -> {
	    fileService.uploadFile(request);
	});
    }

    @Test
    @DisplayName("test saveFiles")
    public void saveFiles() {
	MockMultipartFile multiPartFile = new MockMultipartFile("data", "filename.csv", "text/plain",
		"some csv".getBytes());
	Files response = fileService.saveFiles(FileDataBuilder.getTokenPayLoadDetails(), multiPartFile,
		FileType.PROFILE);
    }

    @Test
    @DisplayName("test uploadProfile")
    public void uploadProfile() {
	when(userOnboardingRepository.save(Mockito.any())).thenReturn(FileDataBuilder.getUser());
	when(clientOnboardingRepository.save(Mockito.any())).thenReturn(FileDataBuilder.getClientOnboardDetails());
	when(adminDetailsRepository.save(Mockito.any())).thenReturn(FileDataBuilder.getAdminDetails());
	when(profileService.getUser(Mockito.any(), Mockito.any())).thenReturn(FileDataBuilder.getUser());
	when(profileService.getAdmin(Mockito.any())).thenReturn(FileDataBuilder.getAdminDetails());
	when(profileService.getClient(Mockito.any())).thenReturn(FileDataBuilder.getClientOnboardDetails());
	SuccessResponse responseUser = fileService.uploadProfile(FileDataBuilder.getUploadFileRequestUser());
	SuccessResponse responseClient = fileService.uploadProfile(FileDataBuilder.getUploadFileRequestClient());
	SuccessResponse responseAdmin = fileService.uploadProfile(FileDataBuilder.getUploadFileRequestAdmin());
	assertEquals(Constants.FILE_UPLOADED_SUCCESSFULLY, responseUser.getMessage());
	assertEquals(Constants.FILE_UPLOADED_SUCCESSFULLY, responseClient.getMessage());
	assertEquals(Constants.FILE_UPLOADED_SUCCESSFULLY, responseAdmin.getMessage());
    }

    @Test
    @DisplayName("test getFile")
    public void getFile() {
	when(filesRepository.findById(Mockito.any())).thenReturn(FileDataBuilder.getFiles());
	Files response = fileService.getFile("fileId");
	assertEquals("test-id", response.getId());
    }

    @Test(expected = ResourceNotFoundException.class)
    @DisplayName("test getFile")
    public void getFileThrowsException() {
	when(filesRepository.findById(Mockito.any())).thenReturn(Optional.empty());
	Files response = fileService.getFile("fileId");
	assertEquals("test-id", response.getId());
    }

    @Test
    @DisplayName("test getHttp")
    public void getHttp() {
	fileService.getHttp("fileId");
    }

}
