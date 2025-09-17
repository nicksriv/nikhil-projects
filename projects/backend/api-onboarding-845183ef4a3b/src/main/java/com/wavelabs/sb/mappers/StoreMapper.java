package com.wavelabs.sb.mappers;

import java.time.Instant;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.StoreLocations;
import com.wavelabs.sb.enums.Status;
import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.request.StoreRequest;
import com.wavelabs.sb.request.UploadUserRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.utils.OnboardingUtil;

public class StoreMapper {

    private StoreMapper() {
    }

    public static SuccessResponse toResponse(StoreLocations store) {
	SuccessResponse successResponse = new SuccessResponse();
	successResponse.setId(store.getId());
	successResponse.setMessage(Constants.DATA_CREATED_SUCCESSFULLY);
	return successResponse;
    }

    public static StoreLocations toEntity(StoreRequest request, String clientId, TokenPayLoadDetails details) {
	
	StoreLocations entity = new StoreLocations();
	entity.setClientId(clientId);
	entity.setAddress(request.getAddress());
	entity.setDeleted(false);
	entity.setManagerEmployeeId(request.getManagerEmployeeId());
	entity.setManagerName(request.getManagerName());
	entity.setPhoneNumber(request.getPhoneNumber());
	entity.setStoreId(request.getStoreId());
	entity.setCreatedAt(Instant.now());
	entity.setModifiedAt(Instant.now());
	entity.setCreatedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	entity.setModifiedBy(OnboardingUtil.getCreatedOrModifiedBy(details));
	entity.setCreatedUserType(details.getTypeOfUser());
	entity.setModifiedUserType(details.getTypeOfUser());
	entity.setStatus(Status.ACTIVE);
	return entity;

    }

    public static StoreLocations toEntity(UploadUserRequest request, StoreLocations entity, String clientId) {
	if (entity == null) {
	    entity = new StoreLocations();
	    entity.setCreatedAt(Instant.now());
	}
	entity.setClientId(clientId);
	entity.setAddress(request.getAddress());
	entity.setDeleted(false);
	entity.setManagerEmployeeId(request.getStroreManagerEmpId());
	entity.setManagerName(request.getStroreHeadEmpName());
	entity.setPhoneNumber(request.getStoreMobileNumber());
	entity.setStoreId(request.getLocation());
	entity.setModifiedAt(Instant.now());
	entity.setStatus(Status.ACTIVE);
	return entity;

    }

}
