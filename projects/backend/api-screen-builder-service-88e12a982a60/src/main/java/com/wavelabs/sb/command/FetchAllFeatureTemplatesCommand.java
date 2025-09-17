package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.response.FeatureTemplateResponse;
import com.wavelabs.sb.services.ScreenBuilderService;

@Component
public class FetchAllFeatureTemplatesCommand implements Command<String, ResponseEntity<FeatureTemplateResponse>> {

    @Autowired
    ScreenBuilderService screenBuilderService;

    public ResponseEntity<FeatureTemplateResponse> execute(String id) {
	return ResponseEntity.status(HttpStatus.OK).body(screenBuilderService.getFeatureTemplateDetails());
    }


}
