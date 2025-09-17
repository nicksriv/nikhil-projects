package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.model.UpdateFormDataModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.FormDataService;

@Service
public class UpdateFormCommand implements Command<UpdateFormDataModel,SuccessResponse> {


    @Autowired
    FormDataService formDataService; 

    @Override
    public SuccessResponse execute(UpdateFormDataModel model) {
	return formDataService.updateFormData(model);
    }


}
