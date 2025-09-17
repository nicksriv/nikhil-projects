package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.FetchAllFormsModel;
import com.wavelabs.sb.response.FormsResponse;
import com.wavelabs.sb.services.FormDataService;

@Component
public class FetchAllFormsCommand implements Command<FetchAllFormsModel, ResponseEntity<FormsResponse>> {

    @Autowired
    FormDataService formDataService;

    @Override
    public ResponseEntity<FormsResponse> execute(FetchAllFormsModel fetchAllRequest) {
	return ResponseEntity.status(HttpStatus.OK).body(formDataService.fetchAllForms(fetchAllRequest,true));
    }

}
