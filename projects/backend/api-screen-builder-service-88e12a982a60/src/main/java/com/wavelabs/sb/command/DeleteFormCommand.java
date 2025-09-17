package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.model.DeleteFormDataModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.FormDataService;

@Service
public class DeleteFormCommand implements Command<DeleteFormDataModel, SuccessResponse> {


    @Autowired
    FormDataService formDataService; 

    @Override
    public SuccessResponse execute(DeleteFormDataModel model) {
	return formDataService.deleteFormData(model);
    }


}
