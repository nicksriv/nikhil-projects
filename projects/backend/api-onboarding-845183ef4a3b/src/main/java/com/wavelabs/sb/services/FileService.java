package com.wavelabs.sb.services;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.Files;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.FileType;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.FilesMapper;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.AdminDetailsRepository;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.FilesRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.request.UploadFilesRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

@Service
public class FileService {

    private static final Logger LOGGER = LoggerFactory.getLogger(FileService.class);

    @Autowired
    FilesRepository filesRepository;

    @Autowired
    ClientOnboardingService clientOnboardingService;

    @Autowired
    ClientOnboardingRepository clientOnboardingRepository;

    @Autowired
    AdminDetailsRepository adminDetailsRepository;

    @Autowired
    UserOnboardingRepository userOnboardingRepository;

    @Autowired
    UserProfileService profileService;

    @Value("${file.upload.base.path}")
    private String fileUploadBasePath;

    public SuccessResponse uploadFile(UploadFilesRequest request) {
	checkFileSize(request.getFile());
	String extension = FilenameUtils.getExtension(request.getFile().getOriginalFilename());

	TokenPayLoadDetails tokenPayLoadDetails = request.getDetails();

	if (request.getFiletype().equals(FileType.PROFILE)) {
	    checkFileFormat(extension);
	    return uploadProfile(request);
	} else if (request.getFiletype().equals(FileType.LOGO) || request.getFiletype().equals(FileType.IMAGE)
		|| request.getFiletype().equals(FileType.VIDEO)) {
	    checkFileFormat(extension);
	    Files file = saveFiles(tokenPayLoadDetails, request.getFile(), request.getFiletype());
	    return new SuccessResponse(file.getId(), Constants.FILE_UPLOADED_SUCCESSFULLY);
	} else if (request.getFiletype().equals(FileType.DOCUMENT)) { 
	    checkDocFileFormat(extension);
	    Files file = saveFiles(tokenPayLoadDetails, request.getFile(), request.getFiletype());
	    return new SuccessResponse(file.getId(), Constants.FILE_UPLOADED_SUCCESSFULLY);
	}

	return new SuccessResponse(Constants.FILE_UPLOADED_SUCCESSFULLY);
    }

    public Files saveFiles(TokenPayLoadDetails tokenPayLoadDetails, MultipartFile file, FileType fileType) {
	String fileDir = getFilePath(tokenPayLoadDetails.getId(), tokenPayLoadDetails.getClientSystemId(), fileType);
	String extension = FilenameUtils.getExtension(file.getOriginalFilename());
	String fileName = getFileName();
	saveFile(file, fileUploadBasePath + fileDir, fileName + Constants.DOT + extension);
	Files logo = FilesMapper.getSaveFiles(file.getOriginalFilename(),
		fileUploadBasePath + fileDir + fileName + Constants.DOT + extension, fileType,
		tokenPayLoadDetails.getId(), tokenPayLoadDetails.getTypeOfUser());
	return filesRepository.save(logo);
    }

    public SuccessResponse uploadProfile(UploadFilesRequest request) {

	TokenPayLoadDetails tokenPayLoadDetails = request.getDetails();
	if (tokenPayLoadDetails.getTypeOfUser().equalsIgnoreCase(Constants.CLIENT)) {
	    ClientOnboardingDetails clientOnboardingDetails = profileService
		    .getClient(tokenPayLoadDetails.getClientId());
	    clientOnboardingDetails
		    .setProfileImage(saveFiles(tokenPayLoadDetails, request.getFile(), request.getFiletype()));
	    clientOnboardingDetails.setModifiedAt(Instant.now());
	    clientOnboardingDetails.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
	    clientOnboardingDetails.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
		ClientOnboardingDetails savedClientOnboardDetails=clientOnboardingRepository.save(clientOnboardingDetails);
	    return new SuccessResponse(savedClientOnboardDetails.getProfileImage().getId(),
		    Constants.FILE_UPLOADED_SUCCESSFULLY);
	} else if (tokenPayLoadDetails.getTypeOfUser().equalsIgnoreCase(Constants.ADMIN)) {
	    AdminDetails adminDetails = profileService.getAdmin(tokenPayLoadDetails.getAdminId());
	    adminDetails.setProfileImage(saveFiles(tokenPayLoadDetails, request.getFile(), request.getFiletype()));
	    adminDetails.setModifiedAt(Instant.now());
		AdminDetails savedAdminDetails=adminDetailsRepository.save(adminDetails);
	    return new SuccessResponse(savedAdminDetails.getProfileImage().getId(), Constants.FILE_UPLOADED_SUCCESSFULLY);

	} else if (tokenPayLoadDetails.getTypeOfUser().equalsIgnoreCase(Constants.USER)) {
	    Users users = profileService.getUser(tokenPayLoadDetails.getUserId(), tokenPayLoadDetails.getClientId());
	    users.setProfileImage(saveFiles(tokenPayLoadDetails, request.getFile(), request.getFiletype()));
	    users.setModifiedAt(Instant.now());
	    users.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
	    users.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
	    Users savedUser=userOnboardingRepository.save(users);
	    return new SuccessResponse(savedUser.getProfileImage().getId(), Constants.FILE_UPLOADED_SUCCESSFULLY);
	} else {
	    throw new BadRequestException(ErrorMessages.INVALID_TYPE_OF_USER);
	}

    }

    private void checkFileFormat(String extension) {
	if (!Constants.FILE_EXTENSION.stream().anyMatch(extension::equalsIgnoreCase)) {
	    LOGGER.error("save Image method : Bad Request Exception - invalid image format");
		    throw new BadRequestException(ErrorMessages.INVALID_IMAGE_FORMAT);
	}
    }
    
    private void checkDocFileFormat(String extension) {
   	if (!Constants.DOC_FILE_EXTENSION.stream().anyMatch(extension::equalsIgnoreCase)) {
   	    LOGGER.error("save file method : Bad Request Exception - invalid file format");
   	    throw new BadRequestException(ErrorMessages.INVALID_DOC_FORMAT);
   	}
       }

    private void checkFileSize(MultipartFile file) {
	if (file.getSize() <= 0) {
	    LOGGER.error("save Image method : Bad Request Exception - File Cannot be empty");
	    throw new BadRequestException(ErrorMessages.FILE_CANNOT_BE_EMPTY);
	}
    }

    private String getFilePath(String id, String clientId, FileType fileType) {
	String path = null;

	if (!StringUtils.isBlank(clientId)) {
	    path = Constants.SLASH + clientId;
	}
	if (!StringUtils.isBlank(id)) {
	    path = path != null ? path + Constants.SLASH + id : Constants.SLASH + id;
	}

	if (fileType.equals(FileType.LOGO)) {
	    path = Constants.LOGOS + path;
	}
	if (fileType.equals(FileType.PROFILE)) {
	    path = Constants.PROFILE_IMAGES + path;
	}
	if (fileType.equals(FileType.IMAGE) || fileType.equals(FileType.VIDEO)) {
	    path = Constants.FILES + path;
	}
	if (fileType.equals(FileType.DOCUMENT) || fileType.equals(FileType.VIDEO)) {
	    path = Constants.DOCUMENTS + path;
	}

	return path;
    }

    private String getFileName() {
	String uuid = UUID.randomUUID().toString();
	return Constants.SLASH + uuid;

    }

    private void saveFile(MultipartFile file, String filePtah, String fileName) {

	try {
	    java.nio.file.Files.createDirectories(Paths.get(filePtah));
	    byte[] bytes = file.getBytes();
	    Path path = Paths.get(filePtah + fileName);
	    java.nio.file.Files.write(path, bytes);
	} catch (IOException e) {
	    LOGGER.info("Exception while generating file {}", e.getMessage());
	}
    }

    /*public Resource getFileResource(String fileId) {

	Files fileOptional = getFile(fileId);
	try {
	    File file = new File(fileOptional.getFilePath());
	    if (!file.exists()) {
		throw new ResourceNotFoundException(ErrorMessages.FILE_NOT_FOUND);
	    }
	    Path path = Paths.get(file.getAbsolutePath());
	    return new ByteArrayResource(java.nio.file.Files.readAllBytes(path));
	} catch (Exception e) {
	    throw new ResourceNotFoundException(ErrorMessages.FILE_NOT_FOUND);
	}
    }*/

    public Files getFile(String fileId) {
	Optional<Files> fileOptional = filesRepository.findById(fileId);
	if (!fileOptional.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.FILE_NOT_FOUND);
	}
	return fileOptional.get();
    }

    public HttpHeaders getHttp(String fileName) {

	HttpHeaders header = new HttpHeaders();
	header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
	header.add("Cache-Control", "no-cache, no-store, must-revalidate");
	header.add("Pragma", "no-cache");
	header.add("Expires", "0");

	return header;
    }
}
