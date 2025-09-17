package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.UpdateRoleModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.RoleService;

@Component
public class UpdateRoleOnboardingCommand implements Command<UpdateRoleModel, SuccessResponse> {

    @Autowired
    RoleService roleService;
    
    @Override
    public SuccessResponse execute(UpdateRoleModel model) {
	return roleService.updateRoleOnboarding(model);
    }

}
