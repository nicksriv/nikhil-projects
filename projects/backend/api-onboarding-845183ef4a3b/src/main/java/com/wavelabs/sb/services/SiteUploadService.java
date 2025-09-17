package com.wavelabs.sb.services;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.SiteOnboardingDetails;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.mappers.SiteOnboardingMapper;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.SiteOnboardingRepository;
import com.wavelabs.sb.request.UploadSiteRequest;
import com.wavelabs.sb.response.ErrorRecord;
import com.wavelabs.sb.utils.OnboardingUtil;

@Service
@Validated
public class SiteUploadService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SiteUploadService.class);

    @Autowired
    SiteOnboardingRepository siteOnboardingRepository;

    @Autowired
    UserOnboardingService userOnboardingService;

    @Autowired
    SiteOnboardingService siteOnboardingService;

    public ErrorRecord saveSite(UploadSiteRequest siteRequest, String clientId, TokenPayLoadDetails details) {
	LOGGER.info("save Site method started");
	try {
	    Optional<SiteOnboardingDetails> siteOnboardingDetails = siteOnboardingRepository
		    .findBySiteIdAndClientIdAndDeleted(siteRequest.getSiteId(), clientId, false);
	    if (siteOnboardingDetails.isPresent()) {
		throw new BadRequestException(ErrorMessages.SITE_ID_ALREADY_MAPPED);
	    }
	    SiteOnboardingDetails site = SiteOnboardingMapper.siteOnboardingUpdateMapper(siteRequest);	    
	    site.setClientId(clientId);
	    site.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	    site.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	    site.setModifiedAt(Instant.now());
	    site.setCreatedAt(Instant.now());
	    site.setCreatedUserType(details.getTypeOfUser()); 
	    site.setModifiedUserType(details.getTypeOfUser()); 
	    List<String> userIds = site.getManagers();
	    if (userIds != null && !userIds.isEmpty()) {
		// adding Site Manager Role to Managers
		userIds.removeAll(Arrays.asList("", null));
		List<Users> usersForAddingRole = userOnboardingService.fetchUserByUserIdsAndClientId(userIds,
			site.getClientId());
		String clientObjectId = siteOnboardingService.clientExistsWithClientId(clientId).getId();
		RoleOnboardingDetails siteManagerRoleByClientId = siteOnboardingService.siteManagerRoleByClientId(clientObjectId);
		usersForAddingRole.stream().forEach(user->siteOnboardingService.mapSiteManagerRole(user, siteManagerRoleByClientId));
	    }
	    LOGGER.info("save Site :: saving site ");
	    siteOnboardingRepository.save(site);
	    LOGGER.info("save Site :: null ");
	    return null;
	} catch (Exception e) {
	    ErrorRecord errorRecord = new ErrorRecord();
	    errorRecord.setMessage(e.getMessage());
	    LOGGER.info(e.getMessage());
	    return errorRecord;
	}

    }

}
