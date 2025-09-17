package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.CreateSubModuleModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ScreenBuilderService;

@Component
public class AddSubModuleCommand implements Command<CreateSubModuleModel, SuccessResponse> {

    @Autowired
    ScreenBuilderService screenBuilderService;

    @Override
    public SuccessResponse execute(CreateSubModuleModel model) {
	return screenBuilderService.createSubModule(model);
    }

}
