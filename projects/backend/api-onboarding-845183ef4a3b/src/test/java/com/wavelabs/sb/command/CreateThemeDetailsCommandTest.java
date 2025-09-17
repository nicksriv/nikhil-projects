package com.wavelabs.sb.command;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.response.SuccessResponse;
import com.wavelabs.sb.services.ThemeService;

@RunWith(MockitoJUnitRunner.class)
public class CreateThemeDetailsCommandTest {
	
	@InjectMocks
	CreateThemeDetailsCommand createThemeDetailsCommand;
	
	@Mock
	ThemeService themeService;
	
	@Test
	@DisplayName("test createTheme")
	public void createTheme() {
		when(themeService.createTheme(Mockito.any(), Mockito.any())).thenReturn(UserDataBuilder.getTestSuccessResponse());
		SuccessResponse response = createThemeDetailsCommand.execute(UserDataBuilder.getSaveThemDetailsModel());
		assertEquals("test-id", response.getId());
	}
	
}
