package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.CreateRoleModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.RoleService;

@Component
public class CreateRoleOnboardingCommand implements Command<CreateRoleModel, SuccessResponse> {

    @Autowired
    RoleService roleService;
    
    
    @Override
    public SuccessResponse execute(CreateRoleModel createRoleModel) {
	return roleService.createRoleOnboarding(createRoleModel);
    }

}
