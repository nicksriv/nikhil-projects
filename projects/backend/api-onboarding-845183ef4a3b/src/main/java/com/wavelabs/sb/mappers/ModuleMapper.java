package com.wavelabs.sb.mappers;

import java.time.Instant;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.Modules;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.ModuleRequest;
import com.wavelabs.sb.response.ModulesResponse;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

public class ModuleMapper {

    private ModuleMapper() {
    }

    public static Modules toEntity(ModuleRequest request, TokenPayLoadDetails tokenPayLoadDetails) {
	
	Modules entity = new Modules();
	entity.setName(request.getName());
	entity.setCreatedAt(Instant.now());
	entity.setModifiedAt(Instant.now());
	entity.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
	entity.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(tokenPayLoadDetails));
	entity.setCreatedUserType(tokenPayLoadDetails.getTypeOfUser());
	entity.setModifiedUserType(tokenPayLoadDetails.getTypeOfUser());
	entity.setStatus(Status.ACTIVE);
	return entity;
    }

    public static SuccessResponse toResponse(Modules module) {
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId(module.getId());
	successResponse.setMessage(Constants.DATA_CREATED_SUCCESSFULLY);
	return successResponse;
    }

    public static ModulesResponse buildModuleResponse(Modules module) {
	ModulesResponse modulesResponse = new ModulesResponse();
	modulesResponse.setId(module.getId());
	modulesResponse.setName(module.getName());
	modulesResponse.setStatus(module.getStatus());
	return modulesResponse;
    }

}
