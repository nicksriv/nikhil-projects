package com.wavelabs.sb.command;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.model.CreateScreenModel;
import com.wavelabs.sb.response.SaveScreenResponse;
import com.wavelabs.sb.services.ScreenService;

@Service
public class CreateScreenCommand implements Command<CreateScreenModel, SaveScreenResponse> {

    @Autowired
    ScreenService screenService;

    @Override
    public SaveScreenResponse execute(CreateScreenModel model) {
	return screenService.saveScreen(model);
    }

}
