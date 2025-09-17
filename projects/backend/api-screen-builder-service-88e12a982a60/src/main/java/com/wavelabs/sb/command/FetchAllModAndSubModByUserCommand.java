package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.FetchAllModulesByUesrModel;
import com.wavelabs.sb.response.UserModulesResponse;
import com.wavelabs.sb.services.ScreenBuilderService;

@Component
public class FetchAllModAndSubModByUserCommand
	implements Command<FetchAllModulesByUesrModel, ResponseEntity<UserModulesResponse>> {

    @Autowired
    ScreenBuilderService screenBuilderService;

    public ResponseEntity<UserModulesResponse> execute(FetchAllModulesByUesrModel model) {

	return ResponseEntity.status(HttpStatus.OK).body(screenBuilderService.fetchAllModulesForDashboard(model));
    }

}
