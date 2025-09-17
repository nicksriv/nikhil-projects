package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.documents.RoleOnboardingDetails;
import com.wavelabs.sb.mappers.RolesOnboardingMapper;
import com.wavelabs.sb.response.RoleResponse;
import com.wavelabs.sb.services.RoleOnboardingService;

@Component
public class FetchRoleCommand implements Command<String, ResponseEntity<RoleResponse>> {

    @Autowired
    RoleOnboardingService roleOnboardingService;

    @Override
    public ResponseEntity<RoleResponse> execute(String id) {
	RoleOnboardingDetails response = roleOnboardingService.fetchRoleById(id);
	RoleResponse role = RolesOnboardingMapper.getRoleResponse(response);
	return ResponseEntity.status(HttpStatus.OK).body(role);
    }

}
