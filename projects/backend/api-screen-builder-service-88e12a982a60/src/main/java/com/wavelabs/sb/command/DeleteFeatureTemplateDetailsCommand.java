package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.DeleteFeatureTemplateModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ScreenBuilderService;

@Component
public class DeleteFeatureTemplateDetailsCommand implements Command<DeleteFeatureTemplateModel, SuccessResponse> {

    @Autowired
    ScreenBuilderService screenBuilderService;

    public SuccessResponse execute(DeleteFeatureTemplateModel model) {
	return screenBuilderService.deleteFeatureTemplate(model);
    }

}
