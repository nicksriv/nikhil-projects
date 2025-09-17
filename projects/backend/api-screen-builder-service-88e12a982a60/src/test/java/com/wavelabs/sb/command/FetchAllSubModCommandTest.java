package com.wavelabs.sb.command;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.documents.SubModules;
import com.wavelabs.sb.model.ScreenBuilderData;
import com.wavelabs.sb.services.ScreenBuilderService;

@RunWith(MockitoJUnitRunner.class)
public class FetchAllSubModCommandTest {

    @InjectMocks
    FetchAllSubModCommand fetchAllSubModCommand;

    @Mock
    ScreenBuilderService screenBuilderService;

    @Test
    @DisplayName("test fetchAllSubmodules success response")
    public void fetchAllSubmodules() {
	Mockito.when(screenBuilderService.fetchAllSubModules(Mockito.anyString()))
		.thenReturn(ScreenBuilderData.getSubmodulesList());
	List<SubModules> list = fetchAllSubModCommand.execute("request");
	assertEquals(1, list.size());
    }

}
