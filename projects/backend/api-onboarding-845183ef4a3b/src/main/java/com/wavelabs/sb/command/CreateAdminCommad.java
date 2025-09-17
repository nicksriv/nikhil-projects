package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.request.CreateAdminRequest;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AdminService;

@Component
public class CreateAdminCommad implements Command<CreateAdminRequest, ResponseEntity<SuccessResponse>> {

    @Autowired
    AdminService adminService;
    
    
    @Override
    public ResponseEntity<SuccessResponse> execute(CreateAdminRequest request) {
	return ResponseEntity.status(HttpStatus.OK).body(adminService.saveAdmin(request));
    }

}
