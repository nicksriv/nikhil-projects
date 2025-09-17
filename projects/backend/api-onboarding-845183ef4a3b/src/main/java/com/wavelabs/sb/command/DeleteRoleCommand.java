package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.DeleteRoleModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.RoleOnboardingService;

@Component
public class DeleteRoleCommand implements Command<DeleteRoleModel, SuccessResponse> {

    @Autowired
    RoleOnboardingService roleOnboardingService;

    @Override
    public SuccessResponse execute(DeleteRoleModel model) {
	return roleOnboardingService.deleteRole(model);
    }
}
