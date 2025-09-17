package com.wavelabs.sb.command;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.model.DataBuilder;
import com.wavelabs.sb.repositories.ClientOnboardingRepository;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ClientOnboardingService;

@RunWith(MockitoJUnitRunner.class)
public class EditWorkflowAndThemeCommandTest {

    @InjectMocks
    EditWorkflowAndThemeCommand editWorkflowAndThemeCommand;
    
    @Mock
    ClientOnboardingRepository clientOnboardingRepository;
    
    @Mock
    ClientOnboardingService clientOnboardingService;

    @Test
    @DisplayName("test deleteSiteCommandMethod")
    public void executeTest() {
	SuccessResponse entity = editWorkflowAndThemeCommand.execute(DataBuilder.editWorkflowAndThemeRequest());
    }

}
