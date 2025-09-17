package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.model.SaveFormDataModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.FormDataService;

@Service
public class CreateFormCommand implements Command<SaveFormDataModel, SuccessResponse> {
    

    @Autowired
    FormDataService formDataService; 

    @Override
    public SuccessResponse execute(SaveFormDataModel model) {
	return formDataService.saveFormData(model);
    }

}
