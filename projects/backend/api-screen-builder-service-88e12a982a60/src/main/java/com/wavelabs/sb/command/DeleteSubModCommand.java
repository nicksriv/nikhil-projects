package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.DeleteSubModuleModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ScreenBuilderService;

@Component
public class DeleteSubModCommand implements Command<DeleteSubModuleModel, ResponseEntity<SuccessResponse>> {
    
    @Autowired
    ScreenBuilderService screenBuilderService;

    @Override
    public ResponseEntity<SuccessResponse> execute(DeleteSubModuleModel model) {
	return ResponseEntity.status(HttpStatus.OK).body(screenBuilderService.deleteSubModules(model));
    }
}
