package com.wavelabs.sb.services;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.EmailTemplates;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.StoreLocations;
import com.wavelabs.sb.documents.UserBankDetails;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.StoreMapper;
import com.wavelabs.sb.mappers.UserOnboardingMapper;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.StoreRepository;
import com.wavelabs.sb.repositories.UserBankDetailsRepository;
import com.wavelabs.sb.repositories.UserCredentialsRepository;
import com.wavelabs.sb.repositories.UserOnboardingRepository;
import com.wavelabs.sb.request.UploadUserRequest;
import com.wavelabs.sb.response.ErrorRecord;
import com.wavelabs.sb.utils.OnboardingUtil;

@Service
@Validated
public class UsersUploadService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UsersUploadService.class);

    @Autowired
    UserOnboardingRepository userOnboardingRepository;

    @Autowired
    UserCredentialsRepository userCredentialsRepository;

    @Autowired
    StoreRepository storeRepository;

    @Autowired
    UserBankDetailsRepository bankDetailsRepository;

    @Autowired
    RoleOnboardingRepository roleOnboardingRepository;

    @Autowired
    AesEncryption aesEncryption;

    @Autowired
    EmailService emailService;

    @Autowired
    UserProfileService userProfileService;
    
    @Autowired
    UserOnboardingService userOnboardingService;

    public ErrorRecord saveUser(@Valid UploadUserRequest userRequest, String clientId, String clientDocId,
	    TokenPayLoadDetails details) {
	LOGGER.info("saveUser method started");
	try {

	    if (!userOnboardingRepository.existsByPersonnelPhoneNumberAndClientIdAndDeleted(
		    userRequest.getContactNumber(), clientId, false)) {
		boolean employee = userOnboardingRepository.existsByUserIdAndDeleted(userRequest.getEmployeeId(),
			false);
		if (employee) {
		    LOGGER.info("save user :: Bad Request Exception - Employee Id Already Mapped");
		    throw new BadRequestException(ErrorMessages.EMPLOYEE_ID_ALREADY_MAPPED);
		}

		List<RoleOnboardingDetails> roles = getRoles(userRequest.getRoles(), clientDocId);
		saveLocation(userRequest, clientId);
		Users users = UserOnboardingMapper.getUser(userRequest, new Users(), clientId);
		users = UserOnboardingMapper.getUserEmployeeInfo(userRequest, users, roles,
			userOnboardingService.getReferralUserId(userRequest.getReferral()), userOnboardingService.getRMUserId(userRequest.getReportingManager()));
		users.setCreatedAt(Instant.now());
		users.setModifiedAt(Instant.now());
		users.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
		users.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
		users.setCreatedUserType(details.getTypeOfUser());
		users.setModifiedUserType(details.getTypeOfUser());
		LOGGER.info("Saving user details");
		users = userOnboardingRepository.save(users);
		UserCredentials userCredentials = UserOnboardingMapper.createCredentials(users,
			aesEncryption.encrypt(Constants.PASSWORD), details);
		LOGGER.info("save user :: saving user credentials");
		userCredentialsRepository.save(userCredentials);
		users.setUserCredentials(userCredentials);
		users.setBank(saveUserBankDetails(userRequest));
		LOGGER.info("save user :: saving user details");
		userOnboardingRepository.save(users);
		if (!StringUtils.isBlank(users.getOfficialEmail())) {
		    sendEmail(userCredentials, users.getUserId(), users.getOfficialEmail());
		}

	    } else {
		LOGGER.info("save user :: Resource Not Found - User Already Onboarded");
		throw new ResourceNotFoundException(Constants.USER_ONBOARDED);
	    }
	    LOGGER.info("save user :: null - end");
	    return null;
	} catch (Exception e) {
	    ErrorRecord errorRecord = new ErrorRecord();
	    errorRecord.setMessage(e.getMessage());
	    LOGGER.info(e.getMessage());
	    return errorRecord;
	}

    }

   
    private UserBankDetails saveUserBankDetails(UploadUserRequest userRequest) {
	LOGGER.info("In save User Bank Details :: ");
	return bankDetailsRepository.save(UserOnboardingMapper.getUserBankDetails(new UserBankDetails(), userRequest));
    }

    private void saveLocation(UploadUserRequest userRequest, String clientId) {
	LOGGER.info("save Location :: begin");
	Optional<StoreLocations> store = storeRepository.findByStoreIdAndClientId(userRequest.getLocation(), clientId);
	StoreLocations locations = null;
	if (store.isPresent()) {
	    locations = StoreMapper.toEntity(userRequest, store.get(), clientId);
	} else {
	    locations = StoreMapper.toEntity(userRequest, locations, clientId);
	}
	LOGGER.info("save Location :: saving location");
	storeRepository.save(locations);
	LOGGER.info("save Location :: end");
    }

    private List<RoleOnboardingDetails> getRoles(List<String> roleIds, String clientId) {
	LOGGER.info("get Roles :: begin");
	// Site Manager Role not allowed to add
	if (roleIds.stream().anyMatch(Constants.SITE_MANAGER_ROLE::equalsIgnoreCase)) {
	    throw new BadRequestException(ErrorMessages.SITE_MANAGER_ROLE_NOT_ALLOWED);
	}
	List<RoleOnboardingDetails> roles = roleOnboardingRepository.findByRoleInAndClientIdAndDeleted(roleIds,
		clientId, false);
	if (!roles.isEmpty() && roleIds.size() != roles.size()) {
	    List<String> existingIds = roles.stream().map(RoleOnboardingDetails::getRole).collect(Collectors.toList());
	    String error = String.join(",",
		    roleIds.stream().filter(role -> !existingIds.contains(role)).collect(Collectors.toList()));
	    if (!StringUtils.isBlank(error)) {
		LOGGER.info("get Roles :: Resource Not Found - These Roles Not Found");
		throw new ResourceNotFoundException(ErrorMessages.THESE_ROLES_NOT_FOUND + error);
	    }
	}
	/*
	 * if (roles.isEmpty()) {
	 * LOGGER.info("get Roles :: Resource Not Found - Roles Not Found"); throw new
	 * ResourceNotFoundException(ErrorMessages.ROLES_NOT_FOUND); }
	 */
	LOGGER.info("get Roles :: end");
	return roles;
    }

    private void sendEmail(UserCredentials userCredentials, String userId, String email) {
	try {
	    String template = emailService.getUserEmailTemplate(EmailTemplates.SHARE_USER_CREDENTIALS_TEMPLATE, userId,
		    userCredentials.getName(), userCredentials.getPassword(),
		    emailService.getDate(userCredentials.getCreatedAt()));
	    emailService.deliverEmail(email, template, Constants.USER_ONBOARDING_CREDENTIALS, null, null);
	} catch (Exception exception) {
	    LOGGER.info("Exception occured while sending email: {}", exception.getMessage());
	    throw new ResourceNotFoundException(exception.getMessage());
	}
    }
}
