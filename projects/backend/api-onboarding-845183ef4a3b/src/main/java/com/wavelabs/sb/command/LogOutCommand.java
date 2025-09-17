package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AuthenticationService;

@Component
public class LogOutCommand implements Command<String, ResponseEntity<SuccessResponse>> {

	@Autowired
	AuthenticationService authenticationService;

	@Override
	public ResponseEntity<SuccessResponse> execute(String token) {
		String message=authenticationService.logOut(token);
		return ResponseEntity.status(HttpStatus.OK).body(new SuccessResponse(message));
	}
}
