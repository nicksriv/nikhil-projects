package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.common.Constants;
import com.wavelabs.sb.documents.FeatureTemplate;
import com.wavelabs.sb.model.SaveFeatureTemplateModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ScreenBuilderService;

@Component
public class SaveFeatureTemplateCommand implements Command<SaveFeatureTemplateModel, SuccessResponse> {

    @Autowired
    ScreenBuilderService screenBuilderService;

    @Override
    public SuccessResponse execute(SaveFeatureTemplateModel model) {
	FeatureTemplate response = screenBuilderService.saveFeatureTemplate(model);
	return new SuccessResponse(response.getId(), Constants.FEATURE_TEMPLATE_CREATED_SUCCESSFULLY);
    }

}
