package com.wavelabs.sb.services;

import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ThemeDetails;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.EntityNotFoundException;
import com.wavelabs.sb.mappers.UserOnboardingMapper;
import com.wavelabs.sb.model.FetchThemeDetailsModel;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.ThemeDetailsRepository;
import com.wavelabs.sb.request.ThemeRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.response.ThemeResponse;

@Service
public class ThemeService {

    @Autowired
    ClientOnboardingRepository clientOnboardingRepository;

    @Autowired
    ThemeDetailsRepository themeDetailsRepository;
    

    private Logger log = LoggerFactory.getLogger(ThemeService.class);

    public SuccessResponse createTheme(TokenPayLoadDetails tokenPayloadDetails, ThemeRequest themeRequest) {
	log.info("Saving Theme details started");
	checkClientId(themeRequest.getClientId());
	Optional<ThemeDetails> themeAlreadyExists = null;
	if (tokenPayloadDetails.getTypeOfUser().equalsIgnoreCase(Constants.ADMIN)) {
	    // check if theme has been created already for given client
	    if (themeRequest.getClientId() != null && !themeRequest.getClientId().isEmpty()) {
		themeAlreadyExists = themeDetailsRepository
			.findByClientIdAndStatusAndDeleted(themeRequest.getClientId(), Status.ACTIVE, false);
	    } else {
		throw new BadRequestException("Please provide valid Client Id : " + themeRequest.getClientId());
	    }
	} else {

	    themeAlreadyExists = themeDetailsRepository.findByClientIdAndStatusAndDeleted(tokenPayloadDetails.getId(),
		    Status.ACTIVE, false);
	    themeRequest.setClientId(tokenPayloadDetails.getId());
	}
	SuccessResponse response = new SuccessResponse();
	// if theme exists update the same record and save
	if (themeAlreadyExists.isPresent()) {
	    ThemeDetails updatedThemeDetailsToSave = UserOnboardingMapper
		    .getUpdatedThemeDetails(themeAlreadyExists.get(), themeRequest, tokenPayloadDetails);
	    log.info("updating Theme details ...");
	    ThemeDetails savedDetails = themeDetailsRepository.save(updatedThemeDetailsToSave);
	    response.setId(savedDetails.getId());
	    response.setMessage(Constants.THEME_SAVED_SUCCESS);
	    log.info("Updating Theme details Success");
	    return response;

	} else {
	    // if theme is not created, then create a new theme and save
	    ThemeDetails themeDetailsToSave = UserOnboardingMapper.getThemeDetails(themeRequest,
		    tokenPayloadDetails);
	    log.info("Saving Theme details ...");
	    ThemeDetails savedDetails = themeDetailsRepository.save(themeDetailsToSave);
	    response.setId(savedDetails.getId());
	    response.setMessage(Constants.THEME_SAVED_SUCCESS);
	    log.info("Saving Theme details Success");
	    return response;
	}
    }

    public ThemeResponse fetchThemeDetails(FetchThemeDetailsModel fetchThemeDetailsModel) {
	log.info("fetchThemeDetails :: started");
	Optional<ThemeDetails> themeDetailsOptional = null;
	if (fetchThemeDetailsModel.getTokenPayLoadDetails().getTypeOfUser().equalsIgnoreCase(Constants.ADMIN)) {
	    if (!StringUtils.isBlank(fetchThemeDetailsModel.getClientId())) {
		themeDetailsOptional = themeDetailsRepository
			.findByClientIdAndStatusAndDeleted(fetchThemeDetailsModel.getClientId(), Status.ACTIVE, false);
		if (!themeDetailsOptional.isPresent()) {
		    return getDefaultTheme();
		}
	    } else {
		return getDefaultTheme();
	    }

	} else if(fetchThemeDetailsModel.getTokenPayLoadDetails().getTypeOfUser().equalsIgnoreCase(Constants.USER)) {
	    checkClientId(fetchThemeDetailsModel.getTokenPayLoadDetails().getClientSystemId());
	    themeDetailsOptional = themeDetailsRepository.findByClientIdAndStatusAndDeleted(
		    fetchThemeDetailsModel.getTokenPayLoadDetails().getClientSystemId(), Status.ACTIVE, false);
	}
	else {
	    checkClientId(fetchThemeDetailsModel.getTokenPayLoadDetails().getId());
	    themeDetailsOptional = themeDetailsRepository.findByClientIdAndStatusAndDeleted(
		    fetchThemeDetailsModel.getTokenPayLoadDetails().getId(), Status.ACTIVE, false);
	}
	if (themeDetailsOptional.isPresent()) {
	    log.info("fetchThemeDetails :: ended");
	    return UserOnboardingMapper.getThemeResponse(themeDetailsOptional.get());
	}
	log.info("fetchThemeDetails :: Entity Not Found : No Active Theme found, please update theme");
	throw new EntityNotFoundException(Constants.ACTIVE_THEME_NOT_FOUND);
    }

    private ThemeResponse getDefaultTheme() {
	ThemeResponse response = new ThemeResponse();
	response.setFont(Constants.DEFAULT_FONT);
	response.setPrimaryColor(Constants.DEFAULT_PRIMARY_COLOR);
	response.setMenuColor(Constants.DEFAULT_MENU_COLOR);
	return response;
    }

    public ThemeDetails fetchThemeResponseByClientId(String clientId) {
	Optional<ThemeDetails> themeDetailsOptional = themeDetailsRepository.findByClientIdAndStatusAndDeleted(clientId,
		Status.ACTIVE, false);
	if (themeDetailsOptional.isPresent()) {
	    log.info("fetchThemeDetails :: ended");
	    return themeDetailsOptional.get();
	} else {
	    return null;
	}
    }

	public void checkClientId(String id) {
	Optional<ClientOnboardingDetails> clientOptional = clientOnboardingRepository.findById(id);
	if (!clientOptional.isPresent()) {
	    throw new EntityNotFoundException(ErrorMessages.CLIENT_NOT_FOUND);
	}
    }
    public void createDefaultThemeForClient(String clientId, TokenPayLoadDetails details){
        ThemeRequest themeRequest=new ThemeRequest();
        themeRequest.setPrimaryColor(Constants.DEFAULT_PRIMARY_COLOR);
        themeRequest.setMenuColor(Constants.DEFAULT_MENU_COLOR);
        themeRequest.setFont(Constants.DEFAULT_FONT);
        themeDetailsRepository.save(UserOnboardingMapper.getDefaultThemeDetails(themeRequest, clientId, details));
    }
    
}
