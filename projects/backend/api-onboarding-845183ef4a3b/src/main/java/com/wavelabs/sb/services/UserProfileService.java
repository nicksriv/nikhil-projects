package com.wavelabs.sb.services;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.AdminCredentials;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ClientsCredentials;
import com.wavelabs.sb.documents.Files;
import com.wavelabs.sb.documents.LocationMapping;
import com.wavelabs.sb.documents.QualityAssurance;
import com.wavelabs.sb.documents.SiteOnboardingDetails;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.enums.FileType;
import com.wavelabs.sb.enums.QualityControllerStatus;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.EntityNotFoundException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.UserOnboardingMapper;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.AdminCredentialsRepository;
import com.wavelabs.sb.repositories.AdminDetailsRepository;
import com.wavelabs.sb.repositories.ClientCredentialsRepository;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.FilesRepository;
import com.wavelabs.sb.repositories.ProfileImageRepository;
import com.wavelabs.sb.repositories.QualityAssuranceRepository;
import com.wavelabs.sb.repositories.UserBankDetailsRepository;
import com.wavelabs.sb.repositories.UserCredentialsRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.request.ChangePasswordRequest;
import com.wavelabs.sb.request.UploadProfileImageRequest;
import com.wavelabs.sb.request.UserProfileUpdateRequest;
import com.wavelabs.sb.response.LocationDetails;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.UserProfileDetails;
import com.wavelabs.sb.utils.OnboardingUtil;

@Service
public class UserProfileService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserProfileService.class);

		@Autowired
		QualityAssuranceRepository qualityAssuranceRepository;

    @Autowired
    ClientCredentialsRepository clientCredentialsRepository;

    @Autowired
    UserCredentialsRepository userCredentialsRepository;

    @Autowired
    ClientOnboardingRepository clientOnBoardingRepository;

    @Autowired
    UserOnboardingRepository userOnboardingRepository;

    @Autowired
    AesEncryption aesEncryption;

    @Autowired
    AdminDetailsRepository adminDetailsRepository;

    @Autowired
    AdminCredentialsRepository adminCredentialsRepository;

    @Autowired
    ProfileImageRepository profileImageRepository;

    @Autowired
    ClientOnboardingService clientOnboardingService;

    @Autowired
    UserBankDetailsRepository userBankDetailsRepository;

    @Autowired
    SiteOnboardingService siteOnboardingService;

    @Autowired
    UserOnboardingService userOnboardingService;

    @Autowired
    FilesRepository filesRepository;

    @Autowired
    FileService fileService;

    public SuccessResponse updatePassword(TokenPayLoadDetails details, ChangePasswordRequest request) {
	LOGGER.info("updatePassword method started..!");

	if (details.getTypeOfUser().equalsIgnoreCase(Constants.CLIENT) && details.getClientId() != null) {
	    updateClientPassword(details, request);
	}
	if (details.getTypeOfUser().equalsIgnoreCase(Constants.USER) && details.getClientId() != null
		&& details.getUserId() != null) {
	    updateUserPassword(details, request);
	}

	if (details.getTypeOfUser().equalsIgnoreCase(Constants.ADMIN) && details.getAdminId() != null) {
	    updateAdminPassword(details.getAdminId(), request);
	}
	LOGGER.info("updatePassword method ended..!");
	return new SuccessResponse(Constants.PASSWORD_CHANGED_SUCCESSFULLY);
    }

    public void checkPassword(String oldPassword, String newPassword, String currentPassword) {

	if (!StringUtils.isBlank(oldPassword) && !StringUtils.isBlank(currentPassword)
		&& !oldPassword.equalsIgnoreCase(currentPassword)) {
	    throw new BadRequestException(ErrorMessages.CURRENT_PASSWORD_NOT_MATCHED);
	}
	if (!StringUtils.isBlank(oldPassword) && !StringUtils.isBlank(newPassword)
		&& oldPassword.equalsIgnoreCase(newPassword)) {
	    throw new BadRequestException(ErrorMessages.NEW_OLD_PASSWORD_CANNOT_BE_SAME);
	}
    }

    private void updateClientPassword(TokenPayLoadDetails details, ChangePasswordRequest request) {
	Optional<ClientOnboardingDetails> clientOptional = clientOnBoardingRepository
		.findByClientIdAndDeleted(details.getClientId(), false);
	if (!clientOptional.isPresent()) {
	    throw new BadRequestException(ErrorMessages.CLIENT_NOT_FOUND);
	}
	if (clientOptional.get().getStatus() != null && clientOptional.get().getStatus().equals(Status.INACTIVE)) {
	    throw new BadRequestException(ErrorMessages.CLIENT_NOT_ACTIVE);
	}
	if (clientOptional.get().getClientCredentials() != null) {
	    ClientsCredentials clientCredentials = clientOptional.get().getClientCredentials();
	    LOGGER.debug("encripting given password..!");
	    String newPassword = aesEncryption.encrypt(request.getNewPassword());
	    String currentPassword = aesEncryption.encrypt(request.getCurrentPassword());
	    checkPassword(clientCredentials.getPassword(), newPassword, currentPassword);
	    clientCredentials.setPassword(newPassword);
	    clientCredentials.setModifiedAt(Instant.now());
	    clientCredentials.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	    clientCredentials.setModifiedUserType(details.getTypeOfUser());
	    clientCredentialsRepository.save(clientCredentials);
	} else {
	    throw new BadRequestException(ErrorMessages.CLIENT_CREDENTIALS_NOT_FOUND);
	}
    }

    private void updateUserPassword(TokenPayLoadDetails details, ChangePasswordRequest request) {
	Optional<Users> userOptional = userOnboardingRepository.findByUserIdAndClientIdAndDeleted(details.getUserId(),
		details.getClientId(), false);
	if (!userOptional.isPresent()) {
	    throw new BadRequestException(ErrorMessages.USER_NOT_FOUND);
	}
	if (userOptional.get().getStatus() != null && userOptional.get().getStatus().equals(Status.INACTIVE)) {
	    throw new BadRequestException(ErrorMessages.USER_NOT_ACTIVE);
	}
	if (userOptional.get().getUserCredentials() != null) {
	    UserCredentials credentials = userOptional.get().getUserCredentials();
	    LOGGER.debug("encripting given password..!");
	    String newPassword = aesEncryption.encrypt(request.getNewPassword());
	    String currentPassword = aesEncryption.encrypt(request.getCurrentPassword());
	    checkPassword(credentials.getPassword(), newPassword, currentPassword);
	    credentials.setPassword(newPassword);
	    credentials.setModifiedAt(Instant.now());
	    credentials.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	    credentials.setModifiedUserType(details.getTypeOfUser());
	    userCredentialsRepository.save(credentials);
	} else {
	    throw new BadRequestException(ErrorMessages.USER_CREDENTIALS_NOT_FOUND);
	}
    }

    private void updateAdminPassword(String clientId, ChangePasswordRequest request) {
	Optional<AdminDetails> adminOptional = adminDetailsRepository.findByAdminIdAndDeleted(clientId, false);
	if (!adminOptional.isPresent()) {
	    throw new BadRequestException(ErrorMessages.ADMIN_NOT_FOUND);
	}
	if (adminOptional.get().getStatus() != null && adminOptional.get().getStatus().equals(Status.INACTIVE)) {
	    throw new BadRequestException(ErrorMessages.USER_NOT_ACTIVE);
	}
	if (adminOptional.get().getAdminCredentials() != null) {
	    AdminCredentials credentials = adminOptional.get().getAdminCredentials();
	    LOGGER.debug("encripting given password..!");
	    String newPassword = aesEncryption.encrypt(request.getNewPassword());
	    String currentPassword = aesEncryption.encrypt(request.getCurrentPassword());
	    checkPassword(credentials.getPassword(), newPassword, currentPassword);
	    credentials.setPassword(newPassword);
	    credentials.setModifiedAt(Instant.now());
	    adminCredentialsRepository.save(credentials);
	} else {
	    throw new BadRequestException(ErrorMessages.ADMIN_CREDENTIALS_NOT_FOUND);
	}
    }

    /*
     * private void isValidPassword(String conformPassowrd, String newPassword) { if
     * (!StringUtils.isBlank(conformPassowrd) && !StringUtils.isBlank(newPassword)
     * && !conformPassowrd.equalsIgnoreCase(newPassword)) { throw new
     * BadRequestException(ErrorMessages.PASSWORD_NOT_MATCHED); } }
     */

    public UserProfileDetails fetchUserProfile(TokenPayLoadDetails tokenPayloadDetails) {
	LOGGER.info("enter into fetch User Profile");

	if (tokenPayloadDetails.getTypeOfUser().equalsIgnoreCase(Constants.CLIENT)) {
	    LOGGER.info("fetching cleint details :: ");
	    Optional<ClientOnboardingDetails> clientOnboardingDetails = clientOnBoardingRepository
		    .findByClientIdAndStatusAndDeleted(tokenPayloadDetails.getClientId(), Status.ACTIVE, false);
	    if (clientOnboardingDetails.isPresent()) {
		return UserOnboardingMapper.getUserProfile(clientOnboardingDetails.get());
	    }
	    LOGGER.info("fetchUser Profile :: ResourceNotFoundException - Client Not found");
	    throw new ResourceNotFoundException(
		    Constants.ACTIVE_CLIENT_NOT_FOUND + " clientId : " + tokenPayloadDetails.getClientId());

	} else if (tokenPayloadDetails.getTypeOfUser().equalsIgnoreCase(Constants.USER)) {
	    LOGGER.info("fetching user details :: ");
	    Optional<Users> users = userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(
		    tokenPayloadDetails.getUserId(), tokenPayloadDetails.getClientId(), Status.ACTIVE, false);
	    if (users.isPresent()) {
		Users user = users.get();
		Users refferedUser = null;
		Users reportingUser = null;
		if (!StringUtils.isBlank(user.getRefferedEmployeeId())) {
		    refferedUser = getUserOrNull(user.getRefferedEmployeeId());
		}
		if (!StringUtils.isBlank(user.getReportingManagerId())) {
		    reportingUser = getUserOrNull(user.getReportingManagerId());
		}
		UserProfileDetails userProfileDetails = UserOnboardingMapper.getUserProfile(user, reportingUser,
			refferedUser);
		if (user.getLocations() != null && !user.getLocations().isEmpty()) {
		    userProfileDetails.setUserSiteLocaions(getUserLocations(user.getLocations(), user.getClientId()));
		}
		return userProfileDetails;
	    }
	    LOGGER.info("fetchUser Profile :: ResourceNotFoundException - User Not found");
	    throw new ResourceNotFoundException(Constants.ACTIVE_USER_NOT_FOUND + " with IDs : "
		    + tokenPayloadDetails.getUserId() + ", " + tokenPayloadDetails.getClientId());

	} else if (tokenPayloadDetails.getTypeOfUser().equalsIgnoreCase(Constants.ADMIN)) {

	    LOGGER.info("fetching user details :: ");
	    Optional<AdminDetails> adminOptional = adminDetailsRepository
		    .findByAdminIdAndStatusAndDeleted(tokenPayloadDetails.getAdminId(), Status.ACTIVE, false);
	    if (adminOptional.isPresent()) {
		return UserOnboardingMapper.getAdminProfile(adminOptional.get());
	    }
	    LOGGER.info("fetchUser Profile :: ResourceNotFoundException - User Not found");
	    throw new ResourceNotFoundException(ErrorMessages.ADMIN_NOT_FOUND);
	} 
	else if (tokenPayloadDetails.getTypeOfUser().equalsIgnoreCase(Constants.QUALITY_ASSURANCE)){
		LOGGER.info("fetching Quality Assurance details :: ");
		Optional<QualityAssurance> qualityAssuranceOptional = qualityAssuranceRepository.findByIdAndQualityControllerStatus(tokenPayloadDetails.getUserId(), QualityControllerStatus.ACTIVE);
		if (qualityAssuranceOptional.isPresent()) {
			return UserOnboardingMapper.getQualityAssuranceProfile(qualityAssuranceOptional.get());
		}
		LOGGER.info("fetchUser Profile :: ResourceNotFoundException - User Not found");
	    throw new ResourceNotFoundException(ErrorMessages.QUALITY_ASSURANCE_NOT_FOUND);
	}
	else {
	    LOGGER.info("fetchUser Profile :: BadRequestException - Invalid Type Of User");
	    throw new BadRequestException(ErrorMessages.INVALID_TYPE_OF_USER);
	}
    }

    private List<LocationDetails> getUserLocations(List<String> siteIds, String clientId) {
	List<LocationDetails> storesResponse = new ArrayList<>();
	LOGGER.info("enter into viewLocationDetailsByUserId :: fetching site details");
	List<SiteOnboardingDetails> siteDetailsList = siteOnboardingService.fetchSitesBySiteIds(siteIds, clientId);
	if (siteDetailsList != null && !siteDetailsList.isEmpty()) {
	    siteDetailsList.stream().forEach(site -> {
		List<Users> usersList = new ArrayList<>();
		if (site.getManagers() != null && !site.getManagers().isEmpty()) {
		    usersList = siteOnboardingService.fetchAllManagers(site.getManagers(), site.getClientId());
		}

		List<LocationMapping> locationMappingList = new ArrayList<>();
		LocationDetails locationDetailsOfSite = UserOnboardingMapper.getLocationDetailsOfSite(site, usersList, locationMappingList);
		storesResponse.add(locationDetailsOfSite);
	    });
	}
	return storesResponse;
    }

    public SuccessResponse updateUserProfile(TokenPayLoadDetails tokenPayLoadDetails,
	    UserProfileUpdateRequest updateRequest) {

	if (tokenPayLoadDetails.getTypeOfUser().equalsIgnoreCase(Constants.CLIENT)) {

	    Optional<ClientOnboardingDetails> clientOnboardingDetails = clientOnBoardingRepository
		    .findByClientIdAndStatusAndDeleted(tokenPayLoadDetails.getClientId(), Status.ACTIVE, false);
	    if (clientOnboardingDetails.isPresent()) {
		ClientOnboardingDetails detailsToUpdate = UserOnboardingMapper
			.getClientDetailsToUpdate(clientOnboardingDetails.get(), updateRequest, tokenPayLoadDetails);
		if (!StringUtils.isBlank(updateRequest.getProfileId())
			&& (clientOnboardingDetails.get().getProfileImage() == null || !updateRequest.getProfileId()
				.equals(clientOnboardingDetails.get().getProfileImage().getId()))) {
		    Optional<Files> backgroundImage = filesRepository.findById(updateRequest.getProfileId());
		    if (backgroundImage.isPresent()) {
			clientOnboardingDetails.get().setProfileImage(backgroundImage.get());
		    } else {
			LOGGER.error("Saving Client deatils : Entity Not Found - Client Background Image Not found");
			throw new EntityNotFoundException(
				Constants.CLIENT_BACKGROUND_IMAGE_NOT_FOUND + updateRequest.getProfileId());
		    }
		}
		clientOnBoardingRepository.save(detailsToUpdate);
		return new SuccessResponse(detailsToUpdate.getClientId(), Constants.PROFILE_UPDATE_SUCCESS);
	    }
	    throw new ResourceNotFoundException(
		    Constants.ACTIVE_CLIENT_NOT_FOUND + " clientId : " + tokenPayLoadDetails.getClientId());

	} else if (tokenPayLoadDetails.getTypeOfUser().equalsIgnoreCase(Constants.USER)) {

	    Optional<Users> users = userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(
		    tokenPayLoadDetails.getUserId(), tokenPayLoadDetails.getClientId(), Status.ACTIVE, false);
	    if (users.isPresent()) {
		if (userOnboardingRepository.existsByPersonnelPhoneNumberAndClientIdAndDeletedAndIdNot(
			updateRequest.getPhone(), tokenPayLoadDetails.getClientId(), false, users.get().getId())) {
		    throw new ResourceNotFoundException(ErrorMessages.MOBILE_NUMBER_EXISTS);
		}
		Users userDetailsToUpdate = UserOnboardingMapper.getUserDetailsToUpdate(users.get(), updateRequest,
			tokenPayLoadDetails);
		if (userDetailsToUpdate.getBank() != null) {
		    userDetailsToUpdate.getBank().setBranch(updateRequest.getBranchName());
		    userDetailsToUpdate.setModifiedAt(Instant.now());
		    userDetailsToUpdate.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
		    userBankDetailsRepository.save(userDetailsToUpdate.getBank());
		}
		if (!StringUtils.isBlank(updateRequest.getProfileId()) && (users.get().getProfileImage() == null
			|| !updateRequest.getProfileId().equals(users.get().getProfileImage().getId()))) {
		    Optional<Files> backgroundImage = filesRepository.findById(updateRequest.getProfileId());
		    if (backgroundImage.isPresent()) {
			userDetailsToUpdate.setProfileImage(backgroundImage.get());
		    } else {
			LOGGER.error("Saving Client deatils : Entity Not Found - Client Background Image Not found");
			throw new EntityNotFoundException(
				Constants.CLIENT_BACKGROUND_IMAGE_NOT_FOUND + updateRequest.getProfileId());
		    }
		}
		userOnboardingRepository.save(userDetailsToUpdate);
		return new SuccessResponse(tokenPayLoadDetails.getUserId(), Constants.PROFILE_UPDATE_SUCCESS);
	    } else {
		throw new ResourceNotFoundException(Constants.ACTIVE_USER_NOT_FOUND + " with IDs : "
			+ tokenPayLoadDetails.getUserId() + ", " + tokenPayLoadDetails.getClientId());
	    }
	}

	else if (tokenPayLoadDetails.getTypeOfUser().equalsIgnoreCase(Constants.ADMIN)) {

	    Optional<AdminDetails> adminOptional = adminDetailsRepository
		    .findByAdminIdAndStatusAndDeleted(tokenPayLoadDetails.getAdminId(), Status.ACTIVE, false);
	    if (adminOptional.isPresent()) {
		AdminDetails adminDetails2 = adminDetailsRepository.findByMobile(updateRequest.getPhone());

		if (adminDetails2 != null && !adminDetails2.getId().equalsIgnoreCase(tokenPayLoadDetails.getId())) {
		    throw new BadRequestException(ErrorMessages.ADMIN_MOBILE_ALREADY_MAPPED);
		}
		AdminDetails adminDetails = UserOnboardingMapper.getAdminDetailsToUpdate(adminOptional.get(),
			updateRequest);
		if (!StringUtils.isBlank(updateRequest.getProfileId()) && (adminOptional.get().getProfileImage() == null
			|| !updateRequest.getProfileId().equals(adminOptional.get().getProfileImage().getId()))) {
		    Optional<Files> backgroundImage = filesRepository.findById(updateRequest.getProfileId());
		    if (backgroundImage.isPresent()) {
			adminDetails.setProfileImage(backgroundImage.get());
		    } else {
			LOGGER.error("Saving Client deatils : Entity Not Found - Client Background Image Not found");
			throw new EntityNotFoundException(
				Constants.CLIENT_BACKGROUND_IMAGE_NOT_FOUND + updateRequest.getProfileId());
		    }
		}
		adminDetailsRepository.save(adminDetails);
		return new SuccessResponse(adminDetails.getId(), Constants.PROFILE_UPDATE_SUCCESS);
	    } else {
		throw new ResourceNotFoundException(Constants.ACTIVE_USER_NOT_FOUND + " with IDs : "
			+ tokenPayLoadDetails.getUserId() + ", " + tokenPayLoadDetails.getClientId());
	    }
	} else {
	    LOGGER.info("fetchUser Profile :: BadRequestException - Invalid Type Of User");
	    throw new BadRequestException(ErrorMessages.INVALID_TYPE_OF_USER);
	}
    }

    public void updatePassword() {
	List<ClientsCredentials> clientList = clientCredentialsRepository.findAll();
	List<ClientsCredentials> updatedCclientList = new ArrayList<>();
	clientList.forEach(client -> {
	    client.setPassword(aesEncryption.encrypt(client.getPassword()));
	    updatedCclientList.add(client);
	});
	clientCredentialsRepository.saveAll(updatedCclientList);

	List<UserCredentials> userList = userCredentialsRepository.findAll();
	List<UserCredentials> updatedUserList = new ArrayList<>();
	userList.forEach(client -> {
	    client.setPassword(aesEncryption.encrypt(client.getPassword()));
	    updatedUserList.add(client);
	});
	userCredentialsRepository.saveAll(updatedUserList);
    }

    public SuccessResponse uploadProfile(UploadProfileImageRequest request) {

	TokenPayLoadDetails tokenPayLoadDetails = request.getDetails();
	if (tokenPayLoadDetails.getTypeOfUser().equalsIgnoreCase(Constants.CLIENT)) {
	    ClientOnboardingDetails clientOnboardingDetails = getClient(tokenPayLoadDetails.getClientId());
	    clientOnboardingDetails
		    .setProfileImage(fileService.saveFiles(request.getDetails(), request.getFile(), FileType.PROFILE));
	    clientOnboardingDetails.setModifiedAt(Instant.now());
	    clientOnboardingDetails.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
	    clientOnboardingDetails.setModifiedBy(tokenPayLoadDetails.getTypeOfUser());
	    clientOnBoardingRepository.save(clientOnboardingDetails);
	    return getImageResponse(clientOnboardingDetails.getProfileImage().getId());
	} else if (tokenPayLoadDetails.getTypeOfUser().equalsIgnoreCase(Constants.ADMIN)) {
	    AdminDetails adminDetails = getAdmin(tokenPayLoadDetails.getAdminId());
	    adminDetails
		    .setProfileImage(fileService.saveFiles(request.getDetails(), request.getFile(), FileType.PROFILE));
	    adminDetails.setModifiedAt(Instant.now());
	    adminDetailsRepository.save(adminDetails);
	    return getImageResponse(adminDetails.getProfileImage().getId());

	} else if (tokenPayLoadDetails.getTypeOfUser().equalsIgnoreCase(Constants.USER)) {
	    Users users = getUser(tokenPayLoadDetails.getUserId(), tokenPayLoadDetails.getClientId());
	    users.setProfileImage(fileService.saveFiles(request.getDetails(), request.getFile(), FileType.PROFILE));
	    users.setModifiedAt(Instant.now());
	    users.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
	    users.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
	    userOnboardingRepository.save(users);

	    return getImageResponse(users.getProfileImage().getId());
	} else {
	    throw new BadRequestException(ErrorMessages.INVALID_TYPE_OF_USER);
	}

    }

    private SuccessResponse getImageResponse(String id) {
	SuccessResponse response = new SuccessResponse();
	response.setId(id);
	response.setMessage(Constants.IMAGE_UPLOADED_SUCCESSFULLY);
	return response;
    }

    public Files getProfile(TokenPayLoadDetails request) {
	if (request.getTypeOfUser().equalsIgnoreCase(Constants.CLIENT)) {

	    ClientOnboardingDetails clientOnboardingDetails = getClient(request.getClientId());
	    if (clientOnboardingDetails.getProfileImage() != null) {
		return clientOnboardingDetails.getProfileImage();
	    }
	} else if (request.getTypeOfUser().equalsIgnoreCase(Constants.ADMIN)) {
	    AdminDetails adminDetails = getAdmin(request.getAdminId());
	    if (adminDetails.getProfileImage() != null) {
		return adminDetails.getProfileImage();
	    }

	} else if (request.getTypeOfUser().equalsIgnoreCase(Constants.USER)) {
	    Users users = getUser(request.getUserId(), request.getClientId());
	    if (users.getProfileImage() != null) {
		return users.getProfileImage();
	    }
	} else {
	    throw new BadRequestException(ErrorMessages.INVALID_TYPE_OF_USER);
	}

	throw new ResourceNotFoundException(ErrorMessages.PROFILE_IMAGE_NOT_FOUND);
    }

    public Resource getFile(Files fileOptional) {
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
    }

    public Users getUser(String userId, String clientId) {
	Optional<Users> users = userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(userId, clientId,
		Status.ACTIVE, false);
	if (!users.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.USER_NOT_FOUND);
	}
	return users.get();
    }

    /*
     * public Users getUserOrNull(String userId, String clientId) { Optional<Users>
     * users =
     * userOnboardingRepository.findByUserIdAndClientIdAndStatusAndDeleted(userId,
     * clientId, Status.ACTIVE, false); if (!users.isPresent()) { return null; }
     * return users.get(); }
     */

    public Users getUserOrNull(String userId) {
	Optional<Users> users = userOnboardingRepository.findById(userId);
	if (!users.isPresent()) {
	    return null;
	}
	return users.get();
    }

    public AdminDetails getAdmin(String adminId) {
	Optional<AdminDetails> adminOptional = adminDetailsRepository.findByAdminIdAndStatusAndDeleted(adminId,
		Status.ACTIVE, false);
	if (!adminOptional.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.ADMIN_NOT_FOUND);
	}
	return adminOptional.get();
    }

    public ClientOnboardingDetails getClient(String clientId) {
	Optional<ClientOnboardingDetails> clientOnboardingDetails = clientOnBoardingRepository
		.findByClientIdAndStatusAndDeleted(clientId, Status.ACTIVE, false);
	if (!clientOnboardingDetails.isPresent()) {
	    throw new ResourceNotFoundException(ErrorMessages.CLIENT_NOT_FOUND);
	}
	return clientOnboardingDetails.get();
    }

}
