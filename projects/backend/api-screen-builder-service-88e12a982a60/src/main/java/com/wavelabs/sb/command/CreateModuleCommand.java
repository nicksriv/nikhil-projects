package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.model.CreateModuleAndSubmoduleModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ScreenBuilderService;

@Service
public class CreateModuleCommand implements Command<CreateModuleAndSubmoduleModel, SuccessResponse> {

    @Autowired
    ScreenBuilderService screenBuilderService;

    @Override
    public SuccessResponse execute(CreateModuleAndSubmoduleModel model) {

	return screenBuilderService.createModule(model);
    }

}
