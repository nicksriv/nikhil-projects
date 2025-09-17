package com.wavelabs.sb.command;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.model.ThemeDataBuilder;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.model.UserLocationsUpdateModel;
import com.wavelabs.sb.services.UserOnboardingService;

@RunWith(MockitoJUnitRunner.class)
public class UserLocationsUpdateCommandTest {

    @Mock
    UserOnboardingService userOnboardingService;

    @InjectMocks
    UserLocationsUpdateCommand userLocationsUpdateCommand;

    @Test
    @DisplayName("UserLocationsUpdateCommand test")
    public void userLocationsUpdateCommandTest() {
	UserLocationsUpdateModel model = new UserLocationsUpdateModel();
	model.setLocationRequest(UserDataBuilder.getLocations1());
	model.setTokenPayLoadDetails(ThemeDataBuilder.getTokenPayLoadAdminRequest());
	model.setUserId("userId");
	userLocationsUpdateCommand.execute(model);
    }
}
