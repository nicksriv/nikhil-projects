package com.wavelabs.sb.services;

import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.authentication.AesEncryption;
import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.AdminCredentials;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.AdminMapper;
import com.wavelabs.sb.repositories.AdminCredentialsRepository;
import com.wavelabs.sb.repositories.AdminDetailsRepository;
import com.wavelabs.sb.request.CreateAdminRequest;
import com.wavelabs.sb.response.SuccessResponse;

@Service
public class AdminService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AdminService.class);

    @Autowired
    AdminDetailsRepository adminDetailsRepository;

    @Autowired
    AdminCredentialsRepository adminCredentialsRepository;

    @Autowired
    AesEncryption aesEncryption;

    public SuccessResponse saveAdmin(CreateAdminRequest adminRequest) {
	LOGGER.info("saveAdmin method started");
	AdminDetails adminDetails = null;
	if (!StringUtils.isBlank(adminRequest.getId())) {
	    Optional<AdminDetails> adminOptional = adminDetailsRepository.findById(adminRequest.getId());
	    if (!adminOptional.isPresent()) {
		throw new ResourceNotFoundException(ErrorMessages.ADMIN_NOT_FOUND);
	    }
	    adminDetails = adminOptional.get();
	}
	AdminDetails adminDetails2 = adminDetailsRepository.findByMobile(adminRequest.getMobile());

	if (adminDetails2 != null && !adminDetails2.getId().equalsIgnoreCase(adminRequest.getId())) {
	    throw new BadRequestException(ErrorMessages.ADMIN_MOBILE_ALREADY_MAPPED);
	}
	String maxNumber = adminDetailsRepository.max();
	Optional<AdminDetails> maxAdminId = null;
	if (maxNumber != null) {
	    maxAdminId = adminDetailsRepository.findById(maxNumber);
	}

	if (adminDetails != null) {
	    adminDetails = AdminMapper.getAdmin(adminRequest, adminDetails);
	} else {
	    adminDetails = AdminMapper.getAdmin(adminRequest, new AdminDetails());
	    adminDetails = AdminMapper.setAdminId(adminDetails,
		    maxAdminId != null && maxAdminId.isPresent() ? maxAdminId.get().getAdminId() : null);
	}

	if (adminDetails.getAdminCredentials() == null) {
	    AdminCredentials adminCredentials = AdminMapper.getAdminCredentials(adminDetails.getAdminId(),
		    aesEncryption.encrypt(Constants.PASSWORD));
	    adminCredentialsRepository.save(adminCredentials);
	    adminDetails.setAdminCredentials(adminCredentials);
	}

	adminDetailsRepository.save(adminDetails);
	LOGGER.info("saveAdmin method ended");
	return new SuccessResponse(Constants.ADMIN_DETAILS_SAVED_SUCCESSFULLY);
    }

    public SuccessResponse getAdminDetails(String id) {
	// TODO Auto-generated method stub
	return null;
    }
    
    
}
