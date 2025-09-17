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

import com.wavelabs.sb.model.ThemeDataBuilder;
import com.wavelabs.sb.model.UserDataBuilder;
import com.wavelabs.sb.response.ThemeResponse;
import com.wavelabs.sb.services.ThemeService;

@RunWith(MockitoJUnitRunner.class)
public class FetchThemeDetailsCommandTest {
	
	@InjectMocks
	FetchThemeDetailsCommand fetchThemeDetailsCommand;;

	@Mock
	ThemeService themeService;
	
	@Test
	@DisplayName("test fetchThemeDetails")
	public void fetchThemeDetails() {
		when(themeService.fetchThemeDetails(Mockito.any())).thenReturn(UserDataBuilder.getThemeResponse());
		ThemeResponse response = fetchThemeDetailsCommand.execute(ThemeDataBuilder.getFetchThemeDetailModel());
		assertEquals("FontName", response.getFont());
	}
	
}
