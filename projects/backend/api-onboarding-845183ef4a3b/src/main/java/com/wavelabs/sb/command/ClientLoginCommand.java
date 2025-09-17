package com.wavelabs.sb.command;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.AdminCredentials;
import com.wavelabs.sb.documents.AdminDetails;
import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.documents.ClientsCredentials;
import com.wavelabs.sb.documents.QualityAssurance;
import com.wavelabs.sb.documents.QualityAssuranceCredentials;
import com.wavelabs.sb.documents.ThemeDetails;
import com.wavelabs.sb.documents.UserCredentials;
import com.wavelabs.sb.documents.Users;
import com.wavelabs.sb.model.AuthenticateLoginModel;
import com.wavelabs.sb.request.AuthenticateClientRequest;
import com.wavelabs.sb.response.LoginResponse;
import com.wavelabs.sb.services.AuthenticationService;
import com.wavelabs.sb.services.JwtAuthenticationService;
import com.wavelabs.sb.services.ThemeService;

@Component
public class ClientLoginCommand implements Command<AuthenticateLoginModel, LoginResponse> {

	private Logger logger = LoggerFactory.getLogger(ClientLoginCommand.class);

	@Autowired
	AuthenticationService authenticationService;

	@Autowired
	JwtAuthenticationService jwtAuthenticationService;

	@Autowired
	ThemeService themeService;

	@Override
	public LoginResponse execute(AuthenticateLoginModel request) {
		AuthenticateClientRequest authenticateClientRequest = request.getClientRequest();
		logger.info("Checking admin details for : {}", authenticateClientRequest.getClientId());
		AdminDetails admin = authenticationService.getAdminDetails(authenticateClientRequest.getClientId());
		String token = null;
		String message = null;
		boolean workflowEnabled = false;
		boolean themeEnabled = false;
		ThemeDetails themeDetails = null;
		String profileId = null;
		String logoId = null;
		if (admin != null) {
			logger.info("Checking admin credentials details for : {}", authenticateClientRequest.getClientId());
			AdminCredentials adminCredentials = authenticationService.getAdminCredentials(admin);
			logger.info("Calling password validation ");
			authenticationService.passwordValidation(authenticateClientRequest.getPassword(),
					adminCredentials.getPassword());

			do {
				token = jwtAuthenticationService.generateToken(adminCredentials.getAdminId(), Constants.EMPTY,
						Constants.EMPTY, Constants.ADMIN, admin.getId(), Constants.EMPTY, admin.getFullName(),
						Constants.EMPTY, Constants.ADMIN);
			} while (authenticationService.checkTokenExists(token));
			logger.info("Saving Authentication audit details");
			authenticationService.saveAuthenticationAuditingDetails(token, admin.getAdminId(), Constants.ADMIN,
					request.getIp(), request.getBrowser(), admin.getId());
			message = Constants.ADMIN_LOGIN_SUCCESSFULL;
			workflowEnabled = true;
			profileId = admin.getProfileImage() != null ? admin.getProfileImage().getId() : null;
		} else {
			Users adminUser = authenticationService.getAdminUserDetails(authenticateClientRequest.getClientId());
			if (adminUser != null) {
				return getAdminUserLoginResponse(authenticateClientRequest, adminUser, request.getIp(),
						request.getBrowser());
			} else {
				logger.info("Checking client details for : {}", authenticateClientRequest.getClientId());
				ClientOnboardingDetails client = authenticationService
						.getClientDetails(authenticateClientRequest.getClientId());
				logger.info("Checking client credentials details for : {}", authenticateClientRequest.getClientId());

				if (client != null) {

					ClientsCredentials clientsCredentials = authenticationService.getClientCredentials(client);
					logger.info("Calling password validation ");
					authenticationService.passwordValidation(authenticateClientRequest.getPassword(),
							clientsCredentials.getPassword());

					do {
						token = jwtAuthenticationService.generateToken(Constants.EMPTY, clientsCredentials.getClientId(),
								client.getId(), Constants.CLIENT, client.getId(), Constants.EMPTY, client.getFirstName(),
								client.getLastName(), Constants.EMPTY);
					} while (authenticationService.checkTokenExists(token));
					logger.info("Saving Authentication audit details");
					authenticationService.saveAuthenticationAuditingDetails(token, client.getClientId(), Constants.CLIENT,
							request.getIp(), request.getBrowser(), client.getId());
					message = Constants.LOGIN_SUCCESSFULL;
					workflowEnabled = client.isHasEditWorkflow();
					themeEnabled = client.isHasEditTheme();
					themeDetails = themeService.fetchThemeResponseByClientId(client.getId());
					profileId = client.getProfileImage() != null ? client.getProfileImage().getId() : "";
					logoId = client.getLogo() != null ? client.getLogo().getId() : "";
				} else {
					// QA Code HERE
					logger.info("checking quality-assurance details for : {}", authenticateClientRequest.getClientId());
					QualityAssurance qualityAssurance = authenticationService
							.getQualityAssuranceDetails(authenticateClientRequest.getClientId());
					logger.info("checking quality-assurance credentials details for : {}",
							authenticateClientRequest.getClientId());

					if (qualityAssurance != null) {
						logger.info("Checking quality-assurance credentials details for :{}",
								authenticateClientRequest.getClientId());
						QualityAssuranceCredentials qualityAssuranceCredentials = authenticationService
								.getQualityAssuranceCredentials(qualityAssurance);
						logger.info("Calling password validation ");
						authenticationService.passwordValidation(authenticateClientRequest.getPassword(),
								qualityAssuranceCredentials.getPassword());

						do {
							token = jwtAuthenticationService.generateToken(Constants.EMPTY, Constants.EMPTY,
									Constants.EMPTY, Constants.QUALITY_ASSURANCE,
									qualityAssurance.getId(), Constants.EMPTY, qualityAssurance.getFirstName(),
									qualityAssurance.getLastName() ,Constants.QUALITY_ASSURANCE);
						} while (authenticationService.checkTokenExists(token));
						logger.info("Saving Authentication audit details");
						authenticationService.saveAuthenticationAuditingDetails(token, qualityAssurance.getFirstName(),
								Constants.QUALITY_ASSURANCE, request.getIp(), request.getBrowser(),
								qualityAssurance.getQualityAssuranceRefNo());
						message = Constants.QUALITY_ASSURANCE_LOGIN_SUCCESSFULL;
						workflowEnabled = true;

					}
				}

			}
		}

		logger.info("Mapping login response ");
		LoginResponse loginResponse = new LoginResponse();
		loginResponse.setToken(token);
		loginResponse.setWorkFlowEnabled(workflowEnabled);
		loginResponse.setThemeEnabled(themeEnabled);
		loginResponse.setMessage(message);
		loginResponse.setLogoId(logoId);
		loginResponse.setProfileId(profileId);
		if (themeDetails != null) {
			loginResponse.setPrimaryColor(themeDetails.getPrimaryColor());
			loginResponse.setMenuColor(themeDetails.getSecondaryColor());
			loginResponse.setFont(themeDetails.getFontName());
		} else {
			loginResponse.setPrimaryColor("");
			loginResponse.setMenuColor("");
			loginResponse.setFont("");
		}
		authenticationService.getConfigurationContants(loginResponse);
		return loginResponse;
	}

	private LoginResponse getAdminUserLoginResponse(AuthenticateClientRequest authenticateClientRequest, Users user,
			String ip, String browser) {
		logger.info("Checking user credentials details for : {}", authenticateClientRequest.getClientId());
		UserCredentials userCredentials = authenticationService.getUserCredentials(user);
		ClientOnboardingDetails client = authenticationService.getClientDetails(user.getClientId());
		logger.info("Calling password validation ");
		authenticationService.passwordValidation(authenticateClientRequest.getPassword(),
				userCredentials.getPassword());

		String token = null;
		do {
			token = jwtAuthenticationService.generateToken(Constants.EMPTY, user.getClientId(),
					authenticateClientRequest.getClientId(), Constants.USER, user.getId(), client.getId(),
					user.getFirstname(), user.getLastname(), Constants.ADMIN);
		} while (authenticationService.checkTokenExists(token));
		logger.info("Saving Authentication audit details");
		authenticationService.saveAuthenticationAuditingDetails(token, user.getUserId(), Constants.USER, ip, browser,
				user.getId());
		logger.info("Mapping login response ");
		LoginResponse loginResponse = new LoginResponse();
		loginResponse.setToken(token);
		loginResponse.setWorkFlowEnabled(client.isHasEditWorkflow());
		loginResponse.setThemeEnabled(client.isHasEditTheme());
		loginResponse.setLogoId(client.getLogo() != null ? client.getLogo().getId() : "");
		loginResponse.setProfileId(user.getProfileImage() != null ? user.getProfileImage().getId() : "");
		loginResponse.setMessage(Constants.USER_LOGIN_SUCCESSFULL);
		ThemeDetails adminUserthemeDetails = themeService.fetchThemeResponseByClientId(user.getClientId());
		if (adminUserthemeDetails != null) {
			loginResponse.setPrimaryColor(adminUserthemeDetails.getPrimaryColor());
			loginResponse.setMenuColor(adminUserthemeDetails.getSecondaryColor());
			loginResponse.setFont(adminUserthemeDetails.getFontName());
		} else {
			loginResponse.setPrimaryColor("");
			loginResponse.setMenuColor("");
			loginResponse.setFont("");
		}
		authenticationService.getConfigurationContants(loginResponse);
		return loginResponse;
	}
}
