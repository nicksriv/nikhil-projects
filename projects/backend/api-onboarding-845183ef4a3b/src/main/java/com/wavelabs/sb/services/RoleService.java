package com.wavelabs.sb.services;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.common.ErrorMessages;
import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.documents.Roles;
import com.wavelabs.sb.exceptions.BadRequestException;
import com.wavelabs.sb.exceptions.ResourceNotFoundException;
import com.wavelabs.sb.mappers.RoleMapper;
import com.wavelabs.sb.model.CreateRoleModel;
import com.wavelabs.sb.model.UpdateRoleModel;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.repositories.RoleOnboardingRepository;
import com.wavelabs.sb.repositories.RolesRepository;
import com.wavelabs.sb.request.RoleOnboardingRequest;
import com.wavelabs.sb.request.UpdateRoleRequest;
import com.wavelabs.sb.response.RolesResponse;
import com.wavelabs.sb.response.SuccessResponse;

@Service
public class RoleService {

    private static final Logger LOGGER = LoggerFactory.getLogger(RoleService.class);

    @Autowired
    RolesRepository rolesRepository;

    @Autowired
    ClientOnboardingRepository clientOnboardingRepository;

    @Autowired
    RoleOnboardingRepository roleOnboardingRepository;

    public Roles saveRoleDetails(String roles, String clientId) {
	LOGGER.info("save Role Details :: begin");
	Roles entity = RoleMapper.toEntity(roles, clientId);
	LOGGER.info("saving Role Details :: ");
	return rolesRepository.save(entity);
    }

    public RolesResponse fetchRolesByClientId(String clientId) {
	LOGGER.info("fetch Roles By Client ID :: begin");
	RolesResponse rolesResponse = new RolesResponse();
	List<Roles> listOfRoles = rolesRepository.findByClientId(clientId);
	rolesResponse.setRoles(
		listOfRoles.stream().filter(Objects::nonNull).map(Roles::getRole).collect(Collectors.toList()));
	LOGGER.info("fetch Roles By Client ID :: end");
	return rolesResponse;
    }

    public SuccessResponse createRoleOnboarding(CreateRoleModel createRoleModel) {
	LOGGER.info("create Role Onboarding method started");
	RoleOnboardingRequest request = createRoleModel.getRoleOnboardingRequest();
	if (request.getName().equalsIgnoreCase(Constants.SITE_MANAGER_ROLE)) {
	    throw new BadRequestException(ErrorMessages.SITE_MANAGER_ROLE_CANNOT_BE_ADDED);
	}
	if (!clientOnboardingRepository.existsById(request.getClientId())) {
	    throw new BadRequestException(ErrorMessages.CLIENT_NOT_FOUND_WITH_ID + request.getClientId());
	}
	request.setName(getRole(request.getName()));
	RoleOnboardingDetails role = roleOnboardingRepository
		.findByClientIdAndDeletedAndRoleIgnoreCase(request.getClientId(), false, request.getName());
	if (role != null) {
	    LOGGER.info("create Role Onboarding :: Bad Request Exception - Role already onboarded");
	    throw new BadRequestException(ErrorMessages.ROLE_ALREADY_ONBOARDED);
	}
	RoleOnboardingDetails roleOnboardingDetails = RoleMapper.getRoleOnboarding(request,
		createRoleModel.getTokenPayLoadDetails());
	LOGGER.info("onboarding new Role :: ");
	roleOnboardingDetails = roleOnboardingRepository.save(roleOnboardingDetails);
	SuccessResponse response = new SuccessResponse();
	response.setId(roleOnboardingDetails.getId());
	response.setMessage(roleOnboardingDetails.getRole() + Constants.ROLE_CREATED_SUCCESSFULLY);
	LOGGER.info("createRoleOnboarding method ended");
	return response;
    }

    public SuccessResponse updateRoleOnboarding(UpdateRoleModel model) {
	LOGGER.info("update Role Onboarding method started");
	UpdateRoleRequest request = model.getUpdateRoleRequest();
	
	//Role cannot be updated with "Site Manager" and "Admin" 
	if (request.getName().equalsIgnoreCase(Constants.SITE_MANAGER_ROLE)) {
	    throw new BadRequestException(ErrorMessages.SITE_MANAGER_ROLE_CANNOT_BE_ADDED);
	}
	if (request.getName().equalsIgnoreCase(Constants.ADMIN)) {
	    throw new BadRequestException(ErrorMessages.ADMIN_ROLE_CANNOT_BE_ADDED);
	}
	
	Optional<RoleOnboardingDetails> role = roleOnboardingRepository.findByIdAndDeleted(request.getId(), false);
	if (!role.isPresent()) {
	    LOGGER.info("Update Role Onboarding :: Resource Not Found Exception - Role Not Found");
	    throw new ResourceNotFoundException(ErrorMessages.ROLE_NOT_FOUND);
	}
	
	//"Site Manager" and "Admin" roles cannot be edited
	if (role.get().getRole().equalsIgnoreCase(Constants.SITE_MANAGER_ROLE)) {
	    throw new BadRequestException(ErrorMessages.SITE_MANAGER_ROLE_CANNOT_BE_ADDED);
	}
	if (role.get().getRole().equalsIgnoreCase(Constants.ADMIN)) {
	    throw new BadRequestException(ErrorMessages.ADMIN_ROLE_CANNOT_BE_ADDED);
	}
	
	request.setName(getRole(request.getName()));
	RoleOnboardingDetails existingRole = roleOnboardingRepository.findByClientIdAndIdNotAndDeletedAndRoleIgnoreCase(
		role.get().getClientId(), request.getId(), false, request.getName());
	if (existingRole != null) {
	    LOGGER.info("Update Role Onboarding :: Bad Request Exception - Role Already Onboarded");
	    throw new BadRequestException(ErrorMessages.ROLE_ALREADY_ONBOARDED);
	}
	RoleOnboardingDetails roleOnboardingDetails = RoleMapper.getRoleOnboarding(role.get(), request,
		model.getTokenPayLoadDetails());
	LOGGER.info("update Role Onboarding :: updating role details");
	roleOnboardingRepository.save(roleOnboardingDetails);
	SuccessResponse response = new SuccessResponse();
	response.setId(roleOnboardingDetails.getId());
	response.setMessage(roleOnboardingDetails.getRole() + Constants.ROLE_UPDATED_SUCCESSFULLY);
	LOGGER.info("update Role Onboarding method ended");
	return response;
    }

    /*
     * public void checkRole(String role) { RoleOnboardingDetails existingRole =
     * roleOnboardingRepository.findByRoleInIgnoreCase(getRoleValues(role)); if
     * (existingRole != null) { throw new
     * BadRequestException(ErrorMessages.ROLE_ALREADY_ONBOARDED); } }
     * 
     * private List<String> getRoleValues(String role) { List<String> rolesList =
     * new ArrayList<>(); String trimRole = StringUtils.strip(role); trimRole =
     * trimRole.replaceAll("\\s+"," "); trimRole = trimRole.replace("-", " ");
     * String roles = trimRole.replace(" ", "-"); rolesList.add(roles);
     * rolesList.add(role); return rolesList; }
     */
    private String getRole(String role) {
	LOGGER.info("Role Service - get Role with String :: begin");
	String trimRole = StringUtils.strip(role);
	trimRole = trimRole.replaceAll("\\s+", " ");
	LOGGER.info("get Role with String :: end");
	return trimRole;
    }
}
