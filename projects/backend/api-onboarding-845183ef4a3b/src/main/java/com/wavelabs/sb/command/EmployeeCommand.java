package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.request.SearchEmployee;
import com.wavelabs.sb.response.EmployeeInfo;
import com.wavelabs.sb.services.UserOnboardingService;

@Component
public class EmployeeCommand implements Command<SearchEmployee, ResponseEntity<EmployeeInfo>> {

    @Autowired
    UserOnboardingService userOnboardingService;

    @Override
    public ResponseEntity<EmployeeInfo> execute(SearchEmployee searchEmp) {
	return ResponseEntity.status(HttpStatus.OK)
		.body(userOnboardingService.fetchEmployeeByUserIdClientId(searchEmp));
    }

}
