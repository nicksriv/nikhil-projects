package com.wavelabs.sb.command;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.request.FormRequest;
import com.wavelabs.sb.services.FormDataService;

@Service
public class FetchFromByIdCommand implements Command<FormRequest, ResponseEntity<Map<String, Object>>> {

    @Autowired
    FormDataService formDataService;

    @Override
    public ResponseEntity<Map<String, Object>> execute(FormRequest request) {

	return ResponseEntity.status(HttpStatus.OK).body(formDataService.fetctFormById(request));
    }

}
