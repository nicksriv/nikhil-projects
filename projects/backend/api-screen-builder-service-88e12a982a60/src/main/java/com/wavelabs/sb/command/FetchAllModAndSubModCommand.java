package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.FetchAllModAndSubModModel;
import com.wavelabs.sb.response.FetchAllModAndSubModResponse;
import com.wavelabs.sb.services.ScreenBuilderService;

@Component
public class FetchAllModAndSubModCommand
	implements Command<FetchAllModAndSubModModel, ResponseEntity<FetchAllModAndSubModResponse>> {

    @Autowired
    ScreenBuilderService screenBuilderService;

    public ResponseEntity<FetchAllModAndSubModResponse> execute(FetchAllModAndSubModModel model) {

	return ResponseEntity.status(HttpStatus.OK).body(screenBuilderService.fetchAllModAndSubMod(model));
    }

}
