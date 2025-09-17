package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.request.UpdatePasswordRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.UserProfileService;

@Component
public class UpdatePasswordCommand implements Command<UpdatePasswordRequest, ResponseEntity<SuccessResponse>> {

    @Autowired
    UserProfileService userProfileService;

    @Override
    public ResponseEntity<SuccessResponse> execute(UpdatePasswordRequest request) {
	return ResponseEntity.status(HttpStatus.OK).body(
		userProfileService.updatePassword(request.getPayLoadDetails(), request.getChangePasswordRequest()));
    }

}
