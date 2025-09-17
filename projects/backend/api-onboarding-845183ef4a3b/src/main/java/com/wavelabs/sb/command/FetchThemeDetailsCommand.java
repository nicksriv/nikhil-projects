package com.wavelabs.sb.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.model.FetchThemeDetailsModel;
import com.wavelabs.sb.response.ThemeResponse;
import com.wavelabs.sb.services.ThemeService;

@Component
public class FetchThemeDetailsCommand implements Command<FetchThemeDetailsModel, ThemeResponse> {

    @Autowired
    ThemeService themeService;

    @Override
    public ThemeResponse execute(FetchThemeDetailsModel fetchThemeDetailsModel) {
	return themeService.fetchThemeDetails(fetchThemeDetailsModel);
    }
}
