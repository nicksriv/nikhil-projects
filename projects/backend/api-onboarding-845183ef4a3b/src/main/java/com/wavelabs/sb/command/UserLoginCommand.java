package com.wavelabs.sb.command;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ThemeDetails;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.model.AuthenticateLoginModel;
import com.wavelabs.sb.request.AuthenticateUserRequest;
import com.wavelabs.sb.response.LoginResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.JwtAuthenticationService;
import com.wavelabs.sb.services.ThemeService;

@Component
public class UserLoginCommand implements Command<AuthenticateLoginModel, LoginResponse> {

    private Logger logger = LoggerFactory.getLogger(UserLoginCommand.class);

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    JwtAuthenticationService jwtAuthenticationService;

    @Autowired
    ThemeService themeService;

    @Override
    public LoginResponse execute(AuthenticateLoginModel model) {
	AuthenticateUserRequest authenticateUserRequest = model.getUserRequest();
	logger.info("Checking user details for : {}", authenticateUserRequest.getUserId());
	Users user = authenticationService.getUserDetails(authenticateUserRequest.getUserId());
	logger.info("Checking user credentials details for : {}", authenticateUserRequest.getUserId());
	UserCredentials userCredentials = authenticationService.getUserCredentials(user);
	logger.info("Calling password validation ");
	authenticationService.passwordValidation(authenticateUserRequest.getPassword(), userCredentials.getPassword());
	/*
	 * logger.info("Checking id user is already loggedIn");
	 * authenticationService.userAlreadyLoggedInCheck(user.getUserId());
	 */
	ClientOnboardingDetails client = authenticationService.getClientDetails(user.getClientId());
	logger.info("Calling Generate token method");

	String token = null;
	do {
	    token = jwtAuthenticationService.generateToken(Constants.EMPTY, user.getClientId(),
		    authenticateUserRequest.getUserId(), Constants.USER, user.getId(), client.getId(),
		    user.getFirstname(), user.getLastname(), Constants.EMPTY);
	} while (authenticationService.checkTokenExists(token));
	logger.info("Saving Authentication audit details");
	authenticationService.saveAuthenticationAuditingDetails(token, user.getUserId(), Constants.USER, model.getIp(),
		model.getBrowser(), user.getId());
	logger.info("Mapping login response ");
	LoginResponse loginResponse = new LoginResponse();
	loginResponse.setToken(token);
	loginResponse.setMessage(Constants.USER_LOGIN_SUCCESSFULL);
	loginResponse.setLogoId(client.getLogo() != null ? client.getLogo().getId() : "");
	loginResponse
		.setBackgroundImageId(client.getBackgroundImage() != null ? client.getBackgroundImage().getId() : "");
	loginResponse.setOpacity(client.getBackgroundImageOpacity() == 0 ? 1 : client.getBackgroundImageOpacity());
	loginResponse.setProfileId(user.getProfileImage() != null ? user.getProfileImage().getId() : "");
	if (client != null) {
	    ThemeDetails themeDetails = themeService.fetchThemeResponseByClientId(client.getId());
	    if (themeDetails != null) {
		loginResponse.setPrimaryColor(themeDetails.getPrimaryColor());
		loginResponse.setMenuColor(themeDetails.getSecondaryColor());
		loginResponse.setFont(themeDetails.getFontName());
	    } else {
		loginResponse.setPrimaryColor("");
		loginResponse.setMenuColor("");
		loginResponse.setFont("");
	    }
	}
	authenticationService.getConfigurationContants(loginResponse);
	return loginResponse;
    }
}
