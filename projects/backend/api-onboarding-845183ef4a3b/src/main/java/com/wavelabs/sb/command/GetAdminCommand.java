package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.AdminService;

@Component
public class GetAdminCommand implements Command<String, ResponseEntity<SuccessResponse>> {

    @Autowired
    AdminService adminService;

    @Override
    public ResponseEntity<SuccessResponse> execute(String id) {
	return ResponseEntity.status(HttpStatus.OK).body(adminService.getAdminDetails(id));
    }

}
