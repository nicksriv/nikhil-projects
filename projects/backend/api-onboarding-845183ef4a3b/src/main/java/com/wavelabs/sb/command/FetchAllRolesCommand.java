package com.wavelabs.sb.command;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.mappers.RolesOnboardingMapper;
import com.wavelabs.sb.request.FetchAllRoles;
import com.wavelabs.sb.response.FetchAllRolesResponse;
import com.wavelabs.sb.response.PaginationResponse;
import com.wavelabs.sb.services.RoleOnboardingService;

@Component
public class FetchAllRolesCommand implements Command<FetchAllRoles, ResponseEntity<FetchAllRolesResponse>> {

    @Autowired
    RoleOnboardingService roleOnboardingService;

    @Override
    public ResponseEntity<FetchAllRolesResponse> execute(FetchAllRoles roles) {
	PaginationResponse<RoleOnboardingDetails> response = roleOnboardingService.fetchAllRoles(roles.getRequest(), roles.getClientId());
	
	if(roles.getRequest().isPagination()) {
	List<String> roleIds = roleOnboardingService.fetchRoleIds(response);
	Map<String, Integer> userCountMap = roleOnboardingService.getUserCount(roleIds);
	return ResponseEntity.status(HttpStatus.OK).body(RolesOnboardingMapper.getFetchAllRolesResponse(response, userCountMap));
	}else {
	    return ResponseEntity.status(HttpStatus.OK).body(RolesOnboardingMapper.getFetchAllRolesResponse(response));
	}

    }

}
