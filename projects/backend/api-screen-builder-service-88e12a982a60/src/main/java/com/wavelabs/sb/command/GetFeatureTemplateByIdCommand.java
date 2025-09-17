package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.response.FeatureTemplateInfo;
import com.wavelabs.sb.services.ScreenBuilderService;

@Component
public class GetFeatureTemplateByIdCommand implements Command<String,  ResponseEntity<FeatureTemplateInfo>>{

    @Autowired
    ScreenBuilderService screenBuilderService;

    public ResponseEntity<FeatureTemplateInfo> execute(String templateId) {

	return ResponseEntity.status(HttpStatus.OK).body(screenBuilderService.getFeatureTemplateById(templateId));
    }

}
