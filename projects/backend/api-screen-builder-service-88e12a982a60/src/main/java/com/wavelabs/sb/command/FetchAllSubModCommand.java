package com.wavelabs.sb.command;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.services.ScreenBuilderService;

@Component
public class FetchAllSubModCommand implements Command<String, List<SubModules>> {

    @Autowired
    ScreenBuilderService screenBuilderService;

    @Override
    public List<SubModules> execute(String moduleId) {
	return screenBuilderService.fetchAllSubModules(moduleId);
    }

}
