package com.wavelabs.sb.command;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.TokenPayLoadDetails;
import com.wavelabs.sb.response.DynamicMappingResponse;
import com.wavelabs.sb.request.DynamicMappingRequest;

import com.wavelabs.sb.services.ScreenBuilderService;

@Component
public class DynamicMappingCommand implements Command<DynamicMappingRequest, ResponseEntity<List<DynamicMappingResponse>>> {
    
	@Autowired
	ScreenBuilderService screenBuilderService;

    @Override
	public ResponseEntity<List<DynamicMappingResponse>> execute(DynamicMappingRequest request) {
		return ResponseEntity.status(HttpStatus.OK).body(screenBuilderService.getDynamicMapping(request));
	}
}
