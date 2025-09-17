package com.wavelabs.sb.command;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wavelabs.sb.model.UpdateScreenModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ScreenService;

@Service
public class UpdateScreenCommand implements Command<UpdateScreenModel, SuccessResponse> {

    @Autowired
    ScreenService screenService;

    @Override
    public SuccessResponse execute(UpdateScreenModel model) {
	return screenService.updateScreen(model);
    }

}

