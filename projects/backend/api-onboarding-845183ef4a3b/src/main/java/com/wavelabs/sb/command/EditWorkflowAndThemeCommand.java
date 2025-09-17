package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;

import com.wavelabs.sb.mappers.ClientOnboardingMapper;
import com.wavelabs.sb.model.UpdatePrivilegesModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ClientOnboardingService;
import org.springframework.stereotype.Component;

@Component
public class EditWorkflowAndThemeCommand implements Command<UpdatePrivilegesModel, SuccessResponse> {
    @Autowired
    ClientOnboardingService clientOnboardingService;

    @Override
    public SuccessResponse execute(UpdatePrivilegesModel model) {
	clientOnboardingService.editWorkflowAndTheme(model);
	return ClientOnboardingMapper.getClientCredentilasResponse(model.getEditWorkflowAndThemeRequest().getClientId());
    }

}
