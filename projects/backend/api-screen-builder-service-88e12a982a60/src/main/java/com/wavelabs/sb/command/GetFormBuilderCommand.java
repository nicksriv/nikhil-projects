package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.response.FetchFormResponse;
import com.wavelabs.sb.services.ScreenBuilderService;

@Service
public class GetFormBuilderCommand implements Command<String, ResponseEntity<FetchFormResponse>> {

	@Autowired
	ScreenBuilderService screenBuilderService;

	@Override
	public ResponseEntity<FetchFormResponse> execute(String screenId) {
		return ResponseEntity.status(HttpStatus.OK).body(screenBuilderService.fetchFormWithScreenId(screenId));
	}
}
