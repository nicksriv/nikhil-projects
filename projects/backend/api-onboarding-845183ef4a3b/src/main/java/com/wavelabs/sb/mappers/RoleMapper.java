package com.wavelabs.sb.mappers;

import java.time.Instant;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.Roles;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.RoleOnboardingRequest;
import com.wavelabs.sb.request.UpdateRoleRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

public class RoleMapper {

    private RoleMapper() {

    }

    private static final Logger LOGGER = LoggerFactory.getLogger(RoleMapper.class);

    public static Roles toEntity(String roles, String clientId) {
	LOGGER.info("to Roles entity Mapper method started..!");
	Roles entity = new Roles();
	entity.setClientId(clientId);
	entity.setRole(roles);
	entity.setCreatedAt(Instant.now());
	entity.setModifiedAt(Instant.now());
	entity.setCreatedBy(clientId);
	entity.setModifiedBy(clientId);
	entity.setStatus(Status.ACTIVE);
	LOGGER.info("to Roles entity Mapper method ended..!");
	return entity;
    }

    public static SuccessResponse toResponse(Roles response) {
	LOGGER.info("to Roles Response Mapper method started..!");
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId(response.getId());
	successResponse.setMessage(Constants.DATA_CREATED_SUCCESSFULLY);
	LOGGER.info("to Roles Response Mapper method ended..!");
	return successResponse;
    }

    public static RoleOnboardingDetails getRoleOnboarding(RoleOnboardingRequest request, TokenPayLoadDetails details) {
	LOGGER.info("get Role Onboarding Request Mapper method started..!");
	RoleOnboardingDetails roleOnboardingDetails = new RoleOnboardingDetails();
	roleOnboardingDetails.setCreatedAt(Instant.now());
	roleOnboardingDetails.setModifiedAt(Instant.now());
	roleOnboardingDetails.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	roleOnboardingDetails.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	roleOnboardingDetails.setCreatedUserType(details.getTypeOfUser());
	roleOnboardingDetails.setModifiedUserType(details.getTypeOfUser());
	
	roleOnboardingDetails.setDeleted(false);
	roleOnboardingDetails.setRole(request.getName());
	//roleOnboardingDetails.setStatus(request.getStatus());
	roleOnboardingDetails.setStatus(!StringUtils.isBlank(request.getStatus())  ? Status.valueOf(request.getStatus().toUpperCase()) : null);
	roleOnboardingDetails.setClientId(request.getClientId());
	roleOnboardingDetails.setDescription(request.getDescription());
	LOGGER.info("get Role Onboarding Request Mapper method ended..!");
	return roleOnboardingDetails;
    }

    public static RoleOnboardingDetails getRoleOnboarding(RoleOnboardingDetails roleOnboardingDetails,
	    UpdateRoleRequest request, TokenPayLoadDetails tokenPayLoadDetails) {
	LOGGER.info("get Role Onboarding Details Mapper method started..!");
	roleOnboardingDetails.setModifiedAt(Instant.now());
	roleOnboardingDetails.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
	roleOnboardingDetails.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
	
	roleOnboardingDetails.setDescription(request.getDescription());
	roleOnboardingDetails.setRole(request.getName());
	roleOnboardingDetails.setStatus(request.getStatus());
	LOGGER.info("get Role Onboarding Mapper method ended..!");
	return roleOnboardingDetails;
    }

    public static RoleOnboardingDetails getRoleWithSiteManager(String clientId) {
	LOGGER.info("get Role With Site Manager Mapper method started..!");
	RoleOnboardingDetails roleToAdd = new RoleOnboardingDetails();
	roleToAdd.setClientId(clientId);
	roleToAdd.setCreatedAt(Instant.now());
	roleToAdd.setCreatedBy(clientId);
	roleToAdd.setDeleted(false);
	roleToAdd.setDescription(Constants.SITE_MANAGER_ROLE);
	roleToAdd.setRole(Constants.SITE_MANAGER_ROLE);
	roleToAdd.setStatus(Status.ACTIVE);
	roleToAdd.setDeleted(false);
	roleToAdd.setModifiedAt(Instant.now());
	roleToAdd.setModifiedBy(clientId);
	LOGGER.info("get Role With Site Manager Mapper method ended..!");
	return roleToAdd;
    }

	public static RoleOnboardingDetails getRoleWithAdmin(String Id,String name,String description) {
		LOGGER.info("get Role With Admin Mapper method started..!");
		RoleOnboardingDetails roleToAddAdmin = new RoleOnboardingDetails();
		roleToAddAdmin.setClientId(Id);
		roleToAddAdmin.setRole(name);
		roleToAddAdmin.setDescription(description);
		roleToAddAdmin.setCreatedAt(Instant.now());
		roleToAddAdmin.setCreatedBy(Id);
		roleToAddAdmin.setDeleted(false);
		roleToAddAdmin.setStatus(Status.ACTIVE);
		roleToAddAdmin.setModifiedAt(Instant.now());
		roleToAddAdmin.setModifiedBy(Id);
		LOGGER.info("get Role With Admin Mapper method ended..!");
		return roleToAddAdmin;
	}

}
