package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.documents.ClientOnboardingDetails;
import com.wavelabs.sb.mappers.ClientOnboardingMapper;
import com.wavelabs.sb.model.CreateClientModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ClientOnboardingService;

@Component
public class CreateClientCommand implements Command<CreateClientModel, SuccessResponse> {

    @Autowired
    ClientOnboardingService clientOnboardingService;

    public SuccessResponse execute(CreateClientModel model) {
	ClientOnboardingDetails clientonboardingdetails = clientOnboardingService
		.saveClientDetails(model);
	return ClientOnboardingMapper.toResponse(clientonboardingdetails);
    }

}
