package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.SaveThemeDetailsModel;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ThemeService;

@Component
public class CreateThemeDetailsCommand implements Command<SaveThemeDetailsModel, SuccessResponse> {

    @Autowired
    ThemeService themeService;

    @Override
    public SuccessResponse execute(SaveThemeDetailsModel details) {
	return themeService.createTheme(details.getTokenPayLoadDetails(), details.getThemeRequest());
    }
}
